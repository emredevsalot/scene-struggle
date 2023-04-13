// Youtube Response Type

type YoutubeResponseType = {
  kind: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
};

type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

type Item = {
  kind: string;
  id: Id;
  snippet: Snippet;
};

type Id = {
  kind: string;
  videoId: string;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
};

type Thumbnails = {
  default: Default;
  medium: Medium;
  high: High;
};

type Default = {
  url: string;
  width: number;
  height: number;
};

type Medium = {
  url: string;
  width: number;
  height: number;
};

type High = {
  url: string;
  width: number;
  height: number;
};

// Channel Type

type ChannelType = {
  id: string;
  title: string;
};

export type { YoutubeResponseType, Item, ChannelType };
