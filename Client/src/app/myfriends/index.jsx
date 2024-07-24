"use client";
import React, { useEffect, useState } from "react";
import { Button, Img, Text, h1, Input } from "../../components";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";
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
  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [unfollowing, setUnFollowing] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Update state on resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="flex w-full h-full min-h-screen bg-background">
      {/* Nav bar */}
      <Navbar open={open} setOpen={setOpen} />

      <div
        className={`lg:hidden fixed z-30 bottom-0 transition-all duration-700 ${
          open ? "left-[5rem] px-2 py-1" : "left-0 px-2 py-1"
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

      {/* <div className="flex justify-between gap-5"> */}
      <div className="flex flex-col  w-full items-center md:items-start justify-center p-5 pt-10 gap-5">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 text-primary_text">
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
                    
                    w-[260px] md:w-[200px] lg:w-[250px] 
                    h-[260px] md:h-[200px] lg:h-[250px]"
                        />
                      ) : (
                        <Avatar
                          name={search.name}
                          size="280"
                          className="cursor-pointer rounded-xl object-cover 
                    
                    w-full max-w-[240px] md:max-w-[180px] lg:max-w-[230px] 2xl:max-w-[240px]
                    h-full max-h-[240px] sm:max-h-[260px] md:max-h-[200px] lg:max-h-[250px] "
                        />
                      )}

                      <h1 className="text-primary_text font-medium font-lato text-xl break-words text-center">
                        {search && search.name}
                      </h1>
                      <Button
                        size="xl"
                        leftIcon={
                          <Img
                            src="img_checkmark_white_a700.svg"
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
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* My followers */}

        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <h1 className="text-primary_text font-montserrat text-3xl font-bold">
            My Followers
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 text-primary_text">
            {follower &&
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
                    
                    w-[260px] md:w-[200px] lg:w-[250px] 
                    h-[260px] md:h-[200px] lg:h-[250px]"
                    />
                  ) : (
                    <Avatar
                      name={follow.name}
                      size="280"
                      className="cursor-pointer rounded-xl object-cover 
                    
                    w-full max-w-[240px] md:max-w-[180px] lg:max-w-[230px] 2xl:max-w-[240px]
                    h-full max-h-[240px] sm:max-h-[260px] md:max-h-[200px] lg:max-h-[250px] "
                    />
                  )}

                  <h1 className="text-primary_text font-medium font-lato text-xl break-words text-center">
                    {follow && follow.name}
                  </h1>
                  <Button
                    size="xl"
                    leftIcon={
                      <Img
                        src="img_checkmark_white_a700.svg"
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
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* My followings */}

        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <h1 className="text-primary_text font-montserrat text-3xl font-bold">
            My Followings
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 text-primary_text">
            {following.map((fan, index) => (
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
                    
                    w-[260px] md:w-[200px] lg:w-[250px] 
                    h-[260px] md:h-[200px] lg:h-[250px]"
                  />
                ) : (
                  <Avatar
                    name={fan.name}
                    size="280"
                    className="cursor-pointer rounded-xl object-cover 
                    
                    w-full max-w-[240px] md:max-w-[180px] lg:max-w-[230px] 2xl:max-w-[240px]
                    h-full max-h-[240px] sm:max-h-[260px] md:max-h-[200px] lg:max-h-[250px] "
                  />
                )}

                {fan && fan.name && (
                  <h1 className="text-primary_text font-medium font-lato text-xl break-words text-center">
                    {fan.name}
                  </h1>
                )}
                <Button
                  size="xl"
                  leftIcon={
                    <Img
                      src="img_checkmark_white_a700.svg"
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
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Whomto follow */}
        <div className="flex flex-col w-full items-center md:items-start justify-center gap-5">
          <h1 className="text-primary_text font-montserrat text-3xl font-bold">
            Whom to follow
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 text-primary_text">
            {unfollowing &&
              unfollowing.map((unfollower, index) => (
                <div
                  key={"myfriends" + index}
                  onClick={() => router.push(`/userprofile/${unfollower._id}`)}
                  className="flex w-full flex-wrap items-center justify-between rounded-lg bg-shadow p-5  gap-x-2 gap-y-2"
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    {unfollower.photo ? (
                      <img
                        src={unfollower.photo.url}
                        alt="avatar"
                        className="h-[45px] w-[45px] rounded-xl object-cover"
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

                  <div className="flex flex-col items-start gap-1">
                    <h1 className="text-primary_text font-medium font-lato text-xl break-words text-center">
                      {unfollower && unfollower.name}
                    </h1>
                    {unfollower.about && (
                      <p className="text-secondary_text font-normal font-roboto text-base break-words text-center">
                        {unfollower.about}
                      </p>
                    )}
                  </div>

                  <Tooltip title="Follow">
                    <Button
                      className="w-[28px]  rounded-lg bg-indigo-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(unfollower);
                      }}
                    >
                      <UserAddOutlined />
                    </Button>
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
