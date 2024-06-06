"use client";

import MessageLayout from "@/components/Layouts/MessageLayout";
import Logo from "../../../public/images/sociofyLogoTemp.png";
import Image from "next/image";
import React from "react";

const MessagesIndexPage = () => {
  return (
    <MessageLayout>
      <div className="flex flex-col items-center justify-center h-full w-full border-4 border-white-A700">
        <h1 className="text-4xl text-white-A700">
          Welcome to the Messages Index Page
        </h1>

        <div className="w-[60px] py-5 lg:w-[70px]">
          <Image src={Logo} alt="sociofy" className="rounded-full" />
        </div>
      </div>
    </MessageLayout>
  );
};

export default MessagesIndexPage;
