import { TwitterApi, TweetV2PostTweetResult } from 'twitter-api-v2';

export class TwitterService {
  private twitterClient: TwitterApi;

  constructor(
    apiKey: string,
    apiSecretKey: string,
    accessToken: string,
    accessTokenSecret: string
  ) {
    if (!apiKey || !apiSecretKey || !accessToken || !accessTokenSecret) {
      throw new Error('Twitter API credentials are required');
    }

    this.twitterClient = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecretKey,
      accessToken,
      accessSecret: accessTokenSecret,
    });
  }

  /**
   * Posts a tweet to Twitter.
   * @param text The content of the tweet.
   * @returns The result of the posted tweet.
   */
  async postTweet(text: string): Promise<TweetV2PostTweetResult> {
    try {
      const result = await this.twitterClient.v2.tweet(text);
      return result;
    } catch (error) {
      console.error('Error posting tweet:', error);
      throw error;
    }
  }

  /**
   * Fetches the latest tweets from the authenticated user's timeline.
   * @param count The number of tweets to fetch (default is 5).
   * @returns A list of tweets.
   */
  async fetchTimeline(count = 5): Promise<any[]> {
    try {
      const timeline = await this.twitterClient.v2.homeTimeline({
        max_results: count,
      });
      return timeline.data || [];
    } catch (error) {
      console.error('Error fetching timeline:', error);
      throw error;
    }
  }

  /**
   * Searches for tweets based on a query string.
   * @param query The search query.
   * @param maxResults The maximum number of results to return (default is 10).
   * @returns A list of tweets matching the query.
   */
  async searchTweets(query: string, maxResults = 10): Promise<any[]> {
    try {
      const result = await this.twitterClient.v2.search(query, {
        max_results: maxResults,
      });
      return result.data || [];
    } catch (error) {
      console.error('Error searching tweets:', error);
      throw error;
    }
  }

  /**
   * Replies to a specific tweet.
   * @param tweetId The ID of the tweet to reply to.
   * @param text The reply text.
   * @returns The result of the reply action.
   */
  async replyToTweet(tweetId: string, text: string): Promise<TweetV2PostTweetResult> {
    try {
      const result = await this.twitterClient.v2.reply(text, tweetId);
      return result;
    } catch (error) {
      console.error('Error replying to tweet:', error);
      throw error;
    }
  }

  /**
   * Deletes a tweet.
   * @param tweetId The ID of the tweet to delete.
   * @returns The result of the deletion.
   */
  async deleteTweet(tweetId: string): Promise<void> {
    try {
      await this.twitterClient.v2.deleteTweet(tweetId);
      console.log(`Tweet with ID ${tweetId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting tweet:', error);
      throw error;
    }
  }
}

