import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { EvolutionChainDTO, EvolutionTriggerDTO } from "./evolution.dto.js";
import type { APIResourceListDTO, NamedAPIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Evolution domain
 * Handles fetching evolution chains and triggers from PokeAPI
 */
export class EvolutionDataSource extends BasePokeAPIDataSource {
  // DataLoaders for batching
  public evolutionChainByIdLoader: DataLoader<number, EvolutionChainDTO | null>;
  public evolutionTriggerByIdLoader: DataLoader<number, EvolutionTriggerDTO | null>;
  public evolutionTriggerByNameLoader: DataLoader<string, EvolutionTriggerDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize loaders
    this.evolutionChainByIdLoader = this.createLoader(async (ids) => {
      return Promise.all(ids.map((id) => this.fetchEvolutionChainById(id)));
    });

    this.evolutionTriggerByIdLoader = this.createLoader(async (ids) => {
      return Promise.all(ids.map((id) => this.fetchEvolutionTriggerById(id)));
    });

    this.evolutionTriggerByNameLoader = this.createLoader(async (names) => {
      return Promise.all(names.map((name) => this.fetchEvolutionTriggerByName(name)));
    });
  }

  /**
   * Get evolution chain by ID
   */
  async getEvolutionChainById(id: number): Promise<EvolutionChainDTO | null> {
    return this.evolutionChainByIdLoader.load(id);
  }

  /**
   * Get evolution trigger by ID
   */
  async getEvolutionTriggerById(id: number): Promise<EvolutionTriggerDTO | null> {
    return this.evolutionTriggerByIdLoader.load(id);
  }

  /**
   * Get evolution trigger by name
   */
  async getEvolutionTriggerByName(name: string): Promise<EvolutionTriggerDTO | null> {
    return this.evolutionTriggerByNameLoader.load(name);
  }

  /**
   * Get paginated list of evolution chains
   */
  async getEvolutionChainList(limit: number, offset: number): Promise<APIResourceListDTO> {
    const cacheKey = `list:evolution-chain:${limit}:${offset}`;
    const cached = this.cache.get<APIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/evolution-chain?offset=${offset}`
        : `${this.baseURL}/evolution-chain?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<APIResourceListDTO>(url);
    if (list) this.cache.set(cacheKey, list);
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Get paginated list of evolution triggers
   */
  async getEvolutionTriggerList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:evolution-trigger:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/evolution-trigger?offset=${offset}`
        : `${this.baseURL}/evolution-trigger?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) this.cache.set(cacheKey, list);
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private: Fetch evolution chain by ID
   */
  private async fetchEvolutionChainById(id: number): Promise<EvolutionChainDTO | null> {
    const cacheKey = `evolution-chain:${id}`;
    const cached = this.cache.get<EvolutionChainDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/evolution-chain/${id}`;
    const evolutionChain = await this.fetch<EvolutionChainDTO>(url);
    if (evolutionChain) this.cache.set(cacheKey, evolutionChain);
    return evolutionChain;
  }

  /**
   * Private: Fetch evolution trigger by ID
   */
  private async fetchEvolutionTriggerById(id: number): Promise<EvolutionTriggerDTO | null> {
    const cacheKey = `evolution-trigger:${id}`;
    const cached = this.cache.get<EvolutionTriggerDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/evolution-trigger/${id}`;
    const trigger = await this.fetch<EvolutionTriggerDTO>(url);
    if (trigger) {
      this.cache.set(cacheKey, trigger);
      // Also cache by name for consistency
      this.cache.set(`evolution-trigger:name:${trigger.name}`, trigger);
    }
    return trigger;
  }

  /**
   * Private: Fetch evolution trigger by name
   */
  private async fetchEvolutionTriggerByName(name: string): Promise<EvolutionTriggerDTO | null> {
    const cacheKey = `evolution-trigger:name:${name}`;
    const cached = this.cache.get<EvolutionTriggerDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/evolution-trigger/${name}`;
    const trigger = await this.fetch<EvolutionTriggerDTO>(url);
    if (trigger) {
      this.cache.set(cacheKey, trigger);
      // Also cache by ID for consistency
      this.cache.set(`evolution-trigger:${trigger.id}`, trigger);
    }
    return trigger;
  }
}
