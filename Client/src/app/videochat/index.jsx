"use client";
import React from "react";
import { Input, Img, Text, Heading, Button } from "../../components";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function VideoChatPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex gap-[5px] md:flex-col">
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
                icon={<Img src="img_lock_1.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />}
              />
              <MenuItem
                icon={
                  <Img src="img_lock_white_a700.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />
                }
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
        <div className="flex flex-1 md:flex-col md:self-stretch md:p-5">
          <div className="flex flex-1 items-center gap-2.5 md:self-stretch sm:flex-col">
            <Img
              src="img_indicator_white_a700.svg"
              width={5}
              height={128}
              alt="indicator"
              className="h-[128px] w-[5px] rounded-sm sm:w-full"
            />
            <div className="flex h-[1024px] flex-1 flex-col items-start rounded-bl-[32px] rounded-tl-[32px] bg-[url(/images/img_group_35.png)] bg-cover bg-no-repeat p-10 md:h-auto sm:self-stretch sm:p-5">
              <div className="ml-[5px] flex w-[63%] items-start justify-between gap-5 md:ml-0 md:w-full sm:flex-col">
                <Img
                  src="img_image_199x160.png"
                  width={160}
                  height={199}
                  alt="image"
                  className="mb-[744px] h-[199px] w-[31%] rounded-[12px] object-cover sm:w-full"
                />
                <div className="flex w-[57%] justify-between gap-5 sm:w-full">
                  <Button size="9xl" className="w-[78px] rounded-[24px]">
                    <Img src="img_music.svg" width={78} height={78} />
                  </Button>
                  <Button size="9xl" className="w-[78px] rounded-[24px]">
                    <Img src="img_user_white_a700_78x78.svg" width={78} height={78} />
                  </Button>
                  <Button size="9xl" className="w-[78px] rounded-[24px]">
                    <Img src="img_icon_phone_hangup.svg" width={78} height={78} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative ml-[-75px] flex h-[1024px] w-[32%] flex-col items-end gap-[60px] rounded-bl-[32px] rounded-tl-[32px] bg-[url(/images/img_side.svg)] bg-cover bg-no-repeat p-10 md:ml-0 md:h-auto md:w-full sm:gap-[30px] sm:p-5">
            <div className="mt-[5px] flex gap-5">
              <Button size="6xl" shape="round" className="min-w-[48px] font-sfprodisplay font-bold">
                1
              </Button>
              <Img
                src="img_avatar_48x48.png"
                width={48}
                height={48}
                alt="avatar"
                className="h-[48px] w-[48px] rounded-[12px] object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-[51px] self-stretch sm:gap-[25px]">
              <div className="flex items-center justify-between gap-5 self-stretch">
                <div className="flex w-[62%] items-center justify-between gap-5">
                  <div className="flex w-[31%] flex-col items-end">
                    <Img
                      src="img_close_white_a700_15x15.svg"
                      width={15}
                      height={15}
                      alt="close"
                      className="relative z-[1] h-[15px] w-[15px]"
                    />
                    <Img
                      src="img_avatar.png"
                      width={58}
                      height={58}
                      alt="avatar"
                      className="relative mt-[-15px] h-[58px] w-full rounded-[12px] object-cover md:h-auto"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[9px]">
                    <Heading size="xl" as="h1" className="!font-sfprodisplay">
                      Marriet Miles
                    </Heading>
                    <Text size="md" as="p" className="!font-sfprodisplay">
                      Ongoing Call…
                    </Text>
                  </div>
                </div>
                <Img
                  src="img_notification.svg"
                  width={25}
                  height={25}
                  alt="notification"
                  className="h-[25px] w-[25px]"
                />
              </div>
              <div className="flex w-[87%] pb-[9px] md:w-full">
                <div className="flex w-full items-start gap-[15px]">
                  <Img
                    src="img_avatar_48x48.png"
                    width={38}
                    height={38}
                    alt="avatar"
                    className="h-[38px] w-[38px] rounded-[12px] object-cover"
                  />
                  <div className="flex flex-1 flex-col items-start gap-[9px]">
                    <div className="flex flex-wrap items-center gap-[5px]">
                      <Heading as="h2">Anne Carry</Heading>
                      <Text as="p" className="self-start">
                        4min
                      </Text>
                    </div>
                    <div className="flex items-center justify-center gap-[5px] self-stretch rounded-[12px] bg-gray-100 p-2.5">
                      <Button size="3xl" shape="round" className="w-[38px]">
                        <Img src="img_forward.svg" width={38} height={38} />
                      </Button>
                      <div className="h-[4px] flex-1 rounded-sm bg-gray-500_66" />
                      <Text as="p">0:06</Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[87%] flex-col gap-10 md:w-full">
                <div className="flex items-start gap-[15px] pb-2.5">
                  <Img
                    src="img_avatar.png"
                    width={38}
                    height={38}
                    alt="marriet_miles"
                    className="h-[38px] w-[38px] rounded-[12px] object-cover"
                  />
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-wrap items-center gap-[5px]">
                      <Heading as="h3">Marriet Miles</Heading>
                      <Text as="p">4min</Text>
                    </div>
                    <Text size="md" as="p" className="!font-normal">
                      Yes, I saw his post yesterday
                    </Text>
                  </div>
                </div>
                <div className="h-[4px] w-[150px] rounded-sm bg-gray-500_66" />
                <div className="flex items-start gap-[15px] pb-2.5">
                  <Img
                    src="img_avatar_48x48.png"
                    width={38}
                    height={38}
                    alt="avatar"
                    className="h-[38px] w-[38px] rounded-[12px] object-cover"
                  />
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-wrap items-center gap-[5px]">
                      <Heading as="h4">Marriet Miles</Heading>
                      <Text as="p">4min</Text>
                    </div>
                    <Text size="md" as="p" className="!font-normal">
                      Yes, I saw his post yesterday
                    </Text>
                  </div>
                </div>
                <div className="h-[4px] w-[150px] rounded-sm bg-gray-500_66" />
                <div className="flex flex-1 pb-[9px]">
                  <div className="flex w-full items-start gap-[15px]">
                    <Img
                      src="img_avatar.png"
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-[38px] w-[38px] rounded-[12px] object-cover"
                    />
                    <div className="flex flex-1 flex-col items-start gap-[9px]">
                      <div className="flex flex-wrap items-center gap-[5px]">
                        <Heading as="h5">Anne Carry</Heading>
                        <Text as="p" className="self-start">
                          4min
                        </Text>
                      </div>
                      <div className="flex items-center justify-between gap-5 self-stretch rounded-[12px] bg-gray-100 p-2.5">
                        <Button size="3xl" shape="round" className="w-[38px]">
                          <Img src="img_forward.svg" width={38} height={38} />
                        </Button>
                        <Text as="p">0:06</Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[4px] w-[150px] rounded-sm bg-gray-500_66" />
                <div className="flex items-start gap-[15px] pb-2.5">
                  <Img
                    src="img_avatar_48x48.png"
                    width={38}
                    height={38}
                    alt="avatar"
                    className="h-[38px] w-[38px] rounded-[12px] object-cover"
                  />
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-wrap items-center gap-[5px]">
                      <Heading as="h6">Marriet Miles</Heading>
                      <Text as="p">4min</Text>
                    </div>
                    <Text size="md" as="p" className="!font-normal">
                      Yes, I saw his post yesterday
                    </Text>
                  </div>
                </div>
                <div className="h-[4px] w-[150px] rounded-sm bg-gray-500_66" />
                <div className="flex w-[28%] items-center md:w-full">
                  <Img
                    src="img_avatar.png"
                    width={38}
                    height={38}
                    alt="avatar"
                    className="h-[38px] w-[38px] rounded-[12px] object-cover"
                  />
                  <div className="ml-[15px] h-[7px] w-[7px] flex-1 rounded-[3px] bg-gray-500_cc" />
                  <div className="mb-3 ml-[5px] h-[7px] w-[7px] flex-1 self-end rounded-[3px] bg-gray-500_99" />
                  <div className="mb-[9px] ml-[5px] h-[7px] w-[7px] flex-1 self-end rounded-[3px] bg-gray-500_33" />
                </div>
              </div>
              <Input
                size="xl"
                name="writebox_one"
                placeholder={`Start typing…`}
                prefix={
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[50%] bg-gray-500_33">
                    <Img src="img_plus_gray_500.svg" width={18} height={18} alt="plus" className="h-[18px] w-[18px]" />
                  </div>
                }
                suffix={
                  <Img src="img_settings.svg" width={18} height={18} alt="settings" className="h-[18px] w-[18px]" />
                }
                className="gap-2.5 self-stretch rounded-[12px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
