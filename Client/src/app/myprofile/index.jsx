"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../components";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

import Navbar from "@/components/Nav/Navbar";
import { Post } from "@/components/Postcard/Posts";
import { useSelector } from "react-redux";
import api from "@/utils/axios";
import Avatar from "react-avatar";

export default function MyProfilePage() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followers, setFollower] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useSelector((state) => state?.user);
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

  useEffect(() => {
    if (user) {
      loadUserPosts();
    }
  }, [user]);
  const loadUserPosts = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user-posts`
    );
    setPosts(data);
  };
  useEffect(() => {
    if (user) {
      loadFollowers();
    }
  }, [user]);
  const loadFollowers = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get/user-followers`
    );
    setFollower(data);
  };
  useEffect(() => {
    if (user) {
      loadCurrentUser();
    }
  }, [user]);
  const loadCurrentUser = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/current-user`
    );
    setCurrentUser(data);
  };
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
          {/* rest contents */}

          <div className="flex flex-row items-start justify-center gap-x-10 bg-gray-100 ">
            <div className="flex  items-center  bg-orange-400 justify-center gap-2.5 w-full">
              <div className="flex flex-col  items-start gap-[0px]  rounded-xl p-[38px]   sm:p-7">
                {/* 1st part */}
                <div className="flex flex-row items-start justify-center self-stretch gap-5">
                  <div className="flex w-2/3 flex-col items-center justify-center self-stretch ">
                    <div className="w-[60px] lg:w-[8rem]">
                      {currentUser?.user?.photo ? (
                        <img
                          src={currentUser.user.photo}
                          alt="Meow"
                          className="rounded-xl"
                        />
                      ) : (
                        <Avatar
                          name={currentUser?.user?.name || "User"}
                          size="110"
                          round={true}
                          className="cursor-pointer"
                        />
                      )}
                    </div>

                    {currentUser?.user?.name && (
                      <h1 className="!text-white-A700 text-xl pt-1 font-bold text-center">
                        {currentUser.user.name || "User"}
                      </h1>
                    )}
                    <div className="py-2">
                      <div className="flex gap-x-3 text-sm justify-center">
                        {posts && posts.length > 0 && (
                          <h1 className="!text-white-A700 text-center">
                            {posts.length} Posts
                          </h1>
                        )}
                        {followers && followers.length > 0 && (
                          <h1 className="!text-white-A700 text-center">
                            {followers.length} Followers
                          </h1>
                        )}
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
                      {currentUser?.user?.about && (
                        <p className="leading-[1.1rem]">
                          {currentUser.user.about}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* 2nd part */}
                <div className="my-[10px] flex flex-col items-center justify-center self-stretch gap-5">
                  <h1 className="!text-white-A700 uppercase text-2xl font-extrabold">
                    Followers
                  </h1>
                  <div className="flex flex-col gap-[15px] items-center self-stretch">
                    {followers &&
                      followers.map((follower, index) => (
                        <div
                          key={"listavatarone" + index}
                          className="flex gap-[25px]"
                        >
                          {follower.photo ? (
                            <img
                              src={follower.photo}
                              width={110}
                              height={110}
                              alt="Meow"
                              className="rounded-2xl cursor-pointer object-cover"
                            />
                          ) : (
                            <Avatar
                              name={follower.name}
                              size="110"
                              round={true}
                              className="cursor-pointer"
                            />
                          )}
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
                            posts.length / 3
                          )}, minmax(0, 1fr))`,
                        }}
                      >
                        {posts && posts.length > 0 ? (
                          posts.map((post, index) => (
                            <img
                              key={index}
                              src={post.image?.url}
                              width={130}
                              height={130}
                              alt="image"
                              className="h-[130px] w-[240px] rounded-[12px] object-cover md:h-auto"
                            />
                          ))
                        ) : (
                          <p>No posts available.</p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        color="undefined_undefined"
                        className="min-w-[97px] gap-[-3px] rounded font-medium"
                      >
                        See more
                      </Button>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
            {posts &&
              posts.map((post, index) => (
                <Post post={post} key={index} loadPosts={loadUserPosts} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
