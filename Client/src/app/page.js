"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import landingBgImg from "../../public/landingbg.jpg";
import HeaderFooter from "@/components/HeaderFooter";
export default function Home() {
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

      <HeaderFooter />

      <div className="flex flex-col z-10 items-center lg:flex-row justify-center gap-x-[2rem] xl:gap-x-[5rem] min-h-[50vh] ">
        {/* left */}
        <div>
          <Image
            src="/blob.png"
            width={425}
            height={425}
            alt="headerlogo"
            className="object-cover 
            xl:h-[425px] h-[200px] md:h-[320px] 
            xl:w-[425px] w-[200px] md:w-[320px] "
          />
        </div>
        {/* right */}
        <div className="flex flex-col text-center lg:text-left max-w-xl gap-y-5">
          <h1
            className="xl:text-6xl md:text-5xl text-2xl
          font-bold font-montserrat  text-primary_text"
          >
            <span>Let's create your own social verse </span>
          </h1>
          <p className="xl:text-lg md:text-lg text-[0.8rem] font-open_sans">
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
                className="md:px-7 px-5 font-semibold py-1 tracking-widest rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu w-full text-xl  focus:ring-highlight"
              >
                Login
              </Link>{" "}
            </div>
            <div>
              <Link
                href="/signup"
                className="md:px-7 px-5 font-semibold py-1 tracking-widest rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu w-full text-xl  focus:ring-highlight"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
