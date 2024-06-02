import jwt from "jsonwebtoken";
import User from "./../Model/user.js";
import Post from "./../Model/post.js";
import Story from "./../Model/story.js";


export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userID = decoded._id;
    next();
  } catch (error) {
    console.error(error);
  }
};
export const canDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.userID != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const canDeleteStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (req.userID != story.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};