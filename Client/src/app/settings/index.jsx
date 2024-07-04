"use client";

import React, { useRef, useState, useEffect } from "react";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Heading, Button } from "../../components";
import Navbar from "@/components/Nav/Navbar";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import api from "@/utils/axios";
import { setCredentials } from "@/Context/Slices/authSlice";

export default function SettingsPage() {
  const [open, setOpen] = useState(true);
  const [photo, setPhoto] = useState({});
  const [coverphoto, setCoverPhoto] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const photoInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [final, setFinal] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
        formData
      );
      setPhoto(data);
    } catch (e) {
      console.error(e);
      toast.error("Image upload failed!");
    }
  };

  const handleCoverPhotoUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
        formData
      );
      setCoverPhoto(data);
    } catch (e) {
      console.error(e);
      toast.error("Image upload failed!");
    }
  };

  const handleCoverRemove = async () => {
    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/remove-image`,
        {
          image: coverphoto,
        }
      );
      if (data.status) {
        setCoverPhoto({});
        coverInputRef.current.value = "";
        toast.error("Cover Photo removed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePhotoRemove = async () => {
    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/remove-image`,
        {
          image: photo,
        }
      );
      if (data.status) {
        setPhoto({});
        photoInputRef.current.value = "";
        toast.error("Photo removed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/profile-update`,
        {
          email,
          password,
          name,
          currentPassword,
          photo,
          coverphoto,
          about,
        }
      );

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setEmail("");
        setPassword("");
        setAbout("");
        setCoverPhoto({});
        setName("");
        setPhoto({});
        setCurrentPassword("");
        photoInputRef.current.value = "";
        coverInputRef.current.value = "";
        setFinal(data);
        dispatch(setCredentials(data.user));
        toast.success("Updated!!");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center gap-5 bg-background">
      {/* Nav bar */}
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

      <div className="flex flex-col w-[70%] px-auto mx-auto items-center justify-center gap-5 md:py-4 ">
        <Heading as="h1" className=" text-primary_text !font-bold !text-3xl ">
          My Profile Information
        </Heading>

        <form
          className="flex flex-col items-center gap-y-10 rounded-xl p-[18px] bg-shadow "
          onSubmit={handleSubmit}
        >
          {/* image form */}
          <div className="relative flex flex-col items-start gap-4">
            {/* upload cover photo */}
            <div className="w-[85rem] h-[20rem] rounded-lg overflow-hidden">
              {isClient && coverphoto?.url ? (
                <img
                  src={coverphoto.url}
                  alt="Cover Photo"
                  className="w-full h-full object-cover"
                />
              ) : isClient && final?.user?.coverphoto?.url ? (
                <img
                  src={final.user.coverphoto.url}
                  alt="Cover Photo"
                  className="w-full h-full object-cover"
                />
              ) : isClient && user?.coverphoto?.url ? (
                <img
                  src={user.coverphoto.url}
                  alt="Cover Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span>Cover Photo</span>
                </div>
              )}
            </div>

            <div className="mt-1 flex flex-col items-start space-x-2">
              <label
                htmlFor="coverImage"
                className="cursor-pointer bg-highlight hover:bg-hover_highlight text-primary_text font-bold py-2 px-4 rounded-lg text-[10px] md:text-base"
              >
                Upload your cover photo
              </label>
              <input
                onChange={handleCoverPhotoUpload}
                type="file"
                accept="image/*"
                id="coverImage"
                name="coverImage"
                ref={coverInputRef}
                className="hidden"
              />
              {coverphoto && coverphoto.url && (
                <div className="flex items-center space-x-2">
                  <span className="mr-2">{coverphoto.name}</span>
                  <DeleteOutlined
                    onClick={handleCoverRemove}
                    className="cursor-pointer text-red-500 hover:text-red-600"
                  />
                </div>
              )}
            </div>

            {/* upload profile photo*/}
            <div className="flex absolute top-[13.5rem] left-0 right-0 flex-col items-center gap-1">
              <div className="w-[12rem] h-[12rem] rounded-full overflow-hidden border-8 border-shadow object-cover">
                {isClient && photo?.url ? (
                  <img
                    src={photo.url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : isClient && final?.user?.photo?.url ? (
                  <img
                    src={final.user.photo.url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : isClient && user?.photo?.url ? (
                  <img
                    src={user.photo.url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Avatar
                    name={final?.user?.name || user?.name || "User"}
                    size="100"
                    round
                    className="cursor-pointer"
                  />
                )}
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer bg-highlight hover:bg-hover_highlight text-primary_text font-bold py-2 px-4 rounded-lg text-[10px] md:text-base"
                >
                  Upload your profile photo
                </label>
                <input
                  onChange={handlePhotoUpload}
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  name="profileImage"
                  ref={photoInputRef}
                  className="hidden"
                />
                {photo && photo.url && (
                  <div className="flex items-center space-x-2">
                    <span className="mr-2">{photo.name}</span>
                    <DeleteOutlined
                      onClick={handlePhotoRemove}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* text form */}
          <div className="flex flex-col pt-20 w-full gap-y-10">
            <div className=" flex flex-col gap-y-2">
              <Heading size="small" className="!text-primary_text">
                Full Name
              </Heading>
              <input
                shape="rounded"
                type="text"
                name="fullName"
                placeholder={user.name}
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] border rounded-lg border-highlight focus:outline-none focus:ring-1 focus:ring-highlight outline-none transition-all resize-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <Heading size="small" className="!text-primary_text">
                Email Address
              </Heading>
              <input
                shape="rounded"
                type="email"
                name="email"
                placeholder={user.email}
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] border rounded-lg border-highlight focus:outline-none focus:ring-1 focus:ring-highlight outline-none transition-all resize-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <Heading size="small" className="!text-primary_text">
                Old Password
              </Heading>
              <input
                shape="rounded"
                type="password"
                name="oldpassword"
                placeholder="***********"
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] border rounded-lg border-highlight focus:outline-none focus:ring-1 focus:ring-highlight outline-none transition-all resize-none"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <Heading size="small" className="!text-primary_text">
                New Password
              </Heading>
              <input
                shape="rounded"
                type="password"
                name="newpassword"
                placeholder="***********"
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] border rounded-lg border-highlight focus:outline-none focus:ring-1 focus:ring-highlight outline-none transition-all resize-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <Heading size="small" className="!text-primary_text">
                About
              </Heading>
              <textarea
                shape="rounded"
                type="text"
                name="about"
                placeholder={user.about}
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] border rounded-lg border-highlight focus:outline-none focus:ring-1 focus:ring-highlight outline-none transition-all resize-none h-[70px]"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>

          {/* update button */}
          <button
            type="submit"
            className="cursor-pointer bg-highlight hover:bg-hover_highlight text-primary_text font-bold py-2 px-4 rounded-lg text-[10px] md:text-base"
            disabled={loading}
          >
            {loading ? (
              <SyncOutlined spin className="py-1" />
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
