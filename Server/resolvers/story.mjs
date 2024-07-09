import Story from "./../Model/story.js";
import cloudinary from "cloudinary";
import User from "./../Model/user.js";
import { canDeleteStory } from "../Middleware/verify.js";

const storyResolvers = {
  Query: {
    storyFeed: async (_, __, { req, userId }) => {
      try {
        const user = await User.findById(userId);
        let following = user.following;
        following.push(userId);

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentStories = await Story.find({
          postedBy: { $in: following },
          createdAt: { $gte: twentyFourHoursAgo },
        })
          .populate("postedBy", "_id name")
          .sort({ createdAt: -1 });

        const oldStories = await Story.find({
          postedBy: { $in: following },
          createdAt: { $lt: twentyFourHoursAgo },
        });

        for (const story of oldStories) {
          if (story.image && story.image.public_id) {
            await cloudinary.v2.uploader.destroy(story.image.public_id);
          }
        }

        await Story.deleteMany({
          postedBy: { $in: following },
          createdAt: { $lt: twentyFourHoursAgo },
        });

        return recentStories;
      } catch (err) {
        console.log(err);
        throw new Error("Server error while fetching stories");
      }
    },
  },
  Mutation: {
    createStory: async (_, { image }, { req, userId }) => {
      if (!image) {
        throw new Error("Image is required");
      }
      try {
        const story = new Story({
          image,
          postedBy: userId,
        });
        await story.save();
        const storyWithUser = await Story.findById(story._id).populate(
          "postedBy",
          "_id name photo"
        );
        return storyWithUser;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create story");
      }
    },
    deleteStory: async (_, { id }, { req, userId }) => {
      await canDeleteStory(userId, id);
      try {
        const story = await Story.findByIdAndDelete(id);
        if (story.image && story.image.public_id) {
          await cloudinary.uploader.destroy(story.image.public_id);
        }
        return { ok: true };
      } catch (err) {
        console.log(err);
        throw new Error("Failed to delete story");
      }
    },
    likeStory: async (_, { id }, { req, userId }) => {
      try {
        const story = await Story.findByIdAndUpdate(
          id,
          {
            $addToSet: { likes: userId },
          },
          { new: true }
        );

        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        const notificationMessage = `${user.name} liked your story`;

        await User.findByIdAndUpdate(story.postedBy, {
          $push: {
            notifications: {
              text: notificationMessage,
              user: userId,
              story: id,
            },
          },
        });
        return {
          text: notificationMessage,
          user: user,
          story: story,
        };
      } catch (err) {
        console.log(err);
        throw new Error("Failed to like story");
      }
    },
    unlikeStory: async (_, { id }, { req, userId }) => {
      try {
        await Story.findByIdAndUpdate(
          id,
          {
            $pull: { likes: userId },
          },
          { new: true }
        );
        return { ok: true };
      } catch (err) {
        console.log(err);
        throw new Error("Failed to unlike story");
      }
    },
  },
};

export default storyResolvers;
