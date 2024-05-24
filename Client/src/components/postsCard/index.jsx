import React from "react";
import { Img, Button, Text, Heading, Input } from "../../components";
import CommentBody from "../commentBody/index";

export const PostCard = () => {
  return (
    <div className="flex flex-col gap-[30px] rounded-[12px] bg-white-A700 p-5">
      <div className="flex w-[88%] items-center justify-between gap-5 pr-2.5 md:w-full">
        <div className="flex w-[51%] items-center  gap-2.5">
          <Img
            src="img_image.png"
            width={48}
            height={48}
            alt="image"
            className="h-[48px] w-[48px] rounded-[12px] object-cover"
          />
          <div className="flex flex-col items-start gap-1">
            <Heading as="h2" className="!text-gray-900">
              Edward Ford
            </Heading>
            <Text size="s" as="p" className="!text-gray-500">
              5min ago
            </Text>
          </div>
        </div>
        <Img
          src="img_notification.svg"
          width={18}
          height={18}
          alt="notification"
          className="h-[18px] w-[18px]"
        />
      </div>
      <div className="flex w-[88%] flex-col justify-center gap-5 md:w-full">
        <Text as="p" className="!text-gray-500">
          Tourism Is Back In Full Swing In Cancun Mexico
        </Text>
        <div className="relative h-[180px] md:h-auto">
          <Img
            src="img_image_180x320.png"
            width={320}
            height={180}
            alt="image"
            className="h-[180px] w-full rounded-lg object-cover"
          />
          {/* <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full justify-center rounded-lg bg-gray-900_66 px-14 py-[71px] md:p-5">
                      <Button size="3xl" shape="round" className="w-[38px]">
                        <Img src="img_contrast.svg" width={38} height={38} />
                      </Button>
                    </div> */}
        </div>
      </div>
      <div className="flex w-[88%] justify-between gap-5 md:w-full">
        <div className="flex gap-2.5">
          <div className="flex items-center p-1.5">
            <Img
              src="img_favorite.svg"
              width={14}
              height={14}
              alt="favorite"
              className="h-[14px] w-[14px]"
            />
            <Text as="p" className="ml-[5px]">
              326
            </Text>
          </div>
          <div className="flex items-center gap-1.5 p-[5px]">
            <Img
              src="img_instagram.svg"
              width={14}
              height={14}
              alt="instagram"
              className="h-[14px] w-[14px]"
            />
            <Text as="p">148</Text>
          </div>
        </div>
        <div className="flex items-center  cursor-pointer">
          {/* <Text as="p">Share</Text> */}
          <Img
            src="img_question.svg"
            width={14}
            height={14}
            alt="question"
            className="h-[14px] w-[14px]"
          />
        </div>
      </div>

    {/** Comments Section */}

      <div className="flex w-[88%] items-center justify-center gap-[15px] rounded border-2 border-solid border-gray-500_33 p-[11px] md:w-full">
        <Input
          size="xs"
          shape="square"
          name="comment"
          placeholder={`Write a comment…`}
          suffix={
            <Img
              src="img_settings.svg"
              width={14}
              height={14}
              alt="settings"
              className="h-[14px] w-[14px]"
            />
          }
          className="flex-grow gap-3"
        />
        <Img
          src="img_save.svg"
          width={14}
          height={14}
          alt="save"
          className="h-[14px] w-[14px]"
        />
      </div>
          <CommentBody/>
          <CommentBody/>
    </div>
  );
};

export default PostCard;
