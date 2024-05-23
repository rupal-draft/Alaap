import React from "react";
import "@/styles/tailwind.css";
import "../styles/index.css";
import "../styles/font.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StoreProvider>
          <ToastContainer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
export default RootLayout;
