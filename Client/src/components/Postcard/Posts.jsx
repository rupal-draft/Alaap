import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Img, Button, Text, Heading } from "../../components";
import api from "@/utils/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";
import { io } from "socket.io-client";
import { DeleteOutlined } from "@ant-design/icons";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

const Posts = () => {
  const [image, setImage] = useState({});
  const [video, setVideo] = useState({});
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      loadPosts();
      socket.on("new-post", (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      });
      return () => {
        socket.off("new-post");
      };
    }
  }, [user]);
  const loadPosts = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`
    );
    setPosts(data);
  };

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      setIsImageSelected(true);
      setIsVideoSelected(false);
      await handleImage(event);
    }
  };

  const handleVideoChange = async (event) => {
    if (event.target.files.length > 0) {
      setIsVideoSelected(true);
      setIsImageSelected(false);
      await handleVideo(event);
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
        formData
      );
      setImage(data);
    } catch (e) {
      console.error(e);
      toast.error("Image upload failed!");
    }
  };
  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      const videoData = new FormData();
      videoData.append("video", file);
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/video-upload`,
        videoData
      );

      setVideo(data);
    } catch (err) {
      console.log(err);
      toast.error("Video upload failed!");
    }
  };
  const createPost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-post`,
        { content, image, video }
      );
      setContent("");
      setImage({});
      setVideo({});
      imageInputRef.current.value = "";
      videoInputRef.current.value = "";
      setIsImageSelected(false);
      setIsVideoSelected(false);
      toast.success("Posted!!🖖🖖");
      loadPosts();
      socket.emit("new-post", data);
    } catch (err) {
      console.log(err);
      toast.error("Post creation failed");
    }
  };

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
            <div className="flex flex-1 rounded-[19px] bg-white-A700"></div>
          </div>
          <div className="flex items-center justify-between gap-x-10">
            <form className="flex gap-2.5 self-end" onSubmit={createPost}>
              <textarea
                placeholder="What are you thinking…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="!text-gray-500 text-base w-full h-[150px] pt-1 pl-1 border-x rounded-lg border-gray-500 focus:border-gray-500 outline-none transition-all resize-none"
              />
              <input
                onChange={handleImageChange}
                type="file"
                accept="images/*"
                id="image"
                name="image"
                disabled={isVideoSelected}
                ref={imageInputRef}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 text-sm sm:leading-6"
              />
              <input
                onChange={handleVideoChange}
                type="file"
                accept="video/*"
                disabled={isImageSelected}
                ref={videoInputRef}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 text-sm sm:leading-6"
              />
              <button
                className="flex items-center cursor-pointer"
                onClick={createPost}
              >
                <Img
                  src="img_question.svg"
                  width={14}
                  height={14}
                  alt="question"
                  className="h-[14px] w-[14px]"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Left Column Posts */}
        {posts &&
          posts
            .filter((_, index) => index % 2 === 0)
            .map((post, index) => (
              <Post post={post} key={index} loadPosts={loadPosts} />
            ))}
      </div>

      <div className="flex flex-col gap-[30px]">
        {/* Right Column Posts */}
        {posts &&
          posts
            .filter((_, index) => index % 2 !== 0)
            .map((post, index) => (
              <Post post={post} key={index} loadPosts={loadPosts} />
            ))}
      </div>
    </div>
  );
};

const Post = ({ post, loadPosts }) => {
  function formatDateTime(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  }
  const formattedDate = formatDateTime(post.createdAt);

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await api.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-[30px] rounded-[12px] bg-white-A700 p-5">
      <div className="flex items-center justify-between gap-5 pr-2.5">
        <div className="flex w-[68%] items-center gap-2.5">
          {post.postedBy.photo ? (
            <img
              src={post.postedBy.photo}
              width={48}
              height={48}
              alt="avatar"
              className="h-[48px] w-[48px] rounded-[12px] object-cover"
            />
          ) : (
            <Avatar
              name={post.postedBy.name}
              size="48"
              round="12px"
              textSizeRatio={2}
            />
          )}
          <div className="flex flex-col items-start gap-[5px]">
            <Heading as="h3" className="!text-gray-900">
              {post.postedBy.name}
            </Heading>
            <Text size="s" as="p" className="!text-gray-500">
              {formattedDate}
            </Text>
          </div>
        </div>
        <DeleteOutlined
          className="text-red-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-center">
          {post && post.image && post.image.url && (
            <div className="mt-3">
              <img
                src={post.image.url}
                width={290}
                height={150}
                alt="post image"
                className="h-[150px] w-full rounded-lg object-cover md:h-auto"
              />
            </div>
          )}

          {post && post.video_link && post.video_link.Location && (
            <div className="mt-3">
              <ReactPlayer
                url={post.video_link.Location}
                width="100%"
                height="100%"
                className="rounded-lg"
                controls
              />
            </div>
          )}
          <div className="mt-5 flex flex-col gap-[15px] self-stretch">
            <Text as="p" className="leading-5 !text-gray-500">
              {post.content}
            </Text>
          </div>
          <Link href={`/singlepost/${post._id}`} className="mt-[11px]">
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
                {post.likes.length}
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
              <Text as="p">{post.comments.length}</Text>
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
