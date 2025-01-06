import { EmotionalState } from './EmotionalProcessor';

export class PersonalityEngine {
  private personalityTraits: Record<string, number>;

  constructor() {
    // Define personality traits with default values
    this.personalityTraits = {
      friendliness: 0.8, // Determines how warm or approachable responses are
      humor: 0.5,        // Adds humor to responses
      formality: 0.3,    // Adjusts the formality level
      curiosity: 0.7,    // Drives inquisitive or engaging responses
    };
  }

  /**
   * Adjusts the response based on user input and emotional state.
   * @param input The user input.
   * @param emotionalState (Optional) The current emotional state.
   * @returns Adjusted response text.
   */
  public adjustResponse(input: string, emotionalState?: EmotionalState): string {
    let adjustedResponse = input;

    // Apply personality traits
    adjustedResponse = this.applyFriendliness(adjustedResponse);
    adjustedResponse = this.applyHumor(adjustedResponse);
    adjustedResponse = this.applyFormality(adjustedResponse);

    // Adjust based on emotional state, if available
    if (emotionalState) {
      adjustedResponse = this.adjustForEmotion(adjustedResponse, emotionalState);
    }

    return adjustedResponse;
  }

  /**
   * Modifies the response to make it more friendly.
   * @param response The original response.
   * @returns A more friendly response.
   */
  private applyFriendliness(response: string): string {
    if (this.personalityTraits.friendliness > 0.5) {
      return `${response} 😊`;
    }
    return response;
  }

  /**
   * Adds humor to the response if appropriate.
   * @param response The original response.
   * @returns A response with added humor.
   */
  private applyHumor(response: string): string {
    if (this.personalityTraits.humor > 0.5) {
      return `${response} Just kidding! 😄`;
    }
    return response;
  }

  /**
   * Adjusts the formality of the response.
   * @param response The original response.
   * @returns A response with adjusted formality.
   */
  private applyFormality(response: string): string {
    if (this.personalityTraits.formality > 0.5) {
      return `Dear user, ${response}`;
    }
    return response;
  }

  /**
   * Adjusts the response based on the emotional state.
   * @param response The original response.
   * @param emotionalState The current emotional state.
   * @returns An emotion-aware response.
   */
  private adjustForEmotion(response: string, emotionalState: EmotionalState): string {
    if (emotionalState.happiness > 0.7) {
      return `${response} I'm feeling great today! 🌟`;
    }
    if (emotionalState.sadness > 0.7) {
      return `${response} It's a tough day, but I'll manage. 😔`;
    }
    return response;
  }

  /**
   * Updates the personality traits dynamically.
   * @param traits A partial map of traits to update.
   */
  public updateTraits(traits: Partial<Record<string, number>>): void {
    this.personalityTraits = { ...this.personalityTraits, ...traits };
  }

  /**
   * Retrieves the current personality traits.
   * @returns The personality traits.
   */
  public getTraits(): Record<string, number> {
    return this.personalityTraits;
  }
}
