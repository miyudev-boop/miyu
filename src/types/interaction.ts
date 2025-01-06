/**
 * Represents a user interaction in the Miyu system.
 */
export interface Interaction {
  userId: string; // Unique identifier for the user
  platform: InteractionPlatform; // The platform where the interaction occurred
  timestamp: Date; // When the interaction occurred
  message: string; // The content of the user's message
  response: string; // The system's response to the user
  context?: InteractionContext; // Optional context for the interaction
}

/**
 * Enum for supported platforms.
 */
export enum InteractionPlatform {
  TELEGRAM = 'telegram',
  TWITTER = 'twitter',
  WEB = 'web',
  OTHER = 'other',
}

/**
 * Context object to track additional metadata for interactions.
 */
export interface InteractionContext {
  sessionId?: string; // ID for the user session
  intent?: string; // Detected intent of the user
  emotion?: string; // Detected emotional state (if applicable)
  blockchainAction?: BlockchainAction; // Information about any blockchain-related actions
}

/**
 * Represents an action related to blockchain functionality.
 */
export interface BlockchainAction {
  type: BlockchainActionType; // Type of blockchain action
  transactionId?: string; // Transaction ID (if applicable)
  walletAddress?: string; // User's wallet address
}

/**
 * Enum for blockchain action types.
 */
export enum BlockchainActionType {
  TRANSACTION = 'transaction',
  BALANCE_CHECK = 'balance_check',
  OTHER = 'other',
}

/**
 * Utility functions for working with interactions.
 */
export class InteractionUtils {
  /**
   * Logs an interaction for debugging or analytics purposes.
   * @param interaction - The interaction to log.
   */
  static logInteraction(interaction: Interaction): void {
    console.log(`[Interaction]`, JSON.stringify(interaction, null, 2));
  }

  /**
   * Creates a new interaction object.
   * @param userId - The user's unique identifier.
   * @param platform - The platform where the interaction occurred.
   * @param message - The user's message.
   * @param response - The system's response to the user.
   * @param context - Optional interaction context.
   * @returns A new interaction object.
   */
  static createInteraction(
    userId: string,
    platform: InteractionPlatform,
    message: string,
    response: string,
    context?: InteractionContext
  ): Interaction {
    return {
      userId,
      platform,
      timestamp: new Date(),
      message,
      response,
      context,
    };
  }

  /**
   * Updates an interaction with additional context.
   * @param interaction - The interaction to update.
   * @param context - The new context to merge into the interaction.
   * @returns The updated interaction.
   */
  static updateInteractionContext(
    interaction: Interaction,
    context: Partial<InteractionContext>
  ): Interaction {
    return {
      ...interaction,
      context: {
        ...interaction.context,
        ...context,
      },
    };
  }
}

