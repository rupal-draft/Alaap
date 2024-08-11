"use client";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <img src="ai-robot.png" className="h-72 w-72" />

      <h1 className="text-4xl font-bold mb-8 text-center text-primary_text">
        Choose an AI Service
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Link href="/ai-chat">
          <div className="cursor-pointer  w-[20rem] sm:w-full p-4 border border-hover_accent duration-500 rounded-lg shadow-md shadow-hover_accent hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2 text-primary_text">
              AI Chat
            </h2>
            <p className=" text-secondary_text">
              Chat with our AI to get answers to your questions.
            </p>
          </div>
        </Link>
        <Link href="/ai-image">
          <div className="cursor-pointer  w-[20rem] sm:w-full p-4 border border-hover_accent duration-500 rounded-lg shadow-md shadow-hover_accent hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2 text-primary_text">
              AI Image Generation
            </h2>
            <p className=" text-secondary_text">
              Generate images using AI based on your descriptions.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
