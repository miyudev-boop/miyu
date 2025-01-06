// src/config/apiKeys.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  botApiKey: process.env.BOT_API_KEY || '',
  solanaRpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
};
