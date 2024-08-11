"use client";
import React, { useEffect, useState, useRef } from "react";
import { IoMic, IoMicOff } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import AIChatSidebar from "@/components/AIChatSidebar";
import fastapi from "@/utils/fastapi";
import { SendOutlined } from "@ant-design/icons";

export default function AIChatPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatPages, setChatPages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(false);

  // Reference to the chat container
  const chatContainerRef = useRef(null);

  // Scroll to the bottom whenever currentChat updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [currentChat]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    // Set initial state based on screen size
    handleResize();
    // Update state on resize
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchUserChats();
  }, []);

  useEffect(() => {
    if (currentChatId) {
      fetchCurrentChat();
    }
  }, [currentChatId]);

  const fetchUserChats = async () => {
    const response = await fastapi.get("/chat/ai-chat");
    const chat_history_pages = response.data.chat_documents.reverse();
    setChatPages(chat_history_pages);
  };

  const fetchCurrentChat = async () => {
    const response = await fastapi.get(`/chat/ai-chat/${currentChatId}`);
    setCurrentChat(response.data.messages);
  };

  const startNewChat = async () => {
    try {
      const response = await fastapi.post("/chat/ai-chat");
      const newChatId = response.data.chat_id;
      setCurrentChatId(newChatId);
      fetchUserChats();
    } catch {
      console.error(error);
      toast.error("Failed to start new chat!");
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const newMessage = { message: message, response: "" };
    setCurrentChat([...currentChat, newMessage]);
    const prompt = message;

    setMessage("");

    try {
      setFetching(true);
      setError(false);
      const result = await fastapi.put(`/chat/ai-chat/${currentChatId}`, {
        message: prompt,
      });
      fetchCurrentChat(currentChatId);
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    } finally {
      setFetching(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      const response = await fastapi.delete(`/chat/ai-chat/${chatId}`);
      setCurrentChatId(null);
      fetchUserChats();
      toast.success("Chat deleted successfully");
    } catch (error) {
      toast.error("Failed to delete chat!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message !== "") {
      handleSendMessage();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard successfully!");
      },
      (err) => {
        toast.error("Failed to copy text!");
      }
    );
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
    setRecognition(recognition);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  console.log(currentChat);
  return (
    <div className="flex w-full h-full min-h-screen bg-background">
      <AIChatSidebar
        chatPages={chatPages}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        startNewChat={startNewChat}
        handleDeleteChat={handleDeleteChat}
      />
      {currentChatId ? (
        <div className="flex flex-col flex-1">
          <div className="flex flex-col w-full items-center py-2 justify-center gap-5">
            <h1 className="text-primary_text font-logo_text text-3xl font-medium">
              Generate your content!
            </h1>
          </div>

          <div className="flex-1 w-full p-2 overflow-hidden">
            {/** The message section */}
            <div
              className="flex flex-col bg-shadow space-y-4 overflow-y-auto rounded-lg shadow-md h-full p-4"
              ref={chatContainerRef} // Attach the ref to the chat container
            >
              {currentChat.map((chat, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  <div className="p-2 rounded-lg flex bg-accent text-primary_text self-end">
                    {chat.message}
                  </div>
                  {chat.response && (
                    <div className="p-2 rounded-lg flex bg-secondary_text self-start">
                      <div className="flex-1">
                        <ReactMarkdown>{chat.response}</ReactMarkdown>
                      </div>
                      <button
                        onClick={() => copyToClipboard(chat.response)}
                        className="ml-2 text-background hover:text-shadow flex flex-col justify-start items-start"
                      >
                        <FaRegCopy />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {fetching && (
                <div className="animate-ping mt-2 h-4 w-4 rounded-full bg-hover_accent self-start"></div>
              )}
              {error && (
                <div className=" text-red-400">
                  Oops! Something went wrong while fetching the response. Please
                  try again in a moment. If the problem persists, check your
                  internet connection or contact support for assistance.
                </div>
              )}
            </div>
          </div>

          {/** The input section */}
          <div className="w-full   p-2 bg-background gap-2 mb-12 lg:mb-2 border-t ">
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                value={fetching ? "" : message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 bg-hover_accent rounded-lg text-primary_text focus:outline-none focus:bg-hover_accent focus:border-hover_accent"
                placeholder={
                  isListening
                    ? "Listening..."
                    : fetching
                    ? "Wait until I can fetch my response for you :)"
                    : "Start typing..."
                }
              />
              {fetching ? (
                <button className="p-2 bg-accent text-white-A700 rounded-full">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </button>
              ) : (
                <>
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 ${
                      isListening
                        ? "bg-red-500"
                        : "bg-green-500 hover:bg-green-700"
                    } text-white-A700 rounded-full`}
                  >
                    {isListening ? <IoMicOff /> : <IoMic />}
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="py-2 px-4 bg-hover_accent text-secondary_text hover:bg-accent rounded-xl focus:outline-none "
                  >
                    <SendOutlined className="text-primary_text" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  bg-background flex-1 gap-3 px-10">
          <h1 className="text-lg text-primary_text font-lato text-center">
            <b>
              {" "}
              Engage in stimulating conversations with AI, explore shared
              interests, and forge meaningful connections on <em>Alaap</em> AI
              Chat.
            </b>{" "}
            Experience the power of intelligent dialogue and discover new
            perspectives with every interaction.{" "}
          </h1>

          <div className=" w-fit h-fit">
            <img src="aichat.png" className="h-80 w-80" />
          </div>
        </div>
      )}
    </div>
  );
}
