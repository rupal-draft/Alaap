"use client";
import Logo from "../../../public/images/sociofyLogoTemp.png";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Nav/Navbar";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import api from "@/utils/axios";
import Avatar from "@/components/Avatar/Avatar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import notificationSound from "./../../../public/audio/notification.mp3";
import sendingSound from "./../../../public/audio/sending.mp3";
import useSound from "use-sound";

const MessagesIndexPage = () => {
  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState("");
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
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

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
      if (data.reseverId === user?._id) {
        updateLastMessageStatus(data);
        if (data.senderId !== currentFriend?.id) {
          updateFriendMessageStatus(data);
          seenMessage(data);
          socket.current.emit("messageSeen", { ...data, status: "seen" });
        }
      }
    });

    socket.current.on("typingMessageGet", (data) => {
      setTypingMessage(data);
    });

    socket.current.on("msgSeenResponse", (msg) => {
      updateLastMessageStatus(msg);
      updateFriendMessageStatus(msg);
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
    if (socketMessage) {
      if (
        (socketMessage.senderId === currentFriend?.id &&
          socketMessage.reseverId === user?._id) ||
        (socketMessage.senderId === user?._id &&
          socketMessage.reseverId === currentFriend?.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, socketMessage]);
        seenMessage(socketMessage);
        const updatedSocketMessage = {
          ...socketMessage,
          status: "seen",
        };
        socket.current.emit("messageSeen", updatedSocketMessage);
      }
      updateLastMessage(socketMessage);
    }
    setSocketMessage("");
  }, [socketMessage, currentFriend]);

  const seenMessage = async (msg) => {
    try {
      await api.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/seen-message`, msg);
    } catch (e) {
      console.error(e.response);
    }
  };

  useEffect(() => {
    if (user) {
      loadFriends();
    }
  }, [user]);

  const loadFriends = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-friends`
    );
    setFriends(data.friends);
  };

  useEffect(() => {
    if (currentFriend) {
      loadMessages(currentFriend.id);
    }
  }, [currentFriend?.id]);

  const loadMessages = async (id) => {
    try {
      const { data } = await api.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/get-message/${id}`
      );
      setMessages(data.message);
    } catch (e) {
      console.error(e);
    }
  };

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
        console.log(e.response);
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
    try {
      await api
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/image-send`, data)
        .then((response) => {
          socket.current.emit("sendMessage", {
            senderId: user?._id,
            senderName: user?.name,
            reseverId: currentFriend.id,
            time: new Date(),
            message: {
              text: "",
              image: image,
              id: response.data?.message?._id,
            },
          });
          updateLastMessage({
            senderId: user?._id,
            senderName: user?.name,
            reseverId: currentFriend.id,
            message: {
              text: "",
              image: image,
            },
            time: new Date(),
          });
        });
      setImage("");
      loadMessages(currentFriend.id);
    } catch (e) {
      console.error(e.response);
    }
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
    try {
      await api
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/send-message`, data)
        .then((response) => {
          const newMsg = {
            senderId: user?._id,
            senderName: user?.name,
            reseverId: currentFriend.id,
            time: new Date(),
            message: {
              text: newMessage,
              image: "",
              id: response.data?.message?._id,
            },
            status: "sent",
          };
          socket.current.emit("sendMessage", newMsg);
          updateLastMessage(newMsg);
        });
      setNewMessage("");
      loadMessages(currentFriend.id);
    } catch (e) {
      console.error(e.response);
    }
  };
  const updateLastMessage = (message) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.fndInfo.id === message.senderId ||
        friend.fndInfo.id === message.reseverId
          ? {
              ...friend,
              msgInfo: {
                ...friend.msgInfo,
                message: message.message,
                senderId: message.senderId,
                status: message.senderId === user?._id ? "sent" : "received",
              },
            }
          : friend
      )
    );
  };
  const updateFriendMessageStatus = (msg) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.fndInfo.id === msg.senderId ||
        friend.fndInfo.id === msg.reseverId
          ? {
              ...friend,
              msgInfo: {
                ...friend.msgInfo,
                status: "seen",
              },
            }
          : friend
      )
    );
  };
  const updateLastMessageStatus = (msg) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        message._id === msg._id
          ? { ...message, status: "seen" }
          : index === prevMessages.length - 1 && message.senderId === user?._id
          ? { ...message, status: "seen" }
          : message
      )
    );
  };

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentFriend.id &&
      socketMessage.reseverId === user?._id
    ) {
      notificationPlay();
      updateLastMessage(socketMessage);
      toast.success(
        `${socketMessage.senderName.split(" ")[0]} has sent a new message`
      );
    }
  }, [socketMessage]);

  const [open, setOpen] = useState(true);

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
  // console.log(friends);
  // console.log(activeUsers);
  console.log(messages);
  return (
    <div className="flex h-screen max-h-screen">
      <Navbar
        open={open}
        setOpen={setOpen}
        className="w-[70px] lg:w-[240px] px-4 py-4"
      />
      <div className="w-[70px] lg:w-[240px] hidden lg:block">
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800">
          <div className="h-16 flex items-center">
            <h2 className="text-xl font-bold p-4 text-white">Your Chats</h2>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-2 w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search in social…"
                className="w-full py-2 pl-10 pr-4 bg-[#cdcdcd] rounded-full text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
            </div>
          </div>

          <div className="flex-1 overflow-x-hidden overflow-y-auto scrollbar">
            {friends.length === 0 && (
              <div className="mt-12">
                <p className="text-lg text-center text-slate-400">
                  No users available.
                </p>
              </div>
            )}

            {friends &&
              friends.map((friend) => (
                <div
                  onClick={() => setCurrentFriend(friend.fndInfo)}
                  key={friend._id}
                  className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-red-500 cursor-pointer w-full relative"
                >
                  <div className="relative">
                    <Avatar
                      imageUrl={friend.fndInfo?.photo?.url}
                      name={friend.fndInfo.name}
                      width={40}
                      height={40}
                    />

                    {activeUsers.some(
                      (activeUser) => activeUser.userId === friend.fndInfo.id
                    ) && (
                      <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base break-words">
                      {friend.fndInfo?.name}
                    </h3>
                    <div>
                      {friend.msgInfo && friend.msgInfo?.message?.text ? (
                        <div className="flex justify-between items-center">
                          <span
                            className={
                              friend.msgInfo?.senderId !== user?._id
                                ? "text-black font-bold"
                                : "font-normal"
                            }
                          >
                            {friend.msgInfo?.message.text.slice(0, 10)}...
                          </span>
                          <span className="ml-2">
                            {friend.msgInfo.senderId === user?._id
                              ? friend.msgInfo.status === "seen"
                                ? "Seen"
                                : "Sent"
                              : friend.msgInfo.status === "seen"
                              ? "Seen"
                              : ""}
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
              ))}
          </div>
        </div>
      </div>
      {currentFriend ? (
        <div className="flex flex-col h-full w-full">
          {/* individual message box header */}
          <Link
            href="/"
            className="flex items-center gap-2 py-3 px-2 border-b cursor-pointer w-full"
          >
            <Avatar
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
          <div className="flex-1 overflow-y-auto p-2 flex flex-col">
            {messages &&
              messages.length > 0 &&
              messages.map((message, index) => {
                const isLastSentMessage =
                  message.senderId === user?._id &&
                  (index === messages.length - 1 ||
                    messages[index + 1].senderId !== user?._id);

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
                    {isLastSentMessage && message.status === "seen" && (
                      <div className="text-xs text-gray-500 text-right pr-10">
                        Seen
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
                  <div className="p-2 rounded break-words max-w-xs bg-gray-500 text-black-500">
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
              disabled={!image && !newMessage.trim()}
              className={`py-2 px-4 rounded-xl focus:outline-none ${
                image || newMessage.trim()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full flex-1">
          <h1 className="text-4xl text-white-A700">
            Welcome to the Messages Index Page
          </h1>

          <div className="w-[60px] py-5 lg:w-[70px]">
            <Image src={Logo} alt="sociofy" className="rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesIndexPage;
