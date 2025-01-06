// src/modules/SolanaWallet.ts
import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { getAssociatedTokenAddress, Token } from '@solana/spl-token';

export class SolanaWallet {
  private connection: Connection;

  constructor(rpcUrl: string) {
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  static generateWallet(): Keypair {
    return Keypair.generate();
  }

  static restoreWallet(privateKey: Uint8Array): Keypair {
    return Keypair.fromSecretKey(privateKey);
  }

  async getSolBalance(publicKey: PublicKey): Promise<number> {
    const balance = await this.connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  async transferSol(from: Keypair, to: PublicKey, amount: number): Promise<string> {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    const signature = await this.connection.sendTransaction(transaction, [from]);
    await this.connection.confirmTransaction(signature, 'confirmed');
    return signature;
  }
}
