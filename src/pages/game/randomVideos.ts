export interface SearchListResponse {
  kind: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Item {
  kind: string;
  id: Id;
  snippet: Snippet;
}

export interface Id {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

// TODOS
// don't include videos that have "shorts" in the title
// check maxResults in the API
// Fix "&" changes to "&amp" in the title

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
    isShorts = videos[randomIndex].snippet.title.includes("shorts");
  }

  return videos[randomIndex];
};

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

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
