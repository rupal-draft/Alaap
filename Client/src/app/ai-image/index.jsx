"use client";
import fastapi from "@/utils/fastapi";
import React, { useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

const AIImagePage = () => {
  const [prompt, setPrompt] = useState("");
  const [numImages, setNumImages] = useState(1);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fastapi.post("/image/ai-image", {
        text: prompt,
        num_images: numImages,
      });
      setGeneratedImages(response.data.image_urls);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setNumImages(1);
    setGeneratedImages([]);
  };

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "generated_image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the temporary URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <img
        src="https://images.tech.co/wp-content/uploads/2024/02/20074049/AdobeStock_583862221-1.jpeg"
        alt="AI image"
        className=" h-full sm:h-[60%] lg:h-[30%] w-full sm:w-[60%] lg:w-[30%] mb-4 rounded-lg"
      />
      <h1 className="text-4xl font-bold text-center mb-8 text-primary_text">
        AI Image Generation
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center gap-5 mb-8"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt to generate an image"
          className="w-full text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-hover_accent text-primary_text"
        />
        <input
          type="text"
          value={numImages}
          onChange={(e) => setNumImages(e.target.value)}
          placeholder="Enter the number of images to generate (1-3)"
          min="1"
          max="3"
          className="w-full text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-hover_accent text-primary_text"
        />
        <button
          type="submit"
          className="w-full p-2 flex-grow flex items-center justify-center cursor-pointer border bg-hover_accent hover:bg-accent duration-500 rounded-lg  border-shadow text-primary_text"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full p-2 flex-grow flex items-center justify-center cursor-pointer  bg-red-500 hover:bg-red-700 duration-500 rounded-lg  text-primary_text"
        >
          Reset
        </button>
      </form>
      {/* <div className={`grid grid-cols-${numImages} gap-4`}>
        {generatedImages.map((image, index) => (
          <div
            key={index}
            className="relative border rounded-lg overflow-hidden"
          >
            <img
              src={image}
              alt={`Generated ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleDownload(image)}
              className="absolute bottom-2 right-2 bg-shadow p-1 rounded-full text-xl"
            >
              <AiOutlineDownload className="text-primary_text" />
            </button>
          </div>
        ))}
      </div> */}

      <div className={`grid grid-cols-1 gap-4 mb-10`}>
        <img
          src="https://imgv3.fotor.com/images/side/ai-generate-watercolor-fairy-from-text-with-Fotor-ai-image-generator.jpg"
          className=" w-full h-full "
        />
        <img
          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          className=" w-full h-full "
        />
      </div>
    </div>
  );
};

export default AIImagePage;
