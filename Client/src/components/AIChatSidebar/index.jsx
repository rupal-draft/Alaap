import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const AIChatSidebar = ({
    chatPages,
    currentChatId,
    setCurrentChatId,
    startNewChat,
    handleDeleteChat,
}) => {
    return (
        <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Chat History</h2>
                <button
                    onClick={() => startNewChat()}
                    className="bg-highlight hover:bg-hover_highlight p-2 rounded-full">
                    <FaPlus />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {chatPages.map((chatpage, index) => (
                    <div
                        key={index}
                        className={`p-4 flex gap-2 items-center justify-between cursor-pointer border-b-2 border-shadow hover:bg-gray-700 ${
                            chatpage._id === currentChatId ? "bg-gray-700" : ""
                        }`}>
                        <div className="w-full h-full"
                            onClick={() => {
                                setCurrentChatId(chatpage._id);
                            }}>
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
    );
};

export default AIChatSidebar;
