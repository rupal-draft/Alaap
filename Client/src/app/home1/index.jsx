"use client";
import React, { useState, useEffect } from "react";

// calling navbar
import Navbar from "../../components/Nav/Navbar";
import Posts from "@/components/Postcard/Posts";
// icons
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

export default function Home1Page() {
  const [open, setOpen] = useState(false);
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

      {/* main screen */}
      <div className="flex flex-col flex-1 items-center justify-start gap-[30px]">
        <div className="my-5 flex flex-col flex-1 gap-10 w-full px-5">
          {/* Posts */}
          <Posts />
        </div>
      </div>
    </div>
  );
}
