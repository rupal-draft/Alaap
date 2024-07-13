"use client";

import React from "react";
import Link from "next/link";
import { Img } from "@/components";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "#232323",
        color: "white",
      }}
    >
      <div className="flex items-center justify-between">
        <div className=" flex  items-center justify-center gap-x-2">
          <Img
            src="sociofyLogoTemp.png"
            width={50}
            height={50}
            alt="headerlogo"
            className="h-[50px] w-[50px] object-contain rounded-full"
          />
          <h2 className="text-4xl text-primary_text font-montserrat  font-bold ">
            Sociofy
          </h2>
        </div>
        <div className="flex items-center justify-between gap-x-3">
          <div>
            <Link
              href="/login"
              className="px-4 text-white py-2 rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu  focus:ring-highlight"
            >
              Login
            </Link>{" "}
          </div>
          <div>
            <Link
              href="/signup"
              className="px-4 text-white py-2 rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu  focus:ring-highlight"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/home1"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Home1
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlepost"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            SinglePost
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/myfriends"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            MyFriends
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/mygallery"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            MyGallery
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/directmessage"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            DirectMessage
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/messages"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Messages
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/myprofile"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            My Profile
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlestory"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Single Story
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/settings"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Settings
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlevideo"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Single Video
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/userprofile"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            User Profile
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/videochat"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Video Chat
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlephoto"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Single Photo
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
