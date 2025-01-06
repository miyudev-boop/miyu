import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';

export class OpenAIService {
  private openai: OpenAIApi;
  private defaultModel: string;

  constructor(apiKey: string, defaultModel: string = 'text-davinci-003') {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    this.defaultModel = defaultModel;

    const configuration = new Configuration({
      apiKey,
    });

    this.openai = new OpenAIApi(configuration);
  }

  /**
   * Generate a response from OpenAI's completion endpoint.
   * @param prompt The input prompt.
   * @param options Additional options for the request.
   * @returns The generated response text.
   */
  async generateResponse(prompt: string, options?: Partial<CreateCompletionRequest>): Promise<string> {
    try {
      const request: CreateCompletionRequest = {
        model: this.defaultModel,
        prompt,
        max_tokens: options?.max_tokens ?? 150,
        temperature: options?.temperature ?? 0.7,
        top_p: options?.top_p ?? 1.0,
        frequency_penalty: options?.frequency_penalty ?? 0.0,
        presence_penalty: options?.presence_penalty ?? 0.0,
        ...options,
      };

      const response = await this.openai.createCompletion(request);

      return response.data.choices?.[0]?.text?.trim() || 'No response generated';
    } catch (error) {
      console.error('Error generating response from OpenAI:', error);
      throw new Error('Failed to generate response from OpenAI');
    }
  }

  /**
   * Generate embeddings for a given input text.
   * @param input The text input.
   * @returns The generated embeddings.
   */
  async generateEmbeddings(input: string): Promise<number[]> {
    try {
      const response = await this.openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input,
      });

      return response.data.data[0].embedding;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw new Error('Failed to generate embeddings from OpenAI');
    }
  }

  /**
   * Sets a new default model for requests.
   * @param model The model name to set as default.
   */
  setDefaultModel(model: string): void {
    this.defaultModel = model;
  }

  /**
   * Gets the current default model.
   * @returns The default model name.
   */
  getDefaultModel(): string {
    return this.defaultModel;
  }
}

