import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "@/styles";
import { fetchChannelInfo } from "@/utils/fetchFromAPI";
import { getVideoIdFromUrl } from "@/utils/randomVideos";
import Button from "@/components/Button";

type Props = {};

const DEV_URL = "https://www.youtube.com/watch?v=NtfbWkxJTHw";

const Homepage = (props: Props) => {
  const [videoUrl, setVideoUrl] = useState<string>(DEV_URL);
  const [channelId, setChannelId] = useState<string>("");
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleCheckVideo = async (url: string) => {
    const videoId = getVideoIdFromUrl(url);
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
    <div
      className={`${styles.innerWidth} flex flex-col py-8 gap-4 justify-center items-center`}
    >
      <p>Paste a video URL from your favorite youtube channel</p>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Video URL"
        defaultValue={DEV_URL}
        onChange={(e) => setVideoUrl(e.target.value)}
      ></input>
      <Button
        onClick={() => handleCheckVideo(videoUrl)}
        // ADD ON PROD
        // disabled={videoUrl === ""}
      >
        Get the channel
      </Button>
      {result && <p>{result}</p>}
      {channelId && <p>Channel Id: {channelId}</p>}
      {channelTitle && <p>Channel Title: {channelTitle}</p>}
      {channelId && (
        <Link to={`/games/${channelId}`}>
          <Button>{`Go to games about ${channelTitle}`}</Button>
        </Link>
      )}
    </div>
  );
};

export default Homepage;
