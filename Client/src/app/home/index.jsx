"use client";
import React from "react";

import Posts from "@/components/Postcard/Posts";

export default function Home1Page() {
  return (
    <div className="flex w-full h-full min-h-screen bg-background ">
      <div className="flex flex-col flex-1 items-center justify-start gap-[30px]">
        <div className="my-5 flex flex-col flex-1 gap-10  w-full ">
          <Posts />
        </div>
      </div>
    </div>
  );
}
