import { Request, Response } from 'express';
import { OpenAIService } from '../../integrations/openai/OpenAIService';
import { TelegramService } from '../../integrations/telegram/TelegramService';
import { TwitterService } from '../../integrations/twitter/TwitterService';
import { Logger } from '../../utils/logger';

export class InteractionController {
  private openAIService: OpenAIService;
  private telegramService: TelegramService;
  private twitterService: TwitterService;

  constructor() {
    this.openAIService = new OpenAIService();
    this.telegramService = new TelegramService();
    this.twitterService = new TwitterService();
  }

  /**
   * Handles user queries through AI.
   * @route POST /api/interaction/query
   */
  async handleQuery(req: Request, res: Response): Promise<Response> {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      Logger.info(`Processing user query: ${prompt}`);
      const response = await this.openAIService.generateResponse(prompt);
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      Logger.error('Error handling user query:', error);
      return res.status(500).json({ error: 'Failed to process query.' });
    }
  }

  /**
   * Sends a message via Telegram.
   * @route POST /api/interaction/telegram
   */
  async sendTelegramMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { chatId, message } = req.body;
      if (!chatId || !message) {
        return res.status(400).json({ error: 'Chat ID and message are required.' });
      }

      Logger.info(`Sending message to Telegram chat ${chatId}: ${message}`);
      await this.telegramService.sendMessage(chatId, message);
      return res.status(200).json({ success: true, message: 'Message sent to Telegram successfully.' });
    } catch (error) {
      Logger.error('Error sending Telegram message:', error);
      return res.status(500).json({ error: 'Failed to send Telegram message.' });
    }
  }

  /**
   * Posts a tweet via Twitter.
   * @route POST /api/interaction/twitter
   */
  async postTweet(req: Request, res: Response): Promise<Response> {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: 'Content is required.' });
      }

      Logger.info(`Posting tweet: ${content}`);
      const tweetId = await this.twitterService.postTweet(content);
      return res.status(200).json({ success: true, tweetId });
    } catch (error) {
      Logger.error('Error posting tweet:', error);
      return res.status(500).json({ error: 'Failed to post tweet.' });
    }
  }
}

