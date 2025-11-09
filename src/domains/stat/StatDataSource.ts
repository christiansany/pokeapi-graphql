import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { StatDTO, StatListResponse } from "./stat.dto.js";

/**
 * DataSource for Stat domain.
 * Handles fetching Stat data from PokeAPI with caching and batching.
 */
export class StatDataSource extends BasePokeAPIDataSource {
  public statByIdLoader: DataLoader<number, StatDTO | null>;
  public statByNameLoader: DataLoader<string, StatDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize DataLoader for Stat by ID
    this.statByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchStatById(id)));
    });

    // Initialize DataLoader for Stat by name
    this.statByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchStatByName(name)));
    });
  }

  /**
   * Get a Stat by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getStatById(id: number): Promise<StatDTO | null> {
    return this.statByIdLoader.load(id);
  }

  /**
   * Get a Stat by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getStatByName(name: string): Promise<StatDTO | null> {
    return this.statByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Stats.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getStatList(limit: number, offset: number): Promise<StatListResponse> {
    const cacheKey = `list:stat:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<StatListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/stat?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<StatListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Stat list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Stat by ID with caching.
   */
  private async fetchStatById(id: number): Promise<StatDTO | null> {
    const cacheKey = `stat:${id}`;

    // Check cache first
    const cached = this.cache.get<StatDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/stat/${id}`;
    const stat = await this.fetch<StatDTO>(url);

    // Store in cache if found
    if (stat) {
      this.cache.set(cacheKey, stat);
    }

    return stat;
  }

  /**
   * Private method to fetch Stat by name with caching.
   */
  private async fetchStatByName(name: string): Promise<StatDTO | null> {
    const cacheKey = `stat:name:${name}`;

    // Check cache first
    const cached = this.cache.get<StatDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/stat/${name}`;
    const stat = await this.fetch<StatDTO>(url);

    // Store in cache if found
    if (stat) {
      this.cache.set(cacheKey, stat);
      // Also cache by ID for consistency
      this.cache.set(`stat:${stat.id}`, stat);
    }

    return stat;
  }
}
