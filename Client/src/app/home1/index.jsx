"use client";
import React, { useState, useEffect } from "react";
import { Img, Button, Text, Heading, Input } from "../../components";
import Link from "next/link";

// calling navbar
import Navbar from "../../components/Nav/Navbar";
// icons
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

export default function Home1Page() {
  const [collapsed, setCollapsed] = React.useState(false);

  const [open, setOpen] = useState(true);

  // for mobile screen navbar
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
      <div className="flex w-[100%] items-start justify-center gap-[30px] self-end md:w-full md:flex-col mr-5 ">
        <div className="mt-7  flex flex-1 flex-col gap-10 ">
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

          <div className="flex flex-col lg:flex-row items-start gap-[30px]  mb-10">
            {/* left column */}
            <div className="flex w-full flex-col gap-[30px]">
              <div className="flex flex-col w-full  gap-[7px] rounded-[12px] bg-white-A700  p-5">
                <div className="flex items-start gap-[5px]">
                  <Link href="/myprofile">
                    <Img
                      src="img_avatar.png"
                      width={80}
                      height={80}
                      alt="avatar"
                      className="md:h-[80px] h-[50px] w-[50px] md:w-[80px] cursor-pointer rounded-[12px] object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 rounded-[19px] bg-white-A700 ">
                    <textarea
                      placeholder={`What are you thinking…`}
                      className=" !text-gray-500 text-sm md:text-base w-full h-[100px] md:h-[150px] pt-1 pl-1 border-x rounded-lg border-gray-500 focus:border-gray-500  outline-none  transition-all resize-none"
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
              <div className="flex flex-col gap-[30px] rounded-[12px] bg-white-A700 p-5">
                <div className="flex  items-center justify-between gap-5 pr-2.5 w-full">
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
                <div className="flex flex-col justify-center gap-5 w-full">
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
                    {/* <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full justify-center rounded-lg bg-gray-900_66 px-14 py-[71px] md:p-5">
                      <Button size="3xl" shape="round" className="w-[38px]">
                        <Img src="img_contrast.svg" width={38} height={38} />
                      </Button>
                    </div> */}
                  </div>
                </div>
                <div className="flex  justify-between gap-5 w-full">
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
                <div className="flex  items-center justify-center gap-[15px] rounded border-2 border-solid border-gray-500_33 p-[11px] w-full">
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
                <div className="flex flex-col gap-2.5 w-full">
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
                <div className="flex flex-col gap-[33px] w-full">
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
            </div>
            {/* right column */}
            <div className="flex w-full flex-col gap-[30px]">
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
              </div>

              <div className="flex flex-col items-center justify-center gap-[30px] rounded-[12px] bg-white-A700 p-5">
                <div className="mt-[7px] flex flex-col gap-[31px] self-stretch">
                  <div className="flex items-center justify-between gap-5 pr-2.5">
                    <div className="flex items-center gap-2.5">
                      <Img
                        src="img_image_1.png"
                        width={48}
                        height={48}
                        alt="image"
                        className="h-[48px] w-[48px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-col items-start gap-[5px]">
                        <Heading as="h6" className="!text-gray-900">
                          Dustin Houston
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
                  <div className="flex flex-col items-start gap-[26px]">
                    <Text as="p" className="ml-[7px] !text-gray-500 md:ml-0">
                      Whether its a driving tour 😂
                    </Text>
                    <div className="self-stretch">
                      <div className="flex gap-2.5">
                        <Img
                          src="img_image_160x200.png"
                          width={200}
                          height={160}
                          alt="image_eleven"
                          className="h-[160px] w-[71%] rounded-lg object-cover"
                        />
                        <div className="flex w-[29%] flex-col gap-2.5">
                          <Img
                            src="img_image_75x80.png"
                            width={80}
                            height={75}
                            alt="image_thirteen"
                            className="h-[75px] rounded-lg object-cover"
                          />
                          <div className="relative h-[75px] md:h-auto">
                            <Img
                              src="img_image_2.png"
                              width={80}
                              height={75}
                              alt="image_fifteen"
                              className="h-[75px] w-full rounded-lg object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-max items-center gap-1.5 p-1.5">
                              <Img
                                src="img_camera_white_a700.svg"
                                width={14}
                                height={14}
                                alt="camera"
                                className="h-[14px] w-[14px]"
                              />
                              <Text
                                as="p"
                                className="!font-sfprodisplay !text-white-A700"
                              >
                                17
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3 flex w-[90%] justify-between gap-5 md:w-full">
                  <div className="flex flex-wrap items-center">
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
                    <Img
                      src="img_instagram.svg"
                      width={14}
                      height={14}
                      alt="instagram"
                      className="ml-[27px] h-[14px] w-[14px]"
                    />
                    <Text as="p" className="ml-1.5">
                      148
                    </Text>
                  </div>
                  <div className="flex items-center cursor-pointer">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
