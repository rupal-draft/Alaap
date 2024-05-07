"use client";
import React from "react";
import { Img, Button, Heading, Text } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { imageone: "img_image_221x221.png" },
  { imageone: "img_image_39.png" },
  { imageone: "img_image_40.png" },
  { imageone: "img_image_41.png" },
  { imageone: "img_image_42.png" },
  { imageone: "img_image_43.png" },
  { imageone: "img_image_44.png" },
  { imageone: "img_image_45.png" },
  { imageone: "img_image_46.png" },
];
const data1 = [
  {
    avatarone: "img_avatar_45x45.png",
    avatarthree: "img_avatar_55.png",
    avatarfive: "img_avatar_56.png",
    avatarseven: "img_avatar_57.png",
    avatarnine: "img_avatar_58.png",
  },
  {
    avatarone: "img_avatar_59.png",
    avatarthree: "img_avatar_60.png",
    avatarfive: "img_avatar_61.png",
    avatarseven: "img_avatar_62.png",
    avatarnine: "img_avatar_63.png",
  },
  {
    avatarone: "img_avatar_64.png",
    avatarthree: "img_avatar_65.png",
    avatarfive: "img_avatar_66.png",
    avatarseven: "img_avatar_67.png",
    avatarnine: "img_avatar_68.png",
  },
];

export default function GalleryPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="relative h-[1024px] w-full bg-gray-100">
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full justify-between gap-5 md:relative md:flex-col">
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
                  <Img
                    src="img_close_indigo_a200.svg"
                    width={24}
                    height={24}
                    alt="close"
                    className="h-[24px] w-[24px]"
                  />
                }
              />
              <MenuItem
                icon={
                  <Img src="img_calendar.svg" width={24} height={24} alt="calendar" className="h-[24px] w-[24px]" />
                }
              />
              <MenuItem
                icon={<Img src="img_lock.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />}
              />
              <MenuItem
                icon={<Img src="img_lock_2.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />}
              />
              <MenuItem
                icon={<Img src="img_search.svg" width={24} height={24} alt="search" className="h-[24px] w-[24px]" />}
              />
            </div>
            <div className="flex flex-col">
              <MenuItem
                icon={
                  <Img src="img_arrow_left.svg" width={24} height={24} alt="arrowleft" className="h-[24px] w-[24px]" />
                }
              />
            </div>
          </Menu>
        </Sidebar>
        <div className="flex w-[84%] items-center justify-center gap-2.5 md:w-full md:flex-col md:p-5">
          <div className="mb-10 flex w-[35%] items-start justify-between gap-5 self-end md:w-full">
            <div className="flex w-[83%] flex-col items-center rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
              <div className="mt-2.5 flex w-[71%] flex-col items-center gap-2 px-[9px] md:w-full">
                <div className="w-[58%] md:w-full">
                  <Img
                    src="img_avatar_108x108.png"
                    width={108}
                    height={108}
                    alt="avatar"
                    className="h-[108px] w-full rounded-[36px] object-cover md:h-auto"
                  />
                </div>
                <Heading size="2xl" as="h1">
                  Edward Ford
                </Heading>
                <Text size="md" as="p" className="!font-normal">
                  @edwardford
                </Text>
              </div>
              <div className="mt-[30px] flex gap-[22px] px-1.5">
                <div className="flex flex-wrap gap-2">
                  <Heading size="lg" as="h2">
                    518
                  </Heading>
                  <Heading size="lg" as="h3" className="!text-gray-500">
                    Posts
                  </Heading>
                </div>
                <div className="flex flex-wrap gap-[5px]">
                  <Heading size="lg" as="h4">
                    22k
                  </Heading>
                  <Heading size="lg" as="h5" className="!text-gray-500">
                    Friends
                  </Heading>
                </div>
              </div>
              <div className="mt-[30px] flex items-center gap-5 self-start">
                <Button
                  size="8xl"
                  shape="round"
                  leftIcon={
                    <Img
                      src="img_checkmark_white_a700.svg"
                      width={18}
                      height={18}
                      alt="checkmark"
                      className="h-[18px] w-[18px]"
                    />
                  }
                  className="min-w-[149px] gap-2 font-sfprodisplay font-bold sm:px-5"
                >
                  Freinds
                </Button>
                <div className="flex flex-col items-center p-3">
                  <Img src="img_lock_gray_900.svg" width={22} height={22} alt="lock" className="h-[22px] w-[22px]" />
                </div>
                <Button size="5xl" variant="outline" shape="round" color="undefined_undefined" className="w-[48px]">
                  <Img src="img_notification_gray_900.svg" width={48} height={48} />
                </Button>
              </div>
              <div className="mt-10 flex w-[68%] flex-col items-start justify-center gap-3 self-start md:w-full">
                <Heading size="s" as="h6" className="uppercase tracking-[1.00px]">
                  About
                </Heading>
                <Text size="md" as="p" className="w-full !font-normal leading-[22px]">
                  <>
                    Travel, Adventure & Lifestyle
                    <br />
                    Photographer & Digital Influencer
                    <br />
                    Nikon Ambassador
                    <br />
                    Let&#39;s Work:
                    <br />
                    user@mail.com
                  </>
                </Text>
              </div>
              <div className="mb-2.5 mt-[58px] flex flex-col items-start justify-center gap-5 self-stretch">
                <Heading size="lg" as="h6" className="!font-sfprodisplay">
                  Friends
                </Heading>
                <div className="flex flex-col gap-[15px] self-stretch">
                  {data1.map((d, index) => (
                    <div key={"gallery1" + index} className="flex gap-[15px]">
                      <Img
                        src={d.avatarone}
                        width={45}
                        height={45}
                        alt="avatar"
                        className="h-[45px] w-[45px] rounded-[14px] object-cover"
                      />
                      <Img
                        src={d.avatarthree}
                        width={45}
                        height={45}
                        alt="avatar"
                        className="h-[45px] w-[45px] rounded-[14px] object-cover"
                      />
                      <Img
                        src={d.avatarfive}
                        width={45}
                        height={45}
                        alt="avatar"
                        className="h-[45px] w-[45px] rounded-[14px] object-cover"
                      />
                      <Img
                        src={d.avatarseven}
                        width={45}
                        height={45}
                        alt="avatar"
                        className="h-[45px] w-[45px] rounded-[14px] object-cover"
                      />
                      <Img
                        src={d.avatarnine}
                        width={45}
                        height={45}
                        alt="avatar"
                        className="h-[45px] w-[45px] rounded-[14px] object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Img
              src="img_indicator_gray_500_128x5.svg"
              width={5}
              height={128}
              alt="indicator"
              className="mt-[310px] h-[128px] w-[5px] rounded-sm"
            />
          </div>
          <div className="flex flex-1 flex-col gap-10 rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 py-10 md:self-stretch sm:py-5">
            <header className="flex items-center justify-between gap-5 md:flex-col">
              <Button
                size="8xl"
                shape="round"
                leftIcon={
                  <Img
                    src="img_arrowleft_gray_500.svg"
                    width={18}
                    height={18}
                    alt="arrow_left"
                    className="h-[18px] w-[18px]"
                  />
                }
                className="min-w-[103px] gap-2.5 font-sfprodisplay font-bold sm:px-5"
              >
                Back
              </Button>
              <div className="flex w-[59%] items-center justify-between gap-5 md:w-full sm:flex-col">
                <div className="flex w-[39%] items-start justify-between gap-5 sm:w-full">
                  <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                    <Heading as="p" className="!text-gray-500">
                      Posts
                    </Heading>
                  </a>
                  <div className="flex w-[18%] flex-col items-center gap-[7px]">
                    <Heading as="p">Photos</Heading>
                    <div className="h-[2px] w-[39px] bg-gray-900" />
                  </div>
                  <Heading as="p" className="!text-gray-500">
                    Videos
                  </Heading>
                  <Heading as="p" className="!text-gray-500">
                    Events
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
              </div>
            </header>
            <div className="mb-[151px] grid h-[695px] w-[89%] grid-cols-3 gap-4 self-end md:grid-cols-2 sm:grid-cols-1">
              {data.map((d, index) => (
                <Img
                  key={"gallery" + index}
                  src="img_image_221x221.png"
                  width={221}
                  height={221}
                  alt="image"
                  className="h-[221px] w-full rounded-[12px] object-cover md:h-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-46.00px] right-[3%] m-auto flex w-[48%] justify-end gap-4 md:relative md:flex-col">
        <Img
          src="img_image_47.png"
          width={221}
          height={221}
          alt="image"
          className="h-[221px] w-[221px] rounded-[12px] object-cover md:w-full"
        />
        <Img
          src="img_image_48.png"
          width={221}
          height={221}
          alt="image"
          className="h-[221px] w-[221px] rounded-[12px] object-cover md:w-full"
        />
        <Img
          src="img_image_49.png"
          width={221}
          height={221}
          alt="image"
          className="h-[221px] w-[221px] rounded-[12px] object-cover md:w-full"
        />
      </div>
    </div>
  );
}
