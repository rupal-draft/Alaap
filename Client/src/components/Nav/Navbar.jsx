"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/images/sociofyLogoTemp.png";
import { Img, Button, Text, Heading, Input } from "../../components";
import Link from "next/link";
import { Sidebar, sidebarClasses } from "react-pro-sidebar";
import Popup from "./Popup";

import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { BsSendFill, BsArrowLeftShort } from "react-icons/bs";
import { IoIosNotifications, IoIosSettings, IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "@/Context/Slices/authSlice";

export const navData = [
  { name: "Home", path: "/home1", icon: <FaHome /> },
  { name: "Profile", path: "/myprofile", icon: <FaCircleUser /> },
  { name: "Friends", path: "/myfriends", icon: <FaUserFriends /> },
  {
    name: "Notifications",
    path: "",
    icon: <IoIosNotifications />,
  },
  { name: "Messages", path: "/messages", icon: <BsSendFill /> },
];
export const navData1 = [
  { name: "Settings", path: "/settings", icon: <IoIosSettings /> },
  { name: "Logout", path: "/login", icon: <IoIosLogOut />, action: "logout" },
];

const Navbar = ({ open, setOpen, socket, myId }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    if (socket && myId) socket.current.emit("logout", myId);
  };

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const notificationRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (notificationRef.current) {
      const rect = notificationRef.current.getBoundingClientRect();
      setPopupPosition({ top: rect.top + 10, left: rect.right + 10 });
    }
  }, [isOpenPopup]);

  const handleIconClick = (link) => {
    if (link.name === "Notifications") {
      setIsOpenPopup(!isOpenPopup);
    }
  };

  return (
    <div
      className={`fixed z-50 lg:!sticky top-0 h-screen self-stretch overflow-auto bg-background pt-0 flex flex-col items-center transition-width duration-700 border-r-[2px] border-[#31363F] ${
        open ? "w-[80px]" : "w-[0px]"
      }`}
    >
      {/* Logo */}
      <div className="w-[60px] py-5 lg:w-[70px]">
        <Image src={Logo} alt="Meow" className="rounded-full" />
      </div>

      {/* Other buttons */}
      <div className="flex flex-col gap-6 items-center justify-center my-3">
        {navData.map((link, index) => (
          <div key={index} className="mx-2">
            <Link
              href={link.path}
              onClick={() => handleIconClick(link)}
              className="flex flex-col items-center justify-center relative group w-full"
              ref={link.name === "Notifications" ? notificationRef : null}
            >
              <div className="flex items-center justify-center py-1 px-3 cursor-pointer rounded-lg text-2xl text-primary_text hover:text-highlight">
                {link.icon}
              </div>
            </Link>
            {link.name === "Notifications" && isOpenPopup && (
              <Popup setIsOpenPopup={setIsOpenPopup} position={popupPosition} />
            )}
          </div>
        ))}
      </div>

      {/* Settings and Log Out buttons */}
      <div className="flex flex-col gap-6 items-center justify-center mt-auto my-3">
        {navData1.map((link, index) => (
          <Link href={link.path} key={index} className="mx-2">
            <div
              className="flex flex-col items-center justify-center relative group w-full"
              onClick={link.action === "logout" ? handleLogout : undefined}
            >
              <div className="flex items-center justify-center py-1 px-3 cursor-pointer rounded-lg text-2xl text-primary_text hover:text-highlight">
                {link.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
