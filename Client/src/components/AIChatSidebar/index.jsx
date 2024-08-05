import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { TbHistory, TbHistoryOff } from "react-icons/tb";

const AIChatSidebar = ({
  chatPages,
  currentChatId,
  setCurrentChatId,
  startNewChat,
  handleDeleteChat,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`fixed lg:relative z-40 top-0 h-full transition-width duration-700 ${
        sidebarOpen ? "w-[250px] lg:w-[300px]" : "w-[0px] lg:w-[300px]"
      }`}
    >
      <div className="w-full bg-gray-800 text-white h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Chat History</h2>
            <button
              onClick={() => startNewChat()}
              className="bg-hover_accent hover:bg-accent p-2 rounded-full"
            >
              <FaPlus />
            </button>
          </div>
          {chatPages.map((chatpage, index) => (
            <div
              key={index}
              className={`p-4 flex gap-2 items-center justify-between cursor-pointer border-b-2 border-shadow hover:bg-gray-700 ${
                chatpage._id === currentChatId ? "bg-gray-700" : ""
              }`}
            >
              <div
                className="w-full h-full"
                onClick={() => {
                  setCurrentChatId(chatpage._id);
                }}
              >
                {chatpage.messages.length > 0
                  ? chatpage.messages[0].message.slice(0, 25)
                  : "New Chat"}
              </div>
              <button onClick={() => handleDeleteChat(chatpage._id)}>
                <MdOutlineDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`lg:hidden fixed z-30 bottom-0 transition-all duration-700 ${
          sidebarOpen ? "right-0 px-2 py-1" : "right-0 px-2 py-1"
        }`}
      >
        <h1
          className="text-[1.6rem] bg-accent text-primary_text hover:bg-hover_accent p-2 rounded-lg font-semibold transition-transform duration-700"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          {sidebarOpen ? <TbHistoryOff /> : <TbHistory />}
        </h1>
      </div>
    </div>
  );
};

export default AIChatSidebar;
