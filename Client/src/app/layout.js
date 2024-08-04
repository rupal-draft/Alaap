"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";
import ApolloProviderWrapper from "@/utils/apolloWrapper";
import "./globals.css";
import Navbar from "@/components/Nav/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  const noNavbarRoutes = ["/", "/login", "/signup", "/forgot-password"];
  const shouldRenderNavbar =
    !noNavbarRoutes.includes(pathname) &&
    !pathname.startsWith("/reset-password/");

  useEffect(() => {
    // Set the title of the page
    document.title = "Sociofy";
  }, [pathname]);

  return (
    <html lang="en">
      <body className="h-screen flex">
        <ApolloProviderWrapper>
          <StoreProvider>
            <ToastContainer />
            {shouldRenderNavbar && <Navbar open={open} setOpen={setOpen} />}
            <main className="flex-grow overflow-auto">{children}</main>
            {shouldRenderNavbar && (
              <div
                className={` cursor-pointer fixed z-30 bottom-1 transition-all duration-700 ${
                  open ? "left-[5rem] px-2 py-1" : "left-0 px-2 py-1"
                }`}
              >
                <h1
                  className="text-2xl bg-hover_accent text-shadow p-2 rounded-lg font-semibold transition-transform duration-700"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {open ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
                </h1>
              </div>
            )}
          </StoreProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
