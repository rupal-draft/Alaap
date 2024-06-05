import React from "react";

const Avatar = ({ imageUrl, name, width, height }) => {
  return (
    <div className="avatar" style={{ width, height }}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="rounded-full" />
      ) : (
        <div
          className="bg-gray-200 rounded-full flex items-center justify-center"
          style={{ width, height }}
        >
          {name[0]}
        </div>
      )}
    </div>
  );
};

export default Avatar;
