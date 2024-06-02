import Story from "./../Model/story.js";
import cloudinary from "cloudinary";
import AWS from "aws-sdk";
import User from "./../Model/user.js";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const createStory = async (req, res) => {
  const { content, image, video } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const story = new Story({
      content,
      image,
      video_link: video,
      postedBy: req.userID,
    });
    await story.save();
    const storyWithUser = await Story.findById(story._id).populate(
      "postedBy",
      "-password"
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
    if (story.video_link && story.video_link.key && story.video_link.Bucket) {
      const { Bucket, Key } = story.video_link;

      const params = {
        Bucket,
        Key,
      };

      S3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        }
        console.log(data);
      });
    }
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const likeStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.userID },
      },
      { new: true }
    );
    res.json(story);
  } catch (err) {
    console.log(err);
  }
};

export const storyFeed = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    let following = user.following;

    const stories = await Story.find({ postedBy: { $in: following } })
      .populate("postedBy", "_id name photo")
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    console.log(err);
  }
};
