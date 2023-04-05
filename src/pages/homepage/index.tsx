import styles from "@/styles";
import { fetchChannelInfo } from "@/utils/fetchFromAPI";
import { useState } from "react";

type Props = {};

// Get the video URL
// Get the video ID from the URL
// If it's valid ID, get the channel ID

const Homepage = (props: Props) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [channelId, setChannelId] = useState<string>("");
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const getIdFromUrl = (url: string) => {
    // Use a regex to match the video ID from the URL string
    const regex =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regex);

    if (match && match[1]) {
      const videoId = match[1];
      return videoId;
      // return `Video id: ${videoId}`;
    } else {
      return null;
      // return "Invalid video URL. Please enter a valid YouTube video URL.";
    }
  };

  const handleCheckVideo = async (url: string) => {
    const videoId = getIdFromUrl(url);
    if (videoId) {
      setResult("Channel Found");
    } else {
      setResult("Invalid video URL. Please enter a valid YouTube video URL.");
      setChannelId("");
      setChannelTitle("");
      return;
    }
    try {
      const channelInfo = await fetchChannelInfo(videoId);
      const id = channelInfo?.items[0].snippet.channelId;
      const title = channelInfo?.items[0].snippet.channelTitle;
      if (id) {
        setChannelId(id);
      }
      if (title) {
        setChannelTitle(title);
      }
    } catch (error: any) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <div className="bg-slate-200 min-h-[90vh]">
      <div
        className={`${styles.innerWidth} flex flex-col py-8 gap-4 justify-center align-middle`}
      >
        <p>Paste a video URL from your favorite youtube channel</p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Video URL"
          defaultValue="https://www.youtube.com/watch?v=NtfbWkxJTHw"
          onChange={(e) => setVideoUrl(e.target.value)}
        ></input>
        <button
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCheckVideo(videoUrl)}
          disabled={videoUrl === ""}
        >
          Get the channel
        </button>
        {result && <p>{result}</p>}
        {channelId && <p>Channel Id: {channelId}</p>}
        {channelTitle && <p>Channel Title: {channelTitle}</p>}
        {/* Play games about this channel button (route) */}
      </div>
    </div>
  );
};

export default Homepage;
