import jwt from "jsonwebtoken";
import User from "./../Model/user.js";
import Post from "./../Model/post.js";
import Story from "./../Model/story.js";
import "dotenv/config";

//For axios
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
//For Apollo

export const authenticateUser = async (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Authorization token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("Unauthorized");
    }

    return { userId: decoded._id };
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export const canDeletePost = async (userId, id) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    if (userId !== post.postedBy.toString()) {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Authorization failed");
  }
};

export const canDeleteStory = async (userId, id) => {
  try {
    const story = await Story.findById(id);
    if (!story) {
      throw new Error("Story not found");
    }
    if (userId !== story.postedBy.toString()) {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Authorization failed");
  }
};
