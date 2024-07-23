import React from "react";

const Avatar = ({ imageUrl, name, width, height, round }) => {
  return (
    <div
      className={`avatar w-full ${round ? "rounded-full" : ""}`}
      style={{ width, height }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-full object-cover ${
            round ? "rounded-full" : ""
          }`}
        />
      ) : (
        <div
          className={`bg-secondary_text text-background w-full h-full ${
            round ? "rounded-full" : ""
          } flex items-center justify-center`}
          style={{ width, height }}
        >
          {name[0]}
        </div>
      )}
    </div>
  );
};

export default Avatar;
