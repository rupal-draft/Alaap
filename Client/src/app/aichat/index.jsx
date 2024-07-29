"use client";
import Navbar from "@/components/Nav/Navbar";
import React, { useEffect, useState } from "react";
import { IoSendSharp, IoMic, IoMicOff } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

export default function AIChatPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

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

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = { sender: "user", text: message };
    setChat([...chat, userMessage]);
    const prompt = message;
    let botMessage;

    setMessage("");

    try {
      setFetching(true);
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_FASTAPI_SERVER_URL}/chat`,
        { message: prompt }
      );
      botMessage = { sender: "bot", text: result.data.response };
    } catch (error) {
      console.error("Error:", error);
      botMessage = {
        sender: "bot",
        text: "Oops! Something went wrong while fetching the response. Please try again in a moment. If the problem persists, check your internet connection or contact support for assistance.",
      };
    } finally {
      setFetching(false);
      setChat([...chat, userMessage, botMessage]);
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

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background">
      <div className="flex flex-col w-full items-center py-2 justify-center gap-5">
        <h1 className="text-primary_text font-logo_text text-3xl font-medium">
          Ask your doubt!
        </h1>
      </div>

      <div className="flex-1 w-full px-4 lg:px-14 py-2 overflow-hidden">
        {/** The message section */}
        <div className="flex flex-col bg-shadow space-y-4 overflow-y-auto rounded-lg shadow-md h-full p-4">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg flex ${
                msg.sender === "user"
                  ? "bg-hover_highlight text-primary_text self-end"
                  : "bg-secondary_text  self-start"
              }`}
            >
              <div className="flex-1">
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
              {msg.sender === "bot" && (
                <button
                  onClick={() => copyToClipboard(msg.text)}
                  className="ml-2 text-gray-500 hover:text-gray-700 flex flex-col justify-start items-start"
                >
                  <FaRegCopy />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/** The input section */}
      <div className="w-full pl-14 pr-4 lg:px-14 py-2 bg-background">
        <div className="flex items-center gap-x-2">
          <input
            type="text"
            value={fetching ? "" : message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border rounded-lg text-black"
            placeholder={
              isListening
                ? "Listening..."
                : fetching
                ? "Wait until I can fetch my response for you :)"
                : "Start typing..."
            }
          />
          {fetching ? (
            <button className="p-2 bg-hover_highlight text-white-A700 rounded-full">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </button>
          ) : (
            <>
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2 ${
                  isListening ? "bg-red-500" : "bg-green-500"
                } text-white-A700 rounded-full`}
              >
                {isListening ? <IoMicOff /> : <IoMic />}
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-highlight hover:bg-hover_highlight text-white-A700 rounded-full"
              >
                <IoSendSharp />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
