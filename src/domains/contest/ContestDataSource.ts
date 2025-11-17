import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { ContestTypeDTO, ContestEffectDTO, SuperContestEffectDTO } from "./contest.dto.js";
import type { NamedAPIResourceListDTO, APIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Contest domain.
 * Handles fetching ContestType, ContestEffect, and SuperContestEffect data from PokeAPI with caching and batching.
 */
export class ContestDataSource extends BasePokeAPIDataSource {
  // ContestType loaders
  public contestTypeByIdLoader: DataLoader<number, ContestTypeDTO | null>;
  public contestTypeByNameLoader: DataLoader<string, ContestTypeDTO | null>;

  // ContestEffect loaders
  public contestEffectByIdLoader: DataLoader<number, ContestEffectDTO | null>;

  // SuperContestEffect loaders
  public superContestEffectByIdLoader: DataLoader<number, SuperContestEffectDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize ContestType loaders
    this.contestTypeByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchContestTypeById(id)));
    });

    this.contestTypeByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchContestTypeByName(name)));
    });

    // Initialize ContestEffect loaders
    this.contestEffectByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchContestEffectById(id)));
    });

    // Initialize SuperContestEffect loaders
    this.superContestEffectByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchSuperContestEffectById(id)));
    });
  }

  // ===== ContestType Methods =====

  /**
   * Get a ContestType by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getContestTypeById(id: number): Promise<ContestTypeDTO | null> {
    return this.contestTypeByIdLoader.load(id);
  }

  /**
   * Get a ContestType by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getContestTypeByName(name: string): Promise<ContestTypeDTO | null> {
    return this.contestTypeByNameLoader.load(name);
  }

  /**
   * Get a paginated list of ContestTypes.
   */
  async getContestTypeList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:contest-type:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/contest-type?offset=${offset}`
        : `${this.baseURL}/contest-type?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch ContestType by ID with caching.
   */
  private async fetchContestTypeById(id: number): Promise<ContestTypeDTO | null> {
    const cacheKey = `contest-type:id:${id}`;
    const cached = this.cache.get<ContestTypeDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/contest-type/${id}`;
    const contestType = await this.fetch<ContestTypeDTO>(url);
    if (contestType) {
      this.cache.set(cacheKey, contestType);
      this.cache.set(`contest-type:${contestType.name}`, contestType);
    }
    return contestType;
  }

  /**
   * Private method to fetch ContestType by name with caching.
   */
  private async fetchContestTypeByName(name: string): Promise<ContestTypeDTO | null> {
    const cacheKey = `contest-type:${name}`;
    const cached = this.cache.get<ContestTypeDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/contest-type/${name}`;
    const contestType = await this.fetch<ContestTypeDTO>(url);
    if (contestType) {
      this.cache.set(cacheKey, contestType);
      this.cache.set(`contest-type:id:${contestType.id}`, contestType);
    }
    return contestType;
  }

  // ===== ContestEffect Methods =====

  /**
   * Get a ContestEffect by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getContestEffectById(id: number): Promise<ContestEffectDTO | null> {
    return this.contestEffectByIdLoader.load(id);
  }

  /**
   * Get a paginated list of ContestEffects.
   */
  async getContestEffectList(limit: number, offset: number): Promise<APIResourceListDTO> {
    const cacheKey = `list:contest-effect:${limit}:${offset}`;
    const cached = this.cache.get<APIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/contest-effect?offset=${offset}`
        : `${this.baseURL}/contest-effect?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<APIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch ContestEffect by ID with caching.
   */
  private async fetchContestEffectById(id: number): Promise<ContestEffectDTO | null> {
    const cacheKey = `contest-effect:id:${id}`;
    const cached = this.cache.get<ContestEffectDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/contest-effect/${id}`;
    const contestEffect = await this.fetch<ContestEffectDTO>(url);
    if (contestEffect) {
      this.cache.set(cacheKey, contestEffect);
    }
    return contestEffect;
  }

  // ===== SuperContestEffect Methods =====

  /**
   * Get a SuperContestEffect by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getSuperContestEffectById(id: number): Promise<SuperContestEffectDTO | null> {
    return this.superContestEffectByIdLoader.load(id);
  }

  /**
   * Get a paginated list of SuperContestEffects.
   */
  async getSuperContestEffectList(limit: number, offset: number): Promise<APIResourceListDTO> {
    const cacheKey = `list:super-contest-effect:${limit}:${offset}`;
    const cached = this.cache.get<APIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/super-contest-effect?offset=${offset}`
        : `${this.baseURL}/super-contest-effect?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<APIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch SuperContestEffect by ID with caching.
   */
  private async fetchSuperContestEffectById(id: number): Promise<SuperContestEffectDTO | null> {
    const cacheKey = `super-contest-effect:id:${id}`;
    const cached = this.cache.get<SuperContestEffectDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/super-contest-effect/${id}`;
    const superContestEffect = await this.fetch<SuperContestEffectDTO>(url);
    if (superContestEffect) {
      this.cache.set(cacheKey, superContestEffect);
    }
    return superContestEffect;
  }
}
