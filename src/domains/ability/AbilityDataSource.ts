import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { AbilityDTO } from "./ability.dto.js";

/**
 * DataSource for Ability domain.
 * Handles fetching Ability data from PokeAPI with caching and batching.
 */
export class AbilityDataSource extends BasePokeAPIDataSource {
  public abilityByIdLoader: DataLoader<number, AbilityDTO | null>;
  public abilityByNameLoader: DataLoader<string, AbilityDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize DataLoader for Ability by ID
    this.abilityByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchAbilityById(id)));
    });

    // Initialize DataLoader for Ability by name
    this.abilityByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchAbilityByName(name)));
    });
  }

  /**
   * Get an Ability by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getAbilityById(id: number): Promise<AbilityDTO | null> {
    return this.abilityByIdLoader.load(id);
  }

  /**
   * Get an Ability by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getAbilityByName(name: string): Promise<AbilityDTO | null> {
    return this.abilityByNameLoader.load(name);
  }

  /**
   * Private method to fetch Ability by ID with caching.
   */
  private async fetchAbilityById(id: number): Promise<AbilityDTO | null> {
    const cacheKey = `ability:id:${id}`;

    // Check cache first
    const cached = this.cache.get<AbilityDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/ability/${id}`;
    const ability = await this.fetch<AbilityDTO>(url);

    // Store in cache if found
    if (ability) {
      this.cache.set(cacheKey, ability);
      // Also cache by name for consistency
      this.cache.set(`ability:${ability.name}`, ability);
    }

    return ability;
  }

  /**
   * Private method to fetch Ability by name with caching.
   */
  private async fetchAbilityByName(name: string): Promise<AbilityDTO | null> {
    const cacheKey = `ability:${name}`;

    // Check cache first
    const cached = this.cache.get<AbilityDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/ability/${name}`;
    const ability = await this.fetch<AbilityDTO>(url);

    // Store in cache if found
    if (ability) {
      this.cache.set(cacheKey, ability);
      // Also cache by ID for consistency
      this.cache.set(`ability:id:${ability.id}`, ability);
    }

    return ability;
  }
}
