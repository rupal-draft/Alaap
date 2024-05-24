"use client";
import React, { useState, useEffect } from "react";
import { Img, Button, Text, Heading, Input } from "../../components";
import Link from "next/link";

// calling navbar
import Navbar from "../../components/Nav/Navbar";
// icons
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaCircleUser, FaFilter } from "react-icons/fa6";
import { BsSendFill, BsArrowLeftShort } from "react-icons/bs";
import { IoIosNotifications, IoIosSettings, IoIosLogOut } from "react-icons/io";
import PostCard from "../../components/postsCard";

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

export default function Home1Page() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full items-start justify-between gap-5 bg-[#dadada] ">
      {/* Nav bar */}
      <Navbar open={open} setOpen={setOpen} />
      <div
        className={`md:hidden fixed z-50 bottom-0 transition-all duration-700 ${
          open ? "left-[4.5rem] px-2 py-1" : "left-0 p-1"
        }`}
      >
        <h1
          className="text-2xl bg-gray-50 p-2 rounded-xl font-semibold transition-transform duration-700"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
        </h1>
      </div>

      {/* main screen */}
      <div className="flex w-[100%] items-center justify-center gap-[30px] self-end md:w-full md:flex-col mr-5 ">
        <div className="mt-7 w-[80%] flex flex-1 flex-col gap-10 ">
          {/* search bar */}
          <div className="flex items-center justify-center gap-[13px] h-10 lg:h-12  rounded-[12px] bg-[#cdcdcd] p-3">
            <Input
              size="sm"
              shape="square"
              name="search"
              placeholder={`Search in social…`}
              prefix={
                <Img
                  src="img_rewind.svg"
                  width={18}
                  height={18}
                  alt="rewind"
                  className="h-[18px] w-[18px] cursor-pointer"
                />
              }
              className="flex-grow gap-[15px] md:p-5 "
            />
            <Heading size="s" as="h1" className="text-[1.5rem] !text-gray-500">
              <Link href="\">
                <div className="flex flex-col items-center justify-center relative group w-full">
                  <div className="absolute top-[-35px] hidden group-hover:flex">
                    <div className="bg-[#000] relative flex text-[#fff] items-center p-[6px] rounded-[3px]">
                      {/* names */}
                      <div className="text-[12px] leading-none font-semibold capitalize flex-grow text-center relative">
                        Filter
                        {/* triangle */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-t-[10px] border-t-black border-x-[8px] border-x-transparent "></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center cursor-pointer rounded-lg  text-2xl text-[#fff]">
                    <FaFilter />
                  </div>
                </div>
              </Link>
            </Heading>
          </div>

            {/* Posts */}
            <div className="flex w-full flex-col gap-[30px]">
              <div className="flex flex-col w-full  gap-[7px] rounded-[12px] bg-white-A700  p-5">
                <div className="flex items-start gap-[5px]">
                  <Link href="/myprofile">
                    <Img
                      src="img_avatar.png"
                      width={80}
                      height={80}
                      alt="avatar"
                      className="h-[80px] w-[80px] cursor-pointer rounded-[12px] object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 rounded-[19px] bg-white-A700 ">
                    <textarea
                      placeholder={`What are you thinking…`}
                      className=" !text-gray-500 text-base w-full h-[150px] pt-1 pl-1 border-x rounded-lg border-gray-500 focus:border-gray-500  outline-none  transition-all resize-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-x-10">
                  <div className="flex gap-2.5 self-end">
                    <Button className="w-[28px] rounded-lg">
                      <Img src="img_camera.svg" width={28} height={28} />
                    </Button>
                    <Button className="w-[28px] rounded-lg">
                      <Img src="img_upload.svg" width={28} height={28} />
                    </Button>
                    <Button className="w-[28px] rounded-lg">
                      <Img src="img_plus.svg" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex items-center  cursor-pointer">
                    {/* <Text as="p">Share</Text> */}
                    <Img
                      src="img_question.svg"
                      width={14}
                      height={14}
                      alt="question"
                      className="h-[14px] w-[14px]"
                    />
                  </div>
                </div>
              </div>
              <PostCard/>
            </div>
        </div>

        {/* unused portion */}
        {/* <div className="flex w-[36%] items-center justify-center gap-2.5 overflow-auto pl-[5px] md:w-full sm:flex-col">
          <Img
            src="img_indicator_gray_500.svg"
            width={5}
            height={128}
            alt="indicator"
            className="h-[128px] w-[5px] rounded-sm sm:w-full"
          />
           <div className="flex w-full items-start justify-center sm:w-full">
             <div className="flex flex-1 flex-col items-center gap-[46px] rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 p-[30px] sm:p-5">
              <div className="mr-2.5 mt-[15px] flex gap-5 self-end md:mr-0">
                <Button
                  size="6xl"
                  shape="round"
                  className="min-w-[48px] font-sfprodisplay font-bold"
                >
                  1
                </Button>
                <Img
                  src="img_avatar_48x48.png"
                  width={48}
                  height={48}
                  alt="avatar"
                  className="h-[48px] w-[48px] rounded-[12px] object-cover"
                />
              </div>
               <div className="flex flex-col gap-[60px] self-stretch sm:gap-[30px]">
                <div className="flex flex-col items-start gap-[41px]">
                  <a
                    href="https://www.youtube.com/embed/bv8Fxk0sz7I"
                    target="_blank"
                  >
                    <Heading size="xl" as="h2">
                      Featured Stories
                    </Heading>
                  </a>
                  <div className="flex gap-5 self-stretch md:flex-row">
                    {data.map((d, index) => (
                      <div
                        key={"list" + index}
                        className="blue_A700_light_blue_200_border flex flex-col items-center justify-center rounded-[12px] border-2 border-solid"
                      >
                        <Img
                          src={d.imageone}
                          width={40}
                          height={40}
                          alt="image"
                          className="h-[40px] w-[40px] rounded-[9px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-[41px]">
                  <Heading size="xl" as="h3">
                    Who to Follow
                  </Heading>
                  <div className="flex flex-col gap-[30px] self-stretch">
                    <div className="flex flex-1 items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar.png"
                          width={38}
                          height={38}
                          alt="cammy_hedling"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="h4">Cammy Hedling</Heading>
                          <Text size="s" as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img
                          src="img_settings_white_a700.svg"
                          width={28}
                          height={28}
                        />
                      </Button>
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_38x38.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="h5">Cammy Hedling</Heading>
                          <Text size="s" as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img
                          src="img_settings_white_a700.svg"
                          width={28}
                          height={28}
                        />
                      </Button>
                    </div>
                    <div className="flex flex-1 items-center">
                      <Img
                        src="img_avatar_1.png"
                        width={38}
                        height={38}
                        alt="avatar"
                        className="h-[38px] w-[38px] rounded-[12px] object-cover"
                      />
                      <div className="ml-2.5 flex flex-col items-start gap-[3px]">
                        <Heading as="h6">Cammy Hedling</Heading>
                        <Text size="s" as="p" className="!text-white-A700">
                          Los Angeles, CA
                        </Text>
                      </div>
                      <Button className="ml-[30px] w-[28px] self-end rounded-lg">
                        <Img
                          src="img_settings_white_a700.svg"
                          width={28}
                          height={28}
                        />
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    shape="square"
                    rightIcon={
                      <Img
                        src="img_arrowright_gray_500.svg"
                        width={18}
                        height={18}
                        alt="arrow_right"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    className="min-w-[90px] gap-1 font-bold uppercase tracking-[1.00px] text-gray-500"
                  >
                    See more
                  </Button>
                </div>
                <div className="flex flex-col items-start justify-center gap-[39px]">
                  <Heading size="xl" as="h5">
                    Trend Topics
                  </Heading>
                  <div className="flex flex-col gap-[30px] self-stretch">
                    {data1.map((d, index) => (
                      <div
                        key={"listusername" + index}
                        className="flex flex-1 items-center justify-between gap-5"
                      >
                        <div className="flex items-center gap-2.5">
                          <Button
                            size="2xl"
                            shape="round"
                            className="min-w-[38px] font-sfprodisplay font-bold"
                          >
                            {d.one}
                          </Button>
                          <Text as="p" className="!text-white-A700">
                            MadeInAmerica
                          </Text>
                        </div>
                        <Button className="w-[28px] rounded-lg">
                          <Img
                            src="img_checkmark_white_a700.svg"
                            width={28}
                            height={28}
                          />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div> 
            </div> 
            <div className="relative ml-[-15px] mt-52 flex flex-col">
              <div className="blue_A700_light_blue_200_border flex flex-col items-center justify-center rounded-[12px] border-2 border-solid">
                <Img
                  src="img_image_7.png"
                  width={40}
                  height={40}
                  alt="imageteen"
                  className="h-[40px] w-[40px] rounded-[9px] object-cover"
                />
              </div>
            </div>
          </div> 
        </div> */}
      </div>
    </div>
  );
}
