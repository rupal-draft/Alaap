import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const PopupStories = ({ onClose, content, StoryLike, StoryUnlike }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < content.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const visibleStories = (index) => {
    if (window.innerWidth >= 768) {
      return content.slice(index, index + 1); // Show 1 stories for md and larger screens
    } else {
      return content.slice(index, index + 1); // Show 1 story for mobile screens
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
      <div>
        <div className="flex justify-end text-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary_text"
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex items-center bg-shadow rounded-lg max-w-[20rem] md:max-w-full relative">
          <button
            onClick={scrollLeft}
            className="absolute z-10 px-1 left-0 rounded-full text-3xl hover:text-hover_accent text-accent "
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={scrollRight}
            className="absolute z-10 px-1 right-0 rounded-full text-3xl hover:text-hover_accent text-accent "
          >
            <IoIosArrowForward />
          </button>

          <div className="flex flex-col md:flex-row w-full items-start justify-between gap-x-5 p-5">
            {visibleStories(currentIndex).map((story, index) => (
              <div key={index} className="flex w-full flex-col">
                <div className="flex flex-col items-center">
                  <div
                    className="flex flex-col p-2 items-center justify-center gap-y-3 
                    w-[270px] h-[270px]
                    min-[360px]:w-[280px] min-[360px]:h-[280px]
                   
                    md:w-[350px] md:h-[350px]
                    lg:w-[450px] lg:h-[450px]
                    xl:w-[550px] xl:h-[550px]
                    2xl:w-[650px] 2xl:h-[650px]"
                  >
                    <div className="flex items-center justify-center w-[90%] h-[90%]">
                      <img
                        src={story.image?.url}
                        alt="User"
                        className="w-full h-full bg-contain bg-no-repeat bg-center rounded-xl"
                      />
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <p className="text-primary_text text-lg font-semibold max-w-full">
                        {story.postedBy?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
