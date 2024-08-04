"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "@/utils/axios";
import Avatar from "react-avatar";
import { POSTS_BY_USER_QUERY, SAVED_POSTS_QUERY } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Post } from "@/components/Postcard/Post";

export default function MyProfilePage() {
  const maxDisplayedPhotos = 8;
  const maxDisplayedFollowers = 10;
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [followers, setFollower] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("myPosts");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, loading, error, refetch } = useQuery(POSTS_BY_USER_QUERY);
  const {
    data: saved,
    loading: savedLoading,
    error: savedError,
    refetch: savedRefetch,
  } = useQuery(SAVED_POSTS_QUERY);

  useEffect(() => {
    if (user) {
      refetch();
      savedRefetch();
    }
  }, [user, refetch, savedRefetch]);

  useEffect(() => {
    if (data) {
      setPosts(data.postsByUser);
    }
  }, [data]);

  useEffect(() => {
    if (saved) {
      setSavedPosts(saved.getSavedPosts);
    }
  }, [saved]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col w-[92%] mx-auto items-center justify-center gap-5 py-4">
        <div className="flex flex-col items-start justify-center gap-y-5">
          <div className="relative flex flex-col items-center gap-y-5 sm:gap-y-10 rounded-xl p-[18px] bg-shadow">
            <div className="flex flex-col items-center justify-center">
              {isClient && user?.coverphoto?.url ? (
                <img
                  src={user.coverphoto.url}
                  alt="Cover Photo"
                  className="rounded-xl object-cover w-[17rem] sm:w-[35rem] md:w-[45rem] lg:w-[50rem] xl:w-[70rem] 2xl:w-[88rem] h-[10rem] sm:h-[15rem] lg:h-[20rem]"
                />
              ) : (
                <div className="relative rounded-xl object-cover bg-gray-300 flex items-center justify-center w-[17rem] sm:w-[35rem] md:w-[45rem] lg:w-[50rem] xl:w-[70rem] 2xl:w-[85rem] h-[10rem] sm:h-[15rem] lg:h-[20rem]">
                  <span className="absolute top-2 left-2">Cover Photo</span>
                </div>
              )}
              <div className="absolute top-[8rem] sm:top-[10.5rem]  lg:top-[15.5rem] flex flex-col items-center gap-1">
                {/* Profile photo */}
                <div className="flex flex-col items-center justify-center">
                  <div className="rounded-full overflow-hidden border-4 sm:border-8 border-shadow object-cover flex items-center justify-center w-[6rem] sm:w-[8rem] md:w-[12rem] h-[6rem] sm:h-[8rem] md:h-[12rem]">
                    {isClient && user.photo?.url ? (
                      <img
                        src={user.photo.url}
                        alt={user.photo.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Avatar
                        name={isClient && user?.name ? user.name : "User"}
                        size="192"
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* name and details */}
            <div className="flex flex-wrap flex-col w-full items-center justify-center pt-[1rem] sm:pt-[9rem] md:pt-[3.5rem]">
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
                href="/settings"
                className="flex-grow flex items-center justify-center cursor-pointer border bg-hover_accent hover:bg-accent duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] px-5 py-2 font-semibold"
              >
                Edit Profile
              </Link>
            </div>
            {/* About me */}
            <div className="flex relative flex-wrap flex-col w-full items-start gap-y-5 ">
              <h1 className="text-primary_text uppercase text-2xl font-extrabold">
                About Me
              </h1>
              <div className="w-fit !font-normal text-secondary_text">
                {isClient ? (
                  user?.about ? (
                    <p className="leading-normal">{user.about}</p>
                  ) : (
                    <p className="leading-normal">
                      You haven't edited your profile.
                    </p>
                  )
                ) : null}
              </div>
            </div>
            {/* 2nd part */}
            <div className="flex  flex-col items-start self-stretch gap-y-5">
              <h1 className="text-primary_text uppercase text-2xl font-extrabold">
                Followers
              </h1>
              <div className="flex flex-wrap gap-[15px] items-center justify-center md:justify-start self-stretch text-secondary_text ">
                {followers && followers.length > 0 ? (
                  followers
                    .slice(0, maxDisplayedFollowers)
                    .map((follower, index) => (
                      <div
                        key={"listavatarone" + index}
                        className="flex gap-[25px]"
                        onClick={() =>
                          router.push(`/userprofile/${follower._id}`)
                        }
                      >
                        {follower.photo && follower.photo.url ? (
                          <img
                            src={follower.photo.url}
                            alt="Meow"
                            className="rounded-full w-[7.8rem] h-[7.8rem] object-cover cursor-pointer"
                          />
                        ) : (
                          <Avatar
                            name={follower.name}
                            size="120"
                            round={true}
                            className="rounded-full w-[7.8rem] h-[7.8rem] object-cover cursor-pointer"
                          />
                        )}
                      </div>
                    ))
                ) : (
                  <p>You have no followers right now.</p>
                )}
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
                  <div className="flex flex-wrap gap-[15px] self-stretch grid-cols-3 sm:grid-cols-1 text-secondary_text ">
                    {posts && posts.length > 0 ? (
                      posts.slice(0, maxDisplayedPhotos).map((post, index) => (
                        <img
                          key={index}
                          src={post.image?.url}
                          width={130}
                          height={130}
                          alt="image"
                          className=" rounded-xl object-cover
                              
                              w-[240px] h-[240px]   min-[360px]:w-[360px] min-[360px]:h-[360px]   sm:w-[240px] sm:h-[240px]   md:w-[210px] md:h-[210px]   lg:w-[210px] lg:h-[210px] xl:w-[272px] xl:h-[272px] min-[1440px]:w-[310px]  min-[1440px]:h-[310px] 2xl:w-[330px] 2xl:h-[330px]
                              "
                        />
                      ))
                    ) : (
                      <p>Your Gallery is empty.</p>
                    )}
                  </div>
                  {isClient && posts.length > maxDisplayedPhotos && (
                    <Link
                      href={`/gallery/${user?._id}`}
                      className="font-semibold text-secondary_text hover:text-primary_text"
                    >
                      See more...
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div
              className={`flex-grow flex items-center justify-center cursor-pointer border  duration-500 rounded-lg  text-primary_text  text-base px-4   ${
                activeTab === "myPosts"
                  ? "bg-hover_accent hover:bg-accent border-shadow"
                  : "border-primary_text hover:bg-hover_accent"
              }`}
              onClick={() => handleTabClick("myPosts")}
            >
              My Posts
            </div>
            <div
              className={`lex-grow flex items-center justify-center cursor-pointer border  duration-500 rounded-lg  text-primary_text  text-base px-4  ${
                activeTab === "savedPosts"
                  ? "bg-hover_accent hover:bg-accent border-shadow"
                  : "border-primary_text hover:bg-hover_accent"
              }`}
              onClick={() => handleTabClick("savedPosts")}
            >
              Saved Posts
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px] w-full">
            {activeTab === "myPosts"
              ? posts.map((post, index) => <Post post={post} key={index} />)
              : savedPosts.map((post, index) => (
                  <Post post={post} key={index} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
