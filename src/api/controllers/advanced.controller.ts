import { Request, Response } from 'express';
import { OpenAIService } from '../../integrations/openai/OpenAIService';
import { SolanaService } from '../../integrations/solana/SolanaService';
import { Logger } from '../../utils/logger';

export class AdvancedController {
  private openAIService: OpenAIService;
  private solanaService: SolanaService;

  constructor() {
    this.openAIService = new OpenAIService();
    this.solanaService = new SolanaService();
  }

  /**
   * Handles AI-based user interactions.
   * @route POST /api/advanced/ai-interact
   */
  async aiInteract(req: Request, res: Response): Promise<Response> {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      Logger.info(`Received AI interaction request with prompt: ${prompt}`);
      const response = await this.openAIService.generateResponse(prompt);
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      Logger.error('Error in AI interaction:', error);
      return res.status(500).json({ error: 'Failed to process AI interaction.' });
    }
  }

  /**
   * Handles blockchain transactions.
   * @route POST /api/advanced/transaction
   */
  async handleTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { recipient, amount } = req.body;
      if (!recipient || !amount) {
        return res.status(400).json({ error: 'Recipient and amount are required.' });
      }

      Logger.info(`Initiating transaction to ${recipient} with amount ${amount}`);
      const transactionId = await this.solanaService.sendTransaction(recipient, amount);
      return res.status(200).json({ success: true, transactionId });
    } catch (error) {
      Logger.error('Error in blockchain transaction:', error);
      return res.status(500).json({ error: 'Failed to process transaction.' });
    }
  }

  /**
   * Fetches blockchain wallet balance.
   * @route GET /api/advanced/balance
   */
  async getWalletBalance(req: Request, res: Response): Promise<Response> {
    try {
      const { walletAddress } = req.query;
      if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required.' });
      }

      Logger.info(`Fetching balance for wallet: ${walletAddress}`);
      const balance = await this.solanaService.getWalletBalance(walletAddress as string);
      return res.status(200).json({ success: true, balance });
    } catch (error) {
      Logger.error('Error fetching wallet balance:', error);
      return res.status(500).json({ error: 'Failed to fetch wallet balance.' });
    }
  }
}
