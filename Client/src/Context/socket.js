"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const socketConnection = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        auth: { token },
      });
      setSocket(socketConnection);
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
