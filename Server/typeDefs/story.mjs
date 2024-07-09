import { gql } from "apollo-server-express";

const storyTypeDefs = gql`
  type Query {
    storyFeed: [Story!]
  }

  type Mutation {
    createStory(image: PhotoInput!): Story!
    deleteStory(id: ID!): AuthResponse!
    likeStory(id: ID!): Notification
    unlikeStory(id: ID!): AuthResponse!
  }

  type Story {
    _id: ID!
    image: Photo
    postedBy: User!
    likes: [ID]
    createdAt: String!
    updatedAt: String!
  }
`;

export default storyTypeDefs;
