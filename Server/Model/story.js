import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const storySchema = new mongoose.Schema(
  {
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      url: String,
      public_id: String,
    },
    likes: [{ type: ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
