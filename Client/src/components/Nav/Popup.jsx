import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Img } from "..";

export const notificationData = [
  {
    userImg: "pratik.jpg",
    userName: "Pratik Biswas",
    userContent: "started following you",
    notificationTime: "1d",
  },
  {
    userImg: "pratik.jpg",
    userName: "Pratik Biswas",
    userContent: "started following you",
    notificationTime: "1d",
  },
  {
    userImg: "pratik.jpg",
    userName: "Pratik Biswas",
    userContent: "started following you",
    notificationTime: "1d",
  },
  {
    userImg: "pratik.jpg",
    userName: "Pratik Biswas",
    userContent: "started following you",
    notificationTime: "1d",
  },
  {
    userImg: "pratik.jpg",
    userName: "Pratik Biswas",
    userContent: "started following you",
    notificationTime: "1d",
  },
  {
    userImg: "pratik.jpg",
    userName: "Pratik Biswas",
    userContent: "started following you",
    notificationTime: "1d",
  },
  // Add more data as needed
];

const Popup = ({ setIsOpenPopup, position }) => {
  return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-start"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bg-red-50 rounded-lg w-[400px] max-h-[400px] overflow-visible"
        style={{
          animation: "dropTop .3s linear",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="fixed bg-white-A700 w-[400px] text-center rounded-r-lg  p-3 self-stretch justify-between items-center flex">
          <h1 className="">Notification</h1>
          <div
            onClick={setIsOpenPopup.bind(this, false)}
            className="cursor-pointer absolute top-0 right-0"
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="absolute top-2 -left-3 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[16px] border-t-white-A700 border-l-[15px] border-l-transparent"></div>

        {/* Content wrapper with overflow-y-auto */}
        <div className="max-h-[400px] overflow-y-auto">
          {/* body */}
          <div className="gap-y-3 my-10">
            {notificationData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-x-2 py-2"
              >
                {/* img */}
                <div className="flex items-center justify-center">
                  <Img
                    src={item.userImg}
                    width={70}
                    height={70}
                    alt="sidebarlogo"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full">
                    <p>
                      <span> {item.userName} </span> {item.userContent}
                    </p>
                  </div>
                  <p>{item.notificationTime} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
