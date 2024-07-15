import Post from "./../Model/post.js";
import User from "./../Model/user.js";
import { canDeletePost } from "../Middleware/verify.js";
import { S3 } from "../Controllers/upload.js";
import cloudinary from "cloudinary";

const postResolvers = {
  Query: {
    getPosts: async () => {
      try {
        return await Post.find()
          .populate("postedBy", "_id name photo")
          .populate("comments.postedBy", "_id name photo")
          .sort({ createdAt: -1 });
      } catch (err) {
        console.log(err);
        throw new Error("Error fetching posts");
      }
    },

    postsByUser: async (_, __, { req, userId }) => {
      try {
        return await Post.find({ postedBy: userId })
          .populate("postedBy", "_id name photo")
          .sort({ createdAt: -1 })
          .limit(10);
      } catch (err) {
        console.log(err);
        throw new Error("Error fetching user's posts");
      }
    },

    userPosts: async (_, { id }) => {
      try {
        return await Post.find({ postedBy: id })
          .populate("postedBy", "_id name photo")
          .sort({ createdAt: -1 })
          .limit(10);
      } catch (err) {
        console.log(err);
        throw new Error("Error fetching the posts");
      }
    },
    getPostComments: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId)
          .populate({
            path: "comments.postedBy",
            select: "name photo.url",
          })
          .exec();

        if (!post) {
          throw new Error("Post not found");
        }

        return post.comments;
      } catch (err) {
        console.error(err);
        throw new Error("Server error while fetching comments");
      }
    },

    newsFeed: async (_, __, { req, userId }) => {
      try {
        const user = await User.findById(userId);
        let following = user.following;
        following.push(userId);

        const posts = await Post.find({ postedBy: { $in: following } })
          .populate("postedBy", "_id name photo")
          .sort({ createdAt: -1 })
          .limit(10);

        return posts;
      } catch (err) {
        console.log(err);
        throw new Error("Error fetching news feed");
      }
    },
  },

  Mutation: {
    createPost: async (_, { content, image, video }, { req, userId }) => {
      if (!content.length) {
        throw new Error("Content is required");
      }

      try {
        const post = new Post({
          content,
          image,
          video_link: video,
          postedBy: userId,
        });
        await post.save();

        const postWithUser = await Post.findById(post._id).populate(
          "postedBy",
          "-password"
        );

        return postWithUser;
      } catch (err) {
        console.log(err);
        throw new Error("Error creating post");
      }
    },

    deletePost: async (_, { id }, { req, userId }) => {
      await canDeletePost(userId, id);
      try {
        const post = await Post.findByIdAndDelete(id);
        if (post.image && post.image.public_id) {
          await cloudinary.uploader.destroy(post.image.public_id);
        }

        if (post.video_link && post.video_link.Key && post.video_link.Bucket) {
          const { Bucket, Key } = post.video_link;

          const params = {
            Bucket,
            Key,
          };
          await S3.deleteObject(params).promise();
        }

        return { ok: true };
      } catch (err) {
        console.log(err);
        throw new Error("Error deleting post");
      }
    },

    likePost: async (_, { postId }, { req, userId }) => {
      try {
        const post = await Post.findByIdAndUpdate(
          postId,
          {
            $addToSet: { likes: userId },
          },
          { new: true }
        );
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        let notificationMessage = "";

        if (post.postedBy.equals(userId)) {
          notificationMessage = "You liked your own post";
        } else {
          notificationMessage = `${user.name} liked your post`;

          await User.findByIdAndUpdate(post.postedBy, {
            $push: {
              notifications: {
                text: notificationMessage,
                user: userId,
                post: postId,
              },
            },
          });
        }
        const notification = {
          text: notificationMessage,
          user: user,
          post: post,
        };
        return notification;
      } catch (err) {
        console.log(err);
        throw new Error("Error liking post");
      }
    },

    unlikePost: async (_, { postId }, { req, userId }) => {
      try {
        await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { likes: userId },
          },
          { new: true }
        );
        return { ok: true };
      } catch (err) {
        console.log(err);
        throw new Error("Error unliking post");
      }
    },

    addComment: async (_, { postId, comment }, { req, userId }) => {
      try {
        const post = await Post.findByIdAndUpdate(
          postId,
          {
            $push: { comments: { text: comment, postedBy: userId } },
          },
          { new: true }
        )
          .populate("postedBy", "_id name photo")
          .populate("comments.postedBy", "_id name photo");
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        let notificationMessage = "";

        if (post.postedBy.equals(userId)) {
          notificationMessage = "You commented on your own post";
        } else {
          notificationMessage = `${user.name} commented on your post`;

          await User.findByIdAndUpdate(post.postedBy, {
            $push: {
              notifications: {
                text: notificationMessage,
                user: userId,
                post: postId,
              },
            },
          });
        }
        const notification = {
          text: notificationMessage,
          user: user,
          post: post,
        };
        return notification;
      } catch (err) {
        console.log(err);
        throw new Error("Error adding comment");
      }
    },

    removeComment: async (_, { postId, commentId }, { req, userId }) => {
      try {
        await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { comments: { _id: commentId } },
          },
          { new: true }
        );
        return { ok: true };
      } catch (err) {
        console.log(err);
        throw new Error("Error removing comment");
      }
    },
  },
};

export default postResolvers;
