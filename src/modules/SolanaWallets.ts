// src/modules/SolanaWallet.ts
import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionSignature,
} from '@solana/web3.js';
import { getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount, Token } from '@solana/spl-token';

export class SolanaWallet {
  private connection: Connection;

  constructor(rpcUrl: string = 'https://api.mainnet-beta.solana.com') {
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  // Generate a new wallet
  static generateWallet(): Keypair {
    return Keypair.generate();
  }

  // Restore a wallet from a private key
  static restoreWallet(privateKey: Uint8Array): Keypair {
    return Keypair.fromSecretKey(privateKey);
  }

  // Get SOL balance
  async getSolBalance(publicKey: PublicKey): Promise<number> {
    const balance = await this.connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
  }

  // Fetch all token accounts for a wallet
  async getTokenAccounts(publicKey: PublicKey) {
    const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), // SPL Token Program ID
    });

    return tokenAccounts.value.map((account) => ({
      mint: account.account.data.parsed.info.mint,
      balance: account.account.data.parsed.info.tokenAmount.uiAmount,
    }));
  }

  // Transfer SOL to another wallet
  async transferSol(from: Keypair, to: PublicKey, amount: number): Promise<TransactionSignature> {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: amount * LAMPORTS_PER_SOL, // Convert SOL to lamports
      })
    );

    const signature = await this.connection.sendTransaction(transaction, [from]);
    await this.connection.confirmTransaction(signature, 'confirmed');
    return signature;
  }

  // Transfer SPL tokens
  async transferToken(
    from: Keypair,
    to: PublicKey,
    mintAddress: PublicKey,
    amount: number
  ): Promise<TransactionSignature> {
    const fromTokenAccount = await getAssociatedTokenAddress(mintAddress, from.publicKey);
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      this.connection,
      from,
      mintAddress,
      to
    );

    const transaction = new Transaction().add(
      Token.createTransferInstruction(
        fromTokenAccount,
        toTokenAccount.address,
        from.publicKey,
        amount
      )
    );

    const signature = await this.connection.sendTransaction(transaction, [from]);
    await this.connection.confirmTransaction(signature, 'confirmed');
    return signature;
  }
}
