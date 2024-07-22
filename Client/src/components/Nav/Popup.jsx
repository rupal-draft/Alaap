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
      className="fixed inset-0  flex items-start justify-start"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bg-background2 rounded-lg w-[250px] sm:w-[400px] max-h-[400px] overflow-visible z-50 "
        style={{
          animation: "dropTop .3s linear",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="fixed bg-background2 text-primary_text w-[250px] sm:w-[400px] text-lg font-semibold font-ubuntu text-center rounded-tr-lg  border-b-hover_highlight border-b-[1px]  p-3 self-stretch justify-between items-center flex">
          <h1 className="">Notifications</h1>
          <div
            onClick={setIsOpenPopup.bind(this, false)}
            className="cursor-pointer absolute  right-3"
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="absolute top-2 -left-3 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[16px] border-t-background2 border-l-[15px] border-l-transparent"></div>

        {/* Content wrapper with overflow-y-auto */}
        <div className="max-h-[400px] overflow-y-auto">
          {/* body */}
          <div className=" pt-11">
            {notifications.map((notification, index) => {
              const imageUrl =
                notification.post?.image?.url || notification.user?.photo?.url;
              console.log(notification.createdAt);
              return (
                <div
                  key={index}
                  className="flex text-secondary_text hover:text-primary_text hover:bg-hover_highlight  items-center gap-x-2 p-2"
                >
                  <div className="flex items-center justify-center ">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="sidebarlogo"
                        className="rounded-full w-12 h-12 sm:w-20 sm:h-20"
                      />
                    ) : (
                      <Avatar
                        name={notification.user?.name}
                        // size="70"
                        // round={true}
                        className="rounded-full w-12 h-12 sm:w-20 sm:h-20"
                      />
                    )}
                  </div>
                  <div className="flex w-[170px] sm:w-[320px]  text-sm sm:text-base flex-col font-medium font-lato ">
                    <p>{notification.text}</p>
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
