export interface TweetData {
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  conversationId: string;
}

export interface UserData {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  profileImageUrl: string;
  description?: string;
  followersCount?: number;
  followingCount?: number;
}

export interface TweetResponse {
  data: TweetData;
  includes?: {
    users?: UserData[];
  };
  meta?: {
    resultCount: number;
    nextToken?: string;
  };
}

export interface TimelineResponse {
  data: TweetData[];
  includes?: {
    users?: UserData[];
  };
  meta?: {
    resultCount: number;
    nextToken?: string;
  };
}

export interface SearchTweetOptions {
  query: string;
  maxResults?: number;
  sinceId?: string;
  untilId?: string;
  startTime?: string; // ISO 8601 timestamp
  endTime?: string;   // ISO 8601 timestamp
}

export interface TweetReplyData {
  tweetId: string;
  replyText: string;
}

export interface PostTweetResult {
  id: string;
  text: string;
}

export interface ErrorResponse {
  title: string;
  detail: string;
  type: string;
  status: number;
}

