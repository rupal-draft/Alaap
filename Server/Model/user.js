import mongoose from "mongoose";
const { Schema } = mongoose;

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
    photo: String,
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
    notifications: [
      {
        post: {
          type: Schema.ObjectId,
          ref: "Post",
        },
        user: {
          type: Schema.ObjectId,
          ref: "User",
        },
        text: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
