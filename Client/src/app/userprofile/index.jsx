"use client";
import React from "react";
import { Img, Text, Heading, Button } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
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

export default function UserProfilePage() {
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
        <div className="mt-10 flex w-[84%] flex-col md:w-full md:p-5">
          <header className="flex w-[97%] items-center justify-between gap-5 md:w-full md:flex-col">
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
                <div className="flex w-[14%] flex-col gap-[7px]">
                  <Heading as="p">Posts</Heading>
                  <div className="h-[2px] w-[39px] bg-gray-900" />
                </div>
                <Heading as="p" className="!text-gray-500">
                  Photos
                </Heading>
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
          <div className="flex items-start justify-between gap-5 md:flex-col">
            <div className="mt-10 flex w-[29%] flex-col items-center rounded-[12px] bg-white-A700 p-[30px] md:w-full sm:p-5">
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
                  {data.map((d, index) => (
                    <div key={"listavatarone" + index} className="flex gap-[15px]">
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
            <div className="flex w-[66%] items-start justify-center gap-2.5 pb-[143px] md:w-full md:flex-col md:pb-5">
              <Img
                src="img_indicator_gray_500.svg"
                width={5}
                height={128}
                alt="indicator"
                className="mt-[350px] h-[128px] w-[5px] rounded-sm md:w-full"
              />
              <div className="relative h-[1194px] flex-1 md:w-full md:flex-none md:self-stretch">
                <div className="absolute left-0 right-0 top-[0.00px] m-auto w-full rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 p-10 sm:p-5">
                  <div className="mb-[382px] flex gap-[30px] md:flex-col">
                    <div className="flex w-full flex-col gap-[30px] rounded-[12px] border-2 border-solid border-gray-500_33 bg-white-A700 p-[30px] sm:p-5">
                      <div className="flex items-center justify-between gap-5 pr-2.5">
                        <div className="flex w-[68%] items-center justify-center gap-2.5">
                          <Img
                            src="img_image_48x48.png"
                            width={48}
                            height={48}
                            alt="katherine_cole"
                            className="h-[48px] w-[48px] rounded-[12px] object-cover"
                          />
                          <div className="flex flex-col items-start gap-[5px]">
                            <Heading as="p">Katherine Cole</Heading>
                            <Text as="p">5min ago</Text>
                          </div>
                        </div>
                        <Img
                          src="img_notification_gray_500.svg"
                          width={18}
                          height={18}
                          alt="katherine_cole"
                          className="h-[18px] w-[18px]"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-start justify-center">
                          <Img
                            src="img_image_16.png"
                            width={272}
                            height={150}
                            alt="read_more"
                            className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                          />
                          <div className="mt-5 flex flex-col gap-[15px] self-stretch">
                            <Heading size="lg" as="h6" className="leading-[22px]">
                              The Best Fashion Instagrams of the Week: Céline Dion, Lizzo
                            </Heading>
                            <Text size="md" as="p" className="leading-5">
                              If you are looking for a break from the cold, take a cue from Lizzo: This week, the singer
                              headed to Disneyland in warm and sunny California.
                            </Text>
                          </div>
                          <Link href="#" className="mt-[11px]">
                            <Heading size="s" as="p" className="uppercase tracking-[1.00px] !text-gray-500">
                              Read More
                            </Heading>
                          </Link>
                        </div>
                        <div className="flex justify-between gap-5">
                          <div className="flex items-center gap-[15px]">
                            <div className="flex items-center p-1.5">
                              <Img
                                src="img_favorite_gray_500.svg"
                                width={14}
                                height={14}
                                alt="image"
                                className="h-[14px] w-[14px]"
                              />
                              <Text size="md" as="p" className="ml-[5px] !text-gray-900">
                                326
                              </Text>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Img
                                src="img_icon_comment.svg"
                                width={14}
                                height={14}
                                alt="image"
                                className="h-[14px] w-[14px]"
                              />
                              <Text size="md" as="p" className="!text-gray-900">
                                148
                              </Text>
                            </div>
                          </div>
                          <div className="flex items-center p-1.5">
                            <Text size="md" as="p" className="!text-gray-900">
                              Share
                            </Text>
                            <Img
                              src="img_question.svg"
                              width={14}
                              height={14}
                              alt="share"
                              className="h-[14px] w-[14px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-[30px] rounded-[12px] border-2 border-solid border-gray-500_33 bg-white-A700 p-[30px] sm:p-5">
                      <div className="flex items-center justify-between gap-5 pr-2.5">
                        <div className="flex w-[68%] items-center justify-center gap-2.5">
                          <Img
                            src="img_image_48x48.png"
                            width={48}
                            height={48}
                            alt="image"
                            className="h-[48px] w-[48px] rounded-[12px] object-cover"
                          />
                          <div className="flex flex-col items-start gap-[5px]">
                            <Heading as="p">Katherine Cole</Heading>
                            <Text as="p">5min ago</Text>
                          </div>
                        </div>
                        <Img
                          src="img_notification_gray_500.svg"
                          width={18}
                          height={18}
                          alt="notification"
                          className="h-[18px] w-[18px]"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-start justify-center">
                          <Img
                            src="img_image_150x290.png"
                            width={272}
                            height={150}
                            alt="image"
                            className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                          />
                          <div className="mt-5 flex flex-col gap-[15px] self-stretch">
                            <Heading size="lg" as="h6" className="leading-[22px]">
                              The Best Fashion Instagrams of the Week: Céline Dion, Lizzo
                            </Heading>
                            <Text size="md" as="p" className="leading-5">
                              <span className="text-gray-500">
                                <>
                                  If you are looking for a break from the cold, take a cue from Lizzo: This week, the
                                  singer headed to Disneyland in warm and sunny California.
                                  <br />
                                </>
                              </span>
                              <span className="text-gray-500">
                                warm and sunny California.warm and sunny California.
                              </span>
                            </Text>
                          </div>
                          <Link href="#" className="mt-[11px]">
                            <Heading size="s" as="p" className="uppercase tracking-[1.00px] !text-gray-500">
                              Read More
                            </Heading>
                          </Link>
                        </div>
                        <div className="flex justify-between gap-5">
                          <div className="flex gap-2.5">
                            <div className="flex items-center p-1.5">
                              <Img
                                src="img_favorite_gray_500.svg"
                                width={14}
                                height={14}
                                alt="favorite"
                                className="h-[14px] w-[14px]"
                              />
                              <Text size="md" as="p" className="ml-[5px] !text-gray-900">
                                326
                              </Text>
                            </div>
                            <div className="flex items-center gap-1.5 p-[5px]">
                              <Img
                                src="img_icon_comment.svg"
                                width={14}
                                height={14}
                                alt="iconcomment"
                                className="h-[14px] w-[14px]"
                              />
                              <Text size="md" as="p" className="!text-gray-900">
                                148
                              </Text>
                            </div>
                          </div>
                          <div className="flex items-center p-1.5">
                            <Text size="md" as="p" className="!text-gray-900">
                              Share
                            </Text>
                            <Img
                              src="img_question.svg"
                              width={14}
                              height={14}
                              alt="question"
                              className="h-[14px] w-[14px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[7%] left-[6%] m-auto w-[42%] rounded-[12px] border-2 border-solid border-gray-500_33 bg-white-A700 p-[30px] sm:p-5">
                  <div className="flex items-center justify-between gap-5 pr-2.5">
                    <div className="flex w-[68%] items-center justify-center gap-2.5">
                      <Img
                        src="img_image_48x48.png"
                        width={48}
                        height={48}
                        alt="image"
                        className="h-[48px] w-[48px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-col items-start gap-[5px]">
                        <Heading as="p">Katherine Cole</Heading>
                        <Text as="p">5min ago</Text>
                      </div>
                    </div>
                    <Img
                      src="img_notification_gray_500.svg"
                      width={18}
                      height={18}
                      alt="notification"
                      className="h-[18px] w-[18px]"
                    />
                  </div>
                  <div className="mt-[30px] flex flex-col items-start">
                    <Img
                      src="img_image_150x272.png"
                      width={272}
                      height={150}
                      alt="image"
                      className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                    />
                    <div className="mt-5 flex flex-col gap-[15px] self-stretch">
                      <Heading size="lg" as="h6" className="leading-[22px]">
                        The Best Fashion Instagrams of the Week: Céline Dion, Lizzo
                      </Heading>
                      <Text size="md" as="p" className="leading-5">
                        If you are looking for a break from the cold, take a cue from Lizzo: This week, the singer
                        headed to Disneyland in warm and sunny California.
                      </Text>
                    </div>
                    <Link href="#" className="mt-[9px]">
                      <Heading size="s" as="p" className="uppercase tracking-[1.00px] !text-gray-500">
                        Read More
                      </Heading>
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between gap-5">
                    <div className="flex gap-2.5">
                      <div className="flex items-center p-[5px]">
                        <Img
                          src="img_favorite_gray_500.svg"
                          width={14}
                          height={14}
                          alt="favorite"
                          className="h-[14px] w-[14px]"
                        />
                        <Text size="md" as="p" className="ml-[5px] !text-gray-900">
                          326
                        </Text>
                      </div>
                      <div className="flex items-center gap-1.5 p-[5px]">
                        <Img
                          src="img_icon_comment.svg"
                          width={14}
                          height={14}
                          alt="iconcomment"
                          className="h-[14px] w-[14px]"
                        />
                        <Text size="md" as="p" className="!text-gray-900">
                          148
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center p-[5px]">
                      <Text size="md" as="p" className="!text-gray-900">
                        Share
                      </Text>
                      <Img src="img_question.svg" width={14} height={14} alt="question" className="h-[14px] w-[14px]" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[0.00px] right-[5%] m-auto w-[42%] rounded-[12px] border-2 border-solid border-gray-500_33 bg-white-A700 p-[30px] sm:p-5">
                  <div className="flex items-center justify-between gap-5 pr-2.5">
                    <div className="flex w-[68%] items-center justify-center gap-2.5">
                      <Img
                        src="img_image_48x48.png"
                        width={48}
                        height={48}
                        alt="image"
                        className="h-[48px] w-[48px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-col items-start gap-[5px]">
                        <Heading as="p">Katherine Cole</Heading>
                        <Text as="p">5min ago</Text>
                      </div>
                    </div>
                    <Img
                      src="img_notification_gray_500.svg"
                      width={18}
                      height={18}
                      alt="notification"
                      className="h-[18px] w-[18px]"
                    />
                  </div>
                  <div className="mt-[30px] flex flex-col items-start">
                    <Img
                      src="img_image_38.png"
                      width={272}
                      height={150}
                      alt="image"
                      className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                    />
                    <div className="mt-5 flex flex-col items-start gap-[38px] self-stretch">
                      <Heading size="lg" as="h6">
                        The Best Fashion Instagrams of the Week: Céline Dion, Lizzo
                      </Heading>
                      <Text size="md" as="p" className="w-full leading-5">
                        <span className="text-gray-500">
                          <>
                            If you are looking for a break from the cold, take a cue from Lizzo: This week, the singer
                            headed to Disneyland in warm and sunny California.
                            <br />
                          </>
                        </span>
                        <span className="text-gray-500">warm and sunny California.warm and sunny California.</span>
                      </Text>
                    </div>
                    <Link href="#" className="mt-[9px]">
                      <Heading size="s" as="p" className="uppercase tracking-[1.00px] !text-gray-500">
                        Read More
                      </Heading>
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between gap-5">
                    <div className="flex gap-2.5">
                      <div className="flex items-center p-[5px]">
                        <Img
                          src="img_favorite_gray_500.svg"
                          width={14}
                          height={14}
                          alt="favorite"
                          className="h-[14px] w-[14px]"
                        />
                        <Text size="md" as="p" className="ml-[5px] !text-gray-900">
                          326
                        </Text>
                      </div>
                      <div className="flex items-center gap-1.5 p-[5px]">
                        <Img
                          src="img_icon_comment.svg"
                          width={14}
                          height={14}
                          alt="iconcomment"
                          className="h-[14px] w-[14px]"
                        />
                        <Text size="md" as="p" className="!text-gray-900">
                          148
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center p-[5px]">
                      <Text size="md" as="p" className="!text-gray-900">
                        Share
                      </Text>
                      <Img src="img_question.svg" width={14} height={14} alt="question" className="h-[14px] w-[14px]" />
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
