"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { RESET_PASSWORD_MUTATION } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import HeaderFooter from "@/components/HeaderFooter";
import landingBgImg from "../../../../../public/landingbg.jpg";
export default function ResetPasswordPage({ params }) {
  const { id, token } = params;
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: (data) => {
      if (data.resetPassword.Status === "Success") {
        setPassword("");
        setLoading(false);
        toast.success("Password Reset Successful");
        router.push("/login");
      } else {
        setLoading(false);
        toast.error("Error resetting password");
      }
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetPassword({ variables: { id, token, password } });
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

        <div className="relative  p-3 px-5 rounded-lg shadow-lg w-full max-w-xs md:max-w-xl">
          <div className="absolute inset-0 backdrop-blur-xl  bg-white-A700/10 shadow-lg shadow-hover_accent rounded-lg"></div>
          <div className="relative flex flex-col items-center w-full">
            <h2 className=" text-primary_text text-center font-semibold text-4xl font-lato my-4">
              Reset Password
            </h2>
            <form
              className=" flex flex-col  items-center w-full"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-col w-full">
                <label
                  htmlFor="password"
                  className="block text-lg text-secondary_text "
                >
                  Email address
                </label>

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full flex items-center text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-hover_accent text-primary_text"
                  placeholder="******"
                />
              </div>
              <button
                type="submit"
                className="px-4 text-white py-2 rounded-lg bg-hover_accent hover:bg-accent focus:outline-none font-ubuntu  focus:ring-hover_accent"
              >
                {loading ? <SyncOutlined spin className="py-1" /> : "Reset"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
