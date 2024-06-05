import React from "react";
import Link from "next/link";
import Avatar from "../Avatar/Avatar";

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
  // Add more user objects as needed
];

const Sidebar = () => {
  return (
    <div className="w-full h-full bg-white">
      <div className="h-16 flex items-center">
        <h2 className="text-xl font-bold p-4 text-slate-800">Users</h2>
      </div>
      <div className="bg-slate-200 p-[0.5px]"></div>

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
            className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer"
          >
            <Avatar
              imageUrl={user.profile_pic}
              name={user.name}
              width={40}
              height={40}
            />
            <div>
              <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
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
