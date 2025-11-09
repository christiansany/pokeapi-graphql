import NodeCache from "node-cache";
import DataLoader from "dataloader";

/**
 * Shared cache instance across all DataSources.
 * This enables cross-request caching of PokeAPI responses.
 */
const cache = new NodeCache({ useClones: true });

/**
 * Base class for all PokeAPI DataSources.
 * Provides shared functionality for fetching, caching, and DataLoader initialization.
 */
export abstract class BasePokeAPIDataSource {
  protected baseURL: string;
  protected cache: NodeCache;

  constructor(config: { baseURL: string }) {
    this.baseURL = config.baseURL;
    this.cache = cache; // Use shared cache instance
  }

  /**
   * Shared fetch method with error handling and caching.
   * Returns null for 404 responses, throws for other errors.
   *
   * @param url - Full URL to fetch
   * @returns Parsed JSON response or null if not found
   */
  protected async fetch<T>(url: string): Promise<T | null> {
    try {
      const response = await fetch(url);

      // Return null for 404 (resource not found)
      if (response.status === 404) {
        return null;
      }

      // Throw for other non-OK responses
      if (!response.ok) {
        throw new Error(`PokeAPI error: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      // Re-throw network errors with context
      if (error instanceof Error && error.message.includes("fetch")) {
        throw new Error(`Network error: Unable to reach PokeAPI - ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Helper to create a DataLoader with caching.
   * The batch function should fetch multiple resources in parallel.
   *
   * @param batchFn - Function that takes an array of keys and returns array of values
   * @returns Configured DataLoader instance
   */
  protected createLoader<K, V>(
    batchFn: (keys: readonly K[]) => Promise<(V | null)[]>
  ): DataLoader<K, V | null> {
    return new DataLoader<K, V | null>(batchFn, {
      cache: true, // Enable per-request caching
    });
  }

  /**
   * Extract numeric ID from a PokeAPI resource URL.
   * Example: "https://pokeapi.co/api/v2/pokemon/25/" -> 25
   *
   * @param url - PokeAPI resource URL
   * @returns Numeric ID or null if extraction fails
   */
  protected extractIdFromUrl(url: string): number | null {
    try {
      // Remove trailing slash and split by '/'
      const parts = url.replace(/\/$/, "").split("/");
      // Get the last part which should be the ID
      const idStr = parts[parts.length - 1];
      const id = parseInt(idStr, 10);
      return isNaN(id) ? null : id;
    } catch {
      return null;
    }
  }

  /**
   * Extract name from a PokeAPI resource URL.
   * Example: "https://pokeapi.co/api/v2/pokemon/pikachu/" -> "pikachu"
   *
   * @param url - PokeAPI resource URL
   * @returns Resource name or null if extraction fails
   */
  protected extractNameFromUrl(url: string): string | null {
    try {
      // Remove trailing slash and split by '/'
      const parts = url.replace(/\/$/, "").split("/");
      // Get the last part which should be the name or ID
      const name = parts[parts.length - 1];
      // If it's a number, it's an ID not a name
      if (/^\d+$/.test(name)) {
        return null;
      }
      return name;
    } catch {
      return null;
    }
  }
}
