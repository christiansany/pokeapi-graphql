import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { TypeDTO, TypeListResponse } from "./type.dto.js";

/**
 * DataSource for Type domain.
 * Handles fetching Type data from PokeAPI with caching and batching.
 */
export class TypeDataSource extends BasePokeAPIDataSource {
  public typeByIdLoader: DataLoader<number, TypeDTO | null>;
  public typeByNameLoader: DataLoader<string, TypeDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize DataLoader for Type by ID
    this.typeByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchTypeById(id)));
    });

    // Initialize DataLoader for Type by name
    this.typeByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchTypeByName(name)));
    });
  }

  /**
   * Get a Type by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getTypeById(id: number): Promise<TypeDTO | null> {
    return this.typeByIdLoader.load(id);
  }

  /**
   * Get a Type by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getTypeByName(name: string): Promise<TypeDTO | null> {
    return this.typeByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Types.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getTypeList(limit: number, offset: number): Promise<TypeListResponse> {
    const cacheKey = `list:type:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<TypeListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/type?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<TypeListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Type list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Type by ID with caching.
   */
  private async fetchTypeById(id: number): Promise<TypeDTO | null> {
    const cacheKey = `type:${id}`;

    // Check cache first
    const cached = this.cache.get<TypeDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/type/${id}`;
    const type = await this.fetch<TypeDTO>(url);

    // Store in cache if found
    if (type) {
      this.cache.set(cacheKey, type);
    }

    return type;
  }

  /**
   * Private method to fetch Type by name with caching.
   */
  private async fetchTypeByName(name: string): Promise<TypeDTO | null> {
    const cacheKey = `type:name:${name}`;

    // Check cache first
    const cached = this.cache.get<TypeDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/type/${name}`;
    const type = await this.fetch<TypeDTO>(url);

    // Store in cache if found
    if (type) {
      this.cache.set(cacheKey, type);
      // Also cache by ID for consistency
      this.cache.set(`type:${type.id}`, type);
    }

    return type;
  }
}
