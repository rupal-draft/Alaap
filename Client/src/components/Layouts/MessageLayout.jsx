import Sidebar from "../MessageSideBar/sidebar";
import React, { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";

const MessageLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid lg:grid-cols-[70px,1fr] h-screen max-h-screen">
      {" "}
      <Navbar open={open} setOpen={setOpen} className="lg:px-4 py-4" />
      <Sidebar className="lg:col-span-1 hidden lg:block" />{" "}
      <main className="lg:col-span-2">{children}</main>{" "}
    </div>
  );
};

export default MessageLayout;
