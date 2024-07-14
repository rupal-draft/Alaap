"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Img } from "@/components";

import landingBgImg from "../../public/images/landingbg.jpg";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col  justify-center p-5 bg-background text-primary_text ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${landingBgImg.src})`, // Use the URL format
          filter: "blur(5px)",
          zIndex: 0,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="flex absolute z-10  top-2 items-center gap-x-3 justify-center">
        <Link
          href="/"
          className=" flex  items-center justify-center gap-x-2 cursor-pointer"
        >
          {" "}
          <Img
            src="sociofyLogoTemp.png"
            width={50}
            height={50}
            alt="headerlogo"
            className="h-[50px] w-[50px] object-cover rounded-full"
          />
        </Link>
        <h2 className="text-4xl text-primary_text font-logo_text  font-bold ">
          Sociofy
        </h2>
      </div>

      <div className="flex absolute z-10 right-5 bottom-2 items-center justify-between ">
        <div className="flex flex-col  items-center justify-center">
          <div className="flex items-center justify-center gap-x-2 font-bold  text-base sm:text-xs md:text-base lg:text-lg font-lato">
            <Link
              className="text-highlight hover:text-highlight_hover"
              href="/privacy"
            >
              Privacy
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              href="/disclaimer"
            >
              Disclaimer
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              href="/sitemap"
            >
              Sitemap
            </Link>
          </div>
          <div className=" text-base sm:text-sm lg:text-base text-primary-text font-semibold font-open_sans text-center">
            <p>© 2024 Sociofy. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col z-10 items-center lg:flex-row justify-center gap-x-[5rem] min-h-[50vh] ">
        {/* left */}
        <div>
          <Img
            src="blob.png"
            width={425}
            height={425}
            alt="headerlogo"
            className="h-[425px] w-[425px] object-cover "
          />
        </div>
        {/* right */}
        <div className="flex flex-col text-center lg:text-left max-w-xl gap-y-5">
          <h1 className="text-6xl font-bold font-montserrat  text-primary_text">
            <span>Let's create your own social verse </span>
          </h1>
          <p className="text-lg font-open_sans">
            Sociofy is a user-friendly social media app with a beautiful,
            responsive UI. It offers features like posting videos, photos, and
            stories, and allows users to like, comment, and receive
            notifications. Enjoy real-time chat, a personal profile showcasing
            your posts and followers, and a personalized settings page to modify
            your profile.
          </p>
          <div className="flex items-center justify-center w-full gap-x-10 text-primary_text">
            <div>
              <Link
                href="/login"
                className="px-7 font-semibold py-1 tracking-widest rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu w-full text-xl  focus:ring-highlight"
              >
                Login
              </Link>{" "}
            </div>
            <div>
              <Link
                href="/signup"
                className="px-7 font-semibold py-1 tracking-widest rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu w-full text-xl  focus:ring-highlight"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

{
  /* <ul style={{ listStyle: "none", padding: "0" }}>
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
      </ul> */
}
