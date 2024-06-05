"use client";
import React, { useState, useEffect, useRef } from "react";
import MessageLayout from "@/components/Layouts/MessageLayout";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";

const DynamicPage = ({ params }) => {
  const { id } = params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: "You" },
      ]);
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <MessageLayout>
      <div className="flex flex-col h-full w-full border-4 border-white-A700">
        {/* individual message box header */}
        <Link
          href="/"
          className="flex items-center gap-2 py-3 px-2 border-b cursor-pointer w-full"
        >
          <Avatar
            imageUrl="https://via.placeholder.com/150"
            name="Pratik Biswas"
            width={40}
            height={40}
          />
          <div className="flex-1">
            <h3 className="text-white-A700 font-semibold text-base break-words">
              Pratik Biswas
            </h3>
          </div>
        </Link>

        {/* show messages */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col-reverse">
          <div ref={messagesEndRef} />
          {messages
            .slice()
            .reverse()
            .map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded break-words ${
                  message.sender === "You" ? "bg-blue-500" : "bg-gray-500"
                } text-white `}
              >
                <span>{message.sender}: </span>
                {message.text}
              </div>
            ))}
        </div>

        {/* write message */}
        <div className="flex items-center gap-2 p-2 w-full border-t">
          <input
            type="text"
            placeholder="Write your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full py-2 px-3 bg-[#cdcdcd] rounded-xl text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
          />
          <button
            onClick={handleSendMessage}
            className="py-2 px-4 bg-blue-500 text-white rounded-xl focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </MessageLayout>
  );
};

export default DynamicPage;
