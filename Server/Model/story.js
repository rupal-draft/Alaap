import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const storySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      url: String,
      public_id: String,
    },
    video_link: {},
    likes: [{ type: ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
