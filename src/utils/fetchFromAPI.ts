import { SearchListResponse } from "@/pages/game/randomVideos";
import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "50",
    pageToken: "",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url: string) => {
  const MAX_PAGE_COUNT = 3;
  let all_videos: any[] = [];
  let i = 0;
  let response_data: SearchListResponse | undefined = undefined;

  while (true) {
    console.log("entered while(true)");
    i++;
    if (response_data) {
      options.params.pageToken = response_data.nextPageToken;
    }
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    response_data = response.data;
    all_videos = all_videos.concat(response_data?.items);

    // Exit condition (no more pagination thing to repeat)
    if (!("nextPageToken" in response_data!) || i == MAX_PAGE_COUNT) {
      console.log(all_videos);

      break;
    }
  }
  return all_videos;
};
