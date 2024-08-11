"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { FORGOT_PASSWORD_MUTATION } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import HeaderFooter from "@/components/HeaderFooter";
import landingBgImg from "../../../public/landingbg.jpg";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION, {
    onCompleted: (data) => {
      if (data.forgotPassword.Status === "Success") {
        setEmail("");
        setLoading(false);
        toast.success("Email Sent!!");
        router.push("/login");
      } else {
        setLoading(false);
        toast.error("No User found");
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
    forgotPassword({ variables: { email } });
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
            src="/alaap_logo.png"
            width={75}
            height={75}
            alt="headerlogo"
            className="md:h-[75px] h-[50px] md:w-[75px] w-[50px] object-cover rounded-full "
          />
        </Link>

        <div className="relative  p-1 px-5 rounded-lg shadow-lg w-full max-w-xs md:max-w-xl">
          <div className="absolute inset-0 backdrop-blur-xl  bg-white-A700/10 shadow-lg shadow-hover_accent rounded-lg"></div>
          <div className="relative flex flex-col items-center w-full">
            <h2 className=" text-primary_text text-center font-semibold text-4xl font-lato my-2">
              Forgot Password
            </h2>
            <form
              onSubmit={handleSubmit}
              className=" flex flex-col items-center w-full"
            >
              <div className="mb-4 flex flex-col w-full">
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
                  placeholder="Enter a registered email address"
                />
              </div>
              <button
                type="submit"
                className="px-4 text-white py-2 rounded-lg bg-hover_accent hover:bg-accent focus:outline-none font-ubuntu  focus:ring-hover_accent"
              >
                {loading ? <SyncOutlined spin className="py-1" /> : "Send Mail"}
              </button>
            </form>

            <div className="flex gap-x-2 items-center text-center my-4">
              <p className="text-center text-secondary_text">
                Already have an account?{" "}
              </p>
              <a href="/login" className="text-blue-500 hover:underline">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
