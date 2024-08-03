"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutation";
import { resetClient } from "@/utils/graphql";

import landingBgImg from "../../../public/landingbg.jpg";
import HeaderFooter from "@/components/HeaderFooter";
import { SyncOutlined } from "@ant-design/icons";
import { setCredentials } from "@/Context/Slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) router.push("/home");
  }, [user]);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.error) {
        toast.error(data.login.error);
        setLoad(false);
      } else {
        const { token, user } = data.login;
        setEmail("");
        setPassword("");
        setLoad(false);

        window.localStorage.setItem("token", token);
        resetClient();
        dispatch(setCredentials(user));
        toast.success("Welcome Back!!");
        router.push("/home");
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setLoad(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${landingBgImg.src})`, // Use the URL format
          filter: "blur(5px)",
          zIndex: 0,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <HeaderFooter />

      <div className="flex flex-col items-center justify-center gap-y-4 z-10  w-full">
        <Link
          href="/"
          className=" flex flex-col items-center justify-center gap-y-2 cursor-pointer"
        >
          {" "}
          <Image
            src="/sociofyLogoTemp.png"
            width={75}
            height={75}
            alt="headerlogo"
            className="md:h-[75px] h-[50px] md:w-[75px] w-[50px] object-cover rounded-full "
          />
        </Link>

        <div className="relative  p-1 px-5 rounded-lg shadow-lg w-full max-w-xs md:max-w-xl">
          <div className="absolute inset-0 backdrop-blur-xl   shadow-lg shadow-highlight rounded-lg"></div>
          <div className="relative">
            <h2 className=" text-primary_text text-center font-semibold text-4xl font-lato my-2">
              Log In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg text-secondary_text mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="w-full text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-highlight text-primary_text"
                  placeholder="Enter a registered email address"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-lg text-secondary_text mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full text-lg px-4 py-2 border rounded-lg text-primary_text focus:outline-none focus:ring-2 bg-background focus:ring-highlight"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex items-center justify-end mb-4">
                <a
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex flex-col items-center text-center gap-y-4">
                <button
                  type="submit"
                  className="px-4 text-white py-2 rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu  focus:ring-highlight"
                  onClick={() => router.push("/login")}
                >
                  {loading ? <SyncOutlined spin className="py-1" /> : "Login"}
                </button>
                <div className="flex gap-x-2 items-center text-center mb-4">
                  <p className="text-center text-secondary_text">
                    Don't have an account?{" "}
                  </p>
                  <a href="/signup" className="text-blue-500 hover:underline">
                    Sign Up
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
