"use client";
import React from "react";
import { Img, Text, Heading, Button, Input } from "../../components";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { imageone: "img_image_54x54.png" },
  { imageone: "img_image_29.png" },
  { imageone: "img_image_30.png" },
  { imageone: "img_image_31.png" },
  { imageone: "img_image_32.png" },
  { imageone: "img_image_33.png" },
  { imageone: "img_image_34.png" },
  { imageone: "img_image_54x44.png" },
];

export default function NotificationsPage() {
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
      <div className="flex w-[84%] items-start justify-center gap-[30px] self-end md:w-full md:flex-col md:p-5">
        <div className="mt-10 flex flex-1 flex-col gap-[33px] md:self-stretch">
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
          <div className="flex flex-col gap-[34px] rounded-[12px] bg-white-A700 py-[30px] pl-[30px] sm:py-5 sm:pl-5">
            <div className="flex items-center justify-between gap-5 rounded-[12px]">
              <Heading size="xl" as="h2" className="!text-gray-900">
                Featured Stories
              </Heading>
              <Button
                size="xl"
                shape="round"
                rightIcon={
                  <Img
                    src="img_arrowright_gray_900.svg"
                    width={14}
                    height={14}
                    alt="arrow_right"
                    className="h-[14px] w-[14px]"
                  />
                }
                className="min-w-[97px] gap-[-3px] font-medium"
              >
                See more
              </Button>
            </div>
            <div className="flex items-center gap-[30px] rounded-[12px] md:flex-col">
              <Button size="4xl" shape="round" className="w-[45px]">
                <Img src="img_close_light_blue_200.svg" width={45} height={45} />
              </Button>
              <div className="flex flex-1 gap-5 md:flex-row md:self-stretch sm:flex-col">
                {data.map((d, index) => (
                  <div
                    key={"list" + index}
                    className="blue_A700_light_blue_200_border flex flex-1 flex-col rounded-[12px] border-2 border-solid p-[5px]"
                  >
                    <Img
                      src={d.imageone}
                      width={54}
                      height={54}
                      alt="image"
                      className="h-[54px] w-[54px] rounded-[12px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
            <div className="flex flex-col gap-20 md:gap-[60px] sm:gap-10">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-[15px]">
                  <Img
                    src="img_avatar.png"
                    width={38}
                    height={38}
                    alt="avatar"
                    className="h-[38px] w-[38px] rounded-[12px] object-cover"
                  />
                  <Text as="p" className="mb-[9px] self-end">
                    What are you thinking?{" "}
                  </Text>
                </div>
                <Img
                  src="img_notification.svg"
                  width={18}
                  height={18}
                  alt="notification"
                  className="h-[18px] w-[18px]"
                />
              </div>
              <div className="flex items-center justify-between gap-5">
                <div className="flex gap-[15px]">
                  <Button size="3xl" shape="round" className="w-[38px]">
                    <Img src="img_camera_gray_500.svg" width={38} height={38} />
                  </Button>
                  <Button size="3xl" shape="round" className="w-[38px]">
                    <Img src="img_upload.svg" width={38} height={38} />
                  </Button>
                  <Button size="3xl" shape="round" className="w-[38px]">
                    <Img src="img_plus_gray_500.svg" width={38} height={38} />
                  </Button>
                </div>
                <Button size="8xl" className="min-w-[121px] rounded-[29px] font-bold sm:px-5">
                  Share
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-[12px] bg-white-A700 p-[30px] sm:p-5">
            <div className="flex flex-col items-start gap-[30px]">
              <div className="flex items-center justify-between gap-5 self-stretch pr-2.5">
                <div className="flex items-center gap-2.5 pr-[19px]">
                  <Img
                    src="img_image_1.png"
                    width={48}
                    height={48}
                    alt="image"
                    className="h-[48px] w-[48px] rounded-[12px] object-cover"
                  />
                  <div className="flex flex-col items-start justify-center gap-[5px]">
                    <Heading as="h3" className="!text-gray-900">
                      Dustin Housto
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
              <Text as="p">
                Whether its a driving tour, a cruise or a bus, leaf viewing is a great way to spend a fall vacation 😂
              </Text>
            </div>
            <div className="mt-[22px] flex gap-[15px] md:flex-col">
              <Img
                src="img_image_160x200.png"
                width={350}
                height={305}
                alt="photoone"
                className="h-[305px] w-[51%] rounded-lg object-cover md:w-full"
              />
              <div className="flex w-[49%] flex-col gap-[15px] md:w-full">
                <div className="flex gap-[15px]">
                  <Img
                    src="img_image_75x80.png"
                    width={160}
                    height={145}
                    alt="phototwo"
                    className="h-[145px] w-[50%] rounded-lg object-cover"
                  />
                  <Img
                    src="img_photo_3.png"
                    width={160}
                    height={145}
                    alt="photothree"
                    className="h-[145px] w-[50%] rounded-lg object-cover"
                  />
                </div>
                <div className="flex gap-[15px]">
                  <Img
                    src="img_image_380x255.png"
                    width={160}
                    height={145}
                    alt="photofour"
                    className="h-[145px] w-[50%] rounded-lg object-cover"
                  />
                  <div className="relative h-[145px] w-[50%] md:h-auto">
                    <Img
                      src="img_photo_5.png"
                      width={160}
                      height={145}
                      alt="photofive"
                      className="h-[145px] w-full rounded-lg object-cover"
                    />
                    <Button
                      size="xl"
                      leftIcon={
                        <Img
                          src="img_camera_gray_900.svg"
                          width={14}
                          height={14}
                          alt="camera"
                          className="h-[14px] w-[14px]"
                        />
                      }
                      className="absolute bottom-0 left-0 right-0 top-0 m-auto w-max min-w-[54px] gap-1.5 rounded font-sfprodisplay font-medium"
                    >
                      15
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-between gap-5">
              <div className="flex gap-[15px]">
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
              <Button
                size="xl"
                rightIcon={
                  <Img src="img_question.svg" width={14} height={14} alt="question" className="h-[14px] w-[14px]" />
                }
                className="min-w-[75px] gap-[3px] rounded font-sfprodisplay font-medium"
              >
                Share
              </Button>
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
          <div className="flex flex-1 flex-col items-end gap-[45px] rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 p-[27px] sm:p-5">
            <div className="mr-[13px] mt-[18px] flex gap-5 md:mr-0">
              <Button size="5xl" shape="round" className="w-[48px]">
                <Img src="img_close_white_a700.svg" width={48} height={48} />
              </Button>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <Img
                    src="img_image_35.png"
                    width={48}
                    height={48}
                    alt="image"
                    className="h-[48px] rounded-[12px] object-cover"
                  />
                  <Img
                    src="img_avatar_48x48.png"
                    width={48}
                    height={48}
                    alt="avatar"
                    className="relative mt-[-48px] h-[48px] rounded-[12px] object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mb-[41px] mr-[13px] flex flex-col gap-[60px] self-stretch md:mr-0 sm:gap-[30px]">
              <div className="flex flex-wrap items-center gap-2.5">
                <Heading size="xl" as="h2" className="!font-sfprodisplay">
                  Notifications
                </Heading>
                <Text
                  size="s"
                  as="p"
                  className="flex items-center justify-center rounded bg-red-A200 px-[9px] py-0.5 !text-white-A700"
                >
                  03
                </Text>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-1 items-center justify-between gap-5">
                  <div className="flex w-[60%] items-center justify-center gap-2.5">
                    <div className="h-[8px] w-[8px] rounded bg-red-A200" />
                    <Img
                      src="img_avatar_23.png"
                      width={28}
                      height={28}
                      alt="gunther_ackner"
                      className="h-[28px] w-[28px] rounded-[10px] object-cover"
                    />
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col gap-1 self-end">
                        <Heading as="h3">Gunther Ackner</Heading>
                        <Text as="p" className="!font-normal !text-white-A700">
                          liked your photo
                        </Text>
                      </div>
                      <Text size="s" as="p" className="self-start !text-white-A700">
                        4min
                      </Text>
                    </div>
                  </div>
                  <Img
                    src="img_photo.png"
                    width={49}
                    height={49}
                    alt="gunther_ackner"
                    className="h-[49px] w-[49px] rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-1">
                  <div className="flex w-full flex-col gap-[21px]">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-2.5 h-[8px] w-[8px] rounded bg-red-A200" />
                      <Img
                        src="img_avatar_24.png"
                        width={28}
                        height={28}
                        alt="avatar"
                        className="h-[28px] w-[28px] rounded-[10px] object-cover"
                      />
                      <div className="flex flex-1 items-start justify-between gap-5">
                        <div className="flex flex-col items-start gap-1.5">
                          <div className="flex flex-wrap items-center gap-[3px]">
                            <Heading as="h4">Marriet Miles</Heading>
                            <Text size="s" as="p" className="!text-white-A700">
                              4min
                            </Text>
                          </div>
                          <Text as="p" className="!font-normal !text-white-A700">
                            sent you a friend request
                          </Text>
                        </div>
                        <Button size="3xl" shape="round" className="w-[38px]">
                          <Img src="img_settings_white_a700_28x28.svg" width={38} height={38} />
                        </Button>
                      </div>
                    </div>
                    <div className="ml-14 flex gap-[15px] md:ml-0">
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
                        className="min-w-[65px] gap-1 rounded font-medium"
                      >
                        Add
                      </Button>
                      <Button
                        size="xl"
                        leftIcon={
                          <Img
                            src="img_close_white_a700.svg"
                            width={14}
                            height={14}
                            alt="close"
                            className="h-[14px] w-[14px]"
                          />
                        }
                        className="min-w-[78px] gap-1 rounded font-medium"
                      >
                        Ignore
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-start gap-2.5">
                  <div className="mt-2.5 h-[8px] w-[8px] rounded bg-red-A200" />
                  <Img
                    src="img_avatar_25.png"
                    width={28}
                    height={28}
                    alt="avatar"
                    className="h-[28px] w-[28px] rounded-[10px] object-cover"
                  />
                  <div className="flex flex-1 items-start justify-between gap-5">
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="flex flex-wrap items-center gap-[3px]">
                        <Heading as="h5">Marriet Miles</Heading>
                        <Text size="s" as="p" className="!text-white-A700">
                          4min
                        </Text>
                      </div>
                      <Text as="p" className="!font-normal !text-white-A700">
                        sent you a friend request
                      </Text>
                    </div>
                    <Button size="3xl" shape="round" className="w-[38px]">
                      <Img src="img_favorite_white_a700.svg" width={38} height={38} />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between gap-5 pl-[18px]">
                  <div className="flex items-center gap-2.5">
                    <Img
                      src="img_avatar_16.png"
                      width={28}
                      height={28}
                      alt="avatar"
                      className="h-[28px] w-[28px] rounded-[10px] object-cover"
                    />
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col gap-1 self-end">
                        <Heading as="h6">Gunther Ackner</Heading>
                        <Text as="p" className="!font-normal !text-white-A700">
                          liked your photo
                        </Text>
                      </div>
                      <Text size="s" as="p" className="self-start !text-white-A700">
                        4min
                      </Text>
                    </div>
                  </div>
                  <Img
                    src="img_photo.png"
                    width={49}
                    height={49}
                    alt="photo"
                    className="h-[49px] w-[49px] rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start gap-[21px] pl-[18px]">
                  <div className="flex items-center justify-between gap-5 self-stretch">
                    <div className="flex items-start gap-2.5">
                      <Img
                        src="img_avatar_13.png"
                        width={28}
                        height={28}
                        alt="avatar"
                        className="h-[28px] w-[28px] rounded-[10px] object-cover"
                      />
                      <div className="flex flex-col items-start gap-1.5">
                        <div className="flex flex-wrap items-center">
                          <Heading as="p">Marriet Miles</Heading>
                          <Text size="s" as="p" className="self-start !text-white-A700">
                            4min
                          </Text>
                        </div>
                        <Text as="p" className="!font-normal !text-white-A700">
                          sent you a friend request
                        </Text>
                      </div>
                    </div>
                    <Button size="3xl" shape="round" className="w-[40px] self-end">
                      <Img src="img_settings_white_a700.svg" width={40} height={38} />
                    </Button>
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
                    className="ml-[38px] min-w-[80px] gap-1 rounded font-medium md:ml-0"
                  >
                    Added
                  </Button>
                </div>
                <div className="flex flex-1 pl-[18px]">
                  <div className="flex w-full flex-col items-start gap-[21px]">
                    <div className="flex items-center justify-between gap-5 self-stretch">
                      <div className="flex items-start gap-2.5">
                        <Img
                          src="img_avatar_26.png"
                          width={28}
                          height={28}
                          alt="avatar"
                          className="h-[28px] w-[28px] rounded-[10px] object-cover"
                        />
                        <div className="flex flex-col items-start gap-1.5">
                          <div className="flex flex-wrap items-center">
                            <Heading as="p">Marriet Miles</Heading>
                            <Text size="s" as="p" className="self-start !text-white-A700">
                              4min
                            </Text>
                          </div>
                          <Text as="p" className="!font-normal !text-white-A700">
                            sent you a friend request
                          </Text>
                        </div>
                      </div>
                      <Button size="3xl" shape="round" className="w-[40px] self-end">
                        <Img src="img_settings_white_a700.svg" width={40} height={38} />
                      </Button>
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
                      className="ml-[38px] min-w-[80px] gap-1 rounded font-medium md:ml-0"
                    >
                      Added
                    </Button>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between gap-5 pl-[18px]">
                  <div className="mb-1.5 flex items-center gap-2.5 self-end">
                    <Img
                      src="img_avatar_27.png"
                      width={28}
                      height={28}
                      alt="avatar"
                      className="h-[28px] w-[28px] rounded-[10px] object-cover"
                    />
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col gap-1 self-end">
                        <Heading as="p">Gunther Ackner</Heading>
                        <Text as="p" className="!font-normal !text-white-A700">
                          liked your photo
                        </Text>
                      </div>
                      <Text size="s" as="p" className="self-start !text-white-A700">
                        4min
                      </Text>
                    </div>
                  </div>
                  <Img
                    src="img_photo_44x49.png"
                    width={49}
                    height={44}
                    alt="photo"
                    className="h-[44px] rounded-lg object-cover"
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
