"use client";
import React, { useEffect, useState } from "react";

import { Post } from "@/components/Postcard/Post";
import { POSTS_BY_USER_QUERY } from "@/graphql/query";
import { useQuery } from "@apollo/client";

export default function MyGallery() {
  const [posts, setPosts] = useState([]);
  const { data } = useQuery(POSTS_BY_USER_QUERY);

  useEffect(() => {
    if (data) {
      setPosts(data.postsByUser);
    }
  }, [data]);

  return (
    <div className="flex  min-h-screen items-start justify-center gap-5 bg-background">
      <div className="flex flex-col w-[92%] mx-auto items-center justify-center gap-5 py-4">
        <div className="flex flex-col items-start justify-center gap-y-5">
          <div className="flex flex-col w-full items-center py-2 justify-center gap-5">
            <h1 className="text-primary_text font-logo_text text-3xl font-medium">
              Yay! Here is your Gallery
            </h1>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px] w-full">
            {posts &&
              posts.map((post, index) => <Post post={post} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
