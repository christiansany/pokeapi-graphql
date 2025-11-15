import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type {
  PokemonDTO,
  PokemonListResponse,
  PokemonSpeciesDTO,
  PokemonSpeciesListResponse,
  PokemonFormDTO,
  PokemonFormListResponse,
} from "./pokemon.dto.js";

/**
 * DataSource for Pokemon domain.
 * Handles fetching Pokemon data from PokeAPI with caching and batching.
 */
export class PokemonDataSource extends BasePokeAPIDataSource {
  public pokemonByIdLoader: DataLoader<number, PokemonDTO | null>;
  public pokemonByNameLoader: DataLoader<string, PokemonDTO | null>;
  public speciesByIdLoader: DataLoader<number, PokemonSpeciesDTO | null>;
  public speciesByNameLoader: DataLoader<string, PokemonSpeciesDTO | null>;
  public formByIdLoader: DataLoader<number, PokemonFormDTO | null>;
  public formByNameLoader: DataLoader<string, PokemonFormDTO | null>;

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

    // Initialize DataLoader for Pokemon Species by ID
    this.speciesByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchSpeciesById(id)));
    });

    // Initialize DataLoader for Pokemon Species by name
    this.speciesByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchSpeciesByName(name)));
    });

    // Initialize DataLoader for Pokemon Form by ID
    this.formByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchFormById(id)));
    });

    // Initialize DataLoader for Pokemon Form by name
    this.formByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchFormByName(name)));
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

  /**
   * Get a Pokemon Species by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getSpeciesById(id: number): Promise<PokemonSpeciesDTO | null> {
    return this.speciesByIdLoader.load(id);
  }

  /**
   * Get a Pokemon Species by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getSpeciesByName(name: string): Promise<PokemonSpeciesDTO | null> {
    return this.speciesByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Pokemon Species.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getSpeciesList(limit: number, offset: number): Promise<PokemonSpeciesListResponse> {
    const cacheKey = `list:pokemon-species:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<PokemonSpeciesListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-species?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonSpeciesListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Pokemon Species list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Get a Pokemon Form by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getFormById(id: number): Promise<PokemonFormDTO | null> {
    return this.formByIdLoader.load(id);
  }

  /**
   * Get a Pokemon Form by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getFormByName(name: string): Promise<PokemonFormDTO | null> {
    return this.formByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Pokemon Forms.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getFormList(limit: number, offset: number): Promise<PokemonFormListResponse> {
    const cacheKey = `list:pokemon-form:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<PokemonFormListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-form?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonFormListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Pokemon Form list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Pokemon Species by ID with caching.
   */
  private async fetchSpeciesById(id: number): Promise<PokemonSpeciesDTO | null> {
    const cacheKey = `pokemon-species:${id}`;

    // Check cache first
    const cached = this.cache.get<PokemonSpeciesDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-species/${id}`;
    const species = await this.fetch<PokemonSpeciesDTO>(url);

    // Store in cache if found
    if (species) {
      this.cache.set(cacheKey, species);
    }

    return species;
  }

  /**
   * Private method to fetch Pokemon Species by name with caching.
   */
  private async fetchSpeciesByName(name: string): Promise<PokemonSpeciesDTO | null> {
    const cacheKey = `pokemon-species:name:${name}`;

    // Check cache first
    const cached = this.cache.get<PokemonSpeciesDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-species/${name}`;
    const species = await this.fetch<PokemonSpeciesDTO>(url);

    // Store in cache if found
    if (species) {
      this.cache.set(cacheKey, species);
      // Also cache by ID for consistency
      this.cache.set(`pokemon-species:${species.id}`, species);
    }

    return species;
  }

  /**
   * Private method to fetch Pokemon Form by ID with caching.
   */
  private async fetchFormById(id: number): Promise<PokemonFormDTO | null> {
    const cacheKey = `pokemon-form:${id}`;

    // Check cache first
    const cached = this.cache.get<PokemonFormDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-form/${id}`;
    const form = await this.fetch<PokemonFormDTO>(url);

    // Store in cache if found
    if (form) {
      this.cache.set(cacheKey, form);
    }

    return form;
  }

  /**
   * Private method to fetch Pokemon Form by name with caching.
   */
  private async fetchFormByName(name: string): Promise<PokemonFormDTO | null> {
    const cacheKey = `pokemon-form:name:${name}`;

    // Check cache first
    const cached = this.cache.get<PokemonFormDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-form/${name}`;
    const form = await this.fetch<PokemonFormDTO>(url);

    // Store in cache if found
    if (form) {
      this.cache.set(cacheKey, form);
      // Also cache by ID for consistency
      this.cache.set(`pokemon-form:${form.id}`, form);
    }

    return form;
  }
}
