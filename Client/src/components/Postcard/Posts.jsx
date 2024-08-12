import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import api from "@/utils/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";
import { io } from "socket.io-client";
import { AiOutlineClose } from "react-icons/ai";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_POST_MUTATION,
  CREATE_STORY_MUTATION,
  DELETE_STORY_MUTATION,
  LIKE_POST_MUTATION,
  LIKE_STORY_MUTATION,
  SAVE_POST_MUTATION,
  UNLIKE_POST_MUTATION,
  UNLIKE_STORY_MUTATION,
  UNSAVE_POST_MUTATION,
} from "@/graphql/mutation";
import { GET_POSTS_QUERY, GET_STORY_FEED_QUERY } from "@/graphql/query";
import { Post } from "./Post";
import { PopupStories } from "./PopupStories";
import { setSaved } from "@/context/slices/authSlice.js";
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
  const dispatch = useDispatch();
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
  const [savePost] = useMutation(SAVE_POST_MUTATION, {
    refetchQueries: [{ query: GET_POSTS_QUERY }],
  });
  const [unsavePost] = useMutation(UNSAVE_POST_MUTATION, {
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
  const handleSave = async (_id) => {
    try {
      const { data } = await savePost({ variables: { postId: _id } });
      dispatch(setSaved(data.savePost));
    } catch (err) {
      console.error(err);
      toast.error("Error saving post");
    }
  };
  const handleUnSave = async (_id) => {
    try {
      const { data } = await unsavePost({ variables: { postId: _id } });
      dispatch(setSaved(data.unsavePost));
    } catch (err) {
      console.error(err);
      toast.error("Error saving post");
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
      await unlikeStory({
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

  return (
    <div className="grid gap-[30px]  w-full h-full min-h-screen">
      <div className="flex flex-col xl:flex-row flex-grow flex-shrink gap-[30px] px-5">
        {/* Create Post Section */}
        <div className=" flex flex-col items-center justify-between w-full gap-[7px] rounded-[12px] bg-shadow p-5">
          <form
            className="flex items-start justify-between gap-2.5 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-center ">
              {isClient && user?.photo?.url ? (
                <Link href="/myprofile">
                  <img
                    src={user.photo.url}
                    width={80}
                    height={80}
                    alt="avatar"
                    className="rounded-full cursor-pointer w-12 h-12 object-center sm:w-20 sm:h-20"
                  />
                </Link>
              ) : (
                <Link href="/myProfile">
                  <Avatar
                    name={user?.name || "User"}
                    size="80"
                    round
                    className="rounded-full cursor-pointer w-12 h-12 object-center sm:w-20 sm:h-20"
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col w-[75%] sm:w-[90%] xl:w-[85%] gap-y-2">
              <textarea
                placeholder="What are you thinking…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-grow bg-shadow !text-primary_text w-full text-[13px] sm:text-[1rem] pt-1 pl-1 border rounded-lg border-hover_accent focus:outline-none focus:ring-1 focus:ring-hover_accent outline-none transition-all resize-none h-[70px]"
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
                <button
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  className={`flex-grow flex items-center justify-center cursor-pointer border bg-hover_accent hover:bg-accent duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] py-1 ${
                    isVideoSelected ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isVideoSelected}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => videoInputRef.current.click()}
                  className={`flex-grow flex items-center justify-center cursor-pointer border bg-hover_accent hover:bg-accent duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-[1rem] py-1 ${
                    isImageSelected ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isImageSelected}
                >
                  Upload Video
                </button>

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
                        className="mt-2 flex-grow flex items-center justify-center cursor-pointer border bg-hover_accent hover:bg-accent duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-xl px-5"
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
                        className="mt-2 flex-grow flex items-center justify-center cursor-pointer border bg-hover_accent hover:bg-accent duration-500 rounded-lg border-shadow text-primary_text text-[10px] md:text-xl px-5"
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

        {/* Stories Section */}
        <div className="relative overflow-auto flex flex-col items-center justify-center w-full p-5 rounded-[12px] bg-shadow">
          <button
            onClick={scrollLeft}
            className="absolute z-10 px-1 left-0 rounded-full text-3xl hover:text-hover_accent text-accent hidden lg:flex"
          >
            <IoIosArrowBack />
          </button>

          <button
            onClick={scrollRight}
            className="rounded-full text-3xl font-bold hover:text-hover_accent text-accent hidden absolute z-10 px-1 right-0 lg:flex"
          >
            <IoIosArrowForward />
          </button>

          <div className="flex flex-col items-center justify-between w-full bg-shadow">
            <div className="relative flex items-center justify-center gap-x-3 overflow-hidden overflow-x-scroll scrollbar-hide w-[240px] min-[360px]:w-[300px] sm:w-[570px] md:w-[700px] lg:w-[870px] xl:w-[520px] 2xl:w-[610px]">
              <div ref={sliderRef} className="flex items-center gap-x-3">
                {showPlusSign && (
                  <div className="flex-shrink-0 flex items-center justify-center w-[80px] h-[80px] bg-accent hover:bg-hover_accent border-2 border-hover_accent rounded-full cursor-pointer">
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

                <div className="flex gap-x-2  pl-12">
                  {stories.map((story, index) => (
                    <div
                      key={index}
                      className="flex flex-col  items-center justify-between gap-y-1 w-[80px]"
                    >
                      <div className="flex items-center  justify-center w-full relative">
                        <img
                          src={story.image?.url}
                          alt="sidebarlogo"
                          onClick={togglePopup}
                          className="w-20 h-20 bg-contain bg-no-repeat border-2 border-accent rounded-full relative cursor-pointer"
                        />
                        {story.postedBy?._id === user?._id && (
                          <AiOutlineClose
                            className="absolute w-4 h-4 top-0 -left-1 cursor-pointer text-red-500 duration-500 transition-transform hover:scale-125"
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
      <div className="grid grid-cols-1 pb-5 xl:grid-cols-2 gap-[30px] px-5 w-full h-full min-h-screen bg-background">
        {posts &&
          posts.map((post, index) => (
            <Post
              post={post}
              key={index}
              loadPosts={loadPosts}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleSave={handleSave}
              handleUnSave={handleUnSave}
              user={user}
              isClient={isClient}
            />
          ))}
      </div>

      {/* stories */}
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

export default Posts;
