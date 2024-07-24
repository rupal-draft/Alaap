import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Img, Button, Text, Heading } from "../../components";
import api from "@/utils/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";
import { io } from "socket.io-client";
import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { AiOutlineClose } from "react-icons/ai";

import { IoIosShareAlt } from "react-icons/io";
import {
  FaRegCommentAlt,
  FaRegHeart,
  FaHeart,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaSave,
} from "react-icons/fa";

import CommentBody from "../commentBody";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_POST_MUTATION,
  CREATE_STORY_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_STORY_MUTATION,
  LIKE_POST_MUTATION,
  LIKE_STORY_MUTATION,
  UNLIKE_POST_MUTATION,
  UNLIKE_STORY_MUTATION,
} from "@/graphql/mutation";
import { GET_POSTS_QUERY, GET_STORY_FEED_QUERY } from "@/graphql/query";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

// posts
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
  const { data, loading, error, refetch } = useQuery(GET_POSTS_QUERY);
  const loadPosts = async () => {
    await refetch();
  };
  useEffect(() => {
    if (user) {
      if (data) {
        setPosts(data.getPosts);
      }
      loadPosts();
      socket.on("new-post", (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      });
      return () => {
        socket.off("new-post");
      };
    }
  }, [user, data]);
  const {
    data: storyData,
    loading: storyLoading,
    error: storyError,
    refetch: refetchStories,
  } = useQuery(GET_STORY_FEED_QUERY);

  const loadStories = async () => {
    if (user) {
      await refetchStories();
    }
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

  useEffect(() => {
    if (storyData) {
      const sortedStories = [...storyData.storyFeed]?.sort((a, b) => {
        if (a.postedBy?._id === user?._id) return -1;
        if (b.postedBy?._id === user?._id) return 1;
        return 0;
      });
      setStories(sortedStories);
    }
  }, [storyData, user]);

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

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: (data) => {
      setContent("");
      setImage(null);
      setVideo(null);
      imageInputRef.current.value = "";
      videoInputRef.current.value = "";
      setIsImageSelected(false);
      setIsVideoSelected(false);
      toast.success("Posted!!🖖🖖");
      loadPosts();
      socket.emit("new-post", data.createPost);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Post creation failed");
    },
  });

  const handleSubmit = async (e) => {
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

      await createPost({
        variables: {
          content,
          image: uploadedImage,
          video: uploadedVideo,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Post creation failed");
    }
  };
  const [createStory] = useMutation(CREATE_STORY_MUTATION);
  const [deleteStory] = useMutation(DELETE_STORY_MUTATION);
  const handleCreateStory = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data: uploadedImage } = await api.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`,
        formData
      );
      const { data: storyData } = await createStory({
        variables: {
          image: uploadedImage,
        },
      });
      loadStories();
      storyInputRef.current.value = "";
      socket.emit("new-story", storyData);
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

  const handleDeleteStory = async (storyId) => {
    try {
      await deleteStory({
        variables: { id: storyId },
      });
      loadStories();
      toast.success("Story deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete story");
    }
  };

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    refetchQueries: [{ query: GET_POSTS_QUERY }],
  });
  const [unlikePost] = useMutation(UNLIKE_POST_MUTATION, {
    refetchQueries: [{ query: GET_POSTS_QUERY }],
  });

  const handleLike = async (_id) => {
    try {
      const { data } = await likePost({ variables: { postId: _id } });
      socket.emit("new-notification", data.likePost);
    } catch (err) {
      console.log(err);
      toast.error("Error liking post");
    }
  };

  const handleUnlike = async (_id) => {
    try {
      await unlikePost({ variables: { postId: _id } });
    } catch (err) {
      console.log(err);
      toast.error("Error unliking post");
    }
  };
  const [likeStory] = useMutation(LIKE_STORY_MUTATION);
  const [unlikeStory] = useMutation(UNLIKE_STORY_MUTATION);

  const handleLikeStory = async (_id) => {
    try {
      const { data } = await likeStory({
        variables: { id: _id },
      });
      socket.emit("new-notification", data.likeStory);
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlikeStory = async (_id) => {
    try {
      const { data } = await unlikeStory({
        variables: { id: _id },
      });
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

  // console.log(posts);
  // console.log(stories);

  return (
    <div className="grid gap-[30px] w-full">
      <div className="flex flex-col xl:flex-row flex-grow flex-shrink gap-[30px]">
        {/* Create Post Section */}
        <div className=" flex flex-col items-center justify-between w-full gap-[7px] rounded-[12px] bg-shadow p-5">
          <form className="flex gap-2.5 w-full" onSubmit={handleSubmit}>
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
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] pt-1 pl-1 border rounded-lg border-highlight focus:outline-none focus:ring-1 focus:ring-highlight outline-none transition-all resize-none h-[70px]"
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
                {/* <button
                  type="submit"
                  className="mt-2 flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-xl px-5"
                >
                  Post
                </button> */}

                {/* Preview Section */}

                {isImageSelected && (
                  <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
                    <div
                      className="absolute top-44 flex flex-col items-center justify-center  bg-black bg-opacity-30 overflow-visible"
                      style={{ animation: "dropTop .3s linear" }}
                    >
                      <img
                        src={image}
                        alt="preview image"
                        className="rounded-lg object-cover 
                  
                        w-[20rem] lg:w-[25rem] xl:w-[30rem]
                        h-[20rem] lg:h-[25rem] xl:h-[30rem]"
                      />
                      <AiOutlineClose
                        className="absolute top-2 right-2 font-bold text-2xl text-primary_text cursor-pointer"
                        onClick={clearImage}
                      />
                      <button
                        type="submit"
                        className="mt-2 flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-xl px-5"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
                {isVideoSelected && video && (
                  <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
                    <div
                      className="absolute top-44 flex flex-col items-center justify-center  bg-black bg-opacity-30 overflow-visible"
                      style={{ animation: "dropTop .3s linear" }}
                    >
                      <ReactPlayer
                        url={video}
                        width="70%"
                        height="70%"
                        className="rounded-lg"
                        controls
                      />
                      <AiOutlineClose
                        className="absolute top-0 right-2 font-bold text-2xl text-primary_text cursor-pointer"
                        onClick={clearVideo}
                      />
                      <button
                        type="submit"
                        className="mt-2 flex-grow flex items-center justify-center cursor-pointer border bg-highlight hover:bg-hover_highlight duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-xl px-5"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* {isVideoSelected && video && (
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
        )} */}

        {/* Stories Section */}
        <div className="relative  flex flex-col items-center justify-center w-full p-5 rounded-[12px] bg-shadow ">
          <button
            onClick={scrollLeft}
            className="absolute  z-10 px-1 left-0 rounded-full text-3xl  text-highlight hover:text-hover_highlight hidden lg:flex"
          >
            <FaChevronCircleLeft />
          </button>

          <button
            onClick={scrollRight}
            className="rounded-full text-3xl font-bold  text-highlight hover:text-hover_highlight hidden absolute  z-10 px-1 right-0 lg:flex"
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
              2xl:w-[610px] "
            >
              <div ref={sliderRef} className="flex  gap-x-3 ">
                {showPlusSign && (
                  <div className="flex-shrink-0 flex items-center justify-center w-[80px] h-[80px] bg-hover_highlight hover:bg-highlight border-2 border-gray-300 rounded-full cursor-pointer">
                    <label
                      htmlFor="fileInput"
                      className="flex items-center cursor-pointer justify-center text-primary_text w-full h-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        name="image"
                        onChange={handleCreateStory}
                        ref={storyInputRef}
                        className="hidden"
                      />
                      <span className="text-3xl">+</span>
                    </label>
                  </div>
                )}
                <div className=" flex gap-x-2">
                  {stories.map((story, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer flex-col items-center justify-between gap-y-1 w-[80px]"
                      onClick={togglePopup}
                    >
                      <div className="flex items-center justify-center w-full relative">
                        <img
                          src={story.image?.url}
                          width={65}
                          height={65}
                          alt="sidebarlogo"
                          className="w-auto h-auto border-2 border-[#00ffff] rounded-full relative"
                        />
                        {story.postedBy?._id === user?._id && (
                          <DeleteOutlined
                            className="absolute bottom-0 left-0 cursor-pointer text-red-500 duration-500   transition-transform hover:scale-125"
                            onClick={() => handleDeleteStory(story._id)}
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
          StoryLike={handleLikeStory}
          StoryUnlike={handleUnlikeStory}
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
  function formatDateTime(timestamp) {
    if (!timestamp) {
      return "Invalid Date";
    }
    const date = new Date(parseInt(timestamp, 10));

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
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

  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;

      const { data } = await deletePost({
        variables: { id: post._id },
      });

      if (data.deletePost.ok) {
        toast.error("Post deleted");
        loadPosts();
      } else {
        toast.error("Error deleting post");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting post");
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
              src={post.postedBy?.photo?.url}
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
            <h1 className="!text-primary_text font-serif font-bold text-[17px] sm:text-[1.6rem]">
              {post.postedBy?.name}
            </h1>
            <p
              size="s"
              as="p"
              className="!text-secondary_text text-[10px] md:text-sm font-semibold"
            >
              {formattedDate}
            </p>
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
            <FaSave className="text-lg" />
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

  function formatDateTime(timestamp) {
    if (!timestamp) {
      return "Invalid Date";
    }
    const date = new Date(parseInt(timestamp, 10));

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
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
              <div className="flex items-center gap-2.5 bg-background ">
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
                <div className="flex flex-wrap flex-col items-start gap-[2px]">
                  <h1 className="!text-primary_text font-serif font-bold text-[20px] sm:text-[1.6rem]">
                    {post.postedBy?.name}
                  </h1>
                  <p className="!text-secondary_text text-[10px] lg:text-xs xl:text-sm font-semibold">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-2 h-[calc(100%-4.5rem)] overflow-y-auto">
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
                    <FaSave className="text-lg" />
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
                    <div className="flex flex-col items-center justify-between gap-y-3 w-full">
                      <div className="flex items-center justify-center w-full">
                        <img
                          src={story.image?.url}
                          alt="User"
                          className="w-fit h-fit  rounded-xl"
                        />
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <p className="text-secondary_text text-lg font-semibold max-w-full ">
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
