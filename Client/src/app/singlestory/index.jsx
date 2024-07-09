"use client";
import React from "react";
import { Button, Img, Text, Heading, Input, Slider } from "../../components";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

const data = [
  { madeinamerica: "img_avatar.png", madeinamerica1: "img_avatar_1.png" },
  { madeinamerica: "img_avatar_2.png", madeinamerica1: "img_avatar_3.png" },
  { madeinamerica: "img_avatar_4.png", madeinamerica1: "img_avatar_5.png" },
  { madeinamerica: "img_avatar_6.png", madeinamerica1: "img_avatar_7.png" },
  { madeinamerica: "img_avatar_8.png", madeinamerica1: "img_avatar_9.png" },
  { madeinamerica: "img_avatar_10.png", madeinamerica1: "img_avatar_11.png" },
];

export default function SingleStoryPage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
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
                [`&:hover, &.ps-active`]: {
                  backgroundColor: "#ffffff !important",
                },
              },
            }}
            rootStyles={{ ["&>ul"]: { gap: "322px" } }}
            className="mb-[15px] flex w-full flex-col"
          >
            <div className="flex flex-col gap-10">
              <MenuItem
                icon={
                  <Img
                    src="img_home_indigo_a200.svg"
                    width={24}
                    height={24}
                    alt="home"
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
        <div className="flex flex-1 items-center gap-2.5 pl-[5px] md:flex-col md:self-stretch md:p-5">
          <Img
            src="img_indicator_white_a700.svg"
            width={5}
            height={128}
            alt="indicator"
            className="h-[128px] w-[5px] rounded-sm md:w-full"
          />
          <div className="flex-1 rounded-bl-[32px] rounded-tl-[32px] bg-gray-900 pl-[91px] md:self-stretch md:pl-5">
            <div className="flex items-center justify-between gap-5 md:flex-col">
              <div className="flex w-[60%] flex-col items-center gap-[35px] md:w-full">
                <div className="flex w-[89%] items-center justify-between gap-5 self-start md:w-full">
                  <a
                    href="https://www.youtube.com/embed/bv8Fxk0sz7I"
                    target="_blank"
                  >
                    <Button
                      size="8xl"
                      shape="round"
                      leftIcon={
                        <Img
                          src="img_arrowleft_white_a700_1.svg"
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
                  <div className="flex items-center gap-2.5 pl-[5px]">
                    <Text as="p" className="text-primary_text">
                      Sara Scholz
                    </Text>
                    <Img
                      src="img_avatar.png"
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-[38px] w-[38px] rounded-[12px] object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[30px] self-stretch md:flex-col">
                  <Button
                    size="5xl"
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    className="w-[48px]"
                  >
                    <Img
                      src="img_arrow_left_white_a700_48x48.svg"
                      width={48}
                      height={48}
                    />
                  </Button>
                  <div className="flex w-full max-w-[540px] md:self-stretch">
                    <Slider
                      autoPlay
                      autoPlayInterval={2000}
                      responsive={{
                        0: { items: 1 },
                        550: { items: 1 },
                        1050: { items: 1 },
                      }}
                      disableDotsControls
                      activeIndex={sliderState}
                      onSlideChanged={(e) => {
                        setSliderState(e?.item);
                      }}
                      ref={sliderRef}
                      items={[...Array(3)].map(() => (
                        <React.Fragment key={Math.random()}>
                          <Img
                            src="img_image_768x540.png"
                            width={540}
                            height={768}
                            alt="image"
                            className="h-[768px] rounded-lg object-cover"
                          />
                        </React.Fragment>
                      ))}
                    />
                  </div>
                  <Button
                    size="5xl"
                    variant="outline"
                    shape="round"
                    color="undefined_undefined"
                    className="w-[48px] !border"
                  >
                    <Img
                      src="img_arrow_right_white_a700.svg"
                      width={48}
                      height={48}
                    />
                  </Button>
                </div>
                <Input
                  name="comment"
                  placeholder={`Write a comment…`}
                  suffix={
                    <Img
                      src="img_user_white_a700_20x20.svg"
                      width={20}
                      height={20}
                      alt="user"
                      className="h-[20px] w-[20px]"
                    />
                  }
                  className="w-[78%] gap-[35px] rounded border-2 border-solid border-gray-500_33"
                />
              </div>
              <div className="flex w-[34%] flex-col items-center gap-[46px] rounded-bl-[32px] rounded-tl-[32px] bg-white-A700 p-[30px] md:w-full sm:p-5">
                <div className="mr-2.5 mt-[15px] flex gap-5 self-end md:mr-0">
                  <Button
                    size="6xl"
                    shape="round"
                    className="min-w-[48px] font-sfprodisplay font-bold"
                  >
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
                  <Heading size="xl" as="h1" className="!text-gray-900">
                    Next Stories
                  </Heading>
                  <div className="flex flex-col gap-[30px] self-stretch">
                    {data.map((d, index) => (
                      <div
                        key={"users" + index}
                        className="flex flex-1 flex-col gap-[30px]"
                      >
                        <div className="flex items-center justify-between gap-5">
                          <div className="flex items-center gap-2.5">
                            <Img
                              src={d.madeinamerica}
                              width={38}
                              height={38}
                              alt="madeinamerica"
                              className="h-[38px] w-[38px] rounded-[12px] object-cover"
                            />
                            <Text as="p">MadeInAmerica</Text>
                          </div>
                          <Button className="w-[28px] rounded-lg">
                            <Img
                              src="img_checkmark_indigo_a200.svg"
                              width={28}
                              height={28}
                            />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between gap-5">
                          <div className="flex items-center gap-2.5">
                            <Img
                              src={d.madeinamerica1}
                              width={38}
                              height={38}
                              alt="madeinamerica"
                              className="h-[38px] w-[38px] rounded-[12px] object-cover"
                            />
                            <Text as="p">MadeInAmerica</Text>
                          </div>
                          <Button className="w-[28px] rounded-lg">
                            <Img
                              src="img_checkmark_indigo_a200.svg"
                              width={28}
                              height={28}
                            />
                          </Button>
                        </div>
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
