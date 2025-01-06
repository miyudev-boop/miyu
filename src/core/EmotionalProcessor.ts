export type EmotionalState = {
  happiness: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  neutral: number;
};

export class EmotionalProcessor {
  private state: EmotionalState;

  constructor(initialState?: Partial<EmotionalState>) {
    this.state = {
      happiness: 0,
      sadness: 0,
      anger: 0,
      fear: 0,
      surprise: 0,
      neutral: 1, // Default to neutral
      ...initialState,
    };
    this.normalizeState();
  }

  /**
   * Updates the emotional state based on new input values.
   * @param newState Partial emotional state to update.
   */
  public updateState(newState: Partial<EmotionalState>): void {
    Object.assign(this.state, newState);
    this.normalizeState();
  }

  /**
   * Gets the current emotional state.
   * @returns The current emotional state.
   */
  public getState(): EmotionalState {
    return this.state;
  }

  /**
   * Determines the dominant emotion based on the current state.
   * @returns The dominant emotion as a string.
   */
  public getDominantEmotion(): keyof EmotionalState {
    return Object.keys(this.state).reduce((dominant, emotion) => {
      return this.state[emotion as keyof EmotionalState] >
        this.state[dominant as keyof EmotionalState]
        ? (emotion as keyof EmotionalState)
        : (dominant as keyof EmotionalState);
    }) as keyof EmotionalState;
  }

  /**
   * Processes text input to analyze its emotional tone.
   * (Stub implementation — integrate with AI or NLP libraries for real processing.)
   * @param text Input text.
   * @returns Estimated emotional state based on text.
   */
  public analyzeTextEmotion(text: string): EmotionalState {
    // Placeholder logic — Replace with AI/NLP model integration
    if (text.includes('happy') || text.includes('great')) {
      return { happiness: 1, sadness: 0, anger: 0, fear: 0, surprise: 0, neutral: 0 };
    } else if (text.includes('sad') || text.includes('terrible')) {
      return { happiness: 0, sadness: 1, anger: 0, fear: 0, surprise: 0, neutral: 0 };
    }
    return { happiness: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, neutral: 1 };
  }

  /**
   * Updates the state based on text analysis.
   * @param text Input text.
   */
  public processInput(text: string): void {
    const analyzedState = this.analyzeTextEmotion(text);
    this.updateState(analyzedState);
  }

  /**
   * Normalizes the emotional state so that all values sum to 1.
   */
  private normalizeState(): void {
    const total = Object.values(this.state).reduce((sum, value) => sum + value, 0);
    if (total > 0) {
      Object.keys(this.state).forEach((emotion) => {
        this.state[emotion as keyof EmotionalState] /= total;
      });
    }
  }
}

