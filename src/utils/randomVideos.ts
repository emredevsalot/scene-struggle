import { Item } from "@/types";

// homepage
export const getVideoIdFromUrl = (url: string) => {
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

// games / guessTheCorrectTitle
const getWrongAnswers = (correctVideo: Item, videos: Item[]) => {
  const wrongAnswers = [];
  const wrongVideosId = [];
  const correctId = correctVideo.id.videoId;
  let i = 0;

  while (i < 3) {
    const randomVideo = getRandomVideo(videos);
    const randomId = randomVideo.id.videoId;

    // Pick a wrong video title if it's not the correct video or it was chosen before
    if (randomId !== correctId && wrongVideosId.indexOf(randomId) === -1) {
      wrongVideosId.push(randomVideo.id.videoId);
      wrongAnswers.push(randomVideo.snippet.title);
      i++;
    }
  }

  return wrongAnswers;
};

// games / whichIsLatest
export const getFormattedDate = (dateString: string) => {
  const formattedDate = new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export const isFirstDateLatest = (
  date1String: string,
  date2String: string
): boolean => {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  if (date1.getTime() - date2.getTime() > 0) {
    console.log("First Latest");
    return true;
  } else {
    console.log("Second Latest");
    return false;
  }
};

// general

export const getRandomVideos = (videos: Item[], amount: number) => {
  const randomVideos: Item[] = [];
  const allAnswers: string[][] = [];
  let j = 0;

  while (j < amount) {
    const randomVideo = getRandomVideo(videos);

    if (randomVideos.indexOf(randomVideo) === -1) {
      randomVideos.push(randomVideo);
      j++;

      const wrongAnswers = getWrongAnswers(randomVideo, videos);
      const answers = [randomVideo.snippet.title, ...wrongAnswers];
      shuffleArray(answers);
      allAnswers.push(answers);
    }
  }

  return { randomVideos, allAnswers };
};

const getRandomVideo = (videos: Item[]) => {
  let isShorts = true;
  let randomIndex = 0;

  while (isShorts) {
    randomIndex = Math.floor(Math.random() * videos.length);
    isShorts = videos[randomIndex].snippet.title.includes("horts");
  }

  return videos[randomIndex];
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
