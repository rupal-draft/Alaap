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
      <Navbar open={open} setOpen={setOpen} className="lg:px-4 py-4" />
      <div className="flex flex-grow">
        <Sidebar className="hidden lg:block lg:w-1/4" />
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default MessageLayout;
