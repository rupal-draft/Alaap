"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import Navbar from "@/components/Nav/Navbar";
import { Post } from "@/components/Postcard/Posts";
import { useSelector } from "react-redux";
import api from "@/utils/axios";
import Avatar from "react-avatar";
import Link from "next/link";

export default function MyProfilePage() {
  const maxDisplayedPhotos = 5;
  const maxDisplayedFollowers = 8;

  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followers, setFollower] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const toggleLike = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, liked: !post.liked };
      }
      return post;
    });

    setPosts(updatedPosts);

    try {
      await api.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/toggle-like`, {
        postId,
      });
      loadPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle like");
    }
  };

  return (
    <div className="flex items-start justify-center gap-5 bg-background">
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

      <div className="flex items-center justify-center gap-5 md:w-full flex-col md:pt-7 pb-4 mr-5">
        <div className="mt-0 flex flex-col gap-10">
          {/* rest contents */}

          <div className="flex flex-col items-start justify-center gap-y-5">
            {/* upper part */}

            <div className="flex flex-col items-start gap-y-10 rounded-xl p-[18px] bg-shadow">
              {/* 0th part */}
              <div className="flex relative flex-col items-center justify-center">
                {isClient && user?.coverphoto?.url ? (
                  <img
                    src={user.coverphoto.url}
                    alt="Cover Photo"
                    className="rounded-xl object-cover
                    
                    w-[90rem] h-[20rem]"
                  />
                ) : (
                  <div
                    className=" rounded-xl object-cover bg-gray-300 flex items-center justify-center
                  
                  w-[86rem] h-[20rem]"
                  >
                    <span>Cover Photo</span>
                  </div>
                )}

                <div className="flex absolute top-[13.5rem] left-0 right-0 flex-row items-start justify-center self-stretch gap-5">
                  {/* profile photo */}
                  <div className="flex flex-col items-center justify-center self-stretch">
                    <div>
                      {isClient && user.photo?.url ? (
                        <img
                          src={user.photo.url}
                          alt="Meow"
                          className="rounded-full w-[12rem] h-[12rem] border-8 border-shadow object-cover"
                        />
                      ) : (
                        <Avatar
                          name={isClient && user?.name ? user.name : "User"}
                          size="192"
                          round={true}
                          className="cursor-pointer rounded-full w-[12rem] h-[12rem] border-2 border-shadow"
                          style={{ border: "0px" }}
                        />
                      )}
                    </div>

                    {isClient && user?.name && (
                      <h1 className="text-primary_text text-2xl pt-2 font-bold text-center">
                        {user.name || "User"}
                      </h1>
                    )}
                    <div className="py-2">
                      <div className="flex gap-x-3 text-sm justify-center">
                        {posts && posts.length > 0 && (
                          <h1 className="text-primary_text text-center">
                            {posts.length} Posts
                          </h1>
                        )}
                        {followers && followers.length > 0 && (
                          <h1 className="text-primary_text text-center">
                            {followers.length} Followers
                          </h1>
                        )}
                      </div>
                    </div>

                    <Link
                      // type="button"
                      href="/settings"
                      onClick={console.log("Feature is coming!")}
                      className="flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] px-5 py-2 font-semibold"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
              {/* 1st part */}
              <div>
                {/* About me */}
                <div className="flex flex-col self-stretch gap-y-5 pt-[12rem]">
                  <h1 className="uppercase text-2xl font-extrabold tracking-[1.00px] text-primary_text">
                    About Me
                  </h1>
                  <div className="w-full !font-normal text-secondary_text">
                    {isClient && user?.about && (
                      <p className="leading-normal">{user.about}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* 2nd part */}
              <div className="flex flex-col items-start self-stretch gap-y-5">
                <h1 className="text-primary_text uppercase text-2xl font-extrabold">
                  Followers
                </h1>
                <div className="flex gap-[15px] items-start self-stretch">
                  {followers &&
                    followers
                      .slice(0, maxDisplayedFollowers)
                      .map((follower, index) => (
                        <div
                          key={"listavatarone" + index}
                          className="flex gap-[25px]"
                        >
                          {follower.photo && follower.photo.url ? (
                            <img
                              src={follower.photo.url}
                              width={110}
                              height={110}
                              alt="Meow"
                              className="rounded-full w-[8rem] h-[8rem] object-cover cursor-pointer"
                              onClick={() =>
                                console.log("User profile redirected")
                              }
                            />
                          ) : (
                            <Avatar
                              name={follower.name}
                              size="128"
                              round={true}
                              className="rounded-full w-[8rem] h-[8rem] object-cover cursor-pointer"
                            />
                          )}
                        </div>
                      ))}
                </div>
                {followers.length > maxDisplayedFollowers && (
                  <Link
                    href="/myfriends" // Adjust 'to' prop based on your routing setup
                    className="font-semibold text-secondary_text hover:text-primary_text"
                  >
                    See more...
                  </Link>
                )}
              </div>

              {/* 3rd part */}
              <div className="flex flex-col items-start justify-center self-stretch gap-5">
                <h1 className="text-primary_text uppercase text-2xl font-extrabold">
                  Photos
                </h1>{" "}
                <div className="flex flex-col items-start justify-center gap-[30px] rounded-xl">
                  <div className="flex flex-col items-start gap-[15px] self-stretch">
                    <div className="flex flex-wrap gap-[15px] self-stretch md:grid-cols-3 sm:grid-cols-1 text-primary_text">
                      {posts && posts.length > 0 ? (
                        posts
                          .slice(0, maxDisplayedPhotos)
                          .map((post, index) => (
                            <img
                              key={index}
                              src={post.image?.url}
                              width={130}
                              height={130}
                              alt="image"
                              className="h-[15rem] w-[265px] rounded-xl object-cover"
                            />
                          ))
                      ) : (
                        <p>No posts available.</p>
                      )}
                    </div>
                    {posts.length > maxDisplayedPhotos && (
                      <Link
                        href="/mygallery" // Adjust 'to' prop based on your routing setup
                        className="font-semibold text-secondary_text hover:text-primary_text"
                      >
                        See more...
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px] w-full">
              {posts &&
                posts.map((post, index) => (
                  <Post
                    post={post}
                    key={index}
                    loadPosts={loadUserPosts}
                    toggleLike={toggleLike}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
