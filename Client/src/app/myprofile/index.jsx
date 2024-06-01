"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/images/ed.webp";

import { Img, Heading, Text, Button, Input } from "../../components";
import Link from "next/link";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { FaFilter } from "react-icons/fa6";

import Navbar from "@/components/Nav/Navbar";
import Posts, { Post } from "@/components/Postcard/Posts";

const data = [
  {
    title: "Tropical Fresh Tourism Is Back In Full Swing In ",
    image: "img_image_69x120.png",
  },
  {
    title: "How Timberland created the visual campaign of the ",
    image: "img_image_26.png",
  },
  {
    title: "Take your mobile photography to the next ",
    image: "img_image_38.png",
  },
];
const data1 = [
  { imageone: "img_image_221x221.png" },
  { imageone: "img_image_39.png" },
  { imageone: "img_image_40.png" },
  { imageone: "img_image_41.png" },
  { imageone: "img_image_42.png" },
  { imageone: "img_image_43.png" },
  { imageone: "img_image_44.png" },
  { imageone: "img_image_45.png" },
];
const data2 = [
  {
    avatarone: "ed.png",
    avatarthree: "img_avatar_55.png",
    avatarfive: "img_avatar_56.png",
    avatarseven: "img_avatar_57.png",
  },
  {
    avatarone: "img_avatar_59.png",
    avatarthree: "img_avatar_60.png",
    avatarfive: "img_avatar_61.png",
    avatarseven: "img_avatar_62.png",
  },
  {
    avatarone: "img_avatar_64.png",
    avatarthree: "img_avatar_65.png",
    avatarfive: "img_avatar_66.png",
    avatarseven: "img_avatar_67.png",
  },
  {
    avatarone: "img_avatar_64.png",
    avatarthree: "img_avatar_65.png",
    avatarfive: "img_avatar_66.png",
    avatarseven: "img_avatar_67.png",
  },
];

export default function MyProfilePage() {
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

    // Set initial state based on screen size
    handleResize();

    // Update state on resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-start justify-center gap-5 bg-[#dadada] ">
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

      <div className="flex items-center justify-center gap-5 md:w-full flex-col md:py-2 mr-5">
        <div className="mt-6 flex flex-col gap-10 ">
          {/* Search bar */}

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

          {/* rest contents */}

          <div className="flex flex-row items-start justify-center gap-x-10 bg-gray-100 ">
            <div className="flex  items-center  bg-orange-400 justify-center gap-2.5 w-full">
              <div className="flex flex-col  items-start gap-[0px]  rounded-xl p-[38px]   sm:p-7">
                {/* 1st part */}
                <div className="flex flex-row items-start justify-center self-stretch gap-5">
                  <div className="flex w-2/3 flex-col items-center justify-center self-stretch ">
                    <div className="w-[60px] lg:w-[8rem] ">
                      <Image src={Logo} alt="Meow" className="rounded-xl" />
                    </div>
                    <h1 className="!text-white-A700 text-xl pt-1 font-bold text-center">
                      Rupal Paul
                    </h1>
                    <p className="!font-normal text-center">@rupalpaul</p>
                    <div className="py-2">
                      <div className="flex gap-x-3 text-sm justify-center">
                        <h1 className="!text-white-A700 text-center">
                          518 Posts
                        </h1>
                        <h1 className="!text-white-A700 text-center">
                          22k+ Friends
                        </h1>
                      </div>
                    </div>
                    <button className="cursor-pointer px-4 py-1 shadow-sm rounded-md border border-solid font-semibold w-[8.8rem] ml-0 my-2 md:my-0 duration-500 transition-transform hover:scale-105 transform-cpu">
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  <div className=" flex flex-col self-stretch">
                    <h1 className="uppercase text-2xl font-extrabold tracking-[1.00px] !text-white-A700">
                      About Me
                    </h1>
                    <div className="w-full !font-normal border rounded-tl-none rounded-xl px-1 py-2  !text-white-A700_cc">
                      <p className="leading-[1.1rem]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </p>
                    </div>
                  </div>
                </div>
                {/* 2nd part */}
                <div className="my-[10px] flex flex-col items-center justify-center self-stretch gap-5">
                  <h1 className="!text-white-A700 uppercase text-2xl font-extrabold">
                    Friends
                  </h1>
                  <div className="flex flex-col gap-[15px] items-center self-stretch">
                    {data2.map((d, index) => (
                      <div
                        key={"listavatarone" + index}
                        className="flex gap-[25px]"
                      >
                        <Img
                          src={d.avatarone}
                          width={110}
                          height={110}
                          alt="Meow"
                          className="rounded-2xl cursor-pointer object-cover"
                        />
                        <Img
                          src={d.avatarthree}
                          width={110}
                          height={110}
                          alt="avatar"
                          className="rounded-2xl cursor-pointer object-cover"
                        />
                        <Img
                          src={d.avatarfive}
                          width={110}
                          height={110}
                          alt="avatar"
                          className="rounded-2xl cursor-pointer object-cover"
                        />
                        <Img
                          src={d.avatarseven}
                          width={110}
                          height={110}
                          alt="avatar"
                          className="rounded-2xl cursor-pointer object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* 3rd part */}
                <div className="my-[10px] flex flex-col items-center justify-center self-stretch gap-5">
                  <h1 className="!text-white-A700 uppercase text-2xl font-extrabold">
                    Photos
                  </h1>{" "}
                  <div className="flex flex-col items-start justify-center gap-[30px] rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
                    <div className="flex flex-col items-start gap-[30px] self-stretch">
                      <div
                        className="grid grid-cols-3 gap-2.5 self-stretch md:grid-cols-2 sm:grid-cols-1"
                        style={{
                          gridTemplateRows: `repeat(${Math.ceil(
                            data1.length / 3
                          )}, minmax(0, 1fr))`,
                        }}
                      >
                        {data1.map((d, index) => (
                          <Img
                            key={"myprofile" + index}
                            src="img_image_221x221.png"
                            width={130}
                            height={130}
                            alt="image"
                            className="h-[130px] w-[240px] rounded-[12px] object-cover md:h-auto"
                          />
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        color="undefined_undefined"
                        rightIcon={
                          <Img
                            src="img_arrowright_gray_900.svg"
                            width={14}
                            height={14}
                            alt="arrow_right"
                            className="h-[14px] w-[14px]"
                          />
                        }
                        className="min-w-[97px] gap-[-3px] rounded font-medium"
                      >
                        See more
                      </Button>
                    </div>
                  </div>
                </div>{" "}
                {/* 4th part */}
                <div className="my-[10px] flex flex-col items-center justify-center self-stretch gap-5">
                  <h1 className="!text-white-A700 uppercase text-2xl font-extrabold">
                    Videos
                  </h1>{" "}
                  <div className="flex flex-col items-start justify-center gap-[30px] rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
                    <div className="flex flex-col gap-[30px] self-stretch">
                      {data.map((d, index) => (
                        <div
                          key={"listtitle" + index}
                          className="flex flex-1 items-center gap-2.5"
                        >
                          <div className="flex w-[39%]">
                            <div className="w-full">
                              <Img
                                src={d.image}
                                width={120}
                                height={69}
                                alt="image"
                                className="h-[69px] w-full rounded-lg object-cover md:h-auto"
                              />
                              <div className="relative mt-[-69px] flex justify-center rounded-lg bg-gray-900_66 p-[25px] sm:p-5">
                                <Img
                                  src="img_contrast.svg"
                                  width={18}
                                  height={18}
                                  alt="image"
                                  className="h-[18px] w-[18px] self-end"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col items-start justify-center gap-2">
                            <Heading
                              size="md"
                              as="p"
                              className="w-full leading-5 text-black"
                            >
                              {d.title}
                            </Heading>
                            <Text as="p" className="!font-normal">
                              2 days ago
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Post />
            {/* <div className="flex w-full flex-col gap-[30px] bg-yellow-600 rounded-xl md:p-5">
              <div className="flex flex-col gap-[30px] rounded-[12px] bg-white-A700 p-5">
                <div className="flex w-[88%] items-center justify-between gap-5 pr-2.5 md:w-full">
                  <div className="flex w-[51%] items-center  gap-2.5">
                    <Img
                      src="img_image.png"
                      width={48}
                      height={48}
                      alt="image"
                      className="h-[48px] w-[48px] rounded-[12px] object-cover"
                    />
                    <div className="flex flex-col items-start gap-1">
                      <Heading as="h2" className="!text-gray-900">
                        Edward Ford
                      </Heading>
                      <Text size="s" as="p" className="!text-gray-500">
                        5min ago
                      </Text>
                    </div>
                  </div>
                  <Img
                    src="img_notification.svg"
                    width={18}
                    height={18}
                    alt="notification"
                    className="h-[18px] w-[18px]"
                  />
                </div>
                <div className="flex w-[88%] flex-col justify-center gap-5 md:w-full">
                  <Text as="p" className="!text-gray-500">
                    Tourism Is Back In Full Swing In Cancun Mexico
                  </Text>
                  <div className="relative h-[180px] md:h-auto">
                    <Img
                      src="img_image_180x320.png"
                      width={320}
                      height={180}
                      alt="image"
                      className="h-[180px] w-full rounded-lg object-cover"
                    />
                    
                  </div>
                </div>
                <div className="flex w-[88%] justify-between gap-5 md:w-full">
                  <div className="flex gap-2.5">
                    <div className="flex items-center p-1.5">
                      <Img
                        src="img_favorite.svg"
                        width={14}
                        height={14}
                        alt="favorite"
                        className="h-[14px] w-[14px]"
                      />
                      <Text as="p" className="ml-[5px]">
                        326
                      </Text>
                    </div>
                    <div className="flex items-center gap-1.5 p-[5px]">
                      <Img
                        src="img_instagram.svg"
                        width={14}
                        height={14}
                        alt="instagram"
                        className="h-[14px] w-[14px]"
                      />
                      <Text as="p">148</Text>
                    </div>
                  </div>
                  <div className="flex items-center  cursor-pointer">
                    <Img
                      src="img_question.svg"
                      width={14}
                      height={14}
                      alt="question"
                      className="h-[14px] w-[14px]"
                    />
                  </div>
                </div>
                <div className="flex w-[88%] items-center justify-center gap-[15px] rounded border-2 border-solid border-gray-500_33 p-[11px] md:w-full">
                  <Input
                    size="xs"
                    shape="square"
                    name="comment"
                    placeholder={`Write a comment…`}
                    suffix={
                      <Img
                        src="img_settings.svg"
                        width={14}
                        height={14}
                        alt="settings"
                        className="h-[14px] w-[14px]"
                      />
                    }
                    className="flex-grow gap-3"
                  />
                  <Img
                    src="img_save.svg"
                    width={14}
                    height={14}
                    alt="save"
                    className="h-[14px] w-[14px]"
                  />
                </div>
                <div className="flex w-[88%] flex-col gap-2.5 md:w-full">
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center gap-[5px]">
                      <Img
                        src="img_avatar_28x28.png"
                        width={28}
                        height={28}
                        alt="avatar"
                        className="h-[28px] w-[28px] rounded-lg object-cover"
                      />
                      <Text as="p" className="self-end">
                        Billy Green
                      </Text>
                    </div>
                    <Text
                      size="s"
                      as="p"
                      className="mb-[5px] self-end !text-gray-500"
                    >
                      20min ago
                    </Text>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2.5">
                      <Text
                        as="p"
                        className="!font-normal leading-[22px] !text-gray-500"
                      >
                        Awesome Edward, remeber that five tips for low cost
                        holidays I sent you?
                      </Text>
                      <div className="flex gap-[15px]">
                        <Img
                          src="img_favorite_red_a200.svg"
                          width={14}
                          height={14}
                          alt="favorite"
                          className="h-[14px] w-[14px]"
                        />
                        <Img
                          src="img_instagram.svg"
                          width={14}
                          height={14}
                          alt="instagram"
                          className="h-[14px] w-[14px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[88%] flex-col gap-[33px] md:w-full">
                  <div className="flex flex-col gap-[13px]">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-[5px]">
                        <Img
                          src="img_avatar_28x28.png"
                          width={28}
                          height={28}
                          alt="avatar"
                          className="h-[28px] w-[28px] rounded-lg object-cover"
                        />
                        <Text as="p" className="self-end">
                          Billy Green
                        </Text>
                      </div>
                      <Text
                        size="s"
                        as="p"
                        className="mb-[5px] self-end !text-gray-500"
                      >
                        20min ago
                      </Text>
                    </div>
                    <Text as="p" className="!font-normal !text-gray-500">
                      Awesome Edward, remeber that five tips for low cost
                      holidays I sent you?
                    </Text>
                  </div>
                  <div className="flex gap-[15px]">
                    <Img
                      src="img_favorite_red_a200.svg"
                      width={14}
                      height={14}
                      alt="favorite"
                      className="h-[14px] w-[14px]"
                    />
                    <Img
                      src="img_instagram.svg"
                      width={14}
                      height={14}
                      alt="instagram"
                      className="h-[14px] w-[14px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[30px] rounded-[12px] bg-white-A700 p-5">
                <div className="flex items-center justify-between gap-5 pr-2.5">
                  <div className="flex w-[68%] items-center  gap-2.5">
                    <Img
                      src="img_image_48x48.png"
                      width={48}
                      height={48}
                      alt="image"
                      className="h-[48px] w-[48px] rounded-[12px] object-cover"
                    />
                    <div className="flex flex-col items-start gap-[5px]">
                      <Heading as="h3" className="!text-gray-900">
                        Katherine Cole
                      </Heading>
                      <Text size="s" as="p" className="!text-gray-500">
                        5min ago
                      </Text>
                    </div>
                  </div>
                  <Img
                    src="img_notification.svg"
                    width={18}
                    height={18}
                    alt="notification"
                    className="h-[18px] w-[18px]"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-start justify-center">
                    <Img
                      src="img_image_150x290.png"
                      width={290}
                      height={150}
                      alt="image"
                      className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                    />
                    <div className="mt-5 flex flex-col gap-[15px] self-stretch">
                      <Heading
                        size="lg"
                        as="h4"
                        className="leading-[22px] !text-gray-900"
                      >
                        The Best Fashion Instagrams of the Week: Céline Dion,
                        Lizzo, and More
                      </Heading>
                      <Text as="p" className="leading-5 !text-gray-500">
                        If you are looking for a break from the cold, take a cue
                        from Lizzo: This week, the singer headed to Disneyland
                        in warm and sunny California.
                      </Text>
                    </div>
                    <Link href="#" className="mt-[11px]">
                      <Heading
                        size="s"
                        as="h5"
                        className="uppercase tracking-[1.00px] !text-indigo-A200"
                      >
                        Read More
                      </Heading>
                    </Link>
                  </div>
                  <div className="flex justify-between gap-5">
                    <div className="flex items-center gap-[15px]">
                      <div className="flex items-center p-1.5">
                        <Img
                          src="img_favorite.svg"
                          width={14}
                          height={14}
                          alt="favorite"
                          className="h-[14px] w-[14px]"
                        />
                        <Text as="p" className="ml-[5px]">
                          326
                        </Text>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Img
                          src="img_instagram.svg"
                          width={14}
                          height={14}
                          alt="instagram"
                          className="h-[14px] w-[14px]"
                        />
                        <Text as="p">148</Text>
                      </div>
                    </div>
                    <div className="flex items-center p-1.5 cursor-pointer">
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
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
