import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";
import { DeleteOutlined } from "@ant-design/icons";
import { BsSave, BsSaveFill } from "react-icons/bs";

import { FaRegCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";

import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION } from "@/graphql/mutation";

import { PopupPost } from "./PopupPost";

export const Post = ({
  post,
  loadPosts,
  handleLike,
  handleUnlike,
  handleSave,
  handleUnSave,
  user,
  isClient,
}) => {
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

  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;

      const { data } = await deletePost({
        variables: { id: post._id },
      });

      if (data.deletePost.ok) {
        toast.error("Post deleted");
        loadPosts();
      } else {
        toast.error("Error deleting post");
      }
    } catch (err) {
      console.log(err);
      toast.error("You can't delete other's post");
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ";
  };

  const truncatedContent = truncateText(post.content, 20);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  return (
    <div className="flex w-full  flex-col gap-[15px] rounded-xl bg-shadow p-5 ">
      <div className="flex items-center justify-between gap-5 ">
        <div className="flex  items-start gap-2.5">
          <Link href={`/userprofile/${post.postedBy?._id}`} className="flex ">
            {post?.postedBy?.photo?.url ? (
              <img
                src={post.postedBy?.photo?.url}
                width={50}
                height={50}
                alt="avatar"
                className="rounded-full cursor-pointer w-12 h-12 object-center sm:w-16 sm:h-16"
              />
            ) : (
              <Avatar
                name={post?.postedBy?.name}
                size="50"
                round
                className="rounded-full cursor-pointer w-12 h-12 object-center sm:w-20 sm:h-20"
              />
            )}
          </Link>
          <div className="flex flex-wrap flex-col items-start gap-[2px]">
            <h1 className="!text-primary_text font-serif font-bold text-[20px] sm:text-[1.6rem] leading-5 sm:leading-7">
              {post.postedBy?.name}
            </h1>
            <p className="!text-secondary_text text-[10px] lg:text-xs xl:text-sm font-semibold">
              {formattedDate}
            </p>
          </div>
        </div>
        {post?.postedBy?._id === user?._id && (
          <DeleteOutlined
            className="text-red-500 cursor-pointer text-xl sm:text-2xl duration-500
          transition-transform hover:scale-125"
            onClick={handleDelete}
          />
        )}
      </div>
      <div
        className="flex flex-col items-center justify-center gap-y-5
       max-w-full"
      >
        <div
          className="mt-3 flex items-center justify-center bg-background rounded-lg overflow-hidden
          w-[240px] h-[240px]
          min-[360px]:w-[300px] min-[360px]:h-[300px]
          sm:w-[570px] sm:h-[500px]
          md:w-[700px] 
          lg:w-[870px] lg:h-[550px]
          xl:w-[530px] xl:h-[500px]
          2xl:w-[655px] 2xl:h-[655px] "
        >
          {post && post.image && post.image.url && (
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={post.image.url}
                alt="post image"
                className="block max-w-full max-h-full m-auto object-contain"
              />
            </div>
          )}

          {post && post.video_link && post.video_link.Location && (
            <div className="flex items-center justify-center w-full h-full">
              <ReactPlayer
                url={post.video_link.Location}
                width="100%"
                height="100%"
                className="max-w-full max-h-full m-auto"
                controls
              />
            </div>
          )}
        </div>

        <div className="flex flex-col self-stretch">
          <h1
            as="p"
            className="leading-5 !text-primary_text text-xs sm:text-base"
          >
            {truncatedContent}

            <div
              onClick={togglePopup}
              className="inline-block text-secondary_text hover:text-accent cursor-pointer"
            >
              ... Read More
            </div>
          </h1>
        </div>

        <div className="flex self-stretch justify-between gap-y-5 ">
          <div className="flex items-center justify-between gap-[15px]">
            <div className="flex items-center cursor-pointer">
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
              <h1 as="p" className="ml-[5px] text-primary_text text-[1rem]">
                {post.likes.length}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-x-2 cursor-pointer ">
              <FaRegCommentAlt
                onClick={togglePopup}
                className="text-primary_text "
              />
              <h1 as="p" className="text-primary_text text-[1rem]">
                {post.comments.length}
              </h1>
            </div>
          </div>
          {post?.postedBy?._id !== user?._id && (
            <div className="flex items-center text-primary_text cursor-pointer relative">
              {isClient &&
              user.saved?.some((savedPost) => savedPost._id === post._id) ? (
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
          )}
        </div>
      </div>
      {isPopupOpen && (
        <PopupPost
          onClose={togglePopup}
          post={post}
          user={user}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          handleSave={handleSave}
          handleUnSave={handleUnSave}
          isClient={isClient}
          loadPosts={loadPosts}
        />
      )}
    </div>
  );
};
