import cloudinary from "cloudinary";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import { readFileSync } from "fs";
import Post from "./../Model/post.js";
import User from "./../Model/user.js";
import "dotenv/config";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const createPost = async (req, res) => {
  const { content, image, video } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({
      content,
      image,
      video_link: video,
      postedBy: req.userID,
    });
    await post.save();
    const postWithUser = await Post.findById(post._id).populate(
      "postedBy",
      "-password"
    );
    res.json(postWithUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};
export const videoUpload = async (req, res) => {
  try {
    const { video } = req.files;
    if (!video) return res.status(404).send("No Video found!");

    const params = {
      Bucket: "sociofy-bucket",
      Key: `${nanoid()}.${video.type.split("/")[1]}`,
      Body: readFileSync(video.path),
      ACL: "public-read",
      ContentType: video.type,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      }
      console.log(data);
      res.send(data);
    });
  } catch (err) {
    console.error(err);
  }
};

export const postsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.userID })
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("postedBy", "_id name photo")
      .populate("comments.postedBy", "_id name photo");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (post.image && post.image.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }
    if (post.video_link && post.video_link.key && post.video_link.Bucket) {
      const { Bucket, Key } = post.video_link;

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

export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.userID },
      },
      { new: true }
    );
    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const notificationMessage = `${user.name} liked your post`;
    await User.findByIdAndUpdate(post.postedBy, {
      $push: {
        notifications: {
          text: notificationMessage,
          user: req.userID,
          post: req.body.id,
        },
      },
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.userID },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: comment, postedBy: req.userID } },
      },
      { new: true }
    )
      .populate("postedBy", "_id name photo")
      .populate("comments.postedBy", "_id name photo");
    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const notificationMessage = `${user.name} commented on your post`;
    await User.findByIdAndUpdate(post.postedBy, {
      $push: {
        notifications: {
          text: notificationMessage,
          user: req.userID,
          post: postId,
        },
      },
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const removeComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    let following = user.following;
    following.push(req.userID);

    const posts = await Post.find({ postedBy: { $in: following } })
      .populate("postedBy", "_id name photo")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const posts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name photo")
      .populate("comments.postedBy", "_id name photo")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};
