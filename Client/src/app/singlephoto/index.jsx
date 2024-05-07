"use client";
import React from "react";
import { Input, Img, Button, Slider, Text } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function SinglePhotoPage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex items-start md:flex-col">
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
        <Img
          src="img_indicator_gray_500_128x5.svg"
          width={5}
          height={128}
          alt="indicator"
          className="h-[128px] w-[5px] rounded-sm md:w-full"
        />
        <div className="ml-2.5 flex-1 rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 pl-10 pt-10 md:ml-0 md:self-stretch md:p-5 sm:pl-5 sm:pt-5">
          <div className="flex flex-col self-end">
            <header className="flex w-[95%] items-center justify-between gap-5 md:w-full md:flex-col">
              <div className="flex w-[58%] items-center justify-between gap-5 md:w-full">
                <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                  <Button
                    size="8xl"
                    shape="round"
                    leftIcon={
                      <Img
                        src="img_arrowleft_white_a700_1.svg"
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
                </a>
                <div className="flex items-center gap-2.5">
                  <Text size="md" as="p" className="!text-white-A700">
                    Edward Ford
                  </Text>
                  <Link href="#">
                    <Img
                      src="img_avatar.png"
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-[38px] w-[38px] rounded-[12px] object-cover"
                    />
                  </Link>
                </div>
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
            <div className="flex items-start gap-[45px] md:flex-col">
              <Button
                size="5xl"
                variant="outline"
                shape="round"
                color="undefined_undefined"
                className="mt-[390px] w-[48px]"
              >
                <Img src="img_arrow_left_white_a700_48x48.svg" width={48} height={48} />
              </Button>
              <div className="mt-36 flex w-full max-w-[509px] md:self-stretch">
                <Slider
                  autoPlay
                  autoPlayInterval={2000}
                  responsive={{ 0: { items: 1 }, 550: { items: 1 }, 1050: { items: 1 } }}
                  disableDotsControls
                  activeIndex={sliderState}
                  onSlideChanged={(e) => {
                    setSliderState(e?.item);
                  }}
                  ref={sliderRef}
                  items={[...Array(3)].map(() => (
                    <React.Fragment key={Math.random()}>
                      <Img
                        src="img_image_380x255.png"
                        width={509}
                        height={540}
                        alt="image"
                        className="h-[540px] rounded-lg object-cover"
                      />
                    </React.Fragment>
                  ))}
                />
              </div>
              <Button
                size="5xl"
                variant="outline"
                shape="round"
                color="undefined_undefined"
                className="mt-[390px] w-[48px] !border"
              >
                <Img src="img_arrow_right_white_a700.svg" width={48} height={48} />
              </Button>
              <div className="flex w-[39%] items-start gap-2.5 md:w-full">
                <Img
                  src="img_indicator_gray_500_128x5.svg"
                  width={5}
                  height={128}
                  alt="indicator"
                  className="mt-[350px] h-[128px] w-[5px] rounded-sm"
                />
                <div className="flex-1 rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 p-10 sm:p-5">
                  <Input
                    name="comment"
                    placeholder={`Write a comment…`}
                    suffix={<Img src="img_save.svg" width={14} height={14} alt="save" className="h-[14px] w-[14px]" />}
                    className="mb-[98px] mt-[798px] gap-[35px] rounded sm:pr-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
