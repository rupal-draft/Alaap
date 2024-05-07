"use client";
import React from "react";
import { Input, Img, Text, Heading, Button } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function SinglePostPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="w-full bg-gray-100">
      <div className="flex gap-[15px] md:flex-col">
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
        <div className="flex flex-1 flex-col items-center rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 pl-10 pt-10 md:self-stretch md:p-5 sm:pl-5 sm:pt-5">
          <header className="flex w-[93%] items-center justify-between gap-5 md:w-full">
            <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
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
            </a>
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
          <div className="flex w-[97%] items-start justify-between gap-5 md:w-full md:flex-col">
            <div className="mt-10 flex w-[54%] flex-col gap-10 md:w-full">
              <div className="flex items-center justify-between gap-5 sm:flex-col">
                <div className="flex items-center gap-2.5 pr-[5px]">
                  <Img
                    src="img_avatar.png"
                    width={48}
                    height={48}
                    alt="avatar"
                    className="h-[48px] w-[48px] rounded-[12px] object-cover"
                  />
                  <div className="flex flex-col items-start gap-[5px]">
                    <Text as="p">Katherine Cole</Text>
                    <Text size="s" as="p" className="!text-gray-500">
                      5min ago
                    </Text>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-[5px]">
                    <Img src="img_favorite.svg" width={14} height={14} alt="favorite" className="h-[14px] w-[14px]" />
                    <Text as="p">326</Text>
                  </div>
                  <div className="ml-[27px] flex items-center gap-1.5 p-[5px]">
                    <Img src="img_instagram.svg" width={14} height={14} alt="instagram" className="h-[14px] w-[14px]" />
                    <Text as="p">148</Text>
                  </div>
                  <div className="ml-[17px] flex items-center self-start p-1.5">
                    <Img src="img_question.svg" width={14} height={14} alt="question" className="h-[14px] w-[14px]" />
                    <Text as="p">Share</Text>
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
              <div className="flex flex-col gap-10">
                <Img
                  src="img_image_150x290.png"
                  width={635}
                  height={330}
                  alt="image"
                  className="h-[330px] rounded-lg object-cover"
                />
                <div className="flex flex-col gap-6">
                  <Heading size="2xl" as="h1" className="leading-9 !text-gray-900">
                    The Best Fashion Instagrams of the Week: Céline Dion, Lizzo, and More
                  </Heading>
                  <Text as="p" className="!font-normal leading-[22px] !text-gray-500">
                    <>
                      f you are looking for a break from the cold, take a cue from Lizzo: This week, the singer headed
                      to Disneyland in warm and sunny California. She dressed up for the occasion in pure Minnie Mouse
                      style perfection, including a cartoon merch sweatshirt from the artist Shelby Swain, cycling
                      shorts, and adorable pulled-up polka dot socks. All the way over in Montreal, Céline Dion also had
                      quite the wardrobe moment. For a concert, the singer wore a pair of fringed, XXL-flared cowboy
                      jeans by Ukrainian label Ksenia Schnaider. The Kiev-based designer is responsible for other viral
                      denim creations, like her asymmetrical jeans that launched earlier this year. Fun fact: The daring
                      Dion has worn a pair of those, too!
                      <br />
                      <br />
                      Of course, back in New York, there was Marc Jacobs. The designer has been having quite the year
                      when it comes to flexing his fashion muscles on the ’gram. This week, he channeled The Wizard Of
                      Oz with a full-green look that included some shimmery Sies Marjan pants, and a pair of platform
                      boots to anchor the ensemble.
                    </>
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex w-[37%] flex-col gap-[70px] rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 p-[41px] md:w-full md:gap-[52px] md:p-5 sm:gap-[35px]">
              <div className="flex flex-col items-start gap-[41px]">
                <Heading size="xl" as="h2">
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
                        <Text size="s" as="p" className="mb-[5px] self-end !text-gray-500">
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
                        <Img src="img_instagram.svg" width={14} height={14} alt="image" className="h-[14px] w-[14px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5">
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
                      <Text size="s" as="p" className="mb-[5px] self-end !text-gray-500">
                        20min ago
                      </Text>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2.5">
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
                  </div>
                  <div className="flex flex-1">
                    <div className="flex w-full flex-col gap-2.5">
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
                        <Text size="s" as="p" className="mb-[5px] self-end !text-gray-500">
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
                        <Text size="s" as="p" className="mb-[5px] self-end !text-gray-500">
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
                        <Text size="s" as="p" className="mb-[5px] self-end !text-gray-500">
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
  );
}
