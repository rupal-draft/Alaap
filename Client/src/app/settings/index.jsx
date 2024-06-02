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
  const coverPhoto =
      "data:image/jpeg;base64,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";

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
          <Heading as="h1" className="!text-gray-800 !font-bold !text-3xl mb-8">
            My Profile Information
          </Heading>

          {/**Form */}
          <form className="flex flex-col gap-6 w-full mb-28">
            {/* Cover Photo Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-60 rounded-lg overflow-hidden">
                {coverPhoto ? (
                  <img
                    src={coverPhoto}
                    alt="Cover Photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>
              <Button
                size="2xl"
                className="w-full"
                //onChange={(e) => setCoverPhoto(e.target.files[0])}
              >
                Upload Cover Photo
              </Button>
            </div>

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
              <Button size="2xl" className="w-full">
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
