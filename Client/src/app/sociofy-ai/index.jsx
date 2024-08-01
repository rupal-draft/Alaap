"use client";
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Choose an AI Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/ai-chat">
          <div className="cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">AI Chat</h2>
            <p className="text-gray-600">Chat with our AI to get answers to your questions.</p>
          </div>
        </Link>
        <Link href="/ai-image">
          <div className="cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">AI Image Generation</h2>
            <p className="text-gray-600">Generate images using AI based on your descriptions.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
