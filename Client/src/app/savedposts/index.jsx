"use client";
import React from "react";

export default function MySavedPosts() {
  return (
    <div className="flex  min-h-screen items-start justify-center gap-5 bg-background">
      <div className="flex flex-col w-[92%] mx-auto items-center justify-center gap-5 py-4">
        <h1 className="text-primary_text font-logo_text text-3xl font-medium">
          Your Saved posts
        </h1>
      </div>
    </div>
  );
}
