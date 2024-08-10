import React, { useState } from "react";

import Avatar from "react-avatar";
import ReactPlayer from "react-player";
import { AiOutlineClose } from "react-icons/ai";

import { FaRegCommentAlt, FaRegHeart, FaHeart, FaSave } from "react-icons/fa";

import CommentBody from "../commentBody";
import { BsSave, BsSaveFill } from "react-icons/bs";

export const PopupPost = ({
  onClose,
  post,
  user,
  isClient,
  handleLike,
  handleUnlike,
  handleSave,
  handleUnSave,
  loadPosts,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  function formatDateTime(timestamp) {
    if (!timestamp) {
      return "Invalid Date";
    }
    const date = new Date(parseInt(timestamp, 10));

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  }

  const formattedDate = formatDateTime(post.createdAt);

  const truncateText = (text, wordLimit) => {
    if (showFullContent) return text;
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ";
  };

  const truncatedContent = truncateText(post.content, 20);

  const handleReadMoreOrLess = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
      <div>
        <div className="flex justify-end text-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary_text"
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex items-center bg-shadow rounded-lg max-w-[20rem] md:max-w-full">
          <div className="flex flex-col md:flex-row w-full items-start justify-between gap-x-5 p-5">
            <div className="flex w-full flex-col">
              <div className="flex flex-col items-center">
                <div
                  className="mt-3 flex items-center justify-center bg-background rounded-lg overflow-hidden
                  w-[270px] h-[240px]
                  min-[360px]:w-[280px] min-[360px]:h-[250px]
                  sm:w-[280px] sm:h-[250px]
                  md:w-[350px] md:h-[420px]
                  lg:w-[450px] lg:h-[420px]
                  xl:w-[550px] xl:h-[550px]
                  2xl:w-[650px] 2xl:h-[640px]"
                >
                  {post && post.image && post.image.url && (
                    <div className="">
                      <img
                        src={post.image.url}
                        width={290}
                        height={150}
                        alt="post image"
                        className="w-full rounded-lg object-cover md:h-auto"
                      />
                    </div>
                  )}

                  {post && post.video_link && post.video_link.Location && (
                    <div className="">
                      <ReactPlayer
                        url={post.video_link.Location}
                        width="100%"
                        height="100%"
                        className="rounded-lg"
                        controls
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* comments */}
            <div
              className="flex w-full shadow-inner flex-col gap-y-3 rounded-lg my-3 bg-background p-5 
            
            
            max-w-[400px]  
            h-[300px]
            min-[360px]:h-[300px]
            sm:h-[300px]
            md:h-[420px]   
            lg:h-[450px]
            xl:h-[550px]
            2xl:h-[640px]
            
            "
            >
              {/* who posted */}
              <div className="flex items-start gap-2.5 bg-background ">
                {post.postedBy?.photo?.url ? (
                  <img
                    src={post.postedBy?.photo.url}
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-full cursor-pointer w-12 h-12 object-center sm:w-16 sm:h-16"
                  />
                ) : (
                  <Avatar
                    name={post.postedBy?.name}
                    size="50"
                    round
                    className="rounded-full cursor-pointer w-12 h-12 object-center sm:w-20 sm:h-20"
                  />
                )}
                <div className="flex flex-wrap flex-col items-start gap-[2px]">
                  <h1 className="!text-primary_text font-serif font-bold text-[20px] sm:text-[1.6rem] leading-5 sm:leading-7">
                    {post.postedBy?.name}
                  </h1>
                  <p className="!text-secondary_text text-[10px] lg:text-xs xl:text-sm font-semibold">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-2 h-[calc(100%-4.5rem)] overflow-y-auto">
                {/* description */}
                <div className="flex w-full">
                  <p className="!text-primary_text text-sm">
                    {truncatedContent}
                    <span
                      onClick={handleReadMoreOrLess}
                      className="inline-block text-secondary_text hover:text-accent cursor-pointer "
                    >
                      {showFullContent ? "... Read Less" : "... Read More"}
                    </span>
                  </p>
                </div>

                {/* like counts */}
                <div className="flex  w-full items-center justify-between gap-y-5 ">
                  <div className="flex items-center justify-between gap-[15px]">
                    <div
                      className="flex items-center cursor-pointer"
                      // onClick={() => toggleLike(post._id)}
                    >
                      {isClient && post.likes?.includes(user?._id) ? (
                        <FaHeart
                          className="text-red-500"
                          onClick={() => {
                            handleUnlike(post._id);
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          className="text-primary_text"
                          onClick={() => {
                            handleLike(post._id);
                          }}
                        />
                      )}
                      <h1
                        as="p"
                        className="ml-[5px] text-primary_text text-[1rem]"
                      >
                        {post.likes.length}
                      </h1>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 cursor-pointer ">
                      <FaRegCommentAlt className="text-primary_text " />
                      <h1 className="text-primary_text text-[1rem]">
                        {post.comments.length}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center text-primary_text cursor-pointer relative">
                    {isClient &&
                    user.saved?.some(
                      (savedPost) => savedPost._id === post._id
                    ) ? (
                      <BsSaveFill
                        onClick={() => {
                          handleUnSave(post._id);
                        }}
                      />
                    ) : (
                      <BsSave
                        onClick={() => {
                          handleSave(post._id);
                        }}
                      />
                    )}{" "}
                  </div>
                </div>

                {/* comments */}
                <CommentBody
                  postID={post._id}
                  loadPosts={loadPosts}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
