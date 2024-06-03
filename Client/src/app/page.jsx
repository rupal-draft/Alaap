import React from "react";
import Link from "next/link";
const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "#232323",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/login"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Login
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/signup"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Signup
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/home1"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Home1
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlepost"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            SinglePost
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/myfriends"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            MyFriends
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/directmessage"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            DirectMessage
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/gallery"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Gallery
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/messages"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Messages
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/myprofile"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            My Profile
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlestory"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Single Story
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/settings"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Settings
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlevideo"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Single Video
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/userprofile"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            User Profile
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/videochat"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Video Chat
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            href="/singlephoto"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Single Photo
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
