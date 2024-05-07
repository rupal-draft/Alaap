"use client";
import React from "react";
import { Button, Img, Text, Heading, Input } from "../../components";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { billygreenone: "img_avatar_41.png" },
  { billygreenone: "img_avatar_42.png" },
  { billygreenone: "img_avatar_43.png" },
  { billygreenone: "img_avatar_44.png" },
  { billygreenone: "img_avatar_45.png" },
  { billygreenone: "img_avatar_46.png" },
  { billygreenone: "img_avatar_47.png" },
  { billygreenone: "img_avatar_48.png" },
  { billygreenone: "img_avatar_49.png" },
];

export default function MyFriendsPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex justify-between gap-5 md:flex-col">
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
        <div className="flex w-[84%] items-center justify-center gap-[30px] md:w-full md:flex-col md:p-5">
          <div className="flex flex-1 flex-col gap-[60px] md:self-stretch sm:gap-[30px]">
            <div className="flex items-center justify-center gap-[13px] rounded-[12px] bg-white-A700 p-3 md:flex-col">
              <Input
                size="sm"
                shape="square"
                name="search"
                placeholder={`Search in social…`}
                prefix={<Img src="img_rewind.svg" width={18} height={18} alt="rewind" className="h-[18px] w-[18px]" />}
                className="flex-grow gap-[15px] md:p-5 sm:pr-5"
              />
              <Heading size="s" as="h1" className="uppercase tracking-[1.00px] !text-gray-500">
                Filters
              </Heading>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex items-start justify-between gap-5 pr-[9px]">
                <Heading size="2xl" as="h2">
                  My Friends
                </Heading>
                <Button
                  size="xs"
                  shape="square"
                  rightIcon={
                    <Img src="img_filter.svg" width={14} height={14} alt="filter" className="h-[14px] w-[14px]" />
                  }
                  className="mt-[7px] min-w-[51px] gap-[3px] font-medium text-gray-900"
                >
                  Filter
                </Button>
              </div>
              <div className="grid grid-cols-3 justify-center gap-[30px] md:grid-cols-2 sm:grid-cols-1">
                {data.map((d, index) => (
                  <div
                    key={"myfriends" + index}
                    className="flex w-full flex-col items-center justify-center rounded-[12px] bg-white-A700 p-[37px] sm:p-5"
                  >
                    <Img
                      src={d.billygreenone}
                      width={58}
                      height={58}
                      alt="billy_green"
                      className="h-[58px] w-[58px] rounded-[18px] object-cover"
                    />
                    <Heading size="lg" as="h3" className="mt-3">
                      Billy Green
                    </Heading>
                    <Text as="p">@BillyGreen</Text>
                    <Button
                      size="xl"
                      leftIcon={
                        <Img
                          src="img_checkmark_white_a700.svg"
                          width={14}
                          height={14}
                          alt="checkmark"
                          className="h-[14px] w-[14px]"
                        />
                      }
                      className="mt-[15px] min-w-[84px] gap-[3px] rounded font-medium"
                    >
                      Freinds
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-[36%] items-center justify-center gap-2.5 pl-[5px] md:w-full">
            <Img
              src="img_indicator_gray_500_128x5.svg"
              width={5}
              height={128}
              alt="indicator"
              className="h-[128px] w-[5px] rounded-sm"
            />
            <div className="flex flex-1 flex-col items-center gap-[45px] rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 p-[30px] sm:p-5">
              <div className="mr-2.5 mt-[15px] flex gap-5 self-end md:mr-0">
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
              <div className="flex w-[90%] flex-col items-start gap-[41px] md:w-full">
                <Heading size="xl" as="h5" className="!text-white-A700">
                  Who to Follow
                </Heading>
                <div className="flex flex-col gap-[30px] self-stretch">
                  <div className="flex flex-1 flex-col gap-[30px]">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar.png"
                          width={38}
                          height={38}
                          alt="cammy_hedling"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Img
                        src="img_avatar_3.png"
                        width={38}
                        height={38}
                        alt="cammy_hedling"
                        className="h-[38px] w-[38px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-1 items-center justify-between gap-5">
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                        <Button className="w-[28px] rounded-lg">
                          <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-[30px]">
                    <div className="flex items-center gap-2.5">
                      <Img
                        src="img_avatar_7.png"
                        width={38}
                        height={38}
                        alt="avatar"
                        className="h-[38px] w-[38px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-1 items-center justify-between gap-5">
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                        <Button className="w-[28px] rounded-lg">
                          <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_50.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-[30px]">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_1.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_21.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-[30px]">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_5.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_51.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-[30px]">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_52.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_53.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-[30px]">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_54.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src="img_avatar_18.png"
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-[3px]">
                          <Heading as="p" className="!text-white-A700">
                            Cammy Hedling
                          </Heading>
                          <Text as="p" className="!text-white-A700">
                            Los Angeles, CA
                          </Text>
                        </div>
                      </div>
                      <Button className="w-[28px] self-end rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
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
