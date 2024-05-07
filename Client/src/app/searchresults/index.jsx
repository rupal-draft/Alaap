"use client";
import React from "react";
import { Button, Img, Text, Heading } from "../../components";
import Link from "next/link";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { logannasser: "img_avatar.png" },
  { logannasser: "img_avatar_19.png" },
  { logannasser: "img_avatar_6.png" },
  { logannasser: "img_avatar_11.png" },
];
const data1 = [
  { madeinamerica: "img_avatar_20.png" },
  { madeinamerica: "img_avatar_21.png" },
  { madeinamerica: "img_avatar_22.png" },
];

export default function SearchResultsPage() {
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
              icon={
                <Img src="img_close_indigo_a200.svg" width={24} height={24} alt="close" className="h-[24px] w-[24px]" />
              }
            />
            <MenuItem
              icon={
                <Img
                  src="img_calendar_indigo_a200_24x24.svg"
                  width={24}
                  height={24}
                  alt="calendar"
                  className="h-[24px] w-[24px]"
                />
              }
            />
            <MenuItem
              icon={<Img src="img_lock.svg" width={24} height={24} alt="lock" className="h-[24px] w-[24px]" />}
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
      <div className="flex w-[84%] items-start justify-center gap-[30px] self-end md:w-full md:flex-col md:p-5">
        <div className="mt-10 flex flex-1 flex-col items-start gap-[55px] md:self-stretch sm:gap-[27px]">
          <div className="flex items-center gap-2.5 self-stretch rounded-[12px] bg-white-A700 p-[13px]">
            <div className="flex flex-1 items-center gap-[15px] bg-white-A700 py-[7px]">
              <Img src="img_rewind_indigo_a200.svg" width={18} height={18} alt="rewind" className="h-[18px] w-[18px]" />
              <Text as="p" className="!text-gray-900">
                Nass
              </Text>
            </div>
            <div className="flex w-[12%] items-center justify-center gap-2.5">
              <Heading
                size="s"
                as="h1"
                className="w-[65%] self-end uppercase leading-5 tracking-[1.00px] !text-gray-500"
              >
                Filters
              </Heading>
              <Button size="md" className="min-w-[28px] rounded-lg font-sfprodisplay font-bold">
                1
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[39px] self-stretch">
            <Heading size="xl" as="h2" className="!text-gray-900">
              People
            </Heading>
            <div className="flex flex-col items-start gap-[30px] self-stretch">
              <div className="grid grid-cols-2 gap-[30px] self-stretch md:grid-cols-1">
                {data.map((d, index) => (
                  <div
                    key={"searchresults" + index}
                    className="flex w-full items-center justify-between gap-5 rounded-[12px] bg-white-A700 p-[30px] sm:p-5"
                  >
                    <div className="flex items-center gap-[15px] pr-1.5">
                      <Img
                        src={d.logannasser}
                        width={48}
                        height={48}
                        alt="logan_nasser"
                        className="h-[48px] w-[48px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-col items-start gap-0.5">
                        <Heading size="lg" as="h3" className="!text-gray-900">
                          Logan Nasser
                        </Heading>
                        <Text size="s" as="p">
                          @louisaingram
                        </Text>
                      </div>
                    </div>
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
                      className="min-w-[65px] gap-[5px] rounded font-medium"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                size="xl"
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
          <Heading size="xl" as="h5" className="!text-gray-900">
            Posts
          </Heading>
          <div className="flex items-start gap-[30px] self-stretch md:flex-col">
            <div className="w-full rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
              <div className="flex items-center justify-between gap-5 pr-2.5">
                <div className="flex w-[68%] items-center justify-center gap-2.5 pr-[9px]">
                  <Img
                    src="img_image_48x48.png"
                    width={48}
                    height={48}
                    alt="image"
                    className="h-[48px] w-[48px] rounded-[12px] object-cover"
                  />
                  <div className="flex flex-col items-start gap-[5px]">
                    <Heading as="p" className="!text-gray-900">
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
                  src="img_image_150x290.png"
                  width={305}
                  height={150}
                  alt="image"
                  className="h-[150px] w-full rounded-lg object-cover md:h-auto"
                />
                <div className="mt-5 flex flex-col gap-[15px] self-stretch">
                  <Heading size="lg" as="h6" className="leading-[22px] !text-gray-900">
                    The Best Fashion Instagrams of the Week: Céline Dion, Lizzo, and More
                  </Heading>
                  <Text as="p" className="leading-5">
                    If you are looking for a break from the cold, take a cue from Lizzo: This week, the singer headed to
                    Disneyland in warm and sunny California.
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
            <div className="flex w-full flex-col gap-[25px] rounded-[12px] bg-white-A700 p-[23px] sm:p-5">
              <div className="mt-[7px] flex flex-col items-start gap-[31px]">
                <div className="flex items-center justify-between gap-5 self-stretch pr-2.5">
                  <div className="flex items-center gap-2.5">
                    <Img
                      src="img_image_1.png"
                      width={48}
                      height={48}
                      alt="image"
                      className="h-[48px] w-[48px] rounded-[12px] object-cover"
                    />
                    <div className="flex flex-col items-start gap-[5px]">
                      <Heading as="p" className="!text-gray-900">
                        Dustin Houston
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
                <Text as="p">Whether its a driving tour 😂</Text>
              </div>
              <div>
                <div className="flex gap-2.5">
                  <Img
                    src="img_image_160x200.png"
                    width={210}
                    height={160}
                    alt="image"
                    className="h-[160px] w-[71%] rounded-lg object-cover"
                  />
                  <div className="flex w-[29%] flex-col gap-2.5">
                    <Img
                      src="img_image_75x80.png"
                      width={84}
                      height={75}
                      alt="image"
                      className="h-[75px] rounded-lg object-cover"
                    />
                    <div className="relative h-[75px] md:h-auto">
                      <Img
                        src="img_image_2.png"
                        width={84}
                        height={75}
                        alt="image_eleven"
                        className="h-[75px] w-full rounded-lg object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-max items-center gap-[7px] p-1.5">
                        <Img
                          src="img_camera_white_a700_14x14.svg"
                          width={14}
                          height={14}
                          alt="camera"
                          className="h-[14px] w-[14px]"
                        />
                        <Text as="p" className="!font-sfprodisplay !text-white-A700">
                          17
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-[7px] flex justify-between gap-5">
                <div className="flex gap-2.5">
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
                <div className="flex items-center p-1.5">
                  <Text as="p" className="!text-gray-900">
                    Share
                  </Text>
                  <Img src="img_question.svg" width={14} height={14} alt="question" className="h-[14px] w-[14px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1024px] w-[36%] bg-[url(/images/img_indicator_gray_500.svg)] bg-cover bg-no-repeat pl-5 md:h-auto md:w-full">
          <div className="flex flex-col items-end gap-[45px] rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 p-10 sm:p-5">
            <div className="mt-[5px] flex gap-5">
              <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                <Button size="6xl" shape="round" className="min-w-[48px] font-sfprodisplay font-bold">
                  1
                </Button>
              </a>
              <Img
                src="img_avatar_48x48.png"
                width={48}
                height={48}
                alt="avatar"
                className="h-[48px] w-[48px] rounded-[12px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-[60px] self-stretch sm:gap-[30px]">
              <div className="relative h-[174px] rounded-[12px] bg-red-A200 pt-[21px] sm:pt-5">
                <Img
                  src="img_oval.png"
                  width={165}
                  height={92}
                  alt="oval"
                  className="absolute bottom-[0.00px] right-[0.00px] m-auto h-[92px] w-[52%] object-cover"
                />
                <div className="absolute left-[0.00px] top-[21.00px] m-auto flex w-[90%] items-start">
                  <div className="mt-4 h-[87px] w-[18%] rounded-[50%] bg-green-400" />
                  <div className="relative ml-[-37px] flex-1">
                    <div className="flex flex-col items-start">
                      <div className="flex w-[67%] items-start gap-[19px] md:w-full">
                        <Heading size="xl" as="h2">
                          Go Premium!
                        </Heading>
                        <div className="h-[19px] w-[19px] rounded-[9px] bg-gray-900_33" />
                      </div>
                      <Text as="p" className="mt-1.5 w-full !font-normal leading-[22px] !text-white-A700">
                        <>
                          Try premium membership and enjoy
                          <br />a full experience of our community.
                        </>
                      </Text>
                      <Button
                        size="xl"
                        shape="round"
                        rightIcon={
                          <Img
                            src="img_arrowright.svg"
                            width={14}
                            height={14}
                            alt="arrow_right"
                            className="h-[14px] w-[14px]"
                          />
                        }
                        className="mt-[25px] min-w-[97px] gap-[-3px] font-medium"
                      >
                        See more
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-[41px]">
                <Heading size="xl" as="h3">
                  Who to Follow
                </Heading>
                <div className="flex flex-col gap-[30px] self-stretch">
                  <div className="flex flex-1 items-center justify-between gap-5">
                    <div className="flex items-center gap-2.5">
                      <Img
                        src="img_avatar_2.png"
                        width={38}
                        height={38}
                        alt="cammy_hedling"
                        className="h-[38px] w-[38px] rounded-[12px] object-cover"
                      />
                      <div className="flex flex-col items-start gap-[3px]">
                        <Heading as="h4">Cammy Hedling</Heading>
                        <Text size="s" as="p" className="!text-white-A700">
                          Los Angeles, CA
                        </Text>
                      </div>
                    </div>
                    <Button className="w-[28px] self-end rounded-lg">
                      <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex flex-1 items-center gap-2.5">
                    <Img
                      src="img_avatar_3.png"
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-[38px] w-[38px] rounded-[12px] object-cover"
                    />
                    <div className="flex flex-1 items-center justify-between gap-5">
                      <div className="flex flex-col items-start gap-[3px]">
                        <Heading as="h5">Cammy Hedling</Heading>
                        <Text size="s" as="p" className="!text-white-A700">
                          Los Angeles, CA
                        </Text>
                      </div>
                      <Button className="w-[28px] rounded-lg">
                        <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center">
                    <Img
                      src="img_avatar_1.png"
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-[38px] w-[38px] rounded-[12px] object-cover"
                    />
                    <div className="ml-2.5 flex flex-col items-start gap-[3px]">
                      <Heading as="h6">Cammy Hedling</Heading>
                      <Text size="s" as="p" className="!text-white-A700">
                        Los Angeles, CA
                      </Text>
                    </div>
                    <Button className="ml-10 w-[28px] self-end rounded-lg">
                      <Img src="img_settings_white_a700_28x28.svg" width={28} height={28} />
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  shape="square"
                  rightIcon={
                    <Img
                      src="img_arrowright_gray_500.svg"
                      width={18}
                      height={18}
                      alt="arrow_right"
                      className="h-[18px] w-[18px]"
                    />
                  }
                  className="min-w-[90px] gap-1 font-bold uppercase tracking-[1.00px] text-gray-500"
                >
                  See more
                </Button>
              </div>
              <div className="flex flex-col items-start justify-center gap-[41px]">
                <Heading size="xl" as="h5">
                  Friends
                </Heading>
                <div className="flex flex-col gap-[30px] self-stretch">
                  {data1.map((d, index) => (
                    <div key={"listmadeinameri" + index} className="flex flex-1 items-center justify-between gap-5">
                      <div className="flex items-center gap-2.5">
                        <Img
                          src={d.madeinamerica}
                          width={38}
                          height={38}
                          alt="madeinamerica"
                          className="h-[38px] w-[38px] rounded-[12px] object-cover"
                        />
                        <Text as="p" className="!text-white-A700">
                          MadeInAmerica
                        </Text>
                      </div>
                      <Button className="w-[28px] rounded-lg">
                        <Img src="img_checkmark_white_a700.svg" width={28} height={28} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
