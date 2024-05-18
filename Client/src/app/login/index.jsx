"use client";
import React from "react";
import { Button, Img, Text, Input, Heading } from "../../components";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row">
        <div className="hidden lg:flex w-[60%] h-[1024px] flex-1 flex-col items-center justify-center bg-[url(/images/img_group_221.png)] bg-cover bg-no-repeat px-14 py-[305px] md:h-auto lg:self-stretch lg:p-5">
          <div className="my-[129px] flex w-[31%] flex-col items-center md:w-full">
            <Heading size="2xl" as="h1">
              Welcome to Sociofy !
            </Heading>
            <div className="mt-[20px]">
              <Text as="p" className="!text-gray-300">
                Do not have an account?
              </Text>
              <Button
                size="3xl"
                className="w-full !text-gray-300 font-bold px-5"
                onClick={() => console.log("Go to sign")}
              >
                Signup Now
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full p-6 my-32 items-center gap-2.5 lg:my-14 lg:w-[40%]">
          <div className="flex flex-1 flex-col items-center rounded-[32px] bg-white-A700 lg:p-12">
            <div className="flex flex-col items-center w-full p-8 lg:p-0 lg:mt-[32px] lg:w-[75%]">
              <Img
                src="img_header_logo.svg"
                width={41}
                height={41}
                alt="headerlogo"
                className="h-[41px] w-[41px] object-contain"
              />
              <div className="mt-[50px] flex flex-col items-center gap-3.5">
                <Link href="#">
                  <Heading size="xl" as="h2" className="!text-gray-900">
                    Login to your account
                  </Heading>
                </Link>
                <Text as="p" className="!text-gray-500">
                  Sign in to continue{" "}
                </Text>
              </div>
              <div className="mt-[50px] flex flex-col gap-5 self-stretch">
                <div className="flex flex-col items-start justify-center gap-3">
                  <Heading
                    size="s"
                    as="h4"
                    className="uppercase tracking-[1.00px] !text-gray-900"
                  >
                    email
                  </Heading>
                  <Input
                    variant="outline"
                    shape="round"
                    color="gray_800"
                    type="email"
                    name="email"
                    placeholder="Ex:- user@mail.com"
                    className="self-stretch ring-1 ring-inset ring-indigo-200"
                  />
                </div>
                <div className="flex flex-col items-start justify-center gap-3">
                  <Heading
                    size="s"
                    as="h5"
                    className="uppercase tracking-[1.00px] !text-gray-900"
                  >
                    Password
                  </Heading>
                  <Input
                    variant="outline"
                    shape="round"
                    color="gray_800"
                    type="password"
                    name="password"
                    placeholder="Password@123"
                    className="self-stretch ring-1 ring-inset ring-indigo-200"
                  />
                </div>
              </div>
              <Button
                size="8xl"
                onClick={() => console.log("Hiii")}
                className="mt-10 mb-10 bg-indigo-300 w-full rounded-[29px] font-bold px-5 md:px-1"
              >
                Login to your account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
