interface Quest {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

class QuestService {
  private quests: Map<string, Quest>;

  constructor() {
    this.quests = new Map();
  }

  /**
   * Create a new quest.
   * @param title - Title of the quest.
   * @param description - Description of the quest.
   * @returns The created quest.
   */
  public createQuest(title: string, description: string): Quest {
    const id = this.generateId();
    const now = new Date();

    const newQuest: Quest = {
      id,
      title,
      description,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    this.quests.set(id, newQuest);
    return newQuest;
  }

  /**
   * Get a quest by its ID.
   * @param id - The ID of the quest.
   * @returns The quest if found, or null.
   */
  public getQuest(id: string): Quest | null {
    return this.quests.get(id) || null;
  }

  /**
   * List all quests.
   * @param onlyActive - Whether to list only active quests.
   * @returns An array of quests.
   */
  public listQuests(onlyActive = false): Quest[] {
    return Array.from(this.quests.values()).filter(
      (quest) => !onlyActive || quest.isActive
    );
  }

  /**
   * Update a quest by its ID.
   * @param id - The ID of the quest.
   * @param updates - Partial updates to apply to the quest.
   */
  public updateQuest(id: string, updates: Partial<Omit<Quest, "id">>): void {
    const quest = this.quests.get(id);

    if (!quest) {
      throw new Error(`Quest with ID '${id}' does not exist.`);
    }

    this.quests.set(id, { ...quest, ...updates, updatedAt: new Date() });
  }

  /**
   * Mark a quest as completed.
   * @param id - The ID of the quest.
   */
  public completeQuest(id: string): void {
    const quest = this.quests.get(id);

    if (!quest) {
      throw new Error(`Quest with ID '${id}' does not exist.`);
    }

    if (!quest.isActive) {
      throw new Error(`Quest with ID '${id}' is already inactive.`);
    }

    this.quests.set(id, {
      ...quest,
      isActive: false,
      completedAt: new Date(),
    });
  }

  /**
   * Delete a quest by its ID.
   * @param id - The ID of the quest.
   */
  public deleteQuest(id: string): void {
    if (!this.quests.has(id)) {
      throw new Error(`Quest with ID '${id}' does not exist.`);
    }

    this.quests.delete(id);
  }

  /**
   * Generate a unique ID for quests.
   * @returns A unique string ID.
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default QuestService;

