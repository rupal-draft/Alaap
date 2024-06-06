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
    <div className="flex h-screen max-h-screen">
      <Navbar
        open={open}
        setOpen={setOpen}
        className="w-[70px] lg:w-[240px] px-4 py-4"
      />
      <Sidebar className="w-[70px] lg:w-[240px] hidden lg:block" />
      <main className="flex-1 ">{children}</main>
    </div>
  );
};

export default MessageLayout;
