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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8">AI Image Generation</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a prompt to generate an image"
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <input
                    type="number"
                    value={numImages}
                    onChange={(e) => setNumImages(e.target.value)}
                    placeholder="Enter the number of images to generate (1-5)"
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-lg"
                    disabled={loading}>
                    {loading ? "Generating..." : "Generate Image"}
                </button>
            </form>
            <div className={`grid grid-cols-${numImages} gap-4`}>
                {generatedImages.map((image, index) => (
                    <div
                        key={index}
                        className="relative border rounded-lg overflow-hidden">
                        <img
                            src={image}
                            alt={`Generated ${index}`}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => handleDownload(image)}
                            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg">
                            <AiOutlineDownload className="text-blue-500" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AIImagePage;