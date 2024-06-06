import React from "react";
import Link from "next/link";
import Avatar from "../Avatar/Avatar";
import { FaSearch } from "react-icons/fa";

const users = [
  {
    _id: "1",
    name: "John Doe",
    profile_pic: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    name: "Jane Smith",
    profile_pic: "https://via.placeholder.com/150",
  },
  {
    _id: "3",
    name: "Purnendu Sekhar Singha Roy yyyyyyyyyyyy",
    profile_pic: "https://via.placeholder.com/150",
  },
  // {
  //   _id: "1",
  //   name: "John Doe",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "2",
  //   name: "Jane Smith",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "3",
  //   name: "Purnendu Sekhar Singha Roy yyyyyyyyyyyy",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "1",
  //   name: "John Doe",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "2",
  //   name: "Jane Smith",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "3",
  //   name: "Purnendu Sekhar Singha Roy yyyyyyyyyyyy",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "1",
  //   name: "John Doe",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "2",
  //   name: "Jane Smith",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "3",
  //   name: "Purnendu Sekhar Singha Roy yyyyyyyyyyyy",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "1",
  //   name: "John Doe",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "2",
  //   name: "Jane Smith",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // {
  //   _id: "3",
  //   name: "Purnendu Sekhar Singha Roy yyyyyyyyyyyy",
  //   profile_pic: "https://via.placeholder.com/150",
  // },
  // Add more user objects as needed
];

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[20rem] bg-gray-800">
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

      <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
        {users.length === 0 && (
          <div className="mt-12">
            <p className="text-lg text-center text-slate-400">
              No users available.
            </p>
          </div>
        )}

        {users.map((user) => (
          <Link
            href={`/directmessage/${user._id}`}
            key={user._id}
            className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-red-500 cursor-pointer w-full"
          >
            <Avatar
              imageUrl={user.profile_pic}
              name={user.name}
              width={40}
              height={40}
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold text-base break-words">
                {user.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
