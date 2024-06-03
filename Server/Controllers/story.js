import Story from "./../Model/story.js";
import cloudinary from "cloudinary";
import User from "./../Model/user.js";
import cron from "node-cron";

export const createStory = async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }
  try {
    const story = new Story({
      image,
      postedBy: req.userID,
    });
    await story.save();
    const storyWithUser = await Story.findById(story._id).populate(
      "postedBy",
      "_id name"
    );
    //"*/10 * * * * *" 10 sec for testing
    // cron.schedule("*/10 * * * * *", async () => {
    //   try {
    //     await Story.findByIdAndDelete(story._id);
    //     if (story.image && story.image.public_id) {
    //       await cloudinary.uploader.destroy(story.image.public_id);
    //     }
    //   } catch (error) {
    //     console.error("Error deleting story:", error);
    //   }
    // });

    res.json(storyWithUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (story.image && story.image.public_id) {
      await cloudinary.uploader.destroy(story.image.public_id);
    }
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const likeStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.userID },
      },
      { new: true }
    );

    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const notificationMessage = `${user.name} liked your story`;

    await User.findByIdAndUpdate(story.postedBy, {
      $push: {
        notifications: {
          text: notificationMessage,
          user: req.userID,
          story: req.body._id,
        },
      },
    });
    const notification = {
      text: notificationMessage,
      user: req.userID,
      story: req.body._id,
    };
    res.json(notification);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const unlikeStory = async (req, res) => {
  try {
    await Story.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.userID },
      },
      { new: true }
    );
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const storyFeed = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    let following = user.following;
    following.push(req.userID);
    const stories = await Story.find({ postedBy: { $in: following } })
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    console.log(err);
  }
};
