/**
 * Represents a Telegram user.
 */
export interface TelegramUser {
  id: number;
  isBot: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
}

/**
 * Represents a Telegram chat.
 */
export interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  inviteLink?: string;
}

/**
 * Represents a Telegram message.
 */
export interface TelegramMessage {
  messageId: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  entities?: TelegramMessageEntity[];
  replyToMessage?: TelegramMessage;
}

/**
 * Represents a message entity in Telegram (e.g., a link, bold text, etc.).
 */
export interface TelegramMessageEntity {
  offset: number;
  length: number;
  type:
    | 'mention'
    | 'hashtag'
    | 'cashtag'
    | 'bot_command'
    | 'url'
    | 'email'
    | 'phone_number'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'code'
    | 'pre'
    | 'text_link'
    | 'text_mention';
  url?: string;
  user?: TelegramUser;
}

/**
 * Represents options for sending messages via Telegram.
 */
export interface TelegramSendMessageOptions {
  parseMode?: 'Markdown' | 'HTML' | 'MarkdownV2';
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: TelegramReplyMarkup;
}

/**
 * Represents a Telegram reply markup (e.g., inline keyboards).
 */
export type TelegramReplyMarkup =
  | TelegramInlineKeyboardMarkup
  | TelegramReplyKeyboardMarkup
  | TelegramReplyKeyboardRemove
  | TelegramForceReply;

/**
 * Represents an inline keyboard markup for Telegram.
 */
export interface TelegramInlineKeyboardMarkup {
  inlineKeyboard: TelegramInlineKeyboardButton[][];
}

/**
 * Represents a button in an inline keyboard.
 */
export interface TelegramInlineKeyboardButton {
  text: string;
  url?: string;
  callbackData?: string;
  switchInlineQuery?: string;
  switchInlineQueryCurrentChat?: string;
}

/**
 * Represents a regular keyboard markup for Telegram.
 */
export interface TelegramReplyKeyboardMarkup {
  keyboard: TelegramKeyboardButton[][];
  resizeKeyboard?: boolean;
  oneTimeKeyboard?: boolean;
  selective?: boolean;
}

/**
 * Represents a button in a reply keyboard.
 */
export interface TelegramKeyboardButton {
  text: string;
  requestContact?: boolean;
  requestLocation?: boolean;
  requestPoll?: TelegramKeyboardButtonPollType;
}

/**
 * Represents the type of poll a button may request.
 */
export interface TelegramKeyboardButtonPollType {
  type?: 'quiz' | 'regular';
}

/**
 * Represents the removal of a custom keyboard in Telegram.
 */
export interface TelegramReplyKeyboardRemove {
  removeKeyboard: boolean;
  selective?: boolean;
}

/**
 * Represents a forced reply for Telegram messages.
 */
export interface TelegramForceReply {
  forceReply: boolean;
  selective?: boolean;
}

