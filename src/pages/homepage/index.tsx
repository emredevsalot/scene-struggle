import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "@/styles";
import { ChannelType } from "@/types";
import { fetchChannelInfo } from "@/utils/fetchFromAPI";
import { getVideoIdFromUrl } from "@/utils/randomVideos";
import Button from "@/components/Button";

type Props = {};

// TODO: Development URL for quick testing, videoUrl state will be empty in production
const DEV_URL = "https://www.youtube.com/watch?v=NtfbWkxJTHw";

const Homepage = (props: Props) => {
  const [videoUrl, setVideoUrl] = useState<string>(DEV_URL);
  const [channel, setChannel] = useState<ChannelType>({
    id: "",
    title: "",
  });

  const [result, setResult] = useState<string>("");

  const handleCheckVideo = async (url: string) => {
    const videoId = getVideoIdFromUrl(url);
    if (videoId) {
      setResult("Channel Found:");
    } else {
      setResult("Invalid video URL. Please enter a valid YouTube video URL.");
      setChannel({ id: "", title: "" });
      return;
    }
    try {
      const channelInfo = await fetchChannelInfo(videoId);
      const id = channelInfo?.items[0].snippet.channelId;
      const title = channelInfo?.items[0].snippet.channelTitle;
      if (id && title) {
        setChannel({ id: id, title: title });
      }
    } catch (error: any) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <div className={`${styles.innerWidth} flex flex-col py-8 sm:flex-row`}>
      <div className="flex w-full flex-col gap-4 px-16 text-center">
        <p className="text-3xl">Welcome to Scene Struggle!</p>
        <p>
          Fun games about your favorite Youtube channel <br /> to see if you're
          a real fan.
        </p>
        <p>
          Choose from a range of games(2 for now), each with its own unique
          challenge based on the content of the channel.
        </p>
        <div className="my-3 bg-primary p-0.5" />
        <p>Now start by entering the URL of one of their videos:</p>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="username"
          type="text"
          placeholder="Video URL"
          defaultValue={DEV_URL}
          onChange={(e) => setVideoUrl(e.target.value)}
        ></input>
        <Button
          onClick={() => handleCheckVideo(videoUrl)}
          width="w-full"
          // TODO: ADD ON PROD
          // disabled={videoUrl === ""}
        >
          Get the channel
        </Button>
        {result && <div className="my-4 bg-primary p-0.5" />}
        {result && <p>{result}</p>}
        {/* {channelId && <p>Channel Id: {channelId}</p>} */}
        {channel.title && <p className="text-5xl">{channel.title}</p>}
        {channel.id && (
          <Link
            to={`/scene-struggle/games/${channel.title}`}
            state={{ channel }}
          >
            <Button>{`Go to games about ${channel.title}`}</Button>
          </Link>
        )}
      </div>
      <div className="flex w-full flex-col items-center px-4">
        <img className="w-2/3" src="./youtube-icon.png" alt="" />
        {/* TODO: ADD TO CREDITS https://unsplash.com/photos/QNOukv0Jx54 */}
      </div>
    </div>
  );
};

export default Homepage;
