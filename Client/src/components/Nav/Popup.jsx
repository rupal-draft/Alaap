import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import api from "@/utils/axios";
import { formatDistanceToNow } from "date-fns";
import Avatar from "react-avatar";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

const Popup = ({ setIsOpenPopup, position }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      loadNotifications();
      socket.on("new-notification", (newNotification) => {
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
      });
      return () => {
        socket.off("new-notification");
      };
    }
  }, [user]);
  const loadNotifications = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications`
    );
    setNotifications(data);
  };

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
            {notifications.map((notification, index) => {
              const imageUrl =
                notification.post?.image?.url || notification.user?.photo?.url;
              console.log(notification.createdAt);
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-x-2 py-2"
                >
                  <div className="flex items-center justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        width={70}
                        height={70}
                        alt="sidebarlogo"
                        className="rounded-full"
                      />
                    ) : (
                      <Avatar
                        name={notification.user?.name}
                        size="70"
                        round={true}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex w-full">
                      <p>{notification.text}</p>
                    </div>
                    <p>
                      {/* {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })} */}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
