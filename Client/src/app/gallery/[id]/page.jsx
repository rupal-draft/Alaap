"use client";
import React, { useState, useEffect, useRef } from "react";
import api from "@/utils/axios";

export default function Gallery({ params }) {
  const [open, setOpen] = useState(true);
  const { id } = params;
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages(id);
  }, [id]);
  const loadImages = async (id) => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user-images/${id}`
    );
    setImages(data);
  };

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
  console.log(images);
  return (
    <div className="flex  min-h-screen items-start justify-center gap-5 bg-background">
      <div className="flex flex-col w-[92%] mx-auto items-center justify-center gap-5 py-4">
        <div className="flex flex-col items-start justify-center gap-y-5">
          <div className="flex flex-col w-full items-center py-2 justify-center gap-5">
            <h1 className="text-primary_text font-logo_text text-3xl font-medium">
              Yay! Here is your Gallery
            </h1>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px] w-full"></div>
        </div>
      </div>
    </div>
  );
}
