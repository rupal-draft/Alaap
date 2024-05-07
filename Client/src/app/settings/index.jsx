"use client";
import React from "react";
import { Heading, Button, Img, Input } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { SelectBox } from "@/components/SelectBox";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function SettingsPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex items-start justify-between gap-5 md:flex-col">
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
                [`&:hover, &.ps-active`]: {
                  backgroundColor: "#ffffff !important",
                },
              },
            }}
            rootStyles={{ ["&>ul"]: { gap: "322px" } }}
            className="mb-[5px] flex w-full flex-col"
          >
            <div className="flex flex-col gap-10">
              <MenuItem
                icon={
                  <Img
                    src="img_close.svg"
                    width={24}
                    height={24}
                    alt="close"
                    className="h-[24px] w-[24px]"
                  />
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
                  <Img
                    src="img_lock_white_a700.svg"
                    width={24}
                    height={24}
                    alt="lock"
                    className="h-[24px] w-[24px]"
                  />
                }
              />
              <MenuItem
                icon={
                  <Img
                    src="img_search_white_a700_24x24.svg"
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
        <div className="mb-[65px] flex w-[44%] flex-col gap-[31px] self-end md:w-full md:p-5">
          <div className="flex w-[85%] flex-col items-start gap-[60px] md:w-full sm:gap-[30px]">
            <div className="self-stretch">
              <div className="flex items-center gap-[30px] sm:flex-col">
                <div className="w-[25%] sm:w-full">
                  <Img
                    src="img_avatar_108x108.png"
                    width={128}
                    height={128}
                    alt="avatar"
                    className="h-[128px] w-full rounded-[36px] object-cover md:h-auto"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start gap-[21px] sm:self-stretch">
                  <Heading as="h1" className="!text-gray-500">
                    Profile Picture
                  </Heading>
                  <div className="flex gap-5 self-stretch">
                    <Button
                      size="8xl"
                      className="w-full rounded-[29px] font-bold sm:px-5"
                    >
                      Replace
                    </Button>
                    <Button
                      size="8xl"
                      variant="outline"
                      shape="round"
                      color="undefined_undefined"
                      leftIcon={
                        <Img
                          src="img_thumbsup_gray_900.svg"
                          width={18}
                          height={18}
                          alt="thumbs_up"
                          className="h-[18px] w-[18px]"
                        />
                      }
                      className="w-full gap-[7px] font-sfprodisplay font-bold !text-red-A200 sm:px-5"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Heading as="h2" className="!text-gray-500">
              Basic Information
            </Heading>
          </div>
          <div className="flex flex-col items-start gap-[52px] sm:gap-[26px]">
            <div className="flex flex-col gap-10 self-stretch">
              <div className="flex gap-[30px] md:flex-col">
                <div className="flex w-full flex-col gap-[30px]">
                  <div className="flex flex-col items-start justify-center gap-3">
                    <Heading
                      size="s"
                      as="h3"
                      className="uppercase tracking-[1.00px]"
                    >
                      name
                    </Heading>
                    <Input
                      shape="round"
                      name="name"
                      placeholder={`Anne Carry`}
                      className="self-stretch sm:pr-5"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-3">
                    <Heading
                      size="s"
                      as="h4"
                      className="uppercase tracking-[1.00px]"
                    >
                      Email
                    </Heading>
                    <Input
                      shape="round"
                      type="email"
                      name="email"
                      placeholder={`user@mail.com`}
                      className="self-stretch sm:pr-5"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-[30px]">
                  <div className="flex flex-col items-start justify-center gap-3">
                    <Heading
                      size="s"
                      as="h5"
                      className="uppercase tracking-[1.00px]"
                    >
                      username
                    </Heading>
                    <Input
                      shape="round"
                      name="userName"
                      placeholder={`annecarry`}
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
                      as="h6"
                      className="uppercase tracking-[1.00px]"
                    >
                      birthday
                    </Heading>
                    <SelectBox
                      shape="round"
                      indicator={
                        <Img
                          src="img_checkmark_indigo_a200.svg"
                          width={18}
                          height={18}
                          alt="checkmark"
                          className="h-[18px] w-[18px]"
                        />
                      }
                      name="month"
                      placeholder={`January 25, 1991`}
                      options={dropDownOptions}
                      className="gap-px self-stretch font-medium sm:pr-5"
                    />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-500_33" />
            </div>
            <div className="flex items-start gap-[30px] self-stretch md:flex-col">
              <div className="flex w-full flex-col gap-[30px]">
                <div className="flex flex-col items-start justify-center gap-3">
                  <Heading
                    size="s"
                    as="p"
                    className="uppercase tracking-[1.00px]"
                  >
                    Country
                  </Heading>
                  <SelectBox
                    shape="round"
                    indicator={
                      <Img
                        src="img_checkmark_indigo_a200.svg"
                        width={18}
                        height={18}
                        alt="checkmark"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    name="country"
                    placeholder={`United States`}
                    options={dropDownOptions}
                    className="gap-px self-stretch font-medium sm:pr-5"
                  />
                </div>
                <div className="flex flex-col items-start justify-center gap-3">
                  <Heading
                    size="s"
                    as="p"
                    className="uppercase tracking-[1.00px]"
                  >
                    City
                  </Heading>
                  <SelectBox
                    shape="round"
                    indicator={
                      <Img
                        src="img_checkmark_indigo_a200.svg"
                        width={18}
                        height={18}
                        alt="checkmark"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    name="city"
                    placeholder={`San Francisco`}
                    options={dropDownOptions}
                    className="gap-px self-stretch font-medium sm:pr-5"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-3">
                <Heading
                  size="s"
                  as="p"
                  className="uppercase tracking-[1.00px]"
                >
                  state
                </Heading>
                <SelectBox
                  shape="round"
                  indicator={
                    <Img
                      src="img_checkmark_indigo_a200.svg"
                      width={18}
                      height={18}
                      alt="checkmark"
                      className="h-[18px] w-[18px]"
                    />
                  }
                  name="inputdata"
                  placeholder={`California`}
                  options={dropDownOptions}
                  className="gap-px self-stretch font-medium sm:pr-5"
                />
              </div>
            </div>
            <Button
              size="8xl"
              className="min-w-[180px] rounded-[29px] font-bold sm:px-5"
            >
              Save Changes
            </Button>
          </div>
        </div>
        <div className="flex w-[36%] items-center justify-center gap-2.5 pl-[5px] md:w-full md:flex-col md:p-5">
          <Img
            src="img_indicator_gray_500_128x5.svg"
            width={5}
            height={128}
            alt="indicator"
            className="h-[128px] w-[5px] rounded-sm md:w-full"
          />
          <div className="flex flex-1 flex-col gap-12 rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 py-10 md:self-stretch sm:py-5">
            <header className="mt-[5px] flex items-center justify-between gap-5">
              <Heading size="xl" as="h5">
                Account Informations
              </Heading>
              <div className="flex w-[10%] flex-col">
                <div className="relative z-[1] flex gap-5 self-start">
                  <Button
                    size="6xl"
                    shape="round"
                    className="min-w-[48px] font-sfprodisplay font-bold"
                  >
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
                <div className="relative mt-[-48px] flex gap-5">
                  <div className="flex w-[50%] flex-col items-center rounded-[12px] bg-light_blue-200 p-2.5">
                    <Heading size="xl" as="h5" className="!text-white-A700">
                      1
                    </Heading>
                  </div>
                  <Link href="#">
                    <Img
                      src="img_image_35.png"
                      width={48}
                      height={48}
                      alt="image"
                      className="h-[48px] w-[48px] rounded-[12px] object-cover"
                    />
                  </Link>
                </div>
              </div>
            </header>
            <div className="mb-72 ml-[45px] flex flex-col items-start gap-[39px] md:ml-0">
              <Heading size="xl" as="h2" className="!text-white-A700">
                Settings
              </Heading>
              <div className="flex flex-col items-start gap-10">
                <div className="flex items-center gap-[15px]">
                  <Button size="5xl" shape="round" className="w-[48px]">
                    <Img
                      src="img_lock_gray_900_48x48.svg"
                      width={48}
                      height={48}
                    />
                  </Button>
                  <Heading as="h3" className="mb-3 self-end !text-white-A700">
                    My Account
                  </Heading>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Button
                    size="5xl"
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    className="w-[48px]"
                  >
                    <Img
                      src="img_icon_notification.svg"
                      width={48}
                      height={48}
                    />
                  </Button>
                  <Heading as="h4" className="!text-white-A700">
                    Notifications
                  </Heading>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Button
                    size="5xl"
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    className="w-[48px]"
                  >
                    <Img
                      src="img_clock_white_a700.svg"
                      width={48}
                      height={48}
                    />
                  </Button>
                  <Heading as="h5" className="mb-3 self-end !text-white-A700">
                    Activity History
                  </Heading>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Button
                    size="5xl"
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    className="w-[48px]"
                  >
                    <Img src="img_alarm.svg" width={48} height={48} />
                  </Button>
                  <Heading as="h6" className="mb-3 self-end !text-white-A700">
                    Billing and Payment
                  </Heading>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Button
                    size="5xl"
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    className="w-[48px]"
                  >
                    <Img src="img_location.svg" width={48} height={48} />
                  </Button>
                  <Heading as="h6" className="mb-3 self-end !text-white-A700">
                    Security & Privacy
                  </Heading>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Button
                    size="5xl"
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    className="w-[48px]"
                  >
                    <Img
                      src="img_user_white_a700_48x48.svg"
                      width={48}
                      height={48}
                    />
                  </Button>
                  <Heading as="h6" className="mb-3 self-end !text-white-A700">
                    Help
                  </Heading>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
