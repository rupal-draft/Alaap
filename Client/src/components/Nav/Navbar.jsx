"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/sociofyLogoTemp.png";
import { Img, Button, Text, Heading, Input } from "../../components";
import Link from "next/link";
import { Sidebar, sidebarClasses } from "react-pro-sidebar";

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
  { name: "Messages", path: "/messages", icon: <BsSendFill /> },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <IoIosNotifications />,
  },
];
export const navData1 = [
  { name: "Settings", path: "/settings", icon: <IoIosSettings /> },
  { name: "Logout", path: "/login", icon: <IoIosLogOut />, action: "logout" },
];

const Navbar = ({ open, setOpen }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`fixed lg:!sticky top-0 h-screen overflow-auto bg-background pt-0 flex flex-col items-center transition-width duration-700 border-r-[2px] border-[#31363F] ${
        open ? "w-[75px]" : "w-[0px]"
      }`}
    >
      {/*  */}

      <div className="flex flex-col items-center justify-center  gap-[50px]">
        <div className="w-[60px] pt-5 lg:w-[70px] ">
          <Image src={Logo} alt="Meow" className="rounded-full" />
        </div>

        <div className="mb-[15px] justify-center items-center flex flex-col gap-80 xl:gap-[25rem]">
          <div className="flex flex-col gap-8 items-center justify-center">
            {navData.map((link, index) => (
              <Link href={link.path} key={index} className="mx-2">
                <div className="flex flex-col items-center justify-center relative group w-full">
                  <div className="absolute top-[-32px] hidden group-hover:flex">
                    <div className="bg-highlight relative flex text-primary_text items-center p-[6px] rounded-[3px]">
                      <div className="text-[12px] leading-none font-semibold capitalize flex-grow text-center relative">
                        {link.name}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-t-[10px] border-t-highlight border-x-[8px] border-x-transparent"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-1 px-3 cursor-pointer rounded-lg text-2xl text-primary_text hover:text-highlight">
                    {link.icon}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-8 items-center justify-center">
            {navData1.map((link, index) => (
              <Link href={link.path} key={index} className="mx-2">
                <div
                  className="flex flex-col items-center justify-center relative group w-full"
                  onClick={link.action === "logout" ? handleLogout : undefined}
                >
                  <div className="absolute top-[-32px] hidden group-hover:flex">
                    <div className="bg-highlight relative flex text-primary_text items-center p-[6px] rounded-[3px]">
                      <div className="text-[12px] leading-none font-semibold capitalize flex-grow text-center relative">
                        {link.name}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-t-[10px] border-t-highlight border-x-[8px] border-x-transparent"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-1 px-3 cursor-pointer rounded-lg  text-2xl text-primary_text hover:text-highlight">
                    {link.icon}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* menu button */}
    </div>
  );
};

export default Navbar;
