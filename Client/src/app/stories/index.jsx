"use client";
import React from "react";
import { Heading, Img, Button, Input } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { imageone: "img_image_380x255.png", edwardfordone: "img_image_68x68.png" },
  { imageone: "img_image_8.png", edwardfordone: "img_image_9.png" },
  { imageone: "img_image_10.png", edwardfordone: "img_image_11.png" },
  { imageone: "img_image_12.png", edwardfordone: "img_image_13.png" },
  { imageone: "img_image_14.png", edwardfordone: "img_image_15.png" },
  { imageone: "img_image_16.png", edwardfordone: "img_image_17.png" },
  { imageone: "img_image_18.png", edwardfordone: "img_image_19.png" },
  { imageone: "img_image_20.png", edwardfordone: "img_image_21.png" },
];

export default function StoriesPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="flex w-full items-start justify-center bg-gray-100 md:flex-col">
      <Sidebar
        width="167px !important"
        collapsedWidth="80px !important"
        collapsed={collapsed}
        rootStyles={{ [`.${sidebarClasses.container}`]: { gap: 101 } }}
        className="!sticky top-0 flex h-screen flex-col gap-[101px] overflow-auto bg-indigo-A200 p-[45px] md:hidden md:gap-[75px] md:p-5 sm:gap-[50px]"
      >
        <Img
          src="img_sidebar_logo.svg"
          width={48}
          height={48}
          alt="sidebarlogo"
          className="h-[48px] w-[48px] object-contain"
        />
        <Menu
          menuItemStyles={{
            button: {
              padding: "12px",
              backgroundColor: "#ffffff33",
              borderRadius: "12px",
              [`&:hover, &.ps-active`]: { backgroundColor: "#ffffff !important" },
            },
          }}
          rootStyles={{ ["&>ul"]: { gap: "322px" } }}
          className="mb-[15px] flex w-full flex-col"
        >
          <div className="flex flex-col gap-10">
            <MenuItem
              icon={
                <Img src="img_home_indigo_a200.svg" width={24} height={24} alt="home" className="h-[24px] w-[24px]" />
              }
            />
            <MenuItem
              icon={
                <Img
                  src="img_calendar_white_a700.svg"
                  width={24}
                  height={24}
                  alt="calendar"
                  className="h-[24px] w-[24px]"
                />
              }
            />
            <MenuItem
              icon={
                <Img
                  src="img_lock_white_a700_24x24.svg"
                  width={24}
                  height={24}
                  alt="lock"
                  className="h-[24px] w-[24px]"
                />
              }
            />
            <MenuItem
              icon={
                <Img src="img_lock_white_a700.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />
              }
            />
            <MenuItem
              icon={
                <Img
                  src="img_search_white_a700.svg"
                  width={24}
                  height={24}
                  alt="search"
                  className="h-[24px] w-[24px]"
                />
              }
            />
          </div>
          <div className="flex flex-col">
            <MenuItem
              icon={
                <Img
                  src="img_arrow_left_white_a700.svg"
                  width={24}
                  height={24}
                  alt="arrowleft"
                  className="h-[24px] w-[24px]"
                />
              }
            />
          </div>
        </Menu>
      </Sidebar>
      <div className="flex flex-1 items-center gap-2.5 pl-[5px] md:flex-col md:self-stretch md:p-5">
        <Img
          src="img_indicator_white_a700.svg"
          width={5}
          height={128}
          alt="indicator"
          className="h-[128px] w-[5px] rounded-sm md:w-full"
        />
        <div className="flex flex-1 flex-col items-start rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 px-10 pt-10 md:self-stretch sm:px-5 sm:pt-5">
          <header className="ml-[35px] flex items-center justify-between gap-5 self-stretch md:ml-0 md:flex-col">
            <div className="flex w-[67%] items-center justify-center gap-[25px] rounded-[12px] bg-white-A700_33 p-[9px] md:w-full md:flex-col">
              <Input
                size="md"
                shape="square"
                name="search"
                placeholder={`Search in social…`}
                prefix={<Img src="img_rewind.svg" width={18} height={18} alt="rewind" className="h-[18px] w-[18px]" />}
                className="flex-grow gap-[15px] self-end md:p-5 sm:pr-5"
              />
              <Heading size="s" as="p" className="uppercase tracking-[1.00px] !text-gray-500">
                Filters
              </Heading>
            </div>
            <div className="flex gap-5">
              <Button size="6xl" shape="round" className="min-w-[48px] font-sfprodisplay font-bold">
                1
              </Button>
              <Link href="#">
                <Img
                  src="img_avatar_48x48.png"
                  width={48}
                  height={48}
                  alt="avatar"
                  className="h-[48px] w-[48px] rounded-[12px] object-cover"
                />
              </Link>
            </div>
          </header>
          <Heading size="2xl" as="h1" className="ml-[35px] mt-[59px] md:ml-0">
            Stories
          </Heading>
          <div className="ml-[35px] mt-[39px] flex w-[46%] items-start gap-[26px] md:ml-0 md:w-full sm:flex-col">
            <div className="flex w-[10%] flex-col gap-[7px] sm:w-full">
              <Heading as="h2">For You</Heading>
              <div className="h-[2px] bg-white-A700" />
            </div>
            <Heading as="h3" className="!text-white-A700_99">
              Following
            </Heading>
            <Heading as="h4" className="!text-white-A700_99">
              Popular
            </Heading>
            <Heading as="h5" className="!text-white-A700_99">
              Featured
            </Heading>
            <Heading as="h6" className="!text-white-A700_99">
              Live
            </Heading>
            <Heading as="p" className="!text-white-A700_99">
              Continue Watching
            </Heading>
          </div>
          <div className="ml-[35px] mt-10 grid grid-cols-4 gap-10 self-stretch md:ml-0 md:grid-cols-2 sm:grid-cols-1">
            {data.map((d, index) => (
              <div key={"stories" + index} className="relative h-[380px] w-full md:h-auto">
                <Img
                  src={d.imageone}
                  width={255}
                  height={380}
                  alt="image"
                  className="h-[380px] w-full rounded-lg object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full flex-col items-center justify-end rounded-lg bg-gradient p-10 sm:p-5">
                  <div className="mt-[195px] flex w-[62%] flex-col items-center gap-4 px-2 md:w-full">
                    <Img
                      src={d.edwardfordone}
                      width={68}
                      height={68}
                      alt="edward_ford"
                      className="h-[68px] w-[68px] rounded-[24px] object-cover"
                    />
                    <Heading size="lg" as="h6" className="!font-sfprodisplay">
                      Edward Ford
                    </Heading>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
