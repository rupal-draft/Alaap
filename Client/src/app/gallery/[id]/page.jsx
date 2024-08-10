"use client";
import React, { useState, useEffect, useRef } from "react";
import api from "@/utils/axios";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

export default function Gallery({ params }) {
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex  min-h-screen items-start justify-center gap-5 bg-background">
      <div className="flex flex-col w-[92%] mx-auto items-center justify-center gap-5 py-4">
        <div className="flex flex-col items-start justify-center gap-y-5">
          <div className="flex flex-col w-full items-center py-2 justify-center gap-5">
            <h1 className="text-primary_text font-logo_text text-3xl font-medium">
              Yay! Here is your Gallery
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
            {images &&
              images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  alt={`Image ${index}`}
                  width={400}
                  height={400}
                  className="cursor-pointer h-full lg:h-[450px] w-full lg:w-[450px] rounded-lg"
                  onClick={() => openModal(index)}
                />
              ))}

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={images[selectedImage].url}
                    alt={`Image ${selectedImage}`}
                    layout="fill"
                    objectFit="contain"
                    className="z-10 "
                  />
                  <button
                    className="absolute top-4 z-20 right-4 text-primary_text cursor-pointer text-2xl"
                    onClick={closeModal}
                  >
                    <FaTimes />
                  </button>
                  <button
                    className="absolute left-4 z-20 text-primary_text cursor-pointer text-2xl"
                    onClick={prevImage}
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    className="absolute right-4 z-20 text-primary_text cursor-pointer text-2xl"
                    onClick={nextImage}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
