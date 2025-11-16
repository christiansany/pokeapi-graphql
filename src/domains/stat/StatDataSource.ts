import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type {
  StatDTO,
  StatListResponse,
  CharacteristicDTO,
  CharacteristicListResponse,
  NatureDTO,
  NatureListResponse,
} from "./stat.dto.js";

/**
 * DataSource for Stat domain.
 * Handles fetching Stat data from PokeAPI with caching and batching.
 */
export class StatDataSource extends BasePokeAPIDataSource {
  public statByIdLoader: DataLoader<number, StatDTO | null>;
  public statByNameLoader: DataLoader<string, StatDTO | null>;
  public characteristicByIdLoader: DataLoader<number, CharacteristicDTO | null>;
  public natureByIdLoader: DataLoader<number, NatureDTO | null>;
  public natureByNameLoader: DataLoader<string, NatureDTO | null>;

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

    // Initialize DataLoader for Characteristic by ID
    this.characteristicByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchCharacteristicById(id)));
    });

    // Initialize DataLoader for Nature by ID
    this.natureByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchNatureById(id)));
    });

    // Initialize DataLoader for Nature by name
    this.natureByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchNatureByName(name)));
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

  /**
   * Get a Characteristic by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getCharacteristicById(id: number): Promise<CharacteristicDTO | null> {
    return this.characteristicByIdLoader.load(id);
  }

  /**
   * Get a paginated list of Characteristics.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getCharacteristicList(limit: number, offset: number): Promise<CharacteristicListResponse> {
    const cacheKey = `list:characteristic:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<CharacteristicListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/characteristic?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<CharacteristicListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Characteristic list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Characteristic by ID with caching.
   */
  private async fetchCharacteristicById(id: number): Promise<CharacteristicDTO | null> {
    const cacheKey = `characteristic:${id}`;

    // Check cache first
    const cached = this.cache.get<CharacteristicDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/characteristic/${id}`;
    const characteristic = await this.fetch<CharacteristicDTO>(url);

    // Store in cache if found
    if (characteristic) {
      this.cache.set(cacheKey, characteristic);
    }

    return characteristic;
  }

  /**
   * Get a Nature by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getNatureById(id: number): Promise<NatureDTO | null> {
    return this.natureByIdLoader.load(id);
  }

  /**
   * Get a Nature by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getNatureByName(name: string): Promise<NatureDTO | null> {
    return this.natureByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Natures.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getNatureList(limit: number, offset: number): Promise<NatureListResponse> {
    const cacheKey = `list:nature:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<NatureListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/nature?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NatureListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Nature list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Nature by ID with caching.
   */
  private async fetchNatureById(id: number): Promise<NatureDTO | null> {
    const cacheKey = `nature:${id}`;

    // Check cache first
    const cached = this.cache.get<NatureDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/nature/${id}`;
    const nature = await this.fetch<NatureDTO>(url);

    // Store in cache if found
    if (nature) {
      this.cache.set(cacheKey, nature);
    }

    return nature;
  }

  /**
   * Private method to fetch Nature by name with caching.
   */
  private async fetchNatureByName(name: string): Promise<NatureDTO | null> {
    const cacheKey = `nature:name:${name}`;

    // Check cache first
    const cached = this.cache.get<NatureDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/nature/${name}`;
    const nature = await this.fetch<NatureDTO>(url);

    // Store in cache if found
    if (nature) {
      this.cache.set(cacheKey, nature);
      // Also cache by ID for consistency
      this.cache.set(`nature:${nature.id}`, nature);
    }

    return nature;
  }
}
