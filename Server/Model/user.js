import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    post: {
      type: Schema.ObjectId,
      ref: "Post",
    },
    story: {
      type: Schema.ObjectId,
      ref: "Story",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    text: String,
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    about: {},
    photo: {
      url: String,
      public_id: String,
    },
    coverphoto: {
      url: String,
      public_id: String,
    },
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
    saved: [{ type: Schema.ObjectId, red: "Post" }],
    notifications: [notificationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
