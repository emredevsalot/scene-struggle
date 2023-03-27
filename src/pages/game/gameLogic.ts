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
  const wrongAnswers = getWrongAnswers(videos, correctVideo);

  return {
    correctVideo,
    correctVideoTitle,
    correctVideoThumbnail,
    wrongAnswers,
  };
};

const getRandomVideo = (videos: Item[]) => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];
  console.log(randomIndex, randomVideo.snippet.title);

  return randomVideo;
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
