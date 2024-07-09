import { gql } from "@apollo/client";

//Auth

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      ok
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        about
        photo {
          url
          public_id
        }
        coverphoto {
          url
          public_id
        }
        following {
          _id
        }
        followers {
          _id
        }
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      Status
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($id: ID!, $token: String!, $password: String!) {
    resetPassword(id: $id, token: $token, password: $password) {
      Status
    }
  }
`;

//Post

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $content: String!
    $image: PhotoInput
    $video: VideoInput
  ) {
    createPost(content: $content, image: $image, video: $video) {
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

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      ok
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      text
      user {
        name
        photo {
          url
        }
      }
      post {
        image {
          url
        }
      }
    }
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      ok
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($postId: ID!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      text
      user {
        _id
        name
        photo {
          url
        }
      }
      post {
        image {
          url
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const REMOVE_COMMENT_MUTATION = gql`
  mutation RemoveComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      ok
    }
  }
`;

// Stories

export const CREATE_STORY_MUTATION = gql`
  mutation CreateStory($image: PhotoInput!) {
    createStory(image: $image) {
      _id
      image {
        url
        public_id
      }
      postedBy {
        name
        photo {
          url
        }
      }
      likes
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_STORY_MUTATION = gql`
  mutation DeleteStory($id: ID!) {
    deleteStory(id: $id) {
      ok
    }
  }
`;

export const LIKE_STORY_MUTATION = gql`
  mutation LikeStory($id: ID!) {
    likeStory(id: $id) {
      text
      user {
        name
        photo {
          url
        }
      }
      story {
        image {
          url
        }
      }
    }
  }
`;

export const UNLIKE_STORY_MUTATION = gql`
  mutation UnlikeStory($id: ID!) {
    unlikeStory(id: $id) {
      ok
    }
  }
`;
