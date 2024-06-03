import React from "react";
import { Img } from "../../components";
import Link from "next/link";
import { IoSend } from "react-icons/io5";

export const commentData = {
  totalComments: "148",
  comments: [
    {
      userImage: "pratik.jpg",
      userName: "Pratik Biswas",
      commentTime: "20 mins ago",
      theComment: `Awesome Edward, remember that five tips for low cost holidays I sent you?`,
    },
    {
      userImage: "rupal.jpg",
      userName: "Rupal Paul",
      commentTime: "20 mins ago",
      theComment: `Awesome Edward, remember that five tips for low cost holidays I sent you?`,
    },
    {
      userImage: "pratik.jpg",
      userName: "Purnendu Sekhar Singha Roy",
      commentTime: "20 mins ago",
      theComment: `Awesome Edward, remember that five tips for low cost holidays I sent you?`,
    },
    {
      userImage: "sattiwikee.jpg",
      userName: "Sattwikee Ghosh",
      commentTime: "20 mins ago",
      theComment: `Awesome Edward, remember that five tips for low cost holidays I sent you?`,
    },
    {
      userImage: "pratik.jpg",
      userName: "Virat Kohli",
      commentTime: "20 mins ago",
      theComment: `Awesome Edward, remember that five tips for low cost holidays I sent you?`,
    },
    {
      userImage: "pratik.jpg",
      userName: "Virat Kohli",
      commentTime: "20 mins ago",
      theComment: `Awesome Edward, remember that five tips for low cost holidays I sent you?`,
    },
    {
      userImage: "pratik.jpg",
      userName: "Virat Kohli",
      commentTime: "20 mins ago",
      theComment: `Awesome Edward, remember that five tips for low cost holidays I sent you?`,
    },
  ],
};

const CommentBody = () => {
  return (
    <div className="flex flex-col items-start gap-y-3">
      <h1 className="!text-primary_text text-[17px] sm:text-[1.2rem] xl:text-[1.5rem] font-bold">
        Comments ({commentData.totalComments})
      </h1>
      <div className="flex flex-col gap-8 self-stretch">
        <div className="flex flex-col items-center justify-center gap-y-3">
          <form className="w-full self-stretch relative">
            <textarea
              name="comment"
              placeholder={`Write a comment…`}
              className=" border  border-highlight bg-transparent rounded-lg text-primary_text w-full leading-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-highlight p-1"
            >
              <IoSend />
            </button>
          </form>

          {commentData.comments.map((content, ind) => (
            <div
              key={ind}
              className="flex flex-col gap-y-2 w-full px-1 py-2 border-b border-secondary_text  "
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center justify-center gap-x-[5px]">
                  <Img
                    src={content.userImage}
                    width={35}
                    height={35}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col ">
                    <p className="text-sm sm:text-md text-primary_text font-serif font-bold">
                      {content.userName}
                    </p>
                    <Link
                      href="/myprofile"
                      className="text-xs text-left text-highlight font-medium hover:underline cursor-pointer "
                    >
                      View my profile
                    </Link>
                  </div>
                </div>
                <p className=" text-xs text-right text-highlight">
                  {content.commentTime}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="!font-normal text-sm !text-primary_text">
                  {content.theComment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentBody;
