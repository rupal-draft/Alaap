"use client";
import React from "react";
import { Input, Img, Text, Heading, Button } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { imageone: "img_image_380x255.png" },
  { imageone: "img_image_115x200.png" },
  { imageone: "img_image_22.png" },
];

export default function SingleVideoPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex md:flex-col">
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
        <div className="flex flex-1 items-center gap-2.5 md:flex-col md:self-stretch md:p-5">
          <Img
            src="img_indicator.svg"
            width={5}
            height={128}
            alt="indicator"
            className="h-[128px] w-[5px] rounded-sm md:w-full"
          />
          <div className="flex flex-1 justify-center rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 pl-10 pt-10 md:self-stretch sm:pl-5 sm:pt-5">
            <div className="flex w-[97%] flex-col self-end md:w-full">
              <header className="flex w-[96%] items-center justify-between gap-5 md:w-full">
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
                <div className="mt-10 flex w-[54%] flex-col items-start md:w-full">
                  <div className="relative h-[360px] self-stretch md:h-auto">
                    <Img
                      src="img_video_background.png"
                      width={635}
                      height={360}
                      alt="video"
                      className="h-[360px] w-full rounded-[12px] object-cover"
                    />
                    <div className="absolute bottom-[20.00px] left-0 right-0 m-auto flex w-[94%] flex-col gap-[18px]">
                      <div className="flex flex-col items-start justify-center">
                        <div className="flex flex-wrap justify-between gap-5 self-stretch">
                          <Text size="s" as="p" className="!text-white-A700">
                            01:23
                          </Text>
                          <Text size="s" as="p" className="!text-white-A700">
                            05:46
                          </Text>
                        </div>
                        <div className="mt-1.5 h-[4px] w-full self-stretch rounded-sm bg-white-A700_33" />
                        <div className="relative mt-[-4px] h-[4px] w-[60%] rounded-sm bg-white-A700_cc">
                          <div style={{ width: "88%" }} className="absolute h-full rounded-sm bg-light_blue-200" />
                        </div>
                      </div>
                      <div className="flex justify-between gap-5">
                        <div className="flex w-[15%] items-center justify-center">
                          <Img
                            src="img_thumbs_up.svg"
                            width={18}
                            height={18}
                            alt="thumbsup"
                            className="h-[18px] w-[18px]"
                          />
                          <Img
                            src="img_user_white_a700_18x18.svg"
                            width={18}
                            height={18}
                            alt="user"
                            className="ml-[18px] h-[18px] w-[18px]"
                          />
                          <div className="relative ml-2 h-[4px] flex-1 rounded-sm bg-white-A700_33">
                            <div style={{ width: "67%" }} className="absolute h-full rounded-sm bg-white-A700" />
                          </div>
                        </div>
                        <div className="flex gap-[18px]">
                          <Img
                            src="img_search_white_a700_18x18.svg"
                            width={18}
                            height={18}
                            alt="search"
                            className="h-[18px] w-[18px]"
                          />
                          <Img
                            src="img_microphone.svg"
                            width={18}
                            height={18}
                            alt="microphone"
                            className="h-[18px] w-[18px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[30px] flex items-center justify-between gap-5 self-stretch sm:flex-col">
                    <div className="flex items-center gap-2.5">
                      <Img
                        src="img_avatar.png"
                        width={48}
                        height={48}
                        alt="avatar"
                        className="h-[48px] w-[48px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-col items-start gap-[5px]">
                        <Text as="p" className="!text-gray-900">
                          Katherine Cole
                        </Text>
                        <Text size="s" as="p">
                          5min ago
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center p-1.5">
                        <Img
                          src="img_favorite_gray_500.svg"
                          width={14}
                          height={14}
                          alt="favorite"
                          className="h-[14px] w-[14px]"
                        />
                        <Text as="p" className="ml-[5px] !text-gray-900">
                          326
                        </Text>
                      </div>
                      <div className="ml-[15px] flex items-center gap-1.5 p-[5px]">
                        <Img
                          src="img_icon_comment.svg"
                          width={14}
                          height={14}
                          alt="iconcomment"
                          className="h-[14px] w-[14px]"
                        />
                        <Text as="p" className="!text-gray-900">
                          148
                        </Text>
                      </div>
                      <div className="ml-[17px] flex items-center self-start p-1.5">
                        <Img
                          src="img_question.svg"
                          width={14}
                          height={14}
                          alt="question"
                          className="h-[14px] w-[14px]"
                        />
                        <Text as="p" className="!text-gray-900">
                          Share
                        </Text>
                      </div>
                      <Img
                        src="img_notification.svg"
                        width={18}
                        height={18}
                        alt="notification"
                        className="ml-7 h-[18px] w-[18px]"
                      />
                    </div>
                  </div>
                  <div className="mt-[30px] flex flex-col gap-2 self-stretch">
                    <div className="flex flex-col gap-5">
                      <Heading size="2xl" as="h1" className="leading-9 !text-gray-900">
                        Tropical Fresh Tourism Is Back In Full Swing In Cancun Mexico
                      </Heading>
                      <Text as="p" className="!font-normal leading-[22px]">
                        Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state
                        tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago. And
                        the travel deals are great! If you haven’t been, now may be the best time to take a vacation to
                        Cancun.
                      </Text>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      <Text
                        size="s"
                        as="p"
                        className="flex items-center justify-center rounded bg-gray-500_1e px-2 py-0.5"
                      >
                        Travel
                      </Text>
                      <Text
                        size="s"
                        as="p"
                        className="flex items-center justify-center rounded bg-gray-500_1e px-2 py-0.5"
                      >
                        Mexico
                      </Text>
                      <Text
                        size="s"
                        as="p"
                        className="flex items-center justify-center rounded bg-gray-500_1e px-2 py-0.5"
                      >
                        Vlog
                      </Text>
                      <Text
                        size="s"
                        as="p"
                        className="flex items-center justify-center rounded bg-gray-500_1e px-2 py-0.5"
                      >
                        Tips
                      </Text>
                      <Text
                        size="s"
                        as="p"
                        className="flex items-center justify-center rounded bg-gray-500_1e px-[7px] py-0.5"
                      >
                        Vacation
                      </Text>
                      <Text
                        size="s"
                        as="p"
                        className="flex items-center justify-center rounded bg-gray-500_1e px-2 py-0.5"
                      >
                        Cancun
                      </Text>
                    </div>
                  </div>
                  <Heading as="h2" className="mt-[41px] !text-gray-900">
                    Related Videos
                  </Heading>
                  <div className="mt-[21px] flex gap-[18px] self-stretch md:flex-col">
                    {data.map((d, index) => (
                      <div key={"listcontrast" + index} className="relative h-[115px] w-full md:h-auto">
                        <Img
                          src={d.imageone}
                          width={200}
                          height={115}
                          alt="image"
                          className="h-[115px] w-full rounded-lg object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full justify-center rounded-lg bg-gray-900_66 p-[38px] sm:p-5">
                          <Button size="3xl" shape="round" className="w-[38px]">
                            <Img src="img_contrast.svg" width={38} height={38} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-[37%] flex-col gap-[70px] rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 p-[41px] md:w-full md:gap-[52px] md:p-5 sm:gap-[35px]">
                  <div className="flex flex-col items-start gap-[41px]">
                    <Heading size="xl" as="h3">
                      Comments (148)
                    </Heading>
                    <div className="flex flex-col gap-8 self-stretch">
                      <div className="flex flex-1">
                        <div className="flex w-full flex-col gap-2.5">
                          <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-[5px]">
                              <Img
                                src="img_avatar_12.png"
                                width={28}
                                height={28}
                                alt="billy_green"
                                className="h-[28px] w-[28px] rounded-[10px] object-cover"
                              />
                              <Text as="p" className="self-end !text-white-A700">
                                Billy Green
                              </Text>
                            </div>
                            <Text size="s" as="p" className="mb-[5px] self-end">
                              20min ago
                            </Text>
                          </div>
                          <Text as="p" className="!font-normal leading-[22px] !text-white-A700">
                            Awesome Edward, remeber that five tips for low cost holidays I sent you?
                          </Text>
                          <div className="flex gap-[15px]">
                            <Img
                              src="img_favorite_red_a200.svg"
                              width={14}
                              height={14}
                              alt="image"
                              className="h-[14px] w-[14px]"
                            />
                            <Img
                              src="img_instagram.svg"
                              width={14}
                              height={14}
                              alt="image"
                              className="h-[14px] w-[14px]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1">
                        <div className="flex w-full flex-col gap-2.5">
                          <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-[5px]">
                              <Img
                                src="img_avatar_13.png"
                                width={28}
                                height={28}
                                alt="avatar"
                                className="h-[28px] w-[28px] rounded-[10px] object-cover"
                              />
                              <Text as="p" className="self-end !text-white-A700">
                                Billy Green
                              </Text>
                            </div>
                            <Text size="s" as="p" className="mb-[5px] self-end">
                              20min ago
                            </Text>
                          </div>
                          <Text as="p" className="!font-normal leading-[22px] !text-white-A700">
                            Awesome Edward, remeber that five tips for low cost{" "}
                          </Text>
                          <div className="flex gap-[15px]">
                            <Img
                              src="img_favorite.svg"
                              width={14}
                              height={14}
                              alt="favorite"
                              className="h-[14px] w-[14px]"
                            />
                            <Img
                              src="img_instagram.svg"
                              width={14}
                              height={14}
                              alt="instagram"
                              className="h-[14px] w-[14px]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2.5">
                        <div className="flex items-center justify-between gap-5">
                          <div className="flex items-center gap-[5px]">
                            <Img
                              src="img_avatar_14.png"
                              width={28}
                              height={28}
                              alt="avatar"
                              className="h-[28px] w-[28px] rounded-[10px] object-cover"
                            />
                            <Text as="p" className="self-end !text-white-A700">
                              Billy Green
                            </Text>
                          </div>
                          <Text size="s" as="p" className="mb-[5px] self-end">
                            20min ago
                          </Text>
                        </div>
                        <div>
                          <div className="flex flex-col gap-2.5">
                            <Text as="p" className="!font-normal leading-[22px] !text-white-A700">
                              Awesome Edward, remeber that five tips for low cost holidays I sent you?
                            </Text>
                            <div className="flex gap-[15px]">
                              <Img
                                src="img_favorite_red_a200.svg"
                                width={14}
                                height={14}
                                alt="favorite"
                                className="h-[14px] w-[14px]"
                              />
                              <Img
                                src="img_instagram.svg"
                                width={14}
                                height={14}
                                alt="instagram"
                                className="h-[14px] w-[14px]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1">
                        <div className="flex w-full flex-col gap-2.5">
                          <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-[5px]">
                              <Img
                                src="img_avatar_15.png"
                                width={28}
                                height={28}
                                alt="avatar"
                                className="h-[28px] w-[28px] rounded-[10px] object-cover"
                              />
                              <Text as="p" className="self-end !text-white-A700">
                                Billy Green
                              </Text>
                            </div>
                            <Text size="s" as="p" className="mb-[5px] self-end">
                              20min ago
                            </Text>
                          </div>
                          <Text as="p" className="!font-normal leading-[22px] !text-white-A700">
                            Awesome Edward, remeber that five tips for low cost{" "}
                          </Text>
                          <div className="flex gap-[15px]">
                            <Img
                              src="img_favorite.svg"
                              width={14}
                              height={14}
                              alt="favorite"
                              className="h-[14px] w-[14px]"
                            />
                            <Img
                              src="img_instagram.svg"
                              width={14}
                              height={14}
                              alt="instagram"
                              className="h-[14px] w-[14px]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1">
                        <div className="flex w-full flex-col gap-2.5">
                          <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-[5px]">
                              <Img
                                src="img_avatar_16.png"
                                width={28}
                                height={28}
                                alt="avatar"
                                className="h-[28px] w-[28px] rounded-[10px] object-cover"
                              />
                              <Text as="p" className="self-end !text-white-A700">
                                Billy Green
                              </Text>
                            </div>
                            <Text size="s" as="p" className="mb-[5px] self-end">
                              20min ago
                            </Text>
                          </div>
                          <Text as="p" className="!font-normal leading-[22px] !text-white-A700">
                            Awesome Edward, remeber that five tips for low cost holidays I sent you?
                          </Text>
                          <div className="flex gap-[15px]">
                            <Img
                              src="img_favorite_red_a200.svg"
                              width={14}
                              height={14}
                              alt="favorite"
                              className="h-[14px] w-[14px]"
                            />
                            <Img
                              src="img_instagram.svg"
                              width={14}
                              height={14}
                              alt="instagram"
                              className="h-[14px] w-[14px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Input
                    name="comment"
                    placeholder={`Write a comment…`}
                    suffix={<Img src="img_save.svg" width={14} height={14} alt="save" className="h-[14px] w-[14px]" />}
                    className="mb-24 gap-[35px] rounded sm:pr-5"
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
