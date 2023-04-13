import { YoutubeResponseType } from "@/types";
import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "50",
    pageToken: "",
    part: "snippet",
    id: "",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchVideosFromChannel = async (
  url: string,
  maxPageCount: number
) => {
  let videos: any[] = [];
  let i = 0;
  let responseData: YoutubeResponseType | undefined = undefined;

  while (true) {
    // TODO:
    console.log("entered while(true)");
    i++;
    if (responseData) {
      options.params.pageToken = responseData.nextPageToken;
    }
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    responseData = response.data;
    videos = videos.concat(responseData?.items);

    // Exit condition (no more pagination thing to repeat)
    if (!("nextPageToken" in responseData!) || i == maxPageCount) {
      // TODO:
      console.log(videos);

      break;
    }
  }
  return videos;
};

// Get the channel information from the video ID
export const fetchChannelInfo = async (videoId: string) => {
  options.params.part = "snippet";
  options.params.id = videoId;
  let channelInfo: YoutubeResponseType | undefined = undefined;

  const response = await axios.get(`${BASE_URL}/videos`, options);
  channelInfo = response.data;

  return channelInfo;
};
