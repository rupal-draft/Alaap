"use client";
import React, { useState } from "react";
import { Button, Img, Text, Input, Heading } from "../../components";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SyncOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/graphql/mutation";

import landingBgImg from "../../../public/images/landingbg.jpg";

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
    // <div className="w-full bg-gray-100">
    //   <div className="flex flex-col md:flex-row">
    //     <div className="hidden lg:flex w-[60%] h-[1024px] flex-1 flex-col items-center justify-center bg-[url(/images/img_group_221.png)] bg-cover bg-no-repeat px-14 py-[305px] md:h-auto lg:self-stretch lg:p-5">
    //       <div className="my-[129px] flex w-[31%] flex-col items-center md:w-full">
    //         <Heading size="2xl" as="h1">
    //           Welcome to Sociofy!
    //         </Heading>
    //         <div className="mt-[20px]">
    //           <Text as="p" className="!text-gray-300">
    //             Already have an account?
    //           </Text>
    //           <Button
    //             size="3xl"
    //             className="w-full !text-gray-300 font-bold px-5"
    //             onClick={() => router.push("/login")}
    //           >
    //             Login
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex w-full p-4 my-20 items-center gap-2.5 lg:m-0 lg:w-[40%] lg:p-5">
    //       <div className="flex flex-1 flex-col items-center rounded-[32px] bg-white-A700 lg:p-12">
    //         <div className="flex flex-col items-center w-full p-8 lg:p-0 lg:mt-[32px] lg:w-[75%]">
    //           <Img
    //             src="img_header_logo.svg"
    //             width={41}
    //             height={41}
    //             alt="headerlogo"
    //             className="h-[41px] w-[41px] object-contain"
    //           />
    //           <div className="mt-[50px] flex flex-col items-center gap-3.5">
    //             <Link href="#">
    //               <Heading size="xl" as="h2" className="!text-gray-900">
    //                 Create an account
    //               </Heading>
    //             </Link>
    //             <Text as="p" className="!text-gray-500">
    //               Sign up to continue
    //             </Text>
    //           </div>
    //           <form
    //             className="mt-[50px] flex flex-col gap-5 self-stretch"
    //             onSubmit={handleSubmit}
    //           >
    //             <div className="flex flex-col items-start justify-center gap-3">
    //               <Heading
    //                 size="s"
    //                 as="h3"
    //                 className="uppercase tracking-[1.00px] !text-gray-900"
    //               >
    //                 Name
    //               </Heading>

    //               <input
    //                 value={name}
    //                 onChange={(e) => setName(e.target.value)}
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Enter name"
    //               />
    //             </div>
    //             <div className="flex flex-col items-start justify-center gap-3">
    //               <Heading
    //                 size="s"
    //                 as="h4"
    //                 className="uppercase tracking-[1.00px] !text-gray-900"
    //               >
    //                 Email
    //               </Heading>

    //               <input
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Enter name"
    //               />
    //             </div>
    //             <div className="flex flex-col items-start justify-center gap-3">
    //               <Heading
    //                 size="s"
    //                 as="h5"
    //                 className="uppercase tracking-[1.00px] !text-gray-900"
    //               >
    //                 Password
    //               </Heading>

    //               <input
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Enter name"
    //               />
    //             </div>
    //             <Button
    //               size="8xl"
    //               type="submit"
    //               className="mt-10 mb-10 bg-indigo-300 w-full rounded-[29px] font-bold px-5 md:px-1"
    //               disabled={loading}
    //             >
    //               {loading ? (
    //                 <SyncOutlined spin className="py-1" />
    //               ) : (
    //                 "Create an account"
    //               )}
    //             </Button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
      <div className="flex absolute z-10 left-5  top-2 items-center gap-x-3 justify-center">
        <Link
          href="/"
          className=" flex  items-center justify-center gap-x-2 cursor-pointer"
        >
          {" "}
          <Img
            src="sociofyLogoTemp.png"
            width={50}
            height={50}
            alt="headerlogo"
            className="h-[50px] w-[50px] object-cover rounded-full"
          />
        </Link>
        <h2 className="text-4xl text-primary_text font-logo_text  font-bold ">
          Sociofy
        </h2>
      </div>

      <div className="flex absolute z-10 right-5 bottom-2 items-center justify-between ">
        <div className="flex flex-col  items-center justify-center">
          <div className="flex items-center justify-center gap-x-2 font-bold  text-base sm:text-xs md:text-base lg:text-lg font-lato">
            <Link
              className="text-highlight hover:text-highlight_hover"
              href="/privacy"
            >
              Privacy
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              href="/disclaimer"
            >
              Disclaimer
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              href="/sitemap"
            >
              Sitemap
            </Link>
          </div>
          <div className=" text-primary_text text-base sm:text-sm lg:text-base text-primary-text font-semibold font-open_sans text-center">
            <p>© 2024 Sociofy. All rights reserved.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 z-10  w-full">
        <Link
          href="/"
          className=" flex flex-col items-center justify-center gap-y-2 cursor-pointer"
        >
          <Img
            src="sociofyLogoTemp.png"
            width={75}
            height={75}
            alt="headerlogo"
            className="h-[75px] w-[75px] object-cover rounded-full"
          />
        </Link>

        <div className="relative  p-3 px-5 rounded-lg shadow-lg w-full max-w-xl">
          <div className="absolute inset-0 backdrop-blur-xl  bg-white-A700/10 shadow-lg shadow-highlight rounded-lg"></div>
          <div className="relative">
            <h2 className=" text-primary_text text-center font-semibold text-4xl font-lato my-4">
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
                  className="w-full text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-highlight text-primary_text"
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
                  className="w-full text-lg px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-highlight text-primary_text"
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
                  className="w-full text-lg px-4 py-2 border rounded-lg text-primary_text focus:outline-none focus:ring-2 bg-background focus:ring-highlight"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded-full" />
                  <span className="ml-2 text-secondary_text">Remember me</span>
                </label>
                <a href="#!" className="text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="flex flex-col items-center text-center gap-y-4">
                <button
                  type="submit"
                  className="px-4 text-white py-2 rounded-lg bg-highlight hover:bg-hover_highlight focus:outline-none font-ubuntu  focus:ring-highlight"
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
