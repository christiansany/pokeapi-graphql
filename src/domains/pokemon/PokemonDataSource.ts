import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { PokemonDTO, PokemonListResponse } from "./pokemon.dto.js";

/**
 * DataSource for Pokemon domain.
 * Handles fetching Pokemon data from PokeAPI with caching and batching.
 */
export class PokemonDataSource extends BasePokeAPIDataSource {
  public pokemonByIdLoader: DataLoader<number, PokemonDTO | null>;
  public pokemonByNameLoader: DataLoader<string, PokemonDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize DataLoader for Pokemon by ID
    this.pokemonByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchPokemonById(id)));
    });

    // Initialize DataLoader for Pokemon by name
    this.pokemonByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchPokemonByName(name)));
    });
  }

  /**
   * Get a Pokemon by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonById(id: number): Promise<PokemonDTO | null> {
    return this.pokemonByIdLoader.load(id);
  }

  /**
   * Get a Pokemon by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonByName(name: string): Promise<PokemonDTO | null> {
    return this.pokemonByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Pokemon.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
    const cacheKey = `list:pokemon:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<PokemonListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Pokemon list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Pokemon by ID with caching.
   */
  private async fetchPokemonById(id: number): Promise<PokemonDTO | null> {
    const cacheKey = `pokemon:${id}`;

    // Check cache first
    const cached = this.cache.get<PokemonDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon/${id}`;
    const pokemon = await this.fetch<PokemonDTO>(url);

    // Store in cache if found
    if (pokemon) {
      this.cache.set(cacheKey, pokemon);
    }

    return pokemon;
  }

  /**
   * Private method to fetch Pokemon by name with caching.
   */
  private async fetchPokemonByName(name: string): Promise<PokemonDTO | null> {
    const cacheKey = `pokemon:name:${name}`;

    // Check cache first
    const cached = this.cache.get<PokemonDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon/${name}`;
    const pokemon = await this.fetch<PokemonDTO>(url);

    // Store in cache if found
    if (pokemon) {
      this.cache.set(cacheKey, pokemon);
      // Also cache by ID for consistency
      this.cache.set(`pokemon:${pokemon.id}`, pokemon);
    }

    return pokemon;
  }
}
