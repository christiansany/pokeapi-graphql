import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { GenerationDTO, VersionDTO, VersionGroupDTO, PokedexDTO } from "./game.dto.js";
import type { NamedAPIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Game domain.
 * Handles fetching Generation, Version, VersionGroup, and Pokedex data from PokeAPI with caching and batching.
 */
export class GameDataSource extends BasePokeAPIDataSource {
  // Generation loaders
  public generationByIdLoader: DataLoader<number, GenerationDTO | null>;
  public generationByNameLoader: DataLoader<string, GenerationDTO | null>;

  // Version loaders
  public versionByIdLoader: DataLoader<number, VersionDTO | null>;
  public versionByNameLoader: DataLoader<string, VersionDTO | null>;

  // VersionGroup loaders
  public versionGroupByIdLoader: DataLoader<number, VersionGroupDTO | null>;
  public versionGroupByNameLoader: DataLoader<string, VersionGroupDTO | null>;

  // Pokedex loaders
  public pokedexByIdLoader: DataLoader<number, PokedexDTO | null>;
  public pokedexByNameLoader: DataLoader<string, PokedexDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize Generation loaders
    this.generationByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchGenerationById(id)));
    });

    this.generationByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchGenerationByName(name)));
    });

    // Initialize Version loaders
    this.versionByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchVersionById(id)));
    });

    this.versionByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchVersionByName(name)));
    });

    // Initialize VersionGroup loaders
    this.versionGroupByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchVersionGroupById(id)));
    });

    this.versionGroupByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchVersionGroupByName(name)));
    });

    // Initialize Pokedex loaders
    this.pokedexByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchPokedexById(id)));
    });

    this.pokedexByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchPokedexByName(name)));
    });
  }

  // ===== Generation Methods =====

  /**
   * Get a Generation by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getGenerationById(id: number): Promise<GenerationDTO | null> {
    return this.generationByIdLoader.load(id);
  }

  /**
   * Get a Generation by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getGenerationByName(name: string): Promise<GenerationDTO | null> {
    return this.generationByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Generations.
   */
  async getGenerationList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:generation:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/generation?offset=${offset}`
        : `${this.baseURL}/generation?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch Generation by ID with caching.
   */
  private async fetchGenerationById(id: number): Promise<GenerationDTO | null> {
    const cacheKey = `generation:id:${id}`;
    const cached = this.cache.get<GenerationDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/generation/${id}`;
    const generation = await this.fetch<GenerationDTO>(url);
    if (generation) {
      this.cache.set(cacheKey, generation);
      this.cache.set(`generation:${generation.name}`, generation);
    }
    return generation;
  }

  /**
   * Private method to fetch Generation by name with caching.
   */
  private async fetchGenerationByName(name: string): Promise<GenerationDTO | null> {
    const cacheKey = `generation:${name}`;
    const cached = this.cache.get<GenerationDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/generation/${name}`;
    const generation = await this.fetch<GenerationDTO>(url);
    if (generation) {
      this.cache.set(cacheKey, generation);
      this.cache.set(`generation:id:${generation.id}`, generation);
    }
    return generation;
  }

  // ===== Version Methods =====

  /**
   * Get a Version by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getVersionById(id: number): Promise<VersionDTO | null> {
    return this.versionByIdLoader.load(id);
  }

  /**
   * Get a Version by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getVersionByName(name: string): Promise<VersionDTO | null> {
    return this.versionByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Versions.
   */
  async getVersionList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:version:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/version?offset=${offset}`
        : `${this.baseURL}/version?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch Version by ID with caching.
   */
  private async fetchVersionById(id: number): Promise<VersionDTO | null> {
    const cacheKey = `version:id:${id}`;
    const cached = this.cache.get<VersionDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/version/${id}`;
    const version = await this.fetch<VersionDTO>(url);
    if (version) {
      this.cache.set(cacheKey, version);
      this.cache.set(`version:${version.name}`, version);
    }
    return version;
  }

  /**
   * Private method to fetch Version by name with caching.
   */
  private async fetchVersionByName(name: string): Promise<VersionDTO | null> {
    const cacheKey = `version:${name}`;
    const cached = this.cache.get<VersionDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/version/${name}`;
    const version = await this.fetch<VersionDTO>(url);
    if (version) {
      this.cache.set(cacheKey, version);
      this.cache.set(`version:id:${version.id}`, version);
    }
    return version;
  }

  // ===== VersionGroup Methods =====

  /**
   * Get a VersionGroup by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getVersionGroupById(id: number): Promise<VersionGroupDTO | null> {
    return this.versionGroupByIdLoader.load(id);
  }

  /**
   * Get a VersionGroup by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getVersionGroupByName(name: string): Promise<VersionGroupDTO | null> {
    return this.versionGroupByNameLoader.load(name);
  }

  /**
   * Get a paginated list of VersionGroups.
   */
  async getVersionGroupList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:version-group:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/version-group?offset=${offset}`
        : `${this.baseURL}/version-group?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch VersionGroup by ID with caching.
   */
  private async fetchVersionGroupById(id: number): Promise<VersionGroupDTO | null> {
    const cacheKey = `version-group:id:${id}`;
    const cached = this.cache.get<VersionGroupDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/version-group/${id}`;
    const versionGroup = await this.fetch<VersionGroupDTO>(url);
    if (versionGroup) {
      this.cache.set(cacheKey, versionGroup);
      this.cache.set(`version-group:${versionGroup.name}`, versionGroup);
    }
    return versionGroup;
  }

  /**
   * Private method to fetch VersionGroup by name with caching.
   */
  private async fetchVersionGroupByName(name: string): Promise<VersionGroupDTO | null> {
    const cacheKey = `version-group:${name}`;
    const cached = this.cache.get<VersionGroupDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/version-group/${name}`;
    const versionGroup = await this.fetch<VersionGroupDTO>(url);
    if (versionGroup) {
      this.cache.set(cacheKey, versionGroup);
      this.cache.set(`version-group:id:${versionGroup.id}`, versionGroup);
    }
    return versionGroup;
  }

  // ===== Pokedex Methods =====

  /**
   * Get a Pokedex by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokedexById(id: number): Promise<PokedexDTO | null> {
    return this.pokedexByIdLoader.load(id);
  }

  /**
   * Get a Pokedex by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokedexByName(name: string): Promise<PokedexDTO | null> {
    return this.pokedexByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Pokedexes.
   */
  async getPokedexList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:pokedex:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/pokedex?offset=${offset}`
        : `${this.baseURL}/pokedex?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch Pokedex by ID with caching.
   */
  private async fetchPokedexById(id: number): Promise<PokedexDTO | null> {
    const cacheKey = `pokedex:id:${id}`;
    const cached = this.cache.get<PokedexDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/pokedex/${id}`;
    const pokedex = await this.fetch<PokedexDTO>(url);
    if (pokedex) {
      this.cache.set(cacheKey, pokedex);
      this.cache.set(`pokedex:${pokedex.name}`, pokedex);
    }
    return pokedex;
  }

  /**
   * Private method to fetch Pokedex by name with caching.
   */
  private async fetchPokedexByName(name: string): Promise<PokedexDTO | null> {
    const cacheKey = `pokedex:${name}`;
    const cached = this.cache.get<PokedexDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/pokedex/${name}`;
    const pokedex = await this.fetch<PokedexDTO>(url);
    if (pokedex) {
      this.cache.set(cacheKey, pokedex);
      this.cache.set(`pokedex:id:${pokedex.id}`, pokedex);
    }
    return pokedex;
  }
}
