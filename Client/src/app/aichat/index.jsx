"use client";
import Navbar from "@/components/Nav/Navbar";
import React, { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";

export default function AIChatPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

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

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FASTAPI_SERVER_URL}/chat`,
        { message }
      );
      const data = await response.json();
      const botMessage = { sender: "bot", text: data.response };
      setChat([...chat, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setMessage("");
  };

  return (
    <div className="flex w-full h-full min-h-screen bg-background">
      <Navbar open={open} setOpen={setOpen} />
      <div className="w-full p-14 bg-white rounded-lg justify-between shadow-md">
        {/** The message section */}
        <div className="flex flex-col space-y-4 h-[80vh] overflow-y-scroll mb-4">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/** The input section */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Start typing..."
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-highlight hover:bg-hover_highlight text-white-A700 rounded-full"
          >
            <IoSendSharp />
          </button>
        </div>
      </div>
    </div>
  );
}
