"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import Navbar from "@/components/Nav/Navbar";
import { Post } from "@/components/Postcard/Posts";
import { useSelector } from "react-redux";
import api from "@/utils/axios";
import Avatar from "react-avatar";
import { POSTS_BY_USER_QUERY } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function UserProfilePage() {
  const maxDisplayedPhotos = 8;
  const maxDisplayedFollowers = 8;

  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = useState(false);
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
  const { data, loading, error, refetch } = useQuery(POSTS_BY_USER_QUERY);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    if (data) {
      setPosts(data.postsByUser);
    }
  }, [data]);

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

  return (
    <div className="flex w-full h-full mt-5 sm:mt-0 gap-4 min-h-screen bg-background">
      {/* Nav bar */}
      <Navbar open={open} setOpen={setOpen} />

      <div
        className={`lg:hidden fixed z-30 bottom-0 transition-all duration-700 ${
          open ? "left-[6rem] px-2 py-1" : "left-0 p-1"
        }`}
      >
        <h1
          className="text-2xl bg-highlight text-shadow p-2 rounded-lg font-semibold transition-transform duration-700"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
        </h1>
      </div>

      <div className="flex items-center justify-center gap-5 md:w-full flex-col md:pt-7 pb-4 mr-5 ml-5 lg:ml-0">
        <div className="mt-0 flex flex-col gap-10">
          {/* rest contents */}

          <div className="flex flex-col items-start justify-center gap-y-5">
            {/* upper part */}

            <div className="flex flex-col items-center gap-y-10 rounded-xl p-[18px] bg-shadow">
              {/* 0th part */}
              <div className="flex flex-col items-center justify-center">
                {isClient && user?.coverphoto?.url ? (
                  <img
                    src={user.coverphoto.url}
                    alt="Cover Photo"
                    className="rounded-xl object-cover
                    
                   w-[17rem] sm:w-[35rem] md:w-[45rem] lg:w-[50rem] xl:w-[70rem] 2xl:w-[85rem] 
                  h-[10rem] sm:h-[15rem]  lg:h-[20rem]"
                  />
                ) : (
                  <div
                    className=" rounded-xl object-cover bg-gray-300 flex items-center justify-center
                  
                  w-[17rem] sm:w-[35rem] md:w-[45rem] lg:w-[50rem] xl:w-[70rem] 2xl:w-[85rem] 
                  h-[10rem] sm:h-[15rem]  lg:h-[20rem]"
                  >
                    <span>Cover Photo</span>
                  </div>
                )}

                <div
                  className="flex absolute left-0 right-0 flex-col items-center gap-1 
                
                top-[8.5rem] sm:top-[12.5rem] md:top-[12.5rem] lg:top-[17.5rem] 
                sm:mx-[12rem]"
                >
                  {/* profile photo */}
                  <div className="flex flex-col items-center justify-center self-stretch">
                    <div
                      className="rounded-full overflow-hidden border-4 sm:border-8 border-shadow object-cover
              
                      w-[6rem] sm:w-[8rem] md:w-[12rem] 
                      h-[6rem] sm:h-[8rem] md:h-[12rem] "
                    >
                      {isClient && user.photo?.url ? (
                        <img
                          src={user.photo.url}
                          alt="Meow"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Avatar
                          name={isClient && user?.name ? user.name : "User"}
                          size="192"
                          round
                          className="cursor-pointer"
                          // className="cursor-pointer rounded-full w-full h-full object-cover border-2 border-shadow"
                          // style={{ border: "0px" }}
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
                <div className="flex flex-col self-stretch gap-y-5 pt-[8rem] sm:pt-[9rem] md:pt-[12rem]">
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
                    <div className="flex flex-wrap gap-[15px] self-stretch grid-cols-3 sm:grid-cols-1 text-primary_text">
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
                              className=" rounded-xl object-cover
                              
                              w-[240px] h-[240px]   min-[360px]:w-[360px] min-[360px]:h-[360px]   sm:w-[240px] sm:h-[240px]   md:w-[220px] md:h-[220px]   lg:w-[208px] lg:h-[208px] xl:w-[272px] xl:h-[272px] min-[1440px]:w-[312px]  min-[1440px]:h-[312px] 2xl:w-[336px] 2xl:h-[336px]
                              "
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
                posts.map((post, index) => <Post post={post} key={index} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
