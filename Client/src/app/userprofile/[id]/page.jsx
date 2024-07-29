// pages/user/[id].js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import Navbar from "@/components/Nav/Navbar";
import { Post } from "@/components/Postcard/Posts";
import api from "@/utils/axios";
import { USER_POSTS_QUERY } from "@/graphql/query";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import Link from "next/link";

export default function UserProfilePage({ params }) {
  const maxDisplayedPhotos = 8;
  const maxDisplayedFollowers = 10;
  const router = useRouter();
  const { id } = params;
  const [userProfile, setUserProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) loadUser();
  }, [user]);
  const loadUser = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${id}`
    );
    setUserProfile(data);
  };
  const { data, loading, error, refetch } = useQuery(USER_POSTS_QUERY, {
    variables: { id },
    skip: !user,
  });

  useEffect(() => {
    if (user) {
      refetch({ id });
    }
  }, [user, refetch]);

  useEffect(() => {
    if (data) {
      setPosts(data.userPosts);
    }
  }, [data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col w-[92%] mx-auto items-center justify-center gap-5 py-4">
        <div className="flex flex-col items-start justify-center gap-y-5">
          <div className="relative flex flex-col items-center gap-y-5 sm:gap-y-10 rounded-xl p-[18px] bg-shadow">
            <div className="flex flex-col items-center justify-center">
              {isClient && userProfile?.coverphoto?.url ? (
                <img
                  src={userProfile.coverphoto.url}
                  alt="Cover Photo"
                  className="rounded-xl object-cover w-[17rem] sm:w-[35rem] md:w-[45rem] lg:w-[50rem] xl:w-[70rem] 2xl:w-[88rem] h-[10rem] sm:h-[15rem] lg:h-[20rem]"
                />
              ) : (
                <div className="relative rounded-xl object-cover bg-gray-300 flex items-center justify-center w-[17rem] sm:w-[35rem] md:w-[45rem] lg:w-[50rem] xl:w-[70rem] 2xl:w-[85rem] h-[10rem] sm:h-[15rem] lg:h-[20rem]">
                  <span className="absolute top-2 left-2">Cover Photo</span>
                </div>
              )}

              <div className="absolute top-[8rem] sm:top-[10.5rem]  lg:top-[15.5rem] flex flex-col items-center gap-1">
                <div className="flex flex-col items-center justify-center ">
                  <div className="rounded-full overflow-hidden border-4 sm:border-8 border-shadow object-cover flex items-center justify-center w-[6rem] sm:w-[8rem] md:w-[12rem] h-[6rem] sm:h-[8rem] md:h-[12rem]">
                    {isClient && userProfile.photo?.url ? (
                      <img
                        src={userProfile.photo.url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Avatar
                        name={
                          isClient && userProfile?.name
                            ? userProfile.name
                            : "User"
                        }
                        size="192"
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap flex-col w-full items-center justify-center pt-[1rem] sm:pt-[9rem] md:pt-[3.5rem]">
              {isClient && userProfile?.name && (
                <h1 className="text-primary_text text-2xl pt-2 font-bold text-center">
                  {userProfile.name || "User"}
                </h1>
              )}
              <div className="py-2">
                <div className="flex gap-x-3 text-sm justify-center">
                  {posts && posts.length > 0 && (
                    <h1 className="text-primary_text text-center">
                      {posts.length} Posts
                    </h1>
                  )}
                  {userProfile?.followers &&
                    userProfile.followers.length > 0 && (
                      <h1 className="text-primary_text text-center">
                        {userProfile.followers.length} Followers
                      </h1>
                    )}
                </div>
              </div>
            </div>

            <div className="flex relative flex-wrap flex-col w-full items-start gap-y-5 ">
              <h1 className="text-primary_text uppercase text-2xl font-extrabold">
                About Me
              </h1>
              <div className="w-fit !font-normal text-secondary_text">
                {isClient ? (
                  userProfile?.about ? (
                    <p className="leading-normal">{userProfile.about}</p>
                  ) : (
                    <p className="leading-normal">
                      You haven't edited your profile.
                    </p>
                  )
                ) : null}
              </div>
            </div>

            <div className="flex  flex-col items-start self-stretch gap-y-5">
              <h1 className="text-primary_text uppercase text-2xl font-extrabold">
                Followers
              </h1>
              <div className="flex flex-wrap gap-[15px] items-center justify-center md:justify-start self-stretch text-secondary_text">
                {userProfile?.followers && userProfile?.followers.length > 0 ? (
                  userProfile.followers
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
                            alt="Follower"
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
              {userProfile.followers?.length > maxDisplayedFollowers && (
                <Link
                  href="/myfriends"
                  className="font-semibold text-secondary_text hover:text-primary_text"
                >
                  See more...
                </Link>
              )}
            </div>

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
                          alt="Post Image"
                          className=" rounded-xl object-cover
                              
                              w-[240px] h-[240px]   min-[360px]:w-[360px] min-[360px]:h-[360px]   sm:w-[240px] sm:h-[240px]   md:w-[210px] md:h-[210px]   lg:w-[210px] lg:h-[210px] xl:w-[272px] xl:h-[272px] min-[1440px]:w-[310px]  min-[1440px]:h-[310px] 2xl:w-[330px] 2xl:h-[330px]
                              "
                        />
                      ))
                    ) : (
                      <p>Your Gallery is empty.</p>
                    )}
                  </div>
                  {posts.length > maxDisplayedPhotos && (
                    <Link
                      href="/mygallery"
                      className="font-semibold text-secondary_text hover:text-primary_text"
                    >
                      See more...
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px] w-full">
            {posts &&
              posts.map((post, index) => <Post post={post} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
