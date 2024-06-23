import api from "@/utils/axios";
import {
  FRIEND_GET_FAILURE,
  FRIEND_GET_REQUEST,
  FRIEND_GET_SUCCESS,
  IMAGE_MESSAGE_SEND_FAILURE,
  IMAGE_MESSAGE_SEND_REQUEST,
  IMAGE_MESSAGE_SEND_SUCCESS,
  MESSAGE_GET_FAILURE,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_FAILURE,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
} from "./messangerType";

export const getFriends = () => async (dispatch) => {
  dispatch({ type: FRIEND_GET_REQUEST });
  try {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-friends`
    );
    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: {
        friends: data.friends,
      },
    });
  } catch (error) {
    dispatch({
      type: FRIEND_GET_FAILURE,
    });
    console.log(error.response);
  }
};

export const messageSend = (data) => async (dispatch) => {
  dispatch({ type: MESSAGE_SEND_REQUEST });
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/send-message`,
      data
    );
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_SEND_FAILURE,
      payload: {
        error: error.response.data,
      },
    });
    console.log(error.response.data);
  }
};

export const getMessage = (id) => async (dispatch) => {
  dispatch({ type: MESSAGE_GET_REQUEST });
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-message/${id}`
    );
    dispatch({
      type: MESSAGE_GET_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_GET_FAILURE,
      payload: {
        error: error.response.data,
      },
    });
    console.log(error.response.data);
  }
};

export const ImageMessageSend = (data) => async (dispatch) => {
  dispatch({ type: IMAGE_MESSAGE_SEND_REQUEST });
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/image-send`,
      data
    );
    dispatch({
      type: IMAGE_MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: IMAGE_MESSAGE_SEND_FAILURE,
      payload: {
        error: error.response.data,
      },
    });
    console.log(error.response.data);
  }
};

export const seenMessage = (msg) => async (dispatch) => {
  try {
    await api.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/seen-message`, msg);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = (msg) => async (dispatch) => {
  try {
    await api.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/delivered-message`,
      msg
    );
  } catch (error) {
    console.log(error.response.message);
  }
};


