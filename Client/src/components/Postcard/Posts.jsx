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
import { CloseCircleOutlined } from "@ant-design/icons"; // Import the close icon
import { IoIosShareAlt } from "react-icons/io";
import { FaRegCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
});

const Posts = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
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

  const toggleLike = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, liked: !post.liked };
      }
      return post;
    });

    setPosts(updatedPosts);

    try {
      await api.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/toggle-like`, {
        postId,
      });
      loadPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle like");
    }
  };

  return (
    <div className="grid xl:grid-cols-2 gap-[30px] w-full">
      <div className="flex flex-col gap-[30px]">
        {/* Create Post Section */}
        <div className="flex flex-col items-center justify-between w-full gap-[7px] rounded-[12px] bg-shadow p-5">
          <form className="flex gap-2.5 w-full" onSubmit={createPost}>
            <div className="flex items-start">
              <Link href="/myprofile">
                <Img
                  src="pratik.jpg"
                  width={80}
                  height={80}
                  alt="avatar"
                  className="cursor-pointer rounded-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <textarea
                placeholder="What are you thinking…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] pt-1 pl-1 border rounded-lg border-highlight focus:border-gray-500 outline-none transition-all resize-none h-[70px] "
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
                  className={`flex-grow flex items-center justify-center cursor-pointer border bg-highlight rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] ${
                    isVideoSelected ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isVideoSelected}
                >
                  Upload Image
                </Button>
                <Button
                  type="button"
                  onClick={() => videoInputRef.current.click()}
                  className={`flex-grow flex items-center justify-center cursor-pointer border bg-highlight rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] ${
                    isImageSelected ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isImageSelected}
                >
                  Upload Video
                </Button>
                <button
                  type="submit"
                  className="flex-grow flex items-center justify-center cursor-pointer border bg-highlight rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] px-2"
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
              <CloseCircleOutlined
                className="absolute top-2 right-2 text-xl text-red-600 cursor-pointer"
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
                className="absolute top-2 right-2 text-xl text-red-600 cursor-pointer"
                onClick={clearVideo}
              />
            </div>
          )}
        </div>

        {/* Left Column Posts */}
        {posts &&
          posts
            .filter((_, index) => index % 2 === 0)
            .map((post, index) => (
              <Post
                post={post}
                key={index}
                loadPosts={loadPosts}
                toggleLike={toggleLike}
              />
            ))}
      </div>

      <div className="flex flex-col gap-[30px]">
        {/* Right Column Posts */}
        {posts &&
          posts
            .filter((_, index) => index % 2 !== 0)
            .map((post, index) => (
              <Post
                post={post}
                key={index}
                loadPosts={loadPosts}
                toggleLike={toggleLike}
              />
            ))}
      </div>
    </div>
  );
};

// Posts

const Post = ({ post, loadPosts, toggleLike }) => {
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

  return (
    <div className="flex w-full flex-col gap-[15px] rounded-[12px] bg-shadow p-5 ">
      <div className="flex items-center justify-between gap-5 ">
        <div className="flex w-[100%] items-center gap-2.5">
          {post.postedBy.photo ? (
            <img
              src={post.postedBy.photo}
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full object-cover"
            />
          ) : (
            <Avatar
              name={post.postedBy.name}
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
              className="!text-highlight text-[10px] md:text-sm font-semibold"
            >
              {formattedDate}
            </Text>
          </div>
        </div>
        <DeleteOutlined
          className="text-red-500 cursor-pointer text-xl sm:text-2xl"
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
            <Link
              href={`/singlepost/${post._id}`}
              className="inline-block text-highlight"
            >
              ... Read More
            </Link>
          </Text>
        </div>

        <div className="flex self-stretch justify-between gap-y-5 ">
          <div className="flex items-center justify-between gap-[15px]">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleLike(post._id)}
            >
              {post.liked ? (
                <FaHeart className="text-red-600" />
              ) : (
                <FaRegHeart className="text-primary_text" />
              )}
              <Text as="p" className="ml-[5px] text-primary_text text-[1rem]">
                {post.likes.length}
              </Text>
            </div>
            <div className="flex items-center justify-center gap-x-2 ">
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
      </div>
    </div>
  );
};

export default Posts;
