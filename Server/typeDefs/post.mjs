import { gql } from "apollo-server-express";

const postTypeDefs = gql`
  type Query {
    postsByUser: [Post!]!
    userPosts(id: ID!): [Post!]!
    newsFeed: [Post!]!
    getPosts: [Post]
    getPostComments(postId: ID!): [Comment!]!
  }

  type Mutation {
    createPost(content: String!, image: PhotoInput, video: VideoInput): Post!
    deletePost(id: ID!): AuthResponse!
    likePost(postId: ID!): Notification!
    unlikePost(postId: ID!): AuthResponse!
    addComment(postId: ID!, comment: String!): Notification!
    removeComment(postId: ID!, commentId: ID!): AuthResponse!
  }

  type Post {
    _id: ID!
    content: String!
    postedBy: User!
    image: Photo
    video_link: Video
    likes: [ID]
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    _id: ID!
    text: String!
    created: String!
    postedBy: User!
  }

  type Video {
    ETag: String
    ServerSideEncryption: String
    Location: String
    Key: String
    Bucket: String
  }

  input PhotoInput {
    url: String
    public_id: String
  }

  input VideoInput {
    ETag: String
    ServerSideEncryption: String
    Location: String
    Key: String
    Bucket: String
  }
`;

export default postTypeDefs;
