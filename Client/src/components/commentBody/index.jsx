import React, { useEffect, useState } from "react";
import { Img } from "../../components";
import Link from "next/link";
import { IoSend } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import api from "@/utils/axios";
import { io } from "socket.io-client";
import { DeleteFilled } from "@ant-design/icons";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

const CommentBody = ({ postID, loadPosts, user }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    loadComments();
  }, []);
  const loadComments = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/all-comments`,
      { params: { postId: postID } }
    );
    setComments(data);
  };
  const addComment = async (e) => {
    e.preventDefault();
    const { data } = await api.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/add-comment`,
      { postId: postID, comment }
    );
    socket.emit("new-notification", data);
    loadComments();
    setComment("");
    loadPosts();
  };
  const deleteComment = async (id) => {
    try {
      await api.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/remove-comment`, {
        postId: postID,
        commentId: id,
      });
      loadComments();
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(user);
  return (
    <div className="flex flex-col items-start gap-y-3">
      <h1 className="!text-primary_text text-[17px] sm:text-[1.2rem] xl:text-[1.5rem] font-bold">
        Comments ({comments?.length})
      </h1>
      <div className="flex flex-col gap-8 self-stretch">
        <div className="flex flex-col items-center justify-center gap-y-3">
          <form className="w-full self-stretch relative" onSubmit={addComment}>
            <textarea
              name="comment"
              placeholder={`Write a comment…`}
              className=" border  border-highlight bg-transparent rounded-lg text-primary_text w-full leading-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-highlight p-1"
            >
              <IoSend />
            </button>
          </form>

          {comments?.map((content, ind) => {
            return (
              <div
                key={ind}
                className="flex flex-col gap-y-2 w-full px-1 py-2 border-b border-secondary_text"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center justify-center gap-x-[5px]">
                    <img
                      src={content.postedBy?.photo?.url}
                      width={35}
                      height={35}
                      alt="avatar"
                      className="rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm sm:text-md text-primary_text font-serif font-bold">
                        {content.postedBy?.name}
                      </p>
                      <Link
                        href="/myprofile"
                        className="text-xs text-left text-highlight font-medium hover:underline cursor-pointer"
                      >
                        View my profile
                      </Link>
                    </div>
                  </div>
                  <p className="text-xs text-right text-highlight">
                    {formatDistanceToNow(new Date(content.created), {
                      addSuffix: true,
                    })}
                  </p>
                  {content.postedBy?._id === user?._id && (
                    <DeleteFilled
                      onClick={() => deleteComment(content._id)}
                      className="text-xs text-right hover:underline cursor-pointer text-red-500"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="!font-normal text-sm !text-primary_text">
                    {content.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentBody;
