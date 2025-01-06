interface CacheEntry<T> {
  value: T;
  expiration: number | null; // Timestamp in milliseconds or null for no expiration
}

class MemoryService {
  private static instance: MemoryService | null = null;
  private cache: Map<string, CacheEntry<any>>;

  private constructor() {
    this.cache = new Map();
  }

  /**
   * Get the singleton instance of MemoryService.
   */
  public static getInstance(): MemoryService {
    if (!MemoryService.instance) {
      MemoryService.instance = new MemoryService();
    }
    return MemoryService.instance;
  }

  /**
   * Set a value in the cache with an optional expiration time.
   * @param key - The key to store the value under.
   * @param value - The value to store.
   * @param ttl - Time-to-live in milliseconds. If not provided, the value will not expire.
   */
  public set<T>(key: string, value: T, ttl?: number): void {
    const expiration = ttl ? Date.now() + ttl : null;
    this.cache.set(key, { value, expiration });
  }

  /**
   * Get a value from the cache.
   * @param key - The key of the value to retrieve.
   * @returns The cached value, or null if not found or expired.
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (entry.expiration && Date.now() > entry.expiration) {
      this.cache.delete(key); // Remove expired entry
      return null;
    }

    return entry.value as T;
  }

  /**
   * Remove a value from the cache.
   * @param key - The key of the value to remove.
   */
  public delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all entries in the cache.
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Check if a key exists in the cache and is not expired.
   * @param key - The key to check.
   * @returns True if the key exists and is not expired, false otherwise.
   */
  public has(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) return false;

    if (entry.expiration && Date.now() > entry.expiration) {
      this.cache.delete(key); // Remove expired entry
      return false;
    }

    return true;
  }
}

export default MemoryService;

