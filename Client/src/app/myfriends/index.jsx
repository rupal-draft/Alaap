"use client";
import React, { useEffect, useState } from "react";
import { Button, Img, Text, Heading, Input } from "../../components";
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

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

export default function MyFriendsPage() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = useState(true);
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
    <div className="w-full bg-gray-100">
      <div className="flex justify-between gap-5">
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

        <div className="flex w-[84%] items-center justify-center gap-[30px] md:w-full md:flex-col md:p-10">
          <div className="flex flex-1 flex-col gap-[60px] md:self-stretch sm:gap-[30px]">
            <form
              className="flex flex-col items-center justify-center gap-[13px] rounded-[12px] bg-white-A700 p-3 md:flex-row"
              onSubmit={searchUser}
            >
              <input
                size="sm"
                shape="square"
                name="search"
                placeholder={`Search in social…`}
                prefix={
                  <Img
                    src="img_rewind.svg"
                    width={18}
                    height={18}
                    alt="rewind"
                    className="h-[18px] w-[18px]"
                  />
                }
                className="flex-grow gap-[15px] md:p-5 sm:pr-5"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setResult([]);
                }}
              />
              <button className="hover:font-semibold" type="submit">
                Search
              </button>
            </form>
            {result.length > 0 && (
              <>
                <div className="flex flex-col gap-10">
                  <div className="flex items-start justify-between gap-5 pr-[9px]">
                    <Heading size="2xl" as="h2" className="!text-black">
                      Search Result
                    </Heading>
                  </div>
                  <div className="grid grid-cols-2 justify-center gap-[30px] md:grid-cols-4">
                    {result.map((search, index) => (
                      <div
                        key={"myfriends" + index}
                        onClick={() =>
                          router.push(`/userprofile/${search._id}`)
                        }
                        className="flex w-full flex-col items-center justify-center rounded-[12px] bg-white-A700 p-[37px] sm:p-5"
                      >
                        {search.photo ? (
                          <img
                            src={search.photo.url}
                            width={58}
                            height={58}
                            alt="user"
                            className="h-[58px] w-[58px] rounded-[18px] object-cover"
                          />
                        ) : (
                          <Avatar
                            name={search.name}
                            size="58"
                            round="18px"
                            className="h-[58px] w-[58px] object-cover"
                          />
                        )}
                        <Heading as="p" className="!text-black">
                          {search && search.name}
                        </Heading>
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
                          className="mt-[15px] min-w-[84px] gap-[3px] bg-indigo-400 text-primary_text rounded font-medium"
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

            <div className="flex flex-col gap-10">
              <div className="flex items-start justify-between gap-5 pr-[9px]">
                <Heading size="2xl" as="h2" className="!text-black">
                  My Followers
                </Heading>
              </div>
              <div className="grid grid-cols-2 justify-center gap-[30px] md:grid-cols-4">
                {follower &&
                  follower.map((follow, index) => (
                    <div
                      key={"myfriends" + index}
                      onClick={() => router.push(`/userprofile/${follow._id}`)}
                      className="flex w-full flex-col items-center justify-center bg-white-A700 p-[37px] sm:p-5"
                    >
                      {follow.photo ? (
                        <img
                          src={follow.photo.url}
                          alt="user"
                          className="cursor-pointer rounded-full w-[8rem] h-[8rem] border-2 object-cover"
                        />
                      ) : (
                        <Avatar
                          name={follow.name}
                          size="128"
                          className="cursor-pointer rounded-full w-[8rem] h-[8rem] border-2 border-black"
                          style={{ border: "0px" }}
                        />
                      )}
                      <Heading as="p" className="!text-black">
                        {follow && follow.name}
                      </Heading>
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
                        className="mt-[15px] min-w-[84px] gap-[3px] bg-indigo-400 text-primary_text rounded font-medium"
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
            <div className="flex flex-col gap-10">
              <div className="flex items-start justify-between gap-5 pr-[9px]">
                <Heading size="2xl" as="h2" className="!text-black">
                  My Following
                </Heading>
              </div>
              <div className="grid grid-cols-2 justify-center gap-[30px] md:grid-cols-4">
                {following.map((fan, index) => (
                  <div
                    key={"myfriends" + index}
                    onClick={() => router.push(`/userprofile/${fan._id}`)}
                    className="flex w-full flex-col items-center justify-center rounded-[12px] bg-white-A700 p-[37px] sm:p-5"
                  >
                    {fan.photo ? (
                      <img
                        src={fan.photo.url}
                        width={58}
                        height={58}
                        alt="billy_green"
                        className="h-[58px] w-[58px] rounded-[18px] object-cover"
                      />
                    ) : (
                      <Avatar
                        name={fan.name}
                        size="58"
                        round="18px"
                        className="h-[58px] w-[58px] object-cover"
                      />
                    )}
                    {fan && fan.name && (
                      <Heading as="p" className="!text-black">
                        {fan.name}
                      </Heading>
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
                      className="mt-[15px] min-w-[84px] gap-[3px] bg-indigo-400 text-primary_text rounded font-medium"
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
          </div>

          {/**Who to follow section **/}
          <div className="flex flex-col w-full">
            <Heading size="2xl" as="h2" className="!text-black">
              Who to follow
            </Heading>
            <div className="grid grid-cols-2 justify-center gap-[30px] md:grid-cols-4">
              {unfollowing &&
                unfollowing.map((unfollower, index) => (
                  <div
                    key={"myfriends" + index}
                    onClick={() =>
                      router.push(`/userprofile/${unfollower._id}`)
                    }
                    className="flex w-full flex-row items-center justify-between rounded-[12px] bg-white-A700  sm:p-5"
                  >
                    <div className="flex items-center gap-2.5">
                      {unfollower.photo ? (
                        <img
                          src={unfollower.photo.url}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                      ) : (
                        <Avatar
                          name={unfollower.name}
                          size="38"
                          round="12px"
                          className="h-[38px] w-[38px] object-cover"
                        />
                      )}
                      <div className="flex flex-col items-start gap-[3px]">
                        <Heading as="p" className="!text-black">
                          {unfollower && unfollower.name}
                        </Heading>
                        {unfollower.about && (
                          <Text as="p" className="!text-black">
                            {unfollower.about}
                          </Text>
                        )}
                      </div>
                    </div>
                    <Tooltip title="Follow">
                      <Button
                        className="w-[28px] self-end rounded-lg bg-indigo-400"
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
      </div>
    </div>
  );
}
