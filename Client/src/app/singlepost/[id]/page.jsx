"use client";
import { React, useEffect, useState } from "react";
import { Input, Img, Text, Heading, Button } from "./../../../components";
import Link from "next/link";
import Navbar from "@/components/Nav/Navbar";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import api from "@/utils/axios";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";

export default function SinglePostPage({ params }) {
  const [post, setPost] = useState({});
  const [open, setOpen] = useState(true);
  const { id } = params;
  useEffect(() => {
    loadPost();
  }, []);
  const loadPost = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user-post/${id}`
    );
    setPost(data);
  };
  function formatDateTime(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  }
  const formattedDate = post.createdAt ? formatDateTime(post.createdAt) : "";

  return (
    <div className="w-full bg-gray-100">
      {/* {JSON.stringify(post, null, 4)} */}
      <div className="flex gap-[15px]">
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

        {/**Main post */}
        <div className="flex flex-1 items-center bg-white-A700 pl-10 pt-10 md:self-stretch md:p-5 sm:pl-5 sm:pt-5">
          <div className="flex flex-col md:flex-row w-full md:w-[97%] items-start justify-between gap-5">
            <div className="mt-10 flex w-[60%] md:w-full flex-col gap-10">
              <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
                <div className="flex items-center gap-2.5 pr-[5px]">
                  {post.postedBy?.photo ? (
                    <img
                      src={post.postedBy.photo}
                      width={48}
                      height={48}
                      alt="avatar"
                      className="h-[48px] w-[48px] rounded-[12px] object-cover"
                    />
                  ) : (
                    <Avatar
                      name={post.postedBy?.name || ""}
                      size="48"
                      round="12px"
                      textSizeRatio={2}
                    />
                  )}
                  <div className="flex flex-col items-start gap-[5px]">
                    <Text as="p">{post.postedBy?.name || ""}</Text>
                    <Text size="s" as="p" className="!text-gray-500">
                      {formattedDate}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-[5px]">
                    <Img
                      src="img_favorite.svg"
                      width={14}
                      height={14}
                      alt="favorite"
                      className="h-[14px] w-[14px]"
                    />
                    <Text as="p">{post?.likes?.length}</Text>
                  </div>
                  <div className="ml-[27px] flex items-center gap-1.5 p-[5px]">
                    <Img
                      src="img_instagram.svg"
                      width={14}
                      height={14}
                      alt="instagram"
                      className="h-[14px] w-[14px]"
                    />
                    <Text as="p">{post?.comments?.length}</Text>
                  </div>
                  <Img
                    src="img_notification.svg"
                    width={18}
                    height={18}
                    alt="notification"
                    className="ml-7 h-[18px] w-[18px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-10">
                {post && post.image && post.image.url && (
                  <div className="mt-3">
                    <img
                      src={post.image.url}
                      width={290}
                      height={150}
                      alt="post image"
                      className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                    />
                  </div>
                )}

                {post && post.video_link && post.video_link.Location && (
                  <div className="mt-3">
                    <ReactPlayer
                      url={post.video_link.Location}
                      width="100%"
                      height="100%"
                      className="rounded-lg"
                      controls
                    />
                  </div>
                )}
                <div className="flex flex-col gap-6">
                  <Heading
                    size="2xl"
                    as="h1"
                    className="leading-9 !text-gray-900"
                  >
                    {post?.content}
                  </Heading>
                </div>
              </div>
            </div>
            <div className="flex w-full md:w-[40%] shadow-inner flex-col gap-[50px] rounded-[20px] bg-gray-100 p-[41px] md:gap-[70px] md:p-8">
              <div className="flex flex-col items-start gap-[41px]">
                <Heading size="xl" as="h2" className="!text-black">
                  Comments (148)
                </Heading>
                <div className="flex flex-col gap-8 self-stretch">
                  <div className="flex flex-1">
                    <div className="flex w-full flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-[5px]">
                          <Img
                            src="img_avatar_12.png"
                            width={28}
                            height={28}
                            alt="billy_green"
                            className="h-[28px] w-[28px] rounded-[10px] object-cover"
                          />
                          <Text as="p" className="self-end !text-black">
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
                      <Text
                        as="p"
                        className="!font-normal leading-[22px] !text-black"
                      >
                        Awesome Edward, remeber that five tips for low cost
                        holidays I sent you?
                      </Text>
                      <div className="flex gap-[15px]">
                        <Img
                          src="img_favorite_red_a200.svg"
                          width={14}
                          height={14}
                          alt="image"
                          className="h-[14px] w-[14px]"
                        />
                        <Img
                          src="img_instagram.svg"
                          width={14}
                          height={14}
                          alt="image"
                          className="h-[14px] w-[14px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-[5px]">
                        <Img
                          src="img_avatar_13.png"
                          width={28}
                          height={28}
                          alt="avatar"
                          className="h-[28px] w-[28px] rounded-[10px] object-cover"
                        />
                        <Text as="p" className="self-end !text-black">
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
                          className="!font-normal leading-[22px] !text-black"
                        >
                          Awesome Edward, remeber that five tips for low cost{" "}
                        </Text>
                        <div className="flex gap-[15px]">
                          <Img
                            src="img_favorite.svg"
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
                  <div className="flex flex-1">
                    <div className="flex w-full flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-[5px]">
                          <Img
                            src="img_avatar_14.png"
                            width={28}
                            height={28}
                            alt="avatar"
                            className="h-[28px] w-[28px] rounded-[10px] object-cover"
                          />
                          <Text as="p" className="self-end !text-black">
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
                      <Text
                        as="p"
                        className="!font-normal leading-[22px] !text-black"
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
                  <div className="flex flex-1">
                    <div className="flex w-full flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-[5px]">
                          <Img
                            src="img_avatar_15.png"
                            width={28}
                            height={28}
                            alt="avatar"
                            className="h-[28px] w-[28px] rounded-[10px] object-cover"
                          />
                          <Text as="p" className="self-end !text-black">
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
                      <Text
                        as="p"
                        className="!font-normal leading-[22px] !text-black"
                      >
                        Awesome Edward, remeber that five tips for low cost{" "}
                      </Text>
                      <div className="flex gap-[15px]">
                        <Img
                          src="img_favorite.svg"
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
                  <div className="flex flex-1">
                    <div className="flex w-full flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-[5px]">
                          <Img
                            src="img_avatar_16.png"
                            width={28}
                            height={28}
                            alt="avatar"
                            className="h-[28px] w-[28px] rounded-[10px] object-cover"
                          />
                          <Text as="p" className="self-end !text-black">
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
                      <Text
                        as="p"
                        className="!font-normal leading-[22px] !text-black"
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
              </div>
              <Input
                name="comment"
                placeholder={`Write a comment…`}
                suffix={
                  <Img
                    src="img_save.svg"
                    width={14}
                    height={14}
                    alt="save"
                    className="h-[17px] w-[17px] text-indigo-700"
                  />
                }
                className="mb-10 border-2 gap-[35px] rounded pr-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
