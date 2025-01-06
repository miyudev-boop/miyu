import { Telegraf, Context } from 'telegraf';

interface TelegramServiceOptions {
  botToken: string;
}

export class TelegramService {
  private bot: Telegraf<Context>;

  constructor(options: TelegramServiceOptions) {
    if (!options.botToken) {
      throw new Error('Telegram bot token is required.');
    }

    this.bot = new Telegraf(options.botToken);
  }

  /**
   * Initializes the bot and starts listening for events.
   */
  public async initialize(): Promise<void> {
    this.bot.start((ctx) => ctx.reply('Welcome to the Miyu bot!'));
    this.bot.help((ctx) => ctx.reply('How can I assist you?'));
    this.bot.on('text', (ctx) => this.handleTextMessage(ctx));
    this.bot.launch();

    console.log('Telegram bot is running.');
    process.once('SIGINT', () => this.stop());
    process.once('SIGTERM', () => this.stop());
  }

  /**
   * Stops the bot gracefully.
   */
  public stop(): void {
    this.bot.stop('Bot stopped.');
    console.log('Telegram bot has been stopped.');
  }

  /**
   * Handles incoming text messages.
   * @param ctx - The context of the message.
   */
  private async handleTextMessage(ctx: Context): Promise<void> {
    const message = ctx.message?.text || '';
    console.log(`Received message: ${message}`);
    await ctx.reply(`You said: ${message}`);
  }

  /**
   * Sends a message to a specific chat.
   * @param chatId - The ID of the chat.
   * @param message - The message to send.
   */
  public async sendMessage(chatId: number | string, message: string): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
      console.log(`Message sent to ${chatId}: ${message}`);
    } catch (error) {
      console.error(`Failed to send message to ${chatId}:`, error);
    }
  }
}

