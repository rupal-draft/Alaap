"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SyncOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/graphql/mutation";

import HeaderFooter from "@/components/HeaderFooter";
import landingBgImg from "../../../public/landingbg.jpg";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [register] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      if (data.register.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        toast.success("Successfully registered!!");
        router.push("/login");
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    register({ variables: { name, email, password } });
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
          <Image
            src="/sociofyLogoTemp.png"
            width={75}
            height={75}
            alt="headerlogo"
            className="md:h-[75px] h-[50px] md:w-[75px] w-[50px] object-cover rounded-full"
          />
        </Link>

        <div className="relative  p-1 px-5 rounded-lg shadow-lg w-full max-w-xs md:max-w-xl">
          <div className="absolute inset-0 backdrop-blur-xl   shadow-lg shadow-hover_accent rounded-lg"></div>
          <div className="relative">
            <h2 className=" text-primary_text text-center font-semibold text-4xl font-lato my-2">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg text-secondary_text mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="w-full text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-hover_accent text-primary_text"
                  placeholder="Enter your name"
                />
              </div>
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
                  className="w-full text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-hover_accent text-primary_text"
                  placeholder="Enter a valid email address"
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
                  className="w-full text-lg px-4 py-2 border rounded-lg text-primary_text focus:outline-none focus:ring-2 bg-background focus:ring-hover_accent"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex flex-col items-center text-center gap-y-4">
                <button
                  type="submit"
                  className="px-4 text-white py-2 rounded-lg bg-hover_accent hover:bg-accent focus:outline-none font-ubuntu  focus:ring-hover_accent"
                  disabled={loading}
                >
                  {loading ? (
                    <SyncOutlined spin className="py-1" />
                  ) : (
                    "Create an account"
                  )}
                </button>
                <div className="flex gap-x-2 items-center text-center mb-4">
                  <p className="text-center text-secondary_text">
                    Already have an account?{" "}
                  </p>
                  <a href="/login" className="text-blue-500 hover:underline">
                    Sign in
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
