/**
 * Represents the personality profile of the Miyu AI.
 */
export interface PersonalityProfile {
  id: string; // Unique identifier for the personality profile
  name: string; // Name of the personality
  description: string; // A brief description of the personality
  tone: ToneSettings; // Settings for tone and style
  behavior: BehaviorSettings; // Behavior preferences
  preferences: PreferenceSettings; // Customizable user preferences
}

/**
 * Tone settings for the personality profile.
 */
export interface ToneSettings {
  formality: FormalityLevel; // Level of formality
  emotion: EmotionIntensity; // Intensity of emotional expression
  humor: HumorLevel; // Level of humor in responses
}

/**
 * Enum for formality levels.
 */
export enum FormalityLevel {
  CASUAL = 'casual',
  NEUTRAL = 'neutral',
  FORMAL = 'formal',
}

/**
 * Enum for emotion intensity.
 */
export enum EmotionIntensity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Enum for humor levels.
 */
export enum HumorLevel {
  NONE = 'none',
  LIGHT = 'light',
  HIGH = 'high',
}

/**
 * Behavior settings for the personality profile.
 */
export interface BehaviorSettings {
  proactivity: ProactivityLevel; // Level of proactivity in conversations
  adaptability: boolean; // Whether the AI adapts to user behavior
}

/**
 * Enum for proactivity levels.
 */
export enum ProactivityLevel {
  PASSIVE = 'passive',
  REACTIVE = 'reactive',
  PROACTIVE = 'proactive',
}

/**
 * User preference settings for customizing interactions.
 */
export interface PreferenceSettings {
  preferredLanguage: string; // Language preference for interactions
  preferredPlatform: string; // Default platform for notifications
  customKeywords?: string[]; // Custom keywords for tailoring responses
}

/**
 * Utility class for working with personality profiles.
 */
export class PersonalityUtils {
  /**
   * Creates a default personality profile.
   * @returns A default `PersonalityProfile` object.
   */
  static createDefaultProfile(): PersonalityProfile {
    return {
      id: 'default',
      name: 'Default Personality',
      description: 'A balanced and neutral personality for general interactions.',
      tone: {
        formality: FormalityLevel.NEUTRAL,
        emotion: EmotionIntensity.MEDIUM,
        humor: HumorLevel.LIGHT,
      },
      behavior: {
        proactivity: ProactivityLevel.REACTIVE,
        adaptability: true,
      },
      preferences: {
        preferredLanguage: 'en',
        preferredPlatform: 'telegram',
        customKeywords: [],
      },
    };
  }

  /**
   * Updates an existing personality profile with new settings.
   * @param profile - The personality profile to update.
   * @param updates - The updates to apply.
   * @returns The updated personality profile.
   */
  static updateProfile(
    profile: PersonalityProfile,
    updates: Partial<PersonalityProfile>
  ): PersonalityProfile {
    return { ...profile, ...updates };
  }

  /**
   * Logs the personality profile for debugging.
   * @param profile - The personality profile to log.
   */
  static logProfile(profile: PersonalityProfile): void {
    console.log(`[Personality Profile]`, JSON.stringify(profile, null, 2));
  }
}

