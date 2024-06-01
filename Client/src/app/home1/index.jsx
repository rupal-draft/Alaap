"use client";
import React, { useState, useEffect } from "react";

// calling navbar
import Navbar from "../../components/Nav/Navbar";
import Posts from "@/components/Postcard/Posts";
// icons
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

export default function Home1Page() {
  const [open, setOpen] = useState(true);
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
    <div className="flex w-full items-start justify-between gap-5 bg-background ">
      {/* Nav bar */}
      <Navbar open={open} setOpen={setOpen} />

      <div
        className={`lg:hidden fixed z-50 bottom-0 transition-all duration-700 ${
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

      {/* main screen */}
      <div className="flex w-[100%] items-start justify-center gap-[30px] md:w-full md:flex-col ">
        <div className="mt-5  flex flex-1 flex-col gap-10 ">
          {/* search bar */}
          {/* <div className="flex items-center justify-center gap-[13px] h-10 lg:h-12  rounded-[12px] bg-[#cdcdcd] p-3">
            <Input
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
                  className="h-[18px] w-[18px] cursor-pointer"
                />
              }
              className="flex-grow gap-[15px] md:p-5 "
            />
            <Heading size="s" as="h1" className="text-[1.5rem] !text-gray-500">
              <Link href="\">
                <div className="flex flex-col items-center justify-center relative group w-full">
                  <div className="absolute top-[-35px] hidden group-hover:flex">
                    <div className="bg-[#000] relative flex text-[#fff] items-center p-[6px] rounded-[3px]">
                      
                      <div className="text-[12px] leading-none font-semibold capitalize flex-grow text-center relative">
                        Filter
                        
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-t-[10px] border-t-black border-x-[8px] border-x-transparent "></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center cursor-pointer rounded-lg  text-2xl text-[#fff]">
                    <FaFilter />
                  </div>
                </div>
              </Link>
            </Heading>
          </div> */}

          {/* Posts */}
          <Posts />
        </div>
      </div>
    </div>
  );
}
