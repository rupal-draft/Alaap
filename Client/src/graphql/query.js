import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      _id
      content
      postedBy {
        _id
        name
        photo {
          url
        }
      }
      image {
        url
      }
      video_link {
        Location
      }
      likes
      comments {
        _id
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST_COMMENTS_QUERY = gql`
  query GetPostComments($postId: ID!) {
    getPostComments(postId: $postId) {
      _id
      text
      created
      postedBy {
        _id
        name
        photo {
          url
        }
      }
    }
  }
`;

export const POSTS_BY_USER_QUERY = gql`
  query PostsByUser {
    postsByUser {
      _id
      content
      postedBy {
        _id
        name
        photo {
          url
        }
      }
      image {
        url
      }
      video_link {
        Location
      }
      likes
      comments {
        _id
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_STORY_FEED_QUERY = gql`
  query StoryFeed {
    storyFeed {
      _id
      image {
        url
      }
      postedBy {
        _id
        name
        photo {
          url
        }
      }
      likes
      createdAt
    }
  }
`;
