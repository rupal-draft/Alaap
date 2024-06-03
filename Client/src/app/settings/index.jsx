"use client";
import React, { useEffect, useRef, useState } from "react";
import { Heading, Button } from "../../components";
import Navbar from "@/components/Nav/Navbar";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import api from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/Context/Slices/authSlice";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import Avatar from "react-avatar";

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
    <div className="w-full bg-gray-100">
      <div className="flex flex-row items-start justify-between gap-5 md:flex-col">
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

        <div className="flex flex-col md:w-[70%] px-auto mx-auto items-center justify-between">
          <Heading as="h1" className="!text-gray-800 !font-bold !text-3xl mb-8">
            My Profile Information
          </Heading>

          <form
            className="flex flex-col gap-6 w-full mb-28"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-60 rounded-lg overflow-hidden">
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
              <div className="mt-1 flex items-center">
                <input
                  onChange={handleCoverPhotoUpload}
                  type="file"
                  accept="image/*"
                  id="coverImage"
                  name="coverImage"
                  ref={coverInputRef}
                />
                <DeleteOutlined onClick={handleCoverRemove} />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden">
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
              <div className="mt-1 flex items-center">
                <input
                  onChange={handlePhotoUpload}
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  name="profileImage"
                  ref={photoInputRef}
                />
                <DeleteOutlined onClick={handlePhotoRemove} />
              </div>
            </div>

            <div>
              <Heading size="small" className="!text-gray-600">
                Full Name
              </Heading>
              <input
                shape="rounded"
                type="text"
                name="fullName"
                placeholder="Rohan Gill..."
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Heading size="small" className="!text-gray-600">
                Email Address
              </Heading>
              <input
                shape="rounded"
                type="email"
                name="email"
                placeholder="rohangill@gmail.com..."
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Heading size="small" className="!text-gray-600">
                Old Password
              </Heading>
              <input
                shape="rounded"
                type="password"
                name="oldpassword"
                placeholder="Rohan@12345..."
                className="w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Heading size="small" className="!text-gray-600">
                New Password
              </Heading>
              <input
                shape="rounded"
                type="password"
                name="newpassword"
                placeholder="Rohan@98765..."
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Heading size="small" className="!text-gray-600">
                About
              </Heading>
              <input
                shape="rounded"
                type="text"
                name="about"
                placeholder="3517 Prabhakar St., Patna, India..."
                className="w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              size="3xl"
              className="w-auto !bg-indigo-400"
              disabled={loading}
            >
              {loading ? (
                <SyncOutlined spin className="py-1" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
