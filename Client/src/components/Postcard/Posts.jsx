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
import { AiOutlineClose } from "react-icons/ai";

import { IoIosShareAlt } from "react-icons/io";
import {
  FaRegCommentAlt,
  FaRegHeart,
  FaHeart,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";

import CommentBody from "../commentBody";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

const Posts = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const imageInputRef = useRef(null);
  const storyInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

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
  useEffect(() => {
    if (user) {
      loadStories();
      socket.on("new-story", (newStory) => {
        setStories((prevStories) => [newStory, ...prevStories]);
      });
      return () => {
        socket.off("new-story");
      };
    }
  }, [user]);

  const loadStories = async () => {
    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/story-feed`
    );
    const sortedStories = data.sort((a, b) => {
      if (a.postedBy?._id === user?._id) return -1;
      if (b.postedBy?._id === user?._id) return 1;
      return 0;
    });
    setStories(sortedStories);
  };

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      setIsImageSelected(true);
      setIsVideoSelected(false);
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleVideoChange = async (event) => {
    if (event.target.files.length > 0) {
      setIsVideoSelected(true);
      setIsImageSelected(false);
      const file = event.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
        formData
      );
      return data;
    } catch (e) {
      console.error(e);
      toast.error("Image upload failed!");
    }
  };

  const handleVideoUpload = async (file) => {
    try {
      const videoData = new FormData();
      videoData.append("video", file);
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/video-upload`,
        videoData
      );

      return data;
    } catch (err) {
      console.log(err);
      toast.error("Video upload failed!");
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      let uploadedImage = null;
      let uploadedVideo = null;

      if (isImageSelected && imageInputRef.current.files[0]) {
        uploadedImage = await handleImageUpload(imageInputRef.current.files[0]);
      }

      if (isVideoSelected && videoInputRef.current.files[0]) {
        uploadedVideo = await handleVideoUpload(videoInputRef.current.files[0]);
      }

      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-post`,
        { content, image: uploadedImage, video: uploadedVideo }
      );

      setContent("");
      setImage(null);
      setVideo(null);
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
  const createStory = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
        formData
      );
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-story`,
        { image: data }
      );
      loadStories();
      storyInputRef.current.value = "";
      socket.emit("new-story", res);
      toast.success("Story uploaded💓💓");
    } catch (e) {
      console.error(e);
      toast.error("Image upload failed!");
    }
  };
  const userHasPostedStories = stories.some(
    (story) => story.postedBy?._id === user?._id
  );
  const showPlusSign = !userHasPostedStories;

  const deleteStory = async (storyId) => {
    try {
      await api.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/delete-story/${storyId}`
      );
      loadStories();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete story");
    }
  };

  const handleLike = async (_id) => {
    try {
      const { data } = await api.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/like-post`,
        { _id }
      );
      socket.emit("new-notification", data);
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    try {
      const { data } = await api.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/unlike-post`,
        { _id }
      );
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const StoryLike = async (_id) => {
    try {
      const { data } = await api.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/like-story`,
        { _id }
      );
      socket.emit("new-notification", data);
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const StoryUnlike = async (_id) => {
    try {
      const { data } = await api.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/unlike-story`,
        { _id }
      );
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const clearImage = () => {
    setImage(null);
    setIsImageSelected(false);
    imageInputRef.current.value = "";
  };

  const clearVideo = () => {
    setVideo(null);
    setIsVideoSelected(false);
    videoInputRef.current.value = "";
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="grid gap-[30px] w-full">
      <div className="flex flex-col xl:flex-row gap-[30px]">
        {/* Create Post Section */}
        <div className="order-2 xl:order-1 flex flex-col items-center justify-between w-full gap-[7px] rounded-[12px] bg-shadow p-5">
          <form className="flex gap-2.5 w-full" onSubmit={createPost}>
            <div className="flex items-start">
              {isClient && user?.photo?.url ? (
                <Link href="/myprofile">
                  <img
                    src={user.photo.url}
                    width={80}
                    height={80}
                    alt="avatar"
                    className="cursor-pointer rounded-full object-cover"
                  />
                </Link>
              ) : (
                <Link href="/myProfile">
                  <Avatar
                    name={user?.name || "User"}
                    size="80"
                    round
                    className="cursor-pointer"
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <textarea
                placeholder="What are you thinking…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] pt-1 pl-1 border rounded-lg border-highlight focus:border-gray-500 outline-none transition-all resize-none h-[70px]"
              />
              <div className="flex gap-2 w-full">
                <input
                  onChange={handleImageChange}
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  ref={imageInputRef}
                  className="hidden"
                />
                <input
                  onChange={handleVideoChange}
                  type="file"
                  accept="video/*"
                  ref={videoInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  className={`flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] ${
                    isVideoSelected ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isVideoSelected}
                >
                  Upload Image
                </Button>
                <Button
                  type="button"
                  onClick={() => videoInputRef.current.click()}
                  className={`flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] ${
                    isImageSelected ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isImageSelected}
                >
                  Upload Video
                </Button>
                <button
                  type="submit"
                  className="flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] px-2"
                >
                  Post
                </button>
              </div>
            </div>
          </form>

          {/* Preview Section */}
          {isImageSelected && image && (
            <div className="relative mt-3">
              <img
                src={image}
                width={290}
                height={150}
                alt="preview image"
                className="h-[150px] w-full rounded-lg object-cover md:h-auto"
              />
              <AiOutlineClose
                className="absolute top-2 right-2 text-xl text-red50 cursor-pointer"
                onClick={clearImage}
              />
            </div>
          )}

          {isVideoSelected && video && (
            <div className="relative mt-3">
              <ReactPlayer
                url={video}
                width="100%"
                height="100%"
                className="rounded-lg"
                controls
              />
              <CloseCircleOutlined
                className="absolute top-2 right-2 text-xl text-red50 cursor-pointer"
                onClick={clearVideo}
              />
            </div>
          )}
        </div>

        {/* Stories Section */}
        <div className="relative order-1 xl:order-2 flex flex-col items-center justify-between w-full gap-[7px] rounded-[12px] bg-shadow p-5">
          <button
            onClick={scrollLeft}
            className="absolute top-12 z-10 px-1 left-0 rounded-full text-3xl  text-highlight hover:text-hover_highlight hidden lg:flex"
          >
            <FaChevronCircleLeft />
          </button>

          <button
            onClick={scrollRight}
            className="rounded-full text-3xl font-bold  text-highlight hover:text-hover_highlight hidden absolute top-12 z-10 px-1 right-0 lg:flex"
          >
            <FaChevronCircleRight />
          </button>
          <div className=" flex flex-col items-center justify-between w-full  bg-shadow ">
            <div
              className="relative flex items-center justify-center gap-x-3 overflow-hidden
            w-[240px]
            min-[360px]:w-[300px]
            sm:w-[570px]
            md:w-[700px]
            lg:w-[870px] 
            xl:w-[520px]
            2xl:w-[610px] 
          "
            >
              <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-[2rem] cursor-pointer"
              >
                {showPlusSign && (
                  <div className="flex-shrink-0 flex items-center justify-center w-[80px] h-[80px] bg-gray-200 border-2 border-gray-300 rounded-full cursor-pointer">
                    <label
                      htmlFor="fileInput"
                      className="flex items-center justify-center w-full h-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        name="image"
                        onChange={createStory}
                        ref={storyInputRef}
                        className="hidden"
                      />
                      <span className="text-3xl">+</span>
                    </label>
                  </div>
                )}
                <div className="flex-shrink-0 flex gap-x-2">
                  {stories.map((story, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-between gap-y-1 w-[80px]"
                      onClick={togglePopup}
                    >
                      <div className="flex items-center justify-center w-full relative">
                        <img
                          src={story.image?.url}
                          width={65}
                          height={65}
                          alt="sidebarlogo"
                          className="w-full h-auto border-2 border-[#00ffff] rounded-full relative"
                        />
                        {story.postedBy?._id === user?._id && (
                          <DeleteOutlined
                            className="absolute top-0 left-0 cursor-pointer text-red-500"
                            onClick={() => deleteStory(story._id)}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <p className="text-secondary_text text-sm max-w-[80px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                          {story.postedBy?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px] w-full">
        {posts &&
          posts.map((post, index) => (
            <Post
              post={post}
              key={index}
              loadPosts={loadPosts}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              user={user}
              isClient={isClient}
            />
          ))}
      </div>

      {isPopupOpen && (
        <PopupStories
          onClose={togglePopup}
          content={stories}
          StoryLike={StoryLike}
          StoryUnlike={StoryUnlike}
        />
      )}
    </div>
  );
};

// Post

export const Post = ({
  post,
  loadPosts,
  handleLike,
  handleUnlike,
  user,
  isClient,
}) => {
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

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ";
  };

  const truncatedContent = truncateText(post.content, 20);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  return (
    <div className="flex w-full flex-col gap-[15px] rounded-[12px] bg-shadow p-5 ">
      <div className="flex items-center justify-between gap-5 ">
        <div className="flex w-[100%] items-center gap-2.5">
          {post?.postedBy?.photo ? (
            <img
              src={post.postedBy.photo.url}
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full object-cover"
            />
          ) : (
            <Avatar
              name={post?.postedBy?.name}
              size="50"
              round="100px"
              textSizeRatio={2}
              color="#222831"
              className="border"
            />
          )}
          <div className="flex flex-col items-start gap-[2px]">
            <Heading
              as="h3"
              className="!text-primary_text font-serif text-[17px] sm:text-[1.6rem]"
            >
              {post.postedBy.name}
            </Heading>
            <Text
              size="s"
              as="p"
              className="!text-secondary_text text-[10px] md:text-sm font-semibold"
            >
              {formattedDate}
            </Text>
          </div>
        </div>
        <DeleteOutlined
          className="text-red-500 cursor-pointer text-xl sm:text-2xl duration-500
          transition-transform hover:scale-125"
          onClick={handleDelete}
        />
      </div>
      <div
        className="flex flex-col items-center justify-center gap-y-5
       max-w-full"
      >
        <div
          className="mt-3 flex items-center justify-center bg-black rounded-lg overflow-hidden
          w-[240px] h-[240px]
          min-[360px]:w-[300px] min-[360px]:h-[300px]
          sm:w-[570px] sm:h-[500px]
          md:w-[700px] 
          lg:w-[870px] lg:h-[550px]
          xl:w-[530px] xl:h-[500px]
          2xl:w-[655px] 2xl:h-[655px] "
        >
          {post && post.image && post.image.url && (
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={post.image.url}
                alt="post image"
                className="block max-w-full max-h-full m-auto object-contain"
              />
            </div>
          )}

          {post && post.video_link && post.video_link.Location && (
            <div className="flex items-center justify-center w-full h-full">
              <ReactPlayer
                url={post.video_link.Location}
                width="100%"
                height="100%"
                className="max-w-full max-h-full m-auto"
                controls
              />
            </div>
          )}
        </div>

        <div className="flex flex-col self-stretch">
          <Text
            as="p"
            className="leading-5 !text-primary_text text-xs sm:text-base"
          >
            {truncatedContent}

            <div
              onClick={togglePopup}
              className="inline-block text-highlight cursor-pointer"
            >
              ... Read More
            </div>
          </Text>
        </div>

        <div className="flex self-stretch justify-between gap-y-5 ">
          <div className="flex items-center justify-between gap-[15px]">
            <div className="flex items-center cursor-pointer">
              {isClient && post.likes?.includes(user?._id) ? (
                <FaHeart
                  className="text-red-500"
                  onClick={() => {
                    handleUnlike(post._id);
                  }}
                />
              ) : (
                <FaRegHeart
                  className="text-primary_text"
                  onClick={() => {
                    handleLike(post._id);
                  }}
                />
              )}
              <Text as="p" className="ml-[5px] text-primary_text text-[1rem]">
                {post.likes.length}
              </Text>
            </div>
            <div className="flex items-center justify-center gap-x-2 cursor-pointer ">
              <FaRegCommentAlt className="text-primary_text " />
              <Text as="p" className="text-primary_text text-[1rem]">
                {post.comments.length}
              </Text>
            </div>
          </div>
          <div className="flex items-center text-primary_text cursor-pointer relative">
            <IoIosShareAlt className="text-xl" />
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <Popup
          onClose={togglePopup}
          post={post}
          user={user}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          isClient={isClient}
          loadPosts={loadPosts}
        />
      )}
    </div>
  );
};

// Popup for posts

const Popup = ({
  onClose,
  post,
  user,
  isClient,
  handleLike,
  handleUnlike,
  loadPosts,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

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

  const truncateText = (text, wordLimit) => {
    if (showFullContent) return text;
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ";
  };

  const truncatedContent = truncateText(post.content, 20);

  const handleReadMoreOrLess = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
      <div>
        <div className="flex justify-end text-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary_text"
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex items-center bg-shadow rounded-lg max-w-[20rem] md:max-w-full">
          <div className="flex flex-col md:flex-row w-full items-start justify-between gap-x-5 p-5">
            <div className="flex w-full flex-col">
              <div className="flex flex-col items-center">
                <div
                  className="mt-3 flex items-center justify-center bg-black rounded-lg overflow-hidden
                  w-[270px] h-[240px]
                  min-[360px]:w-[280px] min-[360px]:h-[250px]
                  sm:w-[280px] sm:h-[250px]
                  md:w-[350px] md:h-[420px]
                  lg:w-[450px] lg:h-[420px]
                  xl:w-[550px] xl:h-[550px]
                  2xl:w-[650px] 2xl:h-[640px]"
                >
                  {post && post.image && post.image.url && (
                    <div className="">
                      <img
                        src={post.image.url}
                        width={290}
                        height={150}
                        alt="post image"
                        className="w-full rounded-lg object-cover md:h-auto"
                      />
                    </div>
                  )}

                  {post && post.video_link && post.video_link.Location && (
                    <div className="">
                      <ReactPlayer
                        url={post.video_link.Location}
                        width="100%"
                        height="100%"
                        className="rounded-lg"
                        controls
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* comments */}
            <div
              className="flex w-full shadow-inner flex-col gap-y-3 rounded-lg my-3 bg-background p-5 
            
            
            max-w-[400px]  
            h-[300px]
            min-[360px]:h-[300px]
            sm:h-[300px]
            md:h-[420px]   
            lg:h-[450px]
            xl:h-[550px]
            2xl:h-[640px]
            
            "
            >
              {/* who posted */}
              <div className="flex items-center gap-2.5 bg-background fixed">
                {post.postedBy?.photo ? (
                  <img
                    src={post.postedBy?.photo.url}
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Avatar
                    name={post.postedBy?.name}
                    size="50"
                    round="100px"
                    textSizeRatio={2}
                    color="#222831"
                    className="border"
                  />
                )}
                <div className="flex flex-col items-start gap-[2px]">
                  <Heading
                    as="h3"
                    className="!text-primary_text font-serif text-[17px] sm:text-[1.6rem]"
                  >
                    {post.postedBy?.name}
                  </Heading>
                  <p className="!text-secondary_text text-[10px] lg:text-xs xl:text-sm font-semibold">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-2 mt-[4.5rem] h-[calc(100%-4.5rem)] overflow-y-auto">
                {/* description */}
                <div className="flex w-full">
                  <p className="!text-primary_text text-sm">
                    {truncatedContent}
                    <span
                      onClick={handleReadMoreOrLess}
                      className="inline-block text-highlight cursor-pointer "
                    >
                      {showFullContent ? "... Read Less" : "... Read More"}
                    </span>
                  </p>
                </div>

                {/* like counts */}
                <div className="flex self-stretch justify-between gap-y-5 ">
                  <div className="flex items-center justify-between gap-[15px]">
                    <div
                      className="flex items-center cursor-pointer"
                      // onClick={() => toggleLike(post._id)}
                    >
                      {isClient && post.likes?.includes(user?._id) ? (
                        <FaHeart
                          className="text-red-500"
                          onClick={() => {
                            handleUnlike(post._id);
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          className="text-primary_text"
                          onClick={() => {
                            handleLike(post._id);
                          }}
                        />
                      )}
                      <Text
                        as="p"
                        className="ml-[5px] text-primary_text text-[1rem]"
                      >
                        {post.likes.length}
                      </Text>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 cursor-pointer ">
                      <FaRegCommentAlt className="text-primary_text " />
                      <Text as="p" className="text-primary_text text-[1rem]">
                        {post.comments.length}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center text-primary_text cursor-pointer">
                    <IoIosShareAlt className="text-xl" />
                  </div>
                </div>

                {/* comments */}
                <CommentBody
                  postID={post._id}
                  loadPosts={loadPosts}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Popup for stories

const PopupStories = ({ onClose, content, StoryLike, StoryUnlike }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
      <div>
        <div className="flex justify-end text-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary_text"
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex items-center bg-shadow rounded-lg max-w-[20rem] md:max-w-full">
          <div className="flex flex-col md:flex-row w-full items-start justify-between gap-x-5 p-5">
            {content?.map((story, index) => (
              <div key={index} className="flex w-full flex-col">
                <div className="flex flex-col items-center">
                  <div
                    className="mt-3 flex items-center justify-center bg-black rounded-lg overflow-hidden
                    w-[270px] h-[240px]
                    min-[360px]:w-[280px] min-[360px]:h-[250px]
                    sm:w-[280px] sm:h-[250px]
                    md:w-[350px] md:h-[420px]
                    lg:w-[450px] lg:h-[420px]
                    xl:w-[550px] xl:h-[550px]
                    2xl:w-[650px] 2xl:h-[640px]"
                  >
                    <div className="flex flex-col items-center justify-between gap-y-1 w-[80px]">
                      <div className="flex items-center justify-center w-full">
                        <img
                          src={story.image?.url}
                          width={65}
                          height={65}
                          alt="User"
                          className="w-full h-auto border-2 border-[#00ffff] rounded-full"
                        />
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <p className="text-secondary_text text-sm max-w-[80px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                          {story.postedBy?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
