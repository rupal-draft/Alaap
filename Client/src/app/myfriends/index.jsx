"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Nav/Navbar";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import api from "@/utils/axios";
import Avatar from "react-avatar";
import { UserAddOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { setCredentials } from "@/Context/Slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

export default function MyFriendsPage() {
  const router = useRouter();
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [unfollowing, setUnFollowing] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      loadFollowings();
      socket.on("new-following", (newFollowingData) => {
        setFollowing((prevfollowings) => [newFollowingData, ...prevfollowings]);
      });
      return () => {
        socket.off("new-following");
      };
    }
  }, [user]);
  const loadFollowings = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get/user-followings`
    );
    setFollowing(data);
  };

  useEffect(() => {
    if (user) {
      loadFollowers();
      socket.on("new-follower", (newFollowerData) => {
        setFollower((prevfollowers) => [newFollowerData, ...prevfollowers]);
      });
      return () => {
        socket.off("new-follower");
      };
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
      loadUnFollowers();
    }
  }, [user]);
  const loadUnFollowers = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/find-people`
    );
    setUnFollowing(data);
  };

  const searchUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search-user/${query}`
      );
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFollow = async (unfollower) => {
    try {
      const { data } = await api.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user-follow`,
        {
          _id: unfollower._id,
        }
      );
      dispatch(setCredentials({ user: data.user }));
      socket.emit("new-follower", data.follower);
      let filtered = unfollowing.filter((p) => p._id !== unfollower._id);
      setUnFollowing(filtered);
      loadFollowings();
      toast.success(`Following ${unfollower.name}`);
    } catch (err) {
      console.log(err);
      toast.error("Error while adding!!");
    }
  };

  const handleUnfollow = async (fan) => {
    try {
      const { data } = await api.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user-unfollow`,
        { _id: fan._id }
      );
      dispatch(setCredentials({ user: data }));
      let filtered = unfollowing.filter((p) => p._id !== fan._id);
      setUnFollowing(filtered);
      loadFollowings();
      toast.error(`Unfollowed ${fan.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col  w-[95%] items-center md:items-start  p-5 gap-5">
        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <h1 className="text-primary_text font-montserrat text-4xl font-bold">
            My Friends
          </h1>
        </div>
        {/* search button + search results */}
        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <form
            className="relative w-full flex items-center gap-x-5"
            onSubmit={searchUser}
          >
            <input
              size="sm"
              shape="square"
              name="search"
              placeholder={`Search in social…`}
              className="w-full text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight 
            
                   text-base sm:text-base 
                   pl-10 sm:pl-10  
                   py-1 sm:py-2
                   sm:px-4"
              onChange={(e) => {
                setQuery(e.target.value);
                setResult([]);
              }}
            />
            <FaSearch className="absolute left-3 text-primary_text w-4 h-4" />

            <button
              className=" flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow px-4 py-1 font-ubuntu font-medium text-primary_text text-base md:text-lg"
              type="submit"
            >
              Search
            </button>
          </form>

          {result.length > 0 && (
            <>
              <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
                <h1 className="text-primary_text font-montserrat text-3xl font-bold">
                  Search Result
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-5 text-primary_text">
                  {result.map((search, index) => (
                    <div
                      key={"myfriends" + index}
                      onClick={() => router.push(`/userprofile/${search._id}`)}
                      className="flex flex-col items-center justify-center rounded-lg bg-shadow p-5 sm:p-5 gap-y-2"
                    >
                      {search.photo ? (
                        <img
                          src={search.photo.url}
                          alt="user"
                          className="cursor-pointer rounded-xl object-cover
                    
                    
                    w-[260px] md:w-[200px] lg:w-[250px] min-[1440px]:w-[290px] 2xl:w-[150px] 
                    h-[260px] md:h-[200px] lg:h-[250px] min-[1440px]:h-[290px] 2xl:h-[150px]"
                        />
                      ) : (
                        <Avatar
                          name={search.name}
                          size="280"
                          className="cursor-pointer rounded-xl object-cover 
                    
                    w-full max-w-[240px] md:max-w-[180px] lg:max-w-[230px] 2xl:max-w-[150px]
                    
                    h-full max-h-[240px] sm:max-h-[260px] md:max-h-[200px] lg:max-h-[250px] 2xl:max-h-[150px] "
                        />
                      )}

                      <h1 className="text-primary_text font-medium font-lato text-xl break-words text-center">
                        {search && search.name}
                      </h1>
                      <button
                        size="xl"
                        leftIcon={
                          <Image
                            src="/img_checkmark_white_a700.svg"
                            width={14}
                            height={14}
                            alt="checkmark"
                            className="h-[14px] w-[14px]"
                          />
                        }
                        className="flex-grow flex items-center justify-center cursor-pointer bg-highlight hover:bg-hover_highlight duration-500 rounded-lg px-4 py-1 font-ubuntu font-medium text-primary_text text-[10px] md:text-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollow(search);
                        }}
                      >
                        {user.following.includes(search._id)
                          ? "Following"
                          : "Follow Back!!"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* My followers */}

        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <h1 className="text-primary_text font-lato text-3xl font-medium">
            My Followers
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-7 text-primary_text">
            {follower && follower.length > 0 ? (
              follower.map((follow, index) => (
                <div
                  key={"myfriends" + index}
                  onClick={() => router.push(`/userprofile/${follow._id}`)}
                  className="flex flex-col items-center justify-center rounded-lg bg-shadow p-5 sm:p-5 gap-y-2"
                >
                  {follow.photo ? (
                    <img
                      src={follow.photo.url}
                      alt="user"
                      className="cursor-pointer rounded-xl object-cover
                    
                      w-[260px] md:w-[200px] lg:w-[250px] min-[1440px]:w-[290px] 2xl:w-[180px] 
                      h-[260px] md:h-[200px] lg:h-[250px] min-[1440px]:h-[290px] 2xl:h-[180px]"
                    />
                  ) : (
                    <Avatar
                      name={follow.name}
                      size="280"
                      className="cursor-pointer rounded-xl object-cover 
                    
                    w-full max-w-[240px] md:max-w-[180px] lg:max-w-[230px] 2xl:max-w-[180px]
                    
                    h-full max-h-[240px] sm:max-h-[260px] md:max-h-[200px] lg:max-h-[250px] 2xl:max-h-[180px] "
                    />
                  )}

                  <h1 className="text-primary_text font-medium font-lato text-xl break-words text-center">
                    {follow && follow.name}
                  </h1>
                  <button
                    leftIcon={
                      <Image
                        src="/img_checkmark_white_a700.svg"
                        width={14}
                        height={14}
                        alt="checkmark"
                        className="h-[14px] w-[14px]"
                      />
                    }
                    className="flex-grow flex items-center justify-center cursor-pointer bg-highlight hover:bg-hover_highlight duration-500 rounded-lg px-4 py-1 font-ubuntu font-medium text-primary_text text-[10px] md:text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollow(follow);
                    }}
                  >
                    {user.following.includes(follow._id)
                      ? "Following"
                      : "Follow Back!!"}
                  </button>
                </div>
              ))
            ) : (
              <p className=" text-secondary_text">You have no followers.</p>
            )}
          </div>
        </div>

        {/* My followings */}

        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <h1 className="text-primary_text font-lato text-3xl font-medium">
            My Followings
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-7 text-primary_text">
            {following.length > 0 ? (
              following.map((fan, index) => (
                <div
                  key={"myfriends" + index}
                  onClick={() => router.push(`/userprofile/${fan._id}`)}
                  className="flex flex-col items-center justify-center rounded-lg bg-shadow p-5 sm:p-5 gap-y-2"
                >
                  {fan.photo ? (
                    <img
                      src={fan.photo.url}
                      alt="user"
                      className="cursor-pointer rounded-xl object-cover
                    
                    w-[260px] md:w-[200px] lg:w-[250px] min-[1440px]:w-[290px] 2xl:w-[180px] 
                    h-[260px] md:h-[200px] lg:h-[250px] min-[1440px]:h-[290px] 2xl:h-[180px]"
                    />
                  ) : (
                    <Avatar
                      name={fan.name}
                      size="280"
                      className="cursor-pointer rounded-xl object-cover 
                    
                    w-full max-w-[240px] md:max-w-[180px] lg:max-w-[230px] 2xl:max-w-[180px]
                    
                    h-full max-h-[240px] sm:max-h-[260px] md:max-h-[200px] lg:max-h-[250px] 2xl:max-h-[180px] "
                    />
                  )}

                  {fan && fan.name && (
                    <h1 className="text-primary_text font-medium font-lato text-xl break-words text-center">
                      {fan.name}
                    </h1>
                  )}

                  <button
                    leftIcon={
                      <Image
                        src="/img_checkmark_white_a700.svg"
                        width={14}
                        height={14}
                        alt="checkmark"
                        className="h-[14px] w-[14px]"
                      />
                    }
                    className="flex-grow flex items-center justify-center cursor-pointer bg-highlight hover:bg-hover_highlight duration-500 rounded-lg px-4 py-1 font-ubuntu font-medium text-primary_text text-[10px] md:text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnfollow(fan);
                    }}
                  >
                    Unfollow
                  </button>
                </div>
              ))
            ) : (
              <p className=" text-secondary_text">You didn't follow anyone.</p>
            )}
          </div>
        </div>

        {/* Whom to follow */}
        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <h1 className="text-primary_text font-lato text-3xl font-medium">
            Whom to follow
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-7 gap-5 text-primary_text">
            {unfollowing && unfollowing.length > 0 ? (
              unfollowing.map((unfollower, index) => (
                <div
                  key={"myfriends" + index}
                  onClick={() => router.push(`/userprofile/${unfollower._id}`)}
                  className="flex flex-col w-full flex-wrap items-center justify-center rounded-lg bg-shadow p-5  gap-x-2 gap-y-2"
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    {unfollower.photo ? (
                      <img
                        src={unfollower.photo.url}
                        alt="avatar"
                        className="rounded-xl object-cover
                       lg:h-[80px]   sm:h-[50px] h-[75px]
                       lg:w-[80px] sm:w-[50px] w-[75px]
                        "
                      />
                    ) : (
                      <Avatar
                        name={unfollower.name}
                        size="80"
                        className="
                        h-full max-h-[75px] sm:max-h-[50px] lg:max-h-[80px] 
                        w-full max-w-[75px] sm:max-w-[50px] lg:max-w-[80px] 
                        
                        
                        
                        rounded-xl object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1">
                    <h1 className="text-primary_text font-medium font-lato text-xl md:text-[1rem]  break-words text-center">
                      {unfollower && unfollower.name}
                    </h1>
                    {/* {unfollower.about && (
                      <p className="text-secondary_text font-normal font-roboto text-base break-words text-center">
                        {unfollower.about}
                      </p>
                    )} */}
                  </div>

                  <Tooltip title="Follow">
                    <button
                      className="w-[28px]  rounded-lg bg-indigo-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(unfollower);
                      }}
                    >
                      <UserAddOutlined />
                    </button>
                  </Tooltip>
                </div>
              ))
            ) : (
              <p className=" text-secondary_text ">You have no followers.</p>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
