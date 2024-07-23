"use client";
import Logo from "../../../public/images/sociofyLogoTemp.png";
import MessageImg from "../../../public/images/sociofyMessage1.png";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import api from "@/utils/axios";
import Avatar1 from "@/components/Avatar/Avatar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  FileImageOutlined,
  SendOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import notificationSound from "./../../../public/audio/notification.mp3";
import sendingSound from "./../../../public/audio/sending.mp3";
import useSound from "use-sound";
import {
  ImageMessageSend,
  getFriends,
  getMessage,
  messageSend,
  seenMessage,
  updateMessage,
} from "@/Context/Messanger/messangerAction";
import Avatar from "react-avatar";

const MessagesIndexPage = () => {
  const [currentFriend, setCurrentFriend] = useState("");
  const { user } = useSelector((state) => state.user);
  const friend = useSelector((state) => state.messanger.friends);
  const loading = useSelector((state) => state.messanger.loading);
  const messageLoading = useSelector((state) => state.messanger.messageLoading);
  const messageSendSuccess = useSelector(
    (state) => state.messanger.messageSendSuccess
  );
  const message_get_success = useSelector(
    (state) => state.messanger.message_get_success
  );
  const messages = useSelector((state) => state.messanger.message);
  const imageMessageLoading = useSelector(
    (state) => state.messanger.imageMessageLoading
  );
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [search, setSearch] = useState("");
  const [socketMessage, setSocketMessage] = useState({});
  const [typingMessage, setTypingMessage] = useState({});
  const messagesEndRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiPickerRef = useRef(null);
  const [image, setImage] = useState("");
  const socket = useRef();
  const [activeUsers, setActiveUsers] = useState([]);
  const [notificationPlay] = useSound(notificationSound);
  const [sendingPlay] = useSound(sendingSound);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearchUser = async () => {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/search-user`;
    try {
      const { data } = await api.post(URL, {
        search: search,
      });
      const standardizedData = data.map((user) => ({ ...user, id: user._id }));
      setSearchUser(standardizedData);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (search) {
      handleSearchUser();
    } else {
      setSearchUser([]);
    }
  }, [search]);

  const displayUsers = search ? searchUser : friend;

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    socket.current.on("typingMessageGet", (data) => {
      setTypingMessage(data);
    });

    socket.current.on("msgSeenResponse", (msg) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });
    socket.current.on("msgDeliveredResponse", (msg) => {
      dispatch({
        type: "DELIVERED_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });
    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
    });
  }, [currentFriend]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id, user);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== user?._id);
      setActiveUsers(filterUser);
      // console.log(users);
    });
  }, []);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend?.id &&
        socketMessage.reseverId === user?._id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
        dispatch(seenMessage(socketMessage));
        socket.current.emit("messageSeen", socketMessage);
        dispatch({
          type: "UPDATE_FRIEND_MESSAGE",
          payload: {
            msgInfo: socketMessage,
            status: "seen",
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMessage(currentFriend.id));
  }, [currentFriend?.id]);

  useEffect(() => {
    if (messages.length > 0) {
      if (
        messages[messages.length - 1].senderId !== user._id &&
        messages[messages.length - 1].status !== "seen"
      ) {
        dispatch({
          type: "UPDATE",
          payload: {
            id: currentFriend.id,
          },
        });
        socket.current.emit("seen", {
          senderId: currentFriend.id,
          reseverId: user._id,
        });
        dispatch(seenMessage(messages[messages.length - 1]));
      }
    }
    dispatch({
      type: "MESSAGE_GET_SUCCESS_CLEAR",
    });
  }, [message_get_success]);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("typingMessage", {
      senderId: user?._id,
      reseverId: currentFriend.id,
      msg: e.target.value,
    });
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.native);
    socket.current.emit("typingMessage", {
      senderId: user?._id,
      reseverId: currentFriend.id,
      msg: emoji,
    });
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmoji]);

  const handleFileChange = async (e) => {
    if (e.target.files.length != 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      try {
        const { data } = await api.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
          formData
        );
        setImage(data.url);
      } catch (e) {
        console.error(e.response);
      }
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    sendingPlay();
    const data = {
      senderName: user?.name,
      reseverId: currentFriend.id,
      image,
    };
    dispatch(ImageMessageSend(data));
    setImage("");
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    sendingPlay();
    const data = {
      senderName: user?.name,
      reseverId: currentFriend.id,
      message: newMessage,
    };
    socket.current.emit("typingMessage", {
      senderId: user?._id,
      reseverId: currentFriend.id,
      msg: "",
    });
    dispatch(messageSend(data));
    setNewMessage("");
  };
  useEffect(() => {
    if (messageSendSuccess) {
      socket.current.emit("sendMessage", messages[messages.length - 1]);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: messages[messages.length - 1],
        },
      });
      dispatch({
        type: "RESET_MESSAGE_SEND_SUCCESS",
      });
    }
  }, [messageSendSuccess]);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentFriend.id &&
      socketMessage.reseverId === user?._id
    ) {
      notificationPlay();
      toast.success(
        `${socketMessage.senderName.split(" ")[0]} has sent a new message`
      );
      dispatch(updateMessage(socketMessage));
      socket.current.emit("deliveredMessage", socketMessage);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: socketMessage,
          status: "delivered",
        },
      });
    }
  }, [socketMessage]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen max-h-screen">
      <Navbar
        open={open}
        setOpen={setOpen}
        // className="w-[70px] lg:w-[240px] px-4 py-4"
        socket={socket}
        myId={user?._id}
      />
      <div className="w-[70px] lg:w-[300px] hidden lg:block">
        <div className="flex flex-col  w-full h-full gap-2 bg-shadow">
          <div className="flex justify-center items-center pt-3">
            <h2 className="text-3xl font-bold text-primary_text font-montserrat">
              Your Chats
            </h2>
          </div>

          {/* Search */}

          <div className="flex items-center gap-2 px-2 w-full">
            <div className="relative w-full flex items-center gap-x-5">
              <input
                type="text"
                placeholder="Search in social…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight 
            
                   text-base sm:text-base 
                   pl-10 sm:pl-10  
                   py-1 sm:py-2
                   sm:px-4"
              />
              <FaSearch className="absolute left-3 text-primary_text w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col overflow-x-hidden overflow-y-auto scrollbar">
            {loading && (
              <div className="flex items-center justify-center">
                <SyncOutlined spin className="py-3" />
              </div>
            )}

            {displayUsers && displayUsers.length > 0 ? (
              displayUsers.map((friend) => {
                const isFriend = !search;
                const userInfo = isFriend ? friend.fndInfo : user;

                return (
                  <div
                    onClick={() => setCurrentFriend(userInfo)}
                    key={userInfo._id}
                    className="flex items-center justify-start gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-hover_highlight  cursor-pointer relative"
                  >
                    <div className="relative">
                      <Avatar1
                        imageUrl={userInfo?.photo?.url}
                        name={userInfo.name}
                        width={50}
                        height={50}
                        round={true}
                      />

                      {activeUsers.some(
                        (activeUser) => activeUser.userId === userInfo.id
                      ) && (
                        <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex flex-col items-start  ">
                      <h3 className="text-primary_text font-semibold text-base break-words">
                        {userInfo?.name}
                      </h3>

                      <div className="text-secondary_text ">
                        {friend.msgInfo && friend.msgInfo?.message?.text ? (
                          <div className="flex justify-between items-center ">
                            <span
                              className={
                                friend.msgInfo?.senderId !== user?._id &&
                                friend.msgInfo?.status !== "seen"
                                  ? "font-bold"
                                  : "font-normal "
                              }
                            >
                              {friend.msgInfo?.message?.text?.slice(0, 10) ||
                                ""}
                              ...
                            </span>
                            <span className="ml-2">
                              {friend.msgInfo.senderId === user?._id ? (
                                friend.msgInfo.status === "seen" ? (
                                  <img
                                    src={userInfo?.photo?.url}
                                    alt="Seen"
                                    className="w-4 h-4 rounded-full"
                                  />
                                ) : friend.msgInfo.status === "delivered" ? (
                                  <CheckCircleFilled />
                                ) : (
                                  <CheckCircleOutlined />
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        ) : friend.msgInfo && friend.msgInfo?.message.image ? (
                          <span>
                            <FileImageOutlined />
                          </span>
                        ) : (
                          <span>Connect You</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-12">
                <p className="text-white text-center">No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentFriend ? (
        <div className="flex flex-col justify-between min-h-screen  flex-1 gap-3 px-10">
          {/* individual message box header */}
          <Link
            href="/"
            className="flex items-center gap-2 py-3 px-2 border-b cursor-pointer w-full"
          >
            <Avatar1
              imageUrl={currentFriend.photo?.url}
              name={currentFriend.name}
              width={40}
              height={40}
            />
            <div className="flex-1">
              <h3 className="text-white-A700 font-semibold text-base break-words">
                {currentFriend?.name}
              </h3>
              <span
                className={`text-xs rounded px-2 ${
                  activeUsers.some((user) => user?.userId === currentFriend.id)
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {activeUsers.some((user) => user?.userId === currentFriend.id)
                  ? "Online"
                  : "Offline"}
              </span>
            </div>
          </Link>

          {/* show messages */}
          <div className="flex flex-col w-full h-full justify-end overflow-y-auto p-2 ">
            {(!messages || messages.length === 0) && !messageLoading && (
              <div className="flex flex-col items-center justify-center mt-10">
                {currentFriend.photo?.url ? (
                  <img
                    src={currentFriend.photo?.url}
                    alt="Current Friend"
                    className="w-40 h-40 rounded-full mb-4"
                  />
                ) : (
                  <Avatar
                    name={currentFriend.name}
                    size="100"
                    round={true}
                    className="mb-4"
                  />
                )}
                <div className="text-center">
                  <p className="text-lg font-semibold">{currentFriend.name}</p>
                  <p className="text-sm text-gray-500">and you are connected</p>
                </div>
              </div>
            )}
            {messageLoading && (
              <div className="flex justify-center items-center mb-4">
                <SyncOutlined spin style={{ fontSize: "24px" }} />
              </div>
            )}
            {messages &&
              messages.length > 0 &&
              messages.map((message, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`flex mb-2 ${
                        message.senderId === user?._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.senderId !== user?._id && (
                        <img
                          src={currentFriend.photo?.url}
                          alt="avatar"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      {message.message?.image ? (
                        <div className="p-2 rounded max-w-xs">
                          <img
                            src={message.message.image}
                            alt="message-image"
                            className="w-full rounded"
                          />
                        </div>
                      ) : (
                        <div
                          className={`p-2 rounded break-words max-w-xs ${
                            message.senderId === user?._id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {message.message?.text}
                        </div>
                      )}
                      {message.senderId === user?._id && (
                        <img
                          src={user?.photo?.url}
                          alt="avatar"
                          className="w-8 h-8 rounded-full ml-2"
                        />
                      )}
                    </div>
                    {index === messages.length - 1 &&
                      message.senderId === user?._id && (
                        <div className="text-xs text-gray-500 text-right pr-10">
                          {message.status === "seen" && "Seen"}
                          {message.status === "delivered" && "Delivered"}
                          {message.status === "unseen" && "Sent"}
                        </div>
                      )}
                  </React.Fragment>
                );
              })}
            {typingMessage &&
              typingMessage.msg &&
              typingMessage.senderId === currentFriend.id && (
                <div className="flex justify-start mb-2">
                  <img
                    src={currentFriend.photo?.url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="p-2 rounded break-words max-w-xs bg-gray-500 text-primary_text">
                    Typing...
                  </div>
                </div>
              )}
            <div ref={messagesEndRef} />
          </div>

          {/* write message */}
          <div className="flex items-center gap-2 p-2 w-full border-t relative">
            <label htmlFor="file-upload" className="cursor-pointer relative">
              {image && (
                <div className="relative w-20 h-20">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="absolute inset-0 object-cover w-full h-full rounded-xl"
                  />
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    // onClick={handleDeleteImage}
                  >
                    <DeleteOutlined
                      style={{ fontSize: "1.2rem", color: "white" }}
                    />
                  </div>
                </div>
              )}
              {!image && (
                <FileImageOutlined
                  className="text-2xl"
                  style={{ color: "white" }}
                />
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Write your message..."
                value={newMessage}
                onChange={inputHandle}
                disabled={messageLoading}
                className="w-full py-2 pl-10 pr-3 bg-[#cdcdcd] rounded-xl text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <BsEmojiSmile
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowEmoji(!showEmoji)}
              />
              {showEmoji && (
                <div className="absolute bottom-full right-0 mb-2">
                  <Picker
                    data={data}
                    emojiSize={20}
                    emojiButtonSize={28}
                    onEmojiSelect={handleEmojiSelect}
                    maxFrequentRows={0}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              onClick={(e) => {
                if (image) {
                  handleImage(e);
                } else {
                  handleMessage(e);
                }
              }}
              disabled={
                !image &&
                !newMessage.trim() &&
                (messageLoading || imageMessageLoading)
              }
              className={`py-2 px-4 rounded-xl focus:outline-none ${
                image || newMessage.trim()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {imageMessageLoading ? (
                <SyncOutlined spin className="text-white" />
              ) : (
                <SendOutlined
                  className={`${
                    image || newMessage.trim() ? "text-white" : "text-gray-500"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  flex-1 gap-3 px-10">
          <div className="w-[60px] lg:w-[70px]">
            <Image src={Logo} alt="sociofy" className="rounded-full" />
          </div>

          <h1 className="text-lg text-primary_text font-lato">
            <b>
              {" "}
              Reconnect with friends, share laughter, and create unforgettable
              memories on <em>Sociofy</em>.
            </b>{" "}
            Dive into endless conversations, explore shared interests, and
            strengthen bonds with those who matter most. Experience the joy of
            effortless connection.{" "}
          </h1>

          <div className=" w-fit h-fit">
            <Image src={MessageImg} alt="talkToPeople" className="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesIndexPage;
