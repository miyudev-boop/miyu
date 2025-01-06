/**
 * Represents the different emotional states the system can model.
 */
export interface EmotionalState {
  happiness: number; // Range: 0 (not happy) to 100 (extremely happy)
  sadness: number; // Range: 0 (not sad) to 100 (extremely sad)
  anger: number; // Range: 0 (not angry) to 100 (extremely angry)
  fear: number; // Range: 0 (not afraid) to 100 (extremely afraid)
  surprise: number; // Range: 0 (not surprised) to 100 (extremely surprised)
  neutral: number; // Range: 0 (not neutral) to 100 (extremely neutral)
}

/**
 * Utility functions for working with emotional states.
 */
export class EmotionalUtils {
  /**
   * Validates that the emotional state values are within acceptable ranges.
   * @param state - The emotional state to validate.
   * @returns True if valid, false otherwise.
   */
  static isValidState(state: EmotionalState): boolean {
    return Object.values(state).every((value) => value >= 0 && value <= 100);
  }

  /**
   * Normalizes the emotional state so that all values add up to 100.
   * @param state - The emotional state to normalize.
   * @returns A normalized emotional state.
   */
  static normalizeState(state: EmotionalState): EmotionalState {
    const total = Object.values(state).reduce((sum, value) => sum + value, 0);

    if (total === 0) {
      // If all values are zero, default to neutral state
      return { happiness: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, neutral: 100 };
    }

    return Object.fromEntries(
      Object.entries(state).map(([key, value]) => [key, (value / total) * 100])
    ) as EmotionalState;
  }

  /**
   * Combines two emotional states into one by averaging their values.
   * @param state1 - The first emotional state.
   * @param state2 - The second emotional state.
   * @returns A new emotional state that is the average of the two.
   */
  static mergeStates(state1: EmotionalState, state2: EmotionalState): EmotionalState {
    return Object.fromEntries(
      Object.entries(state1).map(([key, value]) => [
        key,
        (value + (state2 as any)[key]) / 2,
      ])
    ) as EmotionalState;
  }

  /**
   * Returns the dominant emotion from the given emotional state.
   * @param state - The emotional state.
   * @returns The dominant emotion or 'neutral' if tied.
   */
  static getDominantEmotion(state: EmotionalState): keyof EmotionalState {
    const entries = Object.entries(state);
    const max = Math.max(...entries.map(([, value]) => value));
    const dominantEmotions = entries.filter(([, value]) => value === max).map(([key]) => key);

    return dominantEmotions.length === 1 ? (dominantEmotions[0] as keyof EmotionalState) : 'neutral';
  }
}

