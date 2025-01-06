// src/bot.ts
import { Telegraf } from 'telegraf';
import { SolanaWallet } from './modules/SolanaWallet';
import { config } from './config/apiKeys';
import { PublicKey } from '@solana/web3.js';

const bot = new Telegraf(config.botApiKey);
const solanaService = new SolanaWallet(config.solanaRpcUrl);

bot.command('create_wallet', (ctx) => {
  const wallet = SolanaWallet.generateWallet();
  ctx.reply(`Your new wallet address is: ${wallet.publicKey.toBase58()}`);
});

bot.command('check_balance', async (ctx) => {
  const walletAddress = ctx.message.text.split(' ')[1];
  if (walletAddress) {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balance = await solanaService.getSolBalance(publicKey);
      ctx.reply(`SOL Balance: ${balance} SOL`);
    } catch (error) {
      ctx.reply('Error retrieving balance: ' + error.message);
    }
  } else {
    ctx.reply('Please provide a wallet address.');
  }
});

bot.command('transfer_sol', async (ctx) => {
  const [_, recipient, amountStr] = ctx.message.text.split(' ');
  if (recipient && amountStr) {
    try {
      const senderWallet = SolanaWallet.generateWallet(); // Use your stored wallet for users
      const recipientPublicKey = new PublicKey(recipient);
      const amount = parseFloat(amountStr);
      if (isNaN(amount)) {
        return ctx.reply('Invalid amount');
      }
      const txSignature = await solanaService.transferSol(senderWallet, recipientPublicKey, amount);
      ctx.reply(`Transaction successful! Signature: ${txSignature}`);
    } catch (error) {
      ctx.reply('Error during transfer: ' + error.message);
    }
  } else {
    ctx.reply('Usage: /transfer_sol <recipient> <amount>');
  }
});

bot.launch();
