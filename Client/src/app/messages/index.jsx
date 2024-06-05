"use client";

import MessageLayout from "@/components/Layouts/MessageLayout";
import React from "react";

const MessagesIndexPage = () => {
  return (
    <MessageLayout>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl text-white">
          Welcome to the Messages Index Page
        </h1>
        <img src="/path/to/default-image.jpg" alt="Default Image" />
      </div>
    </MessageLayout>
  );
};

export default MessagesIndexPage;
