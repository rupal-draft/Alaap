import { gql } from "apollo-server-express";

const authTypeDefs = gql`
  type Query {
    currentUser: User!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthResponse!
    login(email: String!, password: String!): LoginResponse!
    forgotPassword(email: String!): StatusResponse!
    resetPassword(id: ID!, token: String!, password: String!): StatusResponse!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    about: String
    photo: Photo
    coverphoto: Photo
    following: [User]
    followers: [User]
    notifications: [Notification]
  }

  type Photo {
    url: String
    public_id: String
  }

  type Notification {
    post: Post
    story: Story
    user: User!
    text: String
  }

  type AuthResponse {
    ok: Boolean!
  }

  type LoginResponse {
    token: String
    user: User
  }

  type StatusResponse {
    Status: String!
  }
`;

export default authTypeDefs;
