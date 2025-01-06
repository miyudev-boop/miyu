/**
 * Represents the options for generating a response using OpenAI's API.
 */
export interface GenerateResponseOptions {
  prompt: string; // The input text to prompt the AI model.
  maxTokens?: number; // Maximum number of tokens in the output.
  temperature?: number; // Sampling temperature (higher = more random responses).
  topP?: number; // Nucleus sampling (lower = more deterministic responses).
  frequencyPenalty?: number; // Penalizes new tokens based on their frequency in the text.
  presencePenalty?: number; // Penalizes new tokens based on their presence in the text.
  stop?: string[]; // Tokens where generation will stop.
}

/**
 * Represents the response from OpenAI's API for a completion request.
 */
export interface OpenAIResponse {
  id: string; // Unique identifier for the response.
  object: string; // Type of object returned, e.g., "text_completion".
  created: number; // Timestamp when the response was created.
  model: string; // Model used for the generation.
  choices: OpenAIResponseChoice[]; // Array of choices generated.
  usage?: OpenAIResponseUsage; // Token usage details.
}

/**
 * Represents a single choice in the response from OpenAI's API.
 */
export interface OpenAIResponseChoice {
  text: string; // The generated text for this choice.
  index: number; // Index of the choice in the response array.
  logprobs?: LogProbs; // Log probabilities of tokens, if requested.
  finishReason?: string; // Reason the generation finished (e.g., "stop", "length").
}

/**
 * Represents token usage details in an OpenAI response.
 */
export interface OpenAIResponseUsage {
  promptTokens: number; // Number of tokens in the input prompt.
  completionTokens: number; // Number of tokens in the output.
  totalTokens: number; // Total number of tokens used.
}

/**
 * Represents log probability data for tokens.
 */
export interface LogProbs {
  tokens: string[]; // Array of tokens.
  tokenLogProbs: number[]; // Log probabilities for the tokens.
  topLogProbs?: Record<string, number>[]; // Top probabilities for each token.
  textOffset: number[]; // Offsets of tokens in the input text.
}

/**
 * Represents the options for generating embeddings using OpenAI's API.
 */
export interface GenerateEmbeddingOptions {
  input: string | string[]; // Text or array of texts to generate embeddings for.
  model?: string; // Embedding model to use (default: 'text-embedding-ada-002').
}

/**
 * Represents the response from OpenAI's API for an embedding request.
 */
export interface OpenAIEmbeddingResponse {
  object: string; // Type of object returned, e.g., "embedding".
  data: OpenAIEmbeddingData[]; // Array of embeddings.
  model: string; // Model used for embeddings.
  usage: OpenAIResponseUsage; // Token usage details.
}

/**
 * Represents a single embedding in the response from OpenAI's API.
 */
export interface OpenAIEmbeddingData {
  index: number; // Index of the embedding in the response array.
  embedding: number[]; // Array of embedding values.
}

/**
 * Enum for common OpenAI models.
 */
export enum OpenAIModels {
  GPT_4 = 'gpt-4',
  GPT_3_5 = 'gpt-3.5-turbo',
  DAVINCI = 'text-davinci-003',
  CURIE = 'text-curie-001',
  BABBAGE = 'text-babbage-001',
  ADA = 'text-ada-001',
  EMBEDDING_ADA = 'text-embedding-ada-002',
}

