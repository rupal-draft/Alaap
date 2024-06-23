import {
  DELIVERED_MESSAGE,
  FRIEND_GET_FAILURE,
  FRIEND_GET_REQUEST,
  FRIEND_GET_SUCCESS,
  IMAGE_MESSAGE_SEND_FAILURE,
  IMAGE_MESSAGE_SEND_REQUEST,
  IMAGE_MESSAGE_SEND_SUCCESS,
  LOGOUT_SUCCESS,
  MESSAGE_GET_FAILURE,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_SUCCESS_CLEAR,
  MESSAGE_SEND_FAILURE,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  RESET_MESSAGE_SEND_SUCCESS,
  SEEN_ALL,
  SEEN_MESSAGE,
  SOCKET_MESSAGE,
  UPDATE,
  UPDATE_FRIEND_MESSAGE,
} from "./messangerType";

const messengerState = {
  friends: [],
  message: [],
  messageSendSuccess: false,
  message_get_success: false,
  new_user_add: "",
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FRIEND_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FRIEND_GET_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
        loading: false,
      };
    case FRIEND_GET_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case MESSAGE_SEND_REQUEST:
      return {
        ...state,
        messageLoading: true,
        messageSendSuccess: false,
        messageError: null,
      };
    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        message: [...state.message, payload.message],
        messageSendSuccess: true,
        messageLoading: false,
      };
    case MESSAGE_SEND_FAILURE:
      return {
        ...state,
        messageLoading: false,
        messageError: payload.error,
      };
    case MESSAGE_GET_REQUEST:
      return {
        ...state,
        messageLoading: true,
        message_get_success: false,
        messageError: null,
      };
    case MESSAGE_GET_SUCCESS:
      return {
        ...state,
        message: payload.message,
        message_get_success: true,
        messageLoading: false,
      };
    case MESSAGE_GET_FAILURE:
      return {
        ...state,
        messageLoading: false,
        messageError: payload.error,
      };
    case IMAGE_MESSAGE_SEND_REQUEST:
      return {
        ...state,
        imageMessageLoading: true,
        imageMessageError: null,
      };
    case IMAGE_MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        message: [...state.message, payload.message],
        imageMessageLoading: false,
        messageSendSuccess: true,
      };
    case IMAGE_MESSAGE_SEND_FAILURE:
      return {
        ...state,
        imageMessageLoading: false,
        imageMessageError: payload.error,
      };
    case SOCKET_MESSAGE:
      return {
        ...state,
        message: [...state.message, payload.message],
      };
    case UPDATE_FRIEND_MESSAGE:
      const updatedFriends = state.friends.map((friend) => {
        if (
          friend.fndInfo.id === payload.msgInfo.reseverId ||
          friend.fndInfo.id === payload.msgInfo.senderId
        ) {
          return {
            ...friend,
            msgInfo: {
              ...payload.msgInfo,
              status: payload.status,
            },
          };
        }
        return friend;
      });
      return {
        ...state,
        friends: updatedFriends,
      };
    case SEEN_MESSAGE:
      const seenFriends = state.friends.map((friend) => {
        if (
          friend.fndInfo.id === payload.msgInfo.reseverId ||
          friend.fndInfo.id === payload.msgInfo.senderId
        ) {
          return {
            ...friend,
            msgInfo: {
              ...friend.msgInfo,
              status: "seen",
            },
          };
        }
        return friend;
      });
      return {
        ...state,
        friends: seenFriends,
      };
    case DELIVERED_MESSAGE:
      const deliveredFriends = state.friends.map((friend) => {
        if (
          friend.fndInfo.id === payload.msgInfo.reseverId ||
          friend.fndInfo.id === payload.msgInfo.senderId
        ) {
          return {
            ...friend,
            msgInfo: {
              ...friend.msgInfo,
              status: "delivered",
            },
          };
        }
        return friend;
      });
      return {
        ...state,
        friends: deliveredFriends,
      };
    case UPDATE:
      const updateIndex = state.friends.findIndex(
        (f) => f.fndInfo.id === payload.id
      );
      if (updateIndex !== -1 && state.friends[updateIndex].msgInfo) {
        const updatedFriends = [...state.friends];
        updatedFriends[updateIndex] = {
          ...updatedFriends[updateIndex],
          msgInfo: {
            ...updatedFriends[updateIndex].msgInfo,
            status: "seen",
          },
        };
        return {
          ...state,
          friends: updatedFriends,
        };
      }
    case SEEN_ALL:
      const seenAllIndex = state.friends.findIndex(
        (f) => f.fndInfo.id === payload.reseverId
      );
      if (seenAllIndex !== -1 && state.friends[seenAllIndex].msgInfo) {
        const updatedFriends = [...state.friends];
        updatedFriends[seenAllIndex] = {
          ...updatedFriends[seenAllIndex],
          msgInfo: {
            ...updatedFriends[seenAllIndex].msgInfo,
            status: "seen",
          },
        };
        return {
          ...state,
          friends: updatedFriends,
        };
      }
    case RESET_MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        messageSendSuccess: false,
      };
    case MESSAGE_GET_SUCCESS_CLEAR:
      return {
        ...state,
        message_get_success: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        friends: [],
        message: [],
        mesageSendSuccess: false,
        message_get_success: false,
      };
    default:
      return state;
  }
};
