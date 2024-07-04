"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import Navbar from "@/components/Nav/Navbar";
import { Post } from "@/components/Postcard/Posts";
import { useSelector } from "react-redux";
import api from "@/utils/axios";
import Avatar from "react-avatar";
import Link from "next/link";

export default function MyProfilePage() {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state.user);

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

  return (
    <div className="flex items-start justify-center gap-5 bg-background">
      {/* Nav bar */}
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

      <div className="flex items-center justify-center gap-5 md:w-full flex-col md:py-2 mr-5">
        <div className="mt-6 flex flex-col gap-10">
          {/* rest contents */}

          <div className="flex flex-col items-start justify-center gap-y-5">
            Hi
          </div>
        </div>
      </div>
    </div>
  );
}
