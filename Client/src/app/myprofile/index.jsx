"use client";
import React from "react";
import { Img, Heading, Text, Button, Input } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { title: "Tropical Fresh Tourism Is Back In Full Swing In ", image: "img_image_69x120.png" },
  { title: "How Timberland created the visual campaign of the ", image: "img_image_26.png" },
  { title: "Take your mobile photography to the next ", image: "img_image_38.png" },
];
const data1 = [
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
const data2 = [
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

export default function MyProfilePage() {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}
  return (
    <div className="flex w-full items-start justify-between gap-5 bg-gray-100 md:flex-col">
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
              icon={<Img src="img_lock_2.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />}
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
      <div className="flex w-[84%] items-start justify-between gap-5 self-end md:w-full md:flex-col md:p-5">
        <div className="mt-10 flex w-[63%] flex-col gap-10 md:w-full">
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
          <div className="flex items-start gap-[30px] bg-gray-100 md:flex-col">
            <div className="flex w-full flex-col gap-[30px] md:p-5">
              <div className="flex flex-1 flex-col gap-[30px] rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
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
                      <Heading size="md" as="h2">
                        Katherine Cole
                      </Heading>
                      <Text size="s" as="p">
                        5min ago
                      </Text>
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
                      src="img_image_150x290.png"
                      width={290}
                      height={150}
                      alt="read_more"
                      className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                    />
                    <div className="mt-5 flex flex-col gap-[15px] self-stretch">
                      <Heading as="h3" className="leading-[22px]">
                        The Best Fashion Instagrams of the Week: Céline Dion, Lizzo, and More
                      </Heading>
                      <Text as="p" className="leading-5">
                        If you are looking for a break from the cold, take a cue from Lizzo: This week, the singer
                        headed to Disneyland in warm and sunny California.
                      </Text>
                    </div>
                    <Link href="#" className="mt-[11px]">
                      <Heading size="s" as="h4" className="uppercase tracking-[1.00px] !text-gray-500">
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
                        <Text as="p" className="ml-[5px] !text-gray-900">
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
                        <Text as="p" className="!text-gray-900">
                          148
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center p-1.5">
                      <Text as="p" className="!text-gray-900">
                        Share
                      </Text>
                      <Img src="img_question.svg" width={14} height={14} alt="share" className="h-[14px] w-[14px]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
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
                      <Heading size="md" as="h5">
                        Katherine Cole
                      </Heading>
                      <Text size="s" as="p">
                        5min ago
                      </Text>
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
                    src="img_image_16.png"
                    width={290}
                    height={150}
                    alt="image"
                    className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                  />
                  <div className="mt-5 flex flex-col gap-[15px] self-stretch">
                    <Heading as="h6" className="leading-[22px]">
                      The Best Fashion Instagrams of the Week: Céline Dion, Lizzo, and More
                    </Heading>
                    <Text as="p" className="leading-5">
                      If you are looking for a break from the cold, take a cue from Lizzo: This week, the singer headed
                      to Disneyland in warm and sunny California.
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
                      <Text as="p" className="ml-[5px] !text-gray-900">
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
                      <Text as="p" className="!text-gray-900">
                        148
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center p-[5px]">
                    <Text as="p" className="!text-gray-900">
                      Share
                    </Text>
                    <Img src="img_question.svg" width={14} height={14} alt="question" className="h-[14px] w-[14px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-[30px] md:p-5">
              <div className="flex flex-col items-start justify-center gap-[30px] rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
                <Heading as="h6">Photos</Heading>
                <div className="flex flex-col items-start gap-[30px] self-stretch">
                  <div className="grid h-[320px] grid-cols-3 gap-2.5 self-stretch md:grid-cols-2 sm:grid-cols-1">
                    {data1.map((d, index) => (
                      <Img
                        key={"myprofile" + index}
                        src="img_image_221x221.png"
                        width={100}
                        height={100}
                        alt="image"
                        className="h-[100px] w-full rounded-[12px] object-cover md:h-auto"
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    color="undefined_undefined"
                    rightIcon={
                      <Img
                        src="img_arrowright_gray_900.svg"
                        width={14}
                        height={14}
                        alt="arrow_right"
                        className="h-[14px] w-[14px]"
                      />
                    }
                    className="min-w-[97px] gap-[-3px] rounded font-medium"
                  >
                    See more
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-[30px] rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
                <Heading as="h6">Videos</Heading>
                <div className="flex flex-col gap-[30px] self-stretch">
                  {data.map((d, index) => (
                    <div key={"listtitle" + index} className="flex flex-1 items-center gap-2.5">
                      <div className="flex w-[39%]">
                        <div className="w-full">
                          <Img
                            src={d.image}
                            width={120}
                            height={69}
                            alt="image"
                            className="h-[69px] w-full rounded-lg object-cover md:h-auto"
                          />
                          <div className="relative mt-[-69px] flex justify-center rounded-lg bg-gray-900_66 p-[25px] sm:p-5">
                            <Img
                              src="img_contrast.svg"
                              width={18}
                              height={18}
                              alt="image"
                              className="h-[18px] w-[18px] self-end"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col items-start justify-center gap-2">
                        <Heading size="md" as="p" className="w-full leading-5">
                          {d.title}
                        </Heading>
                        <Text as="p" className="!font-normal">
                          2 days ago
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[32%] items-center justify-center gap-2.5 md:w-full">
          <Img
            src="img_indicator_gray_500_128x5.svg"
            width={5}
            height={128}
            alt="indicator"
            className="h-[128px] w-[5px] rounded-sm"
          />
          <div className="flex flex-1 flex-col items-end gap-[85px] rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 p-[38px] md:gap-[63px] sm:gap-[42px] sm:p-5">
            <div className="mt-[7px] flex gap-5">
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
            <div className="mb-[42px] flex flex-col items-center gap-[30px] self-stretch">
              <div className="flex w-[75%] flex-col items-center gap-[30px] md:w-full">
                <div className="flex flex-col items-center gap-2 self-stretch px-[15px]">
                  <div className="w-[59%] md:w-full">
                    <Img
                      src="img_avatar_108x108.png"
                      width={108}
                      height={108}
                      alt="avatar"
                      className="h-[108px] w-full rounded-[36px] object-cover md:h-auto"
                    />
                  </div>
                  <Heading size="2xl" as="h2" className="!text-white-A700">
                    Edward Ford
                  </Heading>
                  <Text as="p" className="!font-normal">
                    @edwardford
                  </Text>
                </div>
                <div className="flex gap-[25px]">
                  <div className="flex flex-wrap gap-[5px]">
                    <Heading as="h3" className="!text-white-A700">
                      518
                    </Heading>
                    <Heading as="h4" className="!text-gray-500">
                      Posts
                    </Heading>
                  </div>
                  <div className="flex flex-wrap gap-[3px]">
                    <Heading as="h5" className="!text-white-A700">
                      22k
                    </Heading>
                    <Heading as="h6" className="!text-gray-500">
                      Friends
                    </Heading>
                  </div>
                </div>
              </div>
              <div className="flex flex-col self-stretch">
                <div className="flex items-center gap-5">
                  <Button size="8xl" className="min-w-[217px] rounded-[29px] font-bold sm:px-5">
                    Edit Profile
                  </Button>
                  <Button size="5xl" variant="outline" shape="round" color="undefined_undefined" className="w-[48px]">
                    <Img src="img_notification_white_a700_48x48.svg" width={48} height={48} />
                  </Button>
                </div>
                <div className="mt-10 flex w-[68%] flex-col items-start justify-center gap-3 md:w-full">
                  <Heading size="s" as="p" className="uppercase tracking-[1.00px] !text-white-A700">
                    About
                  </Heading>
                  <Text as="p" className="w-full !font-normal leading-[22px] !text-white-A700_cc">
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
                <div className="mt-[58px] flex flex-col items-start justify-center gap-5">
                  <Heading as="h6" className="!text-white-A700">
                    Friends
                  </Heading>
                  <div className="flex flex-col gap-[15px] self-stretch">
                    {data2.map((d, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
