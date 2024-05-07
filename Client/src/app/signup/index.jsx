"use client";
import React from "react";
import { Button, Img, Text, Input, Heading } from "../../components";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex md:flex-col">
        <div className="flex h-[1024px] flex-1 flex-col items-center justify-center bg-[url(/images/img_group_221.png)] bg-cover bg-no-repeat px-14 py-[305px] md:h-auto md:self-stretch md:p-5">
          <div className="my-[129px] flex w-[31%] flex-col items-center md:w-full">
            <Heading size="2xl" as="h1">
              Hello!
            </Heading>
            <Link href="#" className="mt-3">
              <Text as="p" className="!text-white-A700">
                Already have an account?
              </Text>
            </Link>
            <Button
              size="8xl"
              className="mt-[30px] w-full rounded-[29px] font-bold sm:px-5"
            >
              Login
            </Button>
          </div>
        </div>
        <div className="relative ml-[-45px] flex w-[44%] items-center gap-2.5 md:ml-0 md:w-full md:p-5">
          <Img
            src="img_indicator.svg"
            width={5}
            height={128}
            alt="indicator"
            className="h-[128px] w-[5px] rounded-sm"
          />
          <div className="flex flex-1 flex-col items-start rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 p-12 md:p-5">
            <div className="ml-[76px] mt-[52px] flex w-[75%] flex-col items-start md:ml-0 md:w-full">
              <Img
                src="img_header_logo.svg"
                width={41}
                height={41}
                alt="headerlogo"
                className="h-[41px] w-[41px] object-contain"
              />
              <div className="mt-[50px] flex flex-col items-start gap-3.5">
                <Link href="#">
                  <Heading size="xl" as="h2" className="!text-gray-900">
                    Create an account
                  </Heading>
                </Link>
                <Text as="p" className="!text-gray-500">
                  Sign up to continue{" "}
                </Text>
              </div>
              <div className="mt-[60px] flex flex-col gap-5 self-stretch">
                <div className="flex flex-col items-start justify-center gap-3">
                  <Heading
                    size="s"
                    as="h3"
                    className="uppercase tracking-[1.00px] !text-gray-900"
                  >
                    name
                  </Heading>
                  <Input
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    name="name"
                    placeholder={`Anne Carry`}
                    className="self-stretch sm:pr-5"
                  />
                </div>
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
                    color="undefined_undefined"
                    type="email"
                    name="email"
                    placeholder={`user@mail.com`}
                    suffix={
                      <Img
                        src="img_checkmark_green_400.svg"
                        width={18}
                        height={18}
                        alt="checkmark"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    className="gap-[35px] self-stretch"
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
                    color="undefined_undefined"
                    type="password"
                    name="password"
                    placeholder={`Password@123`}
                    suffix={
                      <Img
                        src="img_notification.svg"
                        width={18}
                        height={18}
                        alt="notification"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    className="gap-[35px] self-stretch"
                  />
                </div>
              </div>
              <a
                href="https://www.youtube.com/embed/bv8Fxk0sz7I"
                target="_blank"
              >
                <Button
                  size="8xl"
                  className="mt-10 w-full rounded-[29px] font-bold sm:px-5"
                >
                  Create an account
                </Button>
              </a>
              <div className="mt-[30px] flex flex-col items-center justify-center gap-8 self-stretch">
                <Text size="s" as="p" className="!text-gray-500">
                  Or connect with socials
                </Text>
                <div className="flex flex-col gap-5 self-stretch">
                  <Button
                    size="8xl"
                    leftIcon={
                      <Img
                        src="img_facebook.svg"
                        width={18}
                        height={18}
                        alt="facebook"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    className="w-full gap-[3px] rounded-[29px] font-bold sm:px-5"
                  >
                    Connect with Facebook
                  </Button>
                  <Button
                    size="8xl"
                    leftIcon={
                      <Img
                        src="img_user_white_a700.svg"
                        width={18}
                        height={18}
                        alt="user"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    className="w-full gap-[5px] rounded-[29px] font-bold sm:px-5"
                  >
                    Connect with Apple
                  </Button>
                  <Button
                    size="8xl"
                    variant="outline"
                    color="undefined_undefined"
                    leftIcon={
                      <Img
                        src="img_google.svg"
                        width={18}
                        height={18}
                        alt="google"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    className="w-full gap-1 rounded-[29px] font-bold sm:px-5"
                  >
                    Connect with Google+
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
