import User from "./../Model/user.js";
import { hashPassword } from "./../Helpers/auth.js";

export const profileUpdate = async (req, res) => {
  try {
    const data = {};

    if (req.body.email) {
      data.email = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error: "Password is required and should be min 6 characters long",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.photo) {
      data.photo = req.body.photo;
    }
    let user = await User.findByIdAndUpdate(req.userID, data, { new: true });

    user.password = undefined;
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ error: "Duplicate username" });
    }
    console.log(err);
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
      req.body.id,
      {
        $addToSet: { followers: req.userID },
      },
      { new: true }
    );
    // console.log(user);
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
        $addToSet: { following: req.body.id },
      },
      { new: true }
    ).select("-password");
    // console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
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
    const user = await User.findByIdAndUpdate(req.body.id, {
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
        $pull: { following: req.body.id },
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
    const user = await User.find({
      name: { $regex: query, $options: "i" },
    }).select("-password ");
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name }).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
