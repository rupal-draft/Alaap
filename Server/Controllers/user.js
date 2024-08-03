import User from "./../Model/user.js";
import Post from "./../Model/post.js";
import { comparePassword, hashPassword } from "./../Helpers/auth.js";
import cloudinary from "cloudinary";

export const profileUpdate = async (req, res) => {
  // console.log(req.body);
  // return;
  try {
    const data = {};
    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.email) {
      data.email = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.currentPassword) {
      const match = await comparePassword(
        req.body.currentPassword,
        user.password
      );
      if (!match) {
        return res.json({
          error: "Password doesn't match!!",
        });
      } else {
        if (req.body.password.length < 6) {
          return res.json({
            error: "Password is required and should be min 6 characters long",
          });
        } else {
          data.password = await hashPassword(req.body.password);
        }
      }
    }
    if (Object.keys(req.body.photo).length > 0) {
      if (user.photo && user.photo.public_id) {
        await cloudinary.uploader.destroy(user.photo.public_id);
      }
      data.photo = req.body.photo;
    }
    if (Object.keys(req.body.coverphoto).length > 0) {
      if (user.coverphoto && user.coverphoto.public_id) {
        await cloudinary.uploader.destroy(user.coverphoto.public_id);
      }
      data.coverphoto = req.body.coverphoto;
    }

    let updatedUser = await User.findByIdAndUpdate(req.userID, data, {
      new: true,
    });

    updatedUser.password = undefined;
    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ error: "Duplicate username" });
    }
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    let following = user.following;
    following.push(user._id);
    const people = await User.find({ _id: { $nin: following } })
      .select("-password -secret")
      .limit(10);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};
// If Rupal follows Sattwikee then Sattwikee will be added to Rupal's following Array as well as Rupal will be added to Sattwikee's Follower array
// middleware to add Rupal to Sattwikee's Follower array
export const addFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { followers: req.userID },
      },
      { new: true }
    );
    const follower = await User.findById(req.userID);
    if (!follower) {
      return res.status(404).json({ error: "Follower user not found" });
    }
    const notificationMessage = `${follower.name} started following you`;
    await User.findByIdAndUpdate(req.body._id, {
      $push: { notifications: { text: notificationMessage, user: req.userID } },
    });
    const notification = {
      text: notificationMessage,
      user: req.userID,
    };
    req.notification = notification;
    next();
  } catch (err) {
    console.log(err);
  }
};
export const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userID,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password");

    const follower = await User.findById(req.body._id).select("-password");
    res.json({
      user,
      follower,
      notification: req.notification,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    const following = await User.find({ _id: user.following }).limit(100);
    res.json(following);
  } catch (err) {
    console.log(err);
  }
};

export const userFollower = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    const following = await User.find({ _id: user.followers }).limit(100);
    res.json(following);
  } catch (err) {
    console.log(err);
  }
};

//Same Logic is applied from User Follow
/// middleware
export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.userID },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

export const userUnfollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userID,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  if (!query) return;
  try {
    const users = await User.find(
      {
        _id: { $ne: req.userID },
        name: { $regex: query, $options: "i" },
      },
      { password: 0 }
    ).select("name photo _id");

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate({
        path: "followers",
        select: "_id name photo.url",
      });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.userID)
      .populate({
        path: "notifications.post",
        select: "image",
      })
      .populate({
        path: "notifications.user",
        select: "photo name",
      })
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentDate = new Date();
    const cutoffDate = new Date(
      currentDate.setDate(currentDate.getDate() - 15)
    );
    user.notifications = user.notifications.filter((notification) => {
      return notification.createdAt >= cutoffDate;
    });

    await user.save();

    res.json(user.notifications);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Server error while fetching notifications" });
  }
};

export const getUserImages = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({
      postedBy: id,
      "image.url": { $exists: true, $ne: null },
    })
      .select("image")
      .exec();
    const images = posts.map((post) => post.image);

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
