"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/ed.webp";
import { Img, Button, Text, Heading, Input } from "../../components";
import Link from "next/link";
import { Sidebar, sidebarClasses } from "react-pro-sidebar";

// icons
import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { BsSendFill, BsArrowLeftShort } from "react-icons/bs";
import { IoIosNotifications, IoIosSettings, IoIosLogOut } from "react-icons/io";

// data for navbar
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
  { name: "Logout", path: "/", icon: <IoIosLogOut /> },
];

const Navbar = ({ open, setOpen }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}

  return (
    <div
      className={`!sticky top-0 h-screen overflow-auto bg-[#cdcdcd] pt-0 flex flex-col items-center transition-width duration-700 ${
        open ? "w-[110px]" : "w-[0px]"
      }`}
    >
      {/*  */}

      <div className="flex flex-col items-center justify-center pt-5 gap-[50px]">
        <div className="w-[60px] lg:w-[70px] ">
          <Image src={Logo} alt="Meow" className="rounded-xl" />
        </div>

        <div className="mb-[15px] justify-center items-center flex flex-col gap-80">
          <div className="flex flex-col gap-8 items-center justify-center">
            {navData.map((link, index) => (
              <Link href={link.path} key={index} className="mx-2">
                <div className="flex flex-col items-center justify-center relative group w-full">
                  <div className="absolute top-[-32px] hidden group-hover:flex">
                    <div className="bg-[#000] relative flex text-[#fff] items-center p-[6px] rounded-[3px]">
                      <div className="text-[12px] leading-none font-semibold capitalize flex-grow text-center relative">
                        {link.name}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-t-[10px] border-t-black border-x-[8px] border-x-transparent"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-1 px-3 cursor-pointer rounded-lg hover:bg-black text-2xl text-[#fff]">
                    {link.icon}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-8 items-center justify-center">
            {navData1.map((link, index) => (
              <Link href={link.path} key={index} className="mx-2">
                <div className="flex flex-col items-center justify-center relative group w-full">
                  <div className="absolute top-[-32px] hidden group-hover:flex">
                    <div className="bg-[#000] relative flex text-[#fff] items-center p-[6px] rounded-[3px]">
                      <div className="text-[12px] leading-none font-semibold capitalize flex-grow text-center relative">
                        {link.name}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-t-[10px] border-t-black border-x-[8px] border-x-transparent"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-1 px-3 cursor-pointer rounded-lg hover:bg-black text-2xl text-[#fff]">
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
