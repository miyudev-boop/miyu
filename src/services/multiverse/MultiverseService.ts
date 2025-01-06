interface Multiverse {
  id: string;
  name: string;
  description?: string;
  endpoint: string;
  isActive: boolean;
}

class MultiverseService {
  private multiverses: Map<string, Multiverse>;

  constructor() {
    this.multiverses = new Map();
  }

  /**
   * Add a new multiverse to the service.
   * @param multiverse - The multiverse to add.
   */
  public addMultiverse(multiverse: Multiverse): void {
    if (this.multiverses.has(multiverse.id)) {
      throw new Error(`Multiverse with ID '${multiverse.id}' already exists.`);
    }
    this.multiverses.set(multiverse.id, multiverse);
  }

  /**
   * Remove a multiverse by its ID.
   * @param id - The ID of the multiverse to remove.
   */
  public removeMultiverse(id: string): void {
    if (!this.multiverses.has(id)) {
      throw new Error(`Multiverse with ID '${id}' does not exist.`);
    }
    this.multiverses.delete(id);
  }

  /**
   * Get a multiverse by its ID.
   * @param id - The ID of the multiverse to retrieve.
   * @returns The requested multiverse.
   */
  public getMultiverse(id: string): Multiverse | null {
    return this.multiverses.get(id) || null;
  }

  /**
   * List all available multiverses.
   * @returns An array of all multiverses.
   */
  public listMultiverses(): Multiverse[] {
    return Array.from(this.multiverses.values());
  }

  /**
   * Update a multiverse by its ID.
   * @param id - The ID of the multiverse to update.
   * @param updates - Partial updates to apply to the multiverse.
   */
  public updateMultiverse(id: string, updates: Partial<Multiverse>): void {
    const multiverse = this.multiverses.get(id);

    if (!multiverse) {
      throw new Error(`Multiverse with ID '${id}' does not exist.`);
    }

    this.multiverses.set(id, { ...multiverse, ...updates });
  }

  /**
   * Activate a multiverse by its ID.
   * @param id - The ID of the multiverse to activate.
   */
  public activateMultiverse(id: string): void {
    this.updateMultiverse(id, { isActive: true });
  }

  /**
   * Deactivate a multiverse by its ID.
   * @param id - The ID of the multiverse to deactivate.
   */
  public deactivateMultiverse(id: string): void {
    this.updateMultiverse(id, { isActive: false });
  }

  /**
   * Check the connection status of a multiverse.
   * @param id - The ID of the multiverse to check.
   * @returns True if the multiverse is reachable, false otherwise.
   */
  public async checkConnection(id: string): Promise<boolean> {
    const multiverse = this.getMultiverse(id);

    if (!multiverse) {
      throw new Error(`Multiverse with ID '${id}' does not exist.`);
    }

    try {
      const response = await fetch(multiverse.endpoint, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error(`Failed to connect to multiverse '${id}':`, error);
      return false;
    }
  }
}

export default MultiverseService;

