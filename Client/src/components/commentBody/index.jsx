import React from 'react'
import { Img, Button, Text, Heading, Input } from "../../components";

const CommentBody = () => {
  return (
    <div className="flex px-6  flex-col gap-2.5 w-full">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-[5px]">
          <Img
            src="img_avatar_28x28.png"
            width={28}
            height={28}
            alt="avatar"
            className="h-[28px] w-[28px] rounded-lg object-cover"
          />
          <Text as="p" className="self-end">
            Billy Green
          </Text>
        </div>
        <Text size="s" as="p" className="mb-[5px] self-end !text-gray-500">
          20min ago
        </Text>
      </div>
      <div>
        <div className="flex flex-col gap-2.5">
          <Text as="p" className="!font-normal leading-[22px] !text-gray-500">
            Awesome Edward, remeber that five tips for low cost holidays I sent
            you?
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
  );
}

export default CommentBody