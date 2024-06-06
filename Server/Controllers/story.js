import Story from "./../Model/story.js";
import cloudinary from "cloudinary";
import User from "./../Model/user.js";

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

    res.json(recentStories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
