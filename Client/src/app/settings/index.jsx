"use client";
import React, { useState } from "react";
import { Heading, Button, Img, Input } from "../../components";
import Navbar from "@/components/Nav/Navbar";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function SettingsPage() {
  const [open, setOpen] = useState(true);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-row items-start justify-between gap-5 md:flex-col">
        {/**Sidebar */}
        <Navbar open={open} setOpen={setOpen} />
        <div
          className={`md:hidden fixed z-50 bottom-0 transition-all duration-700 ${
            open ? "left-[4.5rem] px-2 py-1" : "left-0 p-1"
          }`}
        >
          <h1
            className="text-2xl bg-gray-50 p-2 rounded-xl font-semibold transition-transform duration-700"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
          </h1>
        </div>

        {/* User Information Section */}
        <div className="flex flex-col md:w-[70%] px-auto mx-auto items-center justify-between">
          <Heading as="h1" className="text-gray-800 !font-bold !text-3xl mb-8">
            My Profile Information
          </Heading>

          {/**Form */}
          <form className="flex flex-col gap-6 w-full mb-28">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                  //src="img_avatar_108x108.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button size="3xl" className="w-full">
                Upload Profile Picture
              </Button>
            </div>

            <div>
              <Heading size="small" className="text-gray-600">
                Full Name
              </Heading>
              <Input
                shape="rounded"
                type="text"
                name="fullName"
                placeholder="Rohan Gill..."
                className="w-full"
              />
            </div>
            <div>
              <Heading size="small" className="text-gray-600">
                Email Address
              </Heading>
              <Input
                shape="rounded"
                type="email"
                name="email"
                placeholder="rohangill@gmail.com..."
                className="w-full"
              />
            </div>
            <div>
              <Heading size="small" className="text-gray-600">
                Old Password
              </Heading>
              <Input
                shape="rounded"
                type="password"
                name="oldpassword"
                placeholder="Rohan@12345..."
                className="w-full"
              />
            </div>
            <div>
              <Heading size="small" className="text-gray-600">
                New Passwo
              </Heading>
              <Input
                shape="rounded"
                type="password"
                name="newpassword"
                placeholder="Rohan@98765..."
                className="w-full"
              />
            </div>
            <div>
              <Heading size="small" className="text-gray-600">
                About
              </Heading>
              <Input
                shape="rounded"
                type="text"
                name="about"
                placeholder="3517 Prabhakar St., Patna, India..."
                className="w-full"
              />
            </div>

            <Button type="submit" size="3xl" className="w-auto !bg-indigo-400">
              Save and Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
