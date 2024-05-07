"use client";
import React from "react";
import { CloseSVG } from "../../assets/images";
import { Text, Img, Heading, Button, Input } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function MessagesPage() {
  const [searchBarValue2, setSearchBarValue2] = React.useState("");
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex items-start justify-between gap-5 self-end md:flex-col">
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
                icon={<Img src="img_close.svg" width={24} height={24} alt="close" className="h-[24px] w-[24px]" />}
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
                icon={<Img src="img_lock_24x24.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />}
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
        <div className="mt-10 flex w-[84%] flex-col md:w-full md:p-5">
          <header className="flex w-[97%] items-center justify-between gap-5 md:w-full sm:flex-col">
            <div className="flex w-[30%] items-center justify-center gap-[15px] sm:w-full">
              <Input
                size="xl"
                name="search"
                placeholder={`Search in social…`}
                value={searchBarValue2}
                onChange={(e) => setSearchBarValue2(e)}
                prefix={
                  <Img
                    src="img_rewind.svg"
                    width={18}
                    height={18}
                    alt="rewind"
                    className="h-[18px] w-[18px] cursor-pointer"
                  />
                }
                suffix={
                  searchBarValue2?.length > 0 ? (
                    <CloseSVG onClick={() => setSearchBarValue2("")} height={18} width={18} />
                  ) : null
                }
                className="flex-grow gap-[15px] rounded-[12px] font-sfprodisplay sm:pr-5"
              />
              <Link href="#">
                <Button size="5xl" shape="round" className="w-[48px]">
                  <Img src="img_computer.svg" width={48} height={48} />
                </Button>
              </Link>
            </div>
            <div className="flex gap-5">
              <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                <Button size="6xl" shape="round" className="min-w-[48px] font-sfprodisplay font-bold">
                  1
                </Button>
              </a>
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
          <div className="flex items-start justify-between gap-5 md:flex-col">
            <div className="mt-[60px] flex w-[30%] flex-col items-start gap-[39px] md:w-full">
              <Heading size="2xl" as="h1" className="!font-sfprodisplay !text-gray-900">
                Inbox
              </Heading>
              <div className="flex items-start justify-center gap-5 self-stretch">
                <div className="flex w-[34%] flex-col gap-[7px]">
                  <Heading as="h2" className="!text-gray-900">
                    Direct Messages
                  </Heading>
                  <div className="h-[2px] bg-gray-900" />
                </div>
                <Heading as="h3" className="!text-gray-500">
                  Group Chat
                </Heading>
                <Heading as="h4" className="!text-gray-500">
                  Archived
                </Heading>
              </div>
              <div className="flex flex-col gap-10 self-stretch">
                <div className="flex flex-1">
                  <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                    <div className="flex w-full items-start">
                      <div className="relative z-[1] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                        <div className="w-[25%]">
                          <div className="flex flex-col items-end">
                            <div className="relative z-[2] w-[26%] rounded-md bg-gray-100 md:w-full">
                              <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                            </div>
                            <Img
                              src="img_avatar_28.png"
                              width={48}
                              height={48}
                              alt="billy_green"
                              className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <Text as="p" className="!text-gray-900">
                            Billy Green
                          </Text>
                          <Text as="p" className="!font-normal">
                            Thank you for sharing
                          </Text>
                        </div>
                      </div>
                      <div className="relative ml-[-30px] flex w-[23%] flex-col items-end gap-[3px]">
                        <Text size="s" as="p">
                          3:03pm
                        </Text>
                        <Heading
                          size="xs"
                          as="h5"
                          className="flex h-[18px] w-[17px] items-center justify-center rounded-md bg-red-A200 !font-sfprodisplay uppercase tracking-[1.00px]"
                        >
                          1
                        </Heading>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full items-start">
                    <div className="relative z-[3] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                      <div className="w-[25%]">
                        <div className="flex flex-col items-end">
                          <div className="relative z-[4] w-[26%] rounded-md bg-gray-100 md:w-full">
                            <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                          </div>
                          <Img
                            src="img_avatar_29.png"
                            width={48}
                            height={48}
                            alt="avatar"
                            className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Text as="p" className="!text-gray-900">
                          Billy Green
                        </Text>
                        <Text as="p" className="!font-normal">
                          Thank you for sharing
                        </Text>
                      </div>
                    </div>
                    <div className="relative ml-[-30px] flex w-[23%] flex-col items-end gap-[3px]">
                      <Text size="s" as="p">
                        3:03pm
                      </Text>
                      <Heading
                        size="xs"
                        as="h6"
                        className="flex h-[18px] w-[17px] items-center justify-center rounded-md bg-red-A200 !font-sfprodisplay uppercase tracking-[1.00px]"
                      >
                        1
                      </Heading>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full items-start">
                    <div className="relative z-[5] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                      <div className="w-[25%]">
                        <div className="flex flex-col items-end">
                          <div className="relative z-[6] w-[26%] rounded-md bg-gray-100 md:w-full">
                            <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                          </div>
                          <Img
                            src="img_avatar_30.png"
                            width={48}
                            height={48}
                            alt="avatar"
                            className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Text as="p" className="!text-gray-900">
                          Billy Green
                        </Text>
                        <Text as="p" className="!font-normal">
                          Thank you for sharing
                        </Text>
                      </div>
                    </div>
                    <div className="relative ml-[-30px] flex w-[23%] flex-col items-end gap-[3px]">
                      <Text size="s" as="p">
                        3:03pm
                      </Text>
                      <Heading
                        size="xs"
                        as="p"
                        className="flex h-[18px] w-[17px] items-center justify-center rounded-md bg-red-A200 !font-sfprodisplay uppercase tracking-[1.00px]"
                      >
                        1
                      </Heading>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full items-start">
                    <div className="relative z-[7] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                      <div className="w-[25%]">
                        <div className="flex flex-col items-end">
                          <div className="relative z-[8] w-[26%] rounded-md bg-gray-100 md:w-full">
                            <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                          </div>
                          <Img
                            src="img_avatar_31.png"
                            width={48}
                            height={48}
                            alt="avatar"
                            className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Text as="p" className="!text-gray-900">
                          Billy Green
                        </Text>
                        <Text as="p" className="!font-normal">
                          Thank you for sharing
                        </Text>
                      </div>
                    </div>
                    <div className="relative ml-[-30px] flex pb-[21px] sm:pb-5">
                      <Text size="s" as="p">
                        Yesterday
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full items-start">
                    <div className="relative z-[9] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                      <div className="flex w-[25%] flex-col items-end">
                        <div className="relative z-10 w-[26%] rounded-md bg-gray-100 md:w-full">
                          <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                        </div>
                        <Img
                          src="img_avatar_32.png"
                          width={48}
                          height={48}
                          alt="avatar"
                          className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Text as="p" className="!text-gray-900">
                          Billy Green
                        </Text>
                        <Text as="p" className="!font-normal">
                          Thank you for sharing
                        </Text>
                      </div>
                    </div>
                    <div className="relative ml-[-30px] flex pb-[21px] sm:pb-5">
                      <Text size="s" as="p">
                        Yesterday
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full items-start">
                    <div className="relative z-[11] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                      <div className="flex w-[25%] flex-col items-end">
                        <div className="relative z-[12] w-[26%] rounded-md bg-gray-100 md:w-full">
                          <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                        </div>
                        <Img
                          src="img_avatar_33.png"
                          width={48}
                          height={48}
                          alt="avatar"
                          className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Text as="p" className="!text-gray-900">
                          Billy Green
                        </Text>
                        <Text as="p" className="!font-normal">
                          Thank you for sharing
                        </Text>
                      </div>
                    </div>
                    <div className="relative ml-[-30px] flex pb-[22px] sm:pb-5">
                      <Text size="s" as="p">
                        Oct 26
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full items-start">
                    <div className="relative z-[13] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                      <div className="flex w-[25%] flex-col items-end">
                        <div className="relative z-[14] w-[26%] rounded-md bg-gray-100 md:w-full">
                          <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                        </div>
                        <Img
                          src="img_avatar_34.png"
                          width={48}
                          height={48}
                          alt="avatar"
                          className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Text as="p" className="!text-gray-900">
                          Billy Green
                        </Text>
                        <Text as="p" className="!font-normal">
                          Thank you for sharing
                        </Text>
                      </div>
                    </div>
                    <div className="relative ml-[-30px] flex w-[23%] flex-col items-end gap-1">
                      <Text size="s" as="p">
                        Oct 26
                      </Text>
                      <Heading
                        size="xs"
                        as="p"
                        className="flex h-[18px] w-[17px] items-center justify-center rounded-md bg-red-A200 !font-sfprodisplay uppercase tracking-[1.00px]"
                      >
                        1
                      </Heading>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full items-start">
                    <div className="relative z-[15] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                      <div className="flex w-[25%] flex-col items-end">
                        <div className="relative z-[16] w-[26%] rounded-md bg-gray-100 md:w-full">
                          <div className="h-[10px] w-[10px] rounded-[5px] bg-green-400" />
                        </div>
                        <Img
                          src="img_avatar_35.png"
                          width={48}
                          height={48}
                          alt="avatar"
                          className="relative mt-[-12px] h-[48px] w-full rounded-[12px] object-cover md:h-auto"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Text as="p" className="!text-gray-900">
                          Billy Green
                        </Text>
                        <Text as="p" className="!font-normal">
                          Thank you for sharing
                        </Text>
                      </div>
                    </div>
                    <div className="relative ml-[-30px] flex w-[23%] flex-col items-end gap-1">
                      <Text size="s" as="p">
                        Oct 26
                      </Text>
                      <Heading
                        size="xs"
                        as="p"
                        className="flex h-[18px] w-[17px] items-center justify-center rounded-md bg-red-A200 !font-sfprodisplay uppercase tracking-[1.00px]"
                      >
                        1
                      </Heading>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[66%] items-start justify-center gap-2.5 md:w-full sm:flex-col">
              <Img
                src="img_indicator_gray_500_128x5.svg"
                width={5}
                height={128}
                alt="indicator"
                className="mt-[350px] h-[128px] w-[5px] rounded-sm sm:w-full"
              />
              <div className="flex flex-1 flex-col items-center justify-end rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 px-14 py-[151px] md:p-5 sm:self-stretch">
                <div className="mt-[135px] flex w-[70%] flex-col items-center gap-[318px] px-[17px] md:w-full md:gap-[238px] sm:gap-[159px]">
                  <div className="flex flex-col items-center gap-[19px] self-stretch">
                    <div className="w-[37%] rounded-[50px] bg-gray-100 p-[41px] md:w-full md:p-5">
                      <Img
                        src="img_lock_gray_500.svg"
                        width={78}
                        height={78}
                        alt="lock"
                        className="h-[78px] w-[78px]"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Heading size="2xl" as="h3" className="!text-gray-500">
                        It&#39;s nice to chat with someone
                      </Heading>
                      <Text as="p">Pick a person from left menu and start your conversation</Text>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-[5px]">
                    <Img src="img_download.svg" width={18} height={18} alt="download" className="h-[18px] w-[18px]" />
                    <Text as="p">Social is available for Mac</Text>
                    <Text as="p" className="!text-gray-900">
                      Download it now
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
