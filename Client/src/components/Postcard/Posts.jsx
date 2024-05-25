// import React, { useEffect, useState } from "react";
// // import axios from "axios";

// const PostsSection = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Replace with your backend endpoint
//     axios
//       .get("/api/posts")
//       .then((response) => {
//         setPosts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//       });
//   }, []);

//   return (
//     <div className="posts-section">
//       {posts.map((post) => (
//         <Post key={post.id} post={post} />
//       ))}
//     </div>
//   );
// };

// const Post = ({ post }) => {
//   return (
//     <div className="post bg-white p-4 rounded-lg shadow-md mb-4">
//       <div className="post-header flex items-center mb-2">
//         <img
//           src={post.user.avatar}
//           alt={post.user.name}
//           className="w-10 h-10 rounded-full mr-2"
//         />
//         <div>
//           <h2 className="font-bold">{post.user.name}</h2>
//           <p className="text-sm text-gray-500">@{post.user.username}</p>
//         </div>
//       </div>
//       <div className="post-content mb-2">
//         <p>{post.content}</p>
//       </div>
//       {post.image && (
//         <img src={post.image} alt="Post image" className="w-full rounded-lg" />
//       )}
//       <div className="post-footer flex justify-between mt-2">
//         <button className="text-blue-500">Like</button>
//         <button className="text-blue-500">Comment</button>
//         <button className="text-blue-500">Share</button>
//       </div>
//     </div>
//   );
// };

// export default PostsSection;

// left col

{
  /* <div className="flex flex-col gap-[30px] rounded-[12px] bg-white-A700 p-5">
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
              <Img
                src="img_question.svg"
                width={14}
                height={14}
                alt="question"
                className="h-[14px] w-[14px]"
              />
            </div>
          </div>
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
          <div className="flex w-[88%] flex-col gap-2.5 md:w-full">
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
              <Text
                size="s"
                as="p"
                className="mb-[5px] self-end !text-gray-500"
              >
                20min ago
              </Text>
            </div>
            <div>
              <div className="flex flex-col gap-2.5">
                <Text
                  as="p"
                  className="!font-normal leading-[22px] !text-gray-500"
                >
                  Awesome Edward, remeber that five tips for low cost holidays I
                  sent you?
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
          <div className="flex w-[88%] flex-col gap-[33px] md:w-full">
            <div className="flex flex-col gap-[13px]">
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
                <Text
                  size="s"
                  as="p"
                  className="mb-[5px] self-end !text-gray-500"
                >
                  20min ago
                </Text>
              </div>
              <Text as="p" className="!font-normal !text-gray-500">
                Awesome Edward, remeber that five tips for low cost holidays I
                sent you?
              </Text>
            </div>
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
        </div> */
}

import React from "react";
import Link from "next/link";
import { Img, Button, Text, Heading } from "../../components";

export const postData = [
  {
    id: 1,
    name: "Pratik Biswas",
    username: "pratik-biswas",
    avatar: "pratik.jpg",
    postTime: "5 years ago",
    caption: "I need a peaceful life",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam neque ipsum ad? Adipisci, repudiandae eligendi expedita veritatis iste quod cupiditate.",
    likeCount: "500",
    commentCount: "148",
    image: "post1.jpg",
  },
  {
    id: 2,
    name: "Rupal Paul",
    username: "rupal-paul",
    avatar: "rupal.jpg",
    postTime: "10 years ago",
    caption: "Ami Borolok",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam neque ipsum ad? Adipisci, repudiandae eligendi expedita veritatis iste quod cupiditate.",
    likeCount: "500",
    commentCount: "148",
    image: "post2.jpg",
  },

  // {
  //   id: 3,
  //   name: "Sattiwikee Ghosh",
  //   username: "sattiwikee-ghosh",
  //   avatar: "sattiwikee.jpg",
  //   postTime: "100 years ago",
  //   caption: "Amar 10 ta bor",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam neque ipsum ad? Adipisci, repudiandae eligendi expedita veritatis iste quod cupiditate.",
  //   likeCount: "200",
  //   commentCount: "248",
  //   image: "post3.jpg",
  // },

  // {
  //   id: 4,
  //   name: "Sattiwikee Ghosh",
  //   username: "sattiwikee-ghosh",
  //   avatar: "sattiwikee.jpg",
  //   postTime: "100 years ago",
  //   caption: "Amar 10 ta bor",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam neque ipsum ad? Adipisci, repudiandae eligendi expedita veritatis iste quod cupiditate.",
  //   likeCount: "200",
  //   commentCount: "248",
  //   image: "post3.jpg",
  // },
];

const Posts = () => {
  return (
    <div className="grid md:grid-cols-2 gap-[30px]">
      <div className="flex flex-col gap-[30px]">
        {/* Create Post Section */}
        <div className="flex flex-col w-full gap-[7px] rounded-[12px] bg-white-A700 p-5">
          <div className="flex items-start gap-[5px]">
            <Link href="/myprofile">
              <Img
                src="img_avatar.png"
                width={80}
                height={80}
                alt="avatar"
                className="h-[80px] w-[80px] cursor-pointer rounded-[12px] object-cover"
              />
            </Link>
            <div className="flex flex-1 rounded-[19px] bg-white-A700">
              <textarea
                placeholder={`What are you thinking…`}
                className="!text-gray-500 text-base w-full h-[150px] pt-1 pl-1 border-x rounded-lg border-gray-500 focus:border-gray-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-10">
            <div className="flex gap-2.5 self-end">
              <Button className="w-[28px] rounded-lg">
                <Img src="img_camera.svg" width={28} height={28} />
              </Button>
              <Button className="w-[28px] rounded-lg">
                <Img src="img_upload.svg" width={28} height={28} />
              </Button>
              <Button className="w-[28px] rounded-lg">
                <Img src="img_plus.svg" width={28} height={28} />
              </Button>
            </div>
            <div className="flex items-center cursor-pointer">
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

        {/* Left Column Posts */}
        {postData
          .filter((_, index) => index % 2 === 0)
          .map((content, index) => (
            <Post content={content} key={index} />
          ))}
      </div>

      <div className="flex flex-col gap-[30px]">
        {/* Right Column Posts */}
        {postData
          .filter((_, index) => index % 2 !== 0)
          .map((content, index) => (
            <Post content={content} key={index} />
          ))}
      </div>
    </div>
  );
};

const Post = ({ content }) => {
  return (
    <div className="flex flex-col gap-[30px] rounded-[12px] bg-white-A700 p-5">
      <div className="flex items-center justify-between gap-5 pr-2.5">
        <div className="flex w-[68%] items-center gap-2.5">
          <Img
            src={content.avatar}
            width={48}
            height={48}
            alt="avatar"
            className="h-[48px] w-[48px] rounded-[12px] object-cover"
          />
          <div className="flex flex-col items-start gap-[5px]">
            <Heading as="h3" className="!text-gray-900">
              {content.name}
            </Heading>
            <Text size="s" as="p" className="!text-gray-500">
              {content.postTime}
            </Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-center">
          <Img
            src={content.image}
            width={290}
            height={150}
            alt="post image"
            className="h-[150px] w-full rounded-lg object-cover md:h-auto"
          />
          <div className="mt-5 flex flex-col gap-[15px] self-stretch">
            <Heading
              size="lg"
              as="h4"
              className="leading-[22px] !text-gray-900"
            >
              {content.caption}
            </Heading>
            <Text as="p" className="leading-5 !text-gray-500">
              {content.description}
            </Text>
          </div>
          <Link href="#" className="mt-[11px]">
            <Heading
              size="s"
              as="h5"
              className="uppercase tracking-[1.00px] !text-indigo-A200"
            >
              Read More
            </Heading>
          </Link>
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex items-center gap-[15px]">
            <div className="flex items-center p-1.5">
              <Img
                src="img_favorite.svg"
                width={14}
                height={14}
                alt="favorite"
                className="h-[14px] w-[14px]"
              />
              <Text as="p" className="ml-[5px]">
                {content.likeCount}
              </Text>
            </div>
            <div className="flex items-center gap-1.5">
              <Img
                src="img_instagram.svg"
                width={14}
                height={14}
                alt="instagram"
                className="h-[14px] w-[14px]"
              />
              <Text as="p">{content.commentCount}</Text>
            </div>
          </div>
          <div className="flex items-center p-1.5 cursor-pointer">
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
  );
};

export default Posts;
