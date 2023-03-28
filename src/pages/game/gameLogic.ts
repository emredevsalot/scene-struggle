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

// FINAL GAME
// Take the data(object of arrays) as a parameter
// Pick 5 random videos (thumbnails, titles)
// Pick 3 more title for each video
// Let the player choose answer
// Score it out of five

// TODOS
// don't include videos that have "shorts" in the title
// check maxResults in the API
// Fix "&" changes to "&amp" in the title

// MINIMUM VIABLE GAME
//+ Pick a random video
//+ Take its title as correct answer
// Pick 3 more titles that's not same as the correct answer
// Show them and let the player guess the correct answer

export const GameLogic = (response: SearchListResponse) => {
  const videos = response.items;
  const correctVideo = getRandomVideo(videos);
  const correctVideoTitle = getVideoTitle(correctVideo);
  const correctVideoThumbnail = getVideoThumbnail(correctVideo);
  const wrongTitles = getWrongAnswers(videos, correctVideo);
  const answers = [correctVideoTitle, ...wrongTitles];
  shuffleArray(answers);

  const allTitles: string[][] = [[]];

  const { randomVideos, allAnswers } = getRandomVideos(videos, 6);

  return {
    allTitles,
    randomVideos,
    allAnswers,
    correctVideo,
    correctVideoTitle,
    correctVideoThumbnail,
    wrongTitles,
    answers,
  };
};

const getRandomVideo = (videos: Item[]) => {
  let isShorts = true;
  let randomIndex = 0;

  while (isShorts) {
    randomIndex = Math.floor(Math.random() * videos.length);
    isShorts = videos[randomIndex].snippet.title.includes("shorts");
  }

  return videos[randomIndex];

  // return randomVideo;
};

const getRandomVideos = (videos: Item[], amount: number) => {
  const randomVideos: Item[] = [];
  const randomVideoTitles: string[] = [];
  const allAnswers: string[][] = [];
  let j = 0;

  while (j < amount) {
    const randomVideo = getRandomVideo(videos);
    const randomId = randomVideo.id.videoId;

    if (randomVideos.indexOf(randomVideo) === -1) {
      randomVideos.push(randomVideo);
      j++;

      const wrongAnswers = getWrongAnswers(videos, randomVideo);
      const answers = [randomVideo.snippet.title, ...wrongAnswers];
      shuffleArray(answers);
      allAnswers.push(answers);
    }
  }

  return { randomVideos, allAnswers };
};

const getVideoTitle = (video: Item) => {
  return video.snippet.title;
};

const getVideoThumbnail = (video: Item) => {
  return video.snippet.thumbnails.high;
};

const getWrongAnswers = (videos: Item[], correctVideo: Item) => {
  const wrongAnswers = [];
  const wrongVideosId = [];
  const correctId = correctVideo.id.videoId;
  let i = 0;

  while (i < 3) {
    const randomVideo = getRandomVideo(videos);
    const randomId = randomVideo.id.videoId;

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

// export default GameLogic;

// OLD TYPES
// type Video = {
//   kind: string;
//   nextPageToken: string;
//   regionCode: string;
//   pageInfo: PageInfo;
//   items: Item[];
// };

// type Item = {
//   kind: ItemKind;
//   id: ID;
//   snippet: Snippet;
// };

// type ID = {
//   kind: IDKind;
//   videoId?: string;
//   playlistId?: string;
// };

// enum IDKind {
//   YoutubePlaylist = "youtube#playlist",
//   YoutubeVideo = "youtube#video",
// }

// enum ItemKind {
//   YoutubeSearchResult = "youtube#searchResult",
// }

// interface Snippet {
//   publishedAt: Date;
//   channelId: string;
//   title: string;
//   description: string;
//   thumbnails: Thumbnails;
//   channelTitle: string;
//   liveBroadcastContent: string;
//   publishTime: Date;
// }

// interface Thumbnails {
//   default: ThumbnailSize;
//   medium: ThumbnailSize;
//   high: ThumbnailSize;
// }

// interface ThumbnailSize {
//   url: string;
//   width: number;
//   height: number;
// }

// interface PageInfo {
//   totalResults: number;
//   resultsPerPage: number;
// }
