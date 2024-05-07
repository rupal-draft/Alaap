"use client";
import React from "react";
import { CloseSVG } from "../../assets/images";
import { Input, Img, Button, Text, Heading } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [{ marrietmiles: "img_avatar.png" }, { marrietmiles: "img_avatar_48x48.png" }];

export default function DirectMessagePage() {
  const [searchBarValue4, setSearchBarValue4] = React.useState("");
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex gap-[45px] md:flex-col">
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
        <div className="flex-1 pt-10 md:self-stretch md:p-5 sm:pt-5">
          <div className="flex flex-col items-center self-end">
            <header className="flex w-[95%] items-center justify-between gap-5 md:w-full sm:flex-col">
              <div className="flex w-[30%] items-center justify-center gap-[15px] sm:w-full">
                <Input
                  size="xl"
                  name="search"
                  placeholder={`Search in social…`}
                  value={searchBarValue4}
                  onChange={(e) => setSearchBarValue4(e)}
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
                    searchBarValue4?.length > 0 ? (
                      <CloseSVG onClick={() => setSearchBarValue4("")} height={18} width={18} />
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
            <div className="flex items-start gap-10 self-stretch md:flex-col">
              <div className="mt-[60px] flex w-[33%] flex-col items-center gap-[39px] md:w-full">
                <Heading size="2xl" as="h1" className="ml-5 self-start !text-gray-900 md:ml-0">
                  Inbox
                </Heading>
                <div className="flex w-[92%] items-start justify-center gap-5 md:w-full">
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
                  <div className="flex w-[90%] md:w-full">
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
                  </div>
                  <div className="flex w-[90%] md:w-full">
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
                  <div className="flex w-[90%] md:w-full">
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
                  <div className="flex flex-1 rounded-[12px] bg-white-A700 p-5">
                    <div className="flex w-full items-start justify-center">
                      <div className="relative z-[7] flex flex-1 items-center justify-between gap-5 pr-[87px] md:pr-5">
                        <div className="flex w-[25%] flex-col items-end">
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
                  <div className="flex w-[90%] md:w-full">
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
                  <div className="flex w-[90%] md:w-full">
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
                  <div className="flex w-[90%] md:w-full">
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
                  <div className="flex w-[90%] md:w-full">
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
              <div className="flex-1 pl-[5px] md:self-stretch">
                <div className="flex items-start gap-2.5 md:flex-col">
                  <Img
                    src="img_indicator_gray_500_128x5.svg"
                    width={5}
                    height={128}
                    alt="indicator"
                    className="mt-[350px] h-[128px] w-[5px] rounded-sm md:w-full"
                  />
                  <div className="flex flex-1 flex-col gap-[57px] rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 p-10 md:self-stretch sm:gap-7 sm:p-5">
                    <div className="ml-[5px] mt-[15px] flex items-center justify-between gap-5 md:ml-0 sm:flex-col">
                      <div className="flex w-[30%] items-center justify-between gap-5 sm:w-full">
                        <div className="flex w-[31%] flex-col items-end">
                          <Img
                            src="img_close_white_a700_15x15.svg"
                            width={15}
                            height={15}
                            alt="close"
                            className="relative z-[17] h-[15px] w-[15px]"
                          />
                          <Img
                            src="img_avatar_58x58.png"
                            width={58}
                            height={58}
                            alt="avatar"
                            className="relative mt-[-15px] h-[58px] w-full rounded-[16px] object-cover md:h-auto"
                          />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <Heading size="xl" as="h5" className="!text-gray-900">
                            Marriet Miles
                          </Heading>
                          <Text as="p">Online</Text>
                        </div>
                      </div>
                      <div className="flex w-[33%] items-start justify-between gap-5 sm:w-full">
                        <Img
                          src="img_settings_gray_500.svg"
                          width={32}
                          height={32}
                          alt="settings"
                          className="h-[32px] w-[32px]"
                        />
                        <Img src="img_call.svg" width={25} height={25} alt="call" className="h-[25px] w-[25px]" />
                        <Img src="img_upload.svg" width={25} height={25} alt="upload" className="h-[25px] w-[25px]" />
                        <Img
                          src="img_notification.svg"
                          width={25}
                          height={25}
                          alt="notification"
                          className="h-[25px] w-[25px]"
                        />
                      </div>
                    </div>
                    <div className="ml-[5px] flex w-[43%] flex-col gap-10 md:ml-0 md:w-full">
                      <div className="flex items-start gap-[15px] pb-[9px]">
                        <Img
                          src="img_avatar_48x48.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-1 flex-col items-start gap-[9px]">
                          <div className="flex flex-wrap items-center gap-[5px]">
                            <Heading as="p" className="!text-gray-900">
                              Anne Carry
                            </Heading>
                            <Text size="s" as="p" className="self-start">
                              4min
                            </Text>
                          </div>
                          <div className="flex items-center justify-center gap-[5px] self-stretch rounded-[12px] bg-gray-100 p-2.5">
                            <Button size="3xl" shape="round" className="w-[38px]">
                              <Img src="img_forward.svg" width={38} height={38} />
                            </Button>
                            <div className="h-[4px] flex-1 rounded-sm bg-gray-500_66" />
                            <Text size="s" as="p">
                              0:06
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-[83%] flex-col gap-10 md:w-full md:flex-row sm:flex-col">
                        {data.map((d, index) => (
                          <div key={"listmarriet" + index} className="flex items-start gap-[15px] pb-2.5">
                            <Img
                              src={d.marrietmiles}
                              width={38}
                              height={38}
                              alt="marriet_miles"
                              className="h-[38px] w-[38px] rounded-[12px] object-cover"
                            />
                            <div className="flex flex-col items-start gap-3">
                              <div className="flex flex-wrap items-center gap-[5px]">
                                <Heading as="p" className="!text-gray-900">
                                  Marriet Miles
                                </Heading>
                                <Text size="s" as="p">
                                  4min
                                </Text>
                              </div>
                              <Text as="p" className="!font-normal">
                                Yes, I saw his post yesterday
                              </Text>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pb-[9px]">
                        <div className="flex items-start gap-[15px]">
                          <Img
                            src="img_avatar.png"
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-[38px] w-[38px] rounded-[12px] object-cover"
                          />
                          <div className="flex flex-1 flex-col items-start gap-[9px]">
                            <div className="flex flex-wrap items-center gap-[5px]">
                              <Heading as="p" className="!text-gray-900">
                                Anne Carry
                              </Heading>
                              <Text size="s" as="p" className="self-start">
                                4min
                              </Text>
                            </div>
                            <div className="flex items-center justify-center gap-[5px] self-stretch rounded-[12px] bg-gray-100 p-2.5">
                              <Button size="3xl" shape="round" className="w-[38px]">
                                <Img src="img_forward.svg" width={38} height={38} />
                              </Button>
                              <div className="h-[4px] flex-1 rounded-sm bg-gray-500_66" />
                              <Text size="s" as="p">
                                0:06
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[30px]">
                        <div className="flex items-start gap-[15px] self-center pb-2.5">
                          <Img
                            src="img_avatar_48x48.png"
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-[38px] w-[38px] rounded-[12px] object-cover"
                          />
                          <div className="flex flex-col items-start gap-3.5">
                            <div className="flex flex-wrap items-center gap-[5px]">
                              <Heading as="p" className="!text-gray-900">
                                Marriet Miles
                              </Heading>
                              <Text size="s" as="p">
                                4min
                              </Text>
                            </div>
                            <Text as="p" className="!font-normal">
                              Yes, I saw his post yesterday
                            </Text>
                          </div>
                        </div>
                        <div className="flex items-center gap-[15px]">
                          <Img
                            src="img_avatar.png"
                            width={38}
                            height={38}
                            alt="avatar_eleven"
                            className="h-[38px] w-[38px] rounded-[12px] object-cover"
                          />
                          <Img
                            src="img_user_gray_500.svg"
                            width={31}
                            height={13}
                            alt="user"
                            className="mb-[9px] h-[13px] self-end"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-[98px] ml-[5px] flex items-center gap-[15px] md:ml-0 md:flex-col">
                      <Button size="5xl" shape="round" className="w-[48px]">
                        <Img src="img_plus_white_a700.svg" width={48} height={48} />
                      </Button>
                      <Input
                        size="xl"
                        name="field_one"
                        placeholder={`Start typing…`}
                        suffix={
                          <Img
                            src="img_settings.svg"
                            width={18}
                            height={18}
                            alt="settings"
                            className="h-[18px] w-[18px]"
                          />
                        }
                        className="flex-grow gap-[35px] rounded-[12px]"
                      />
                    </div>
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
