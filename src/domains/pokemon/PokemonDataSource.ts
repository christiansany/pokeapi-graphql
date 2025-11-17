import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type {
  PokemonDTO,
  PokemonListResponse,
  PokemonSpeciesDTO,
  PokemonSpeciesListResponse,
  PokemonFormDTO,
  PokemonFormListResponse,
  EggGroupDTO,
  EggGroupListResponse,
  GrowthRateDTO,
  GrowthRateListResponse,
  GenderDTO,
  GenderListResponse,
  PokemonColorDTO,
  PokemonColorListResponse,
  PokemonShapeDTO,
  PokemonShapeListResponse,
  PokemonHabitatDTO,
  PokemonHabitatListResponse,
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
  public eggGroupByIdLoader: DataLoader<number, EggGroupDTO | null>;
  public eggGroupByNameLoader: DataLoader<string, EggGroupDTO | null>;
  public growthRateByIdLoader: DataLoader<number, GrowthRateDTO | null>;
  public growthRateByNameLoader: DataLoader<string, GrowthRateDTO | null>;
  public genderByIdLoader: DataLoader<number, GenderDTO | null>;
  public genderByNameLoader: DataLoader<string, GenderDTO | null>;
  public pokemonColorByIdLoader: DataLoader<number, PokemonColorDTO | null>;
  public pokemonColorByNameLoader: DataLoader<string, PokemonColorDTO | null>;
  public pokemonShapeByIdLoader: DataLoader<number, PokemonShapeDTO | null>;
  public pokemonShapeByNameLoader: DataLoader<string, PokemonShapeDTO | null>;
  public pokemonHabitatByIdLoader: DataLoader<number, PokemonHabitatDTO | null>;
  public pokemonHabitatByNameLoader: DataLoader<string, PokemonHabitatDTO | null>;

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

    // Initialize DataLoader for Egg Group by ID
    this.eggGroupByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchEggGroupById(id)));
    });

    // Initialize DataLoader for Egg Group by name
    this.eggGroupByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchEggGroupByName(name)));
    });

    // Initialize DataLoader for Growth Rate by ID
    this.growthRateByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchGrowthRateById(id)));
    });

    // Initialize DataLoader for Growth Rate by name
    this.growthRateByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchGrowthRateByName(name)));
    });

    // Initialize DataLoader for Gender by ID
    this.genderByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchGenderById(id)));
    });

    // Initialize DataLoader for Gender by name
    this.genderByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchGenderByName(name)));
    });

    // Initialize DataLoader for Pokemon Color by ID
    this.pokemonColorByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchPokemonColorById(id)));
    });

    // Initialize DataLoader for Pokemon Color by name
    this.pokemonColorByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchPokemonColorByName(name)));
    });

    // Initialize DataLoader for Pokemon Shape by ID
    this.pokemonShapeByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchPokemonShapeById(id)));
    });

    // Initialize DataLoader for Pokemon Shape by name
    this.pokemonShapeByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchPokemonShapeByName(name)));
    });

    // Initialize DataLoader for Pokemon Habitat by ID
    this.pokemonHabitatByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchPokemonHabitatById(id)));
    });

    // Initialize DataLoader for Pokemon Habitat by name
    this.pokemonHabitatByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchPokemonHabitatByName(name)));
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

  /**
   * Get an Egg Group by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEggGroupById(id: number): Promise<EggGroupDTO | null> {
    return this.eggGroupByIdLoader.load(id);
  }

  /**
   * Get an Egg Group by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEggGroupByName(name: string): Promise<EggGroupDTO | null> {
    return this.eggGroupByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Egg Groups.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getEggGroupList(limit: number, offset: number): Promise<EggGroupListResponse> {
    const cacheKey = `list:egg-group:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<EggGroupListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/egg-group?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<EggGroupListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Egg Group list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Egg Group by ID with caching.
   */
  private async fetchEggGroupById(id: number): Promise<EggGroupDTO | null> {
    const cacheKey = `egg-group:${id}`;

    // Check cache first
    const cached = this.cache.get<EggGroupDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/egg-group/${id}`;
    const eggGroup = await this.fetch<EggGroupDTO>(url);

    // Store in cache if found
    if (eggGroup) {
      this.cache.set(cacheKey, eggGroup);
    }

    return eggGroup;
  }

  /**
   * Private method to fetch Egg Group by name with caching.
   */
  private async fetchEggGroupByName(name: string): Promise<EggGroupDTO | null> {
    const cacheKey = `egg-group:name:${name}`;

    // Check cache first
    const cached = this.cache.get<EggGroupDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/egg-group/${name}`;
    const eggGroup = await this.fetch<EggGroupDTO>(url);

    // Store in cache if found
    if (eggGroup) {
      this.cache.set(cacheKey, eggGroup);
      // Also cache by ID for consistency
      this.cache.set(`egg-group:${eggGroup.id}`, eggGroup);
    }

    return eggGroup;
  }

  /**
   * Get a Growth Rate by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getGrowthRateById(id: number): Promise<GrowthRateDTO | null> {
    return this.growthRateByIdLoader.load(id);
  }

  /**
   * Get a Growth Rate by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getGrowthRateByName(name: string): Promise<GrowthRateDTO | null> {
    return this.growthRateByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Growth Rates.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getGrowthRateList(limit: number, offset: number): Promise<GrowthRateListResponse> {
    const cacheKey = `list:growth-rate:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<GrowthRateListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/growth-rate?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<GrowthRateListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Growth Rate list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Growth Rate by ID with caching.
   */
  private async fetchGrowthRateById(id: number): Promise<GrowthRateDTO | null> {
    const cacheKey = `growth-rate:${id}`;

    // Check cache first
    const cached = this.cache.get<GrowthRateDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/growth-rate/${id}`;
    const growthRate = await this.fetch<GrowthRateDTO>(url);

    // Store in cache if found
    if (growthRate) {
      this.cache.set(cacheKey, growthRate);
    }

    return growthRate;
  }

  /**
   * Private method to fetch Growth Rate by name with caching.
   */
  private async fetchGrowthRateByName(name: string): Promise<GrowthRateDTO | null> {
    const cacheKey = `growth-rate:name:${name}`;

    // Check cache first
    const cached = this.cache.get<GrowthRateDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/growth-rate/${name}`;
    const growthRate = await this.fetch<GrowthRateDTO>(url);

    // Store in cache if found
    if (growthRate) {
      this.cache.set(cacheKey, growthRate);
      // Also cache by ID for consistency
      this.cache.set(`growth-rate:${growthRate.id}`, growthRate);
    }

    return growthRate;
  }

  /**
   * Get a Gender by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getGenderById(id: number): Promise<GenderDTO | null> {
    return this.genderByIdLoader.load(id);
  }

  /**
   * Get a Gender by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getGenderByName(name: string): Promise<GenderDTO | null> {
    return this.genderByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Genders.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getGenderList(limit: number, offset: number): Promise<GenderListResponse> {
    const cacheKey = `list:gender:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<GenderListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/gender?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<GenderListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Gender list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Gender by ID with caching.
   */
  private async fetchGenderById(id: number): Promise<GenderDTO | null> {
    const cacheKey = `gender:${id}`;

    // Check cache first
    const cached = this.cache.get<GenderDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/gender/${id}`;
    const gender = await this.fetch<GenderDTO>(url);

    // Store in cache if found
    if (gender) {
      this.cache.set(cacheKey, gender);
    }

    return gender;
  }

  /**
   * Private method to fetch Gender by name with caching.
   */
  private async fetchGenderByName(name: string): Promise<GenderDTO | null> {
    const cacheKey = `gender:name:${name}`;

    // Check cache first
    const cached = this.cache.get<GenderDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/gender/${name}`;
    const gender = await this.fetch<GenderDTO>(url);

    // Store in cache if found
    if (gender) {
      this.cache.set(cacheKey, gender);
      // Also cache by ID for consistency
      this.cache.set(`gender:${gender.id}`, gender);
    }

    return gender;
  }

  /**
   * Get a Pokemon Color by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonColorById(id: number): Promise<PokemonColorDTO | null> {
    return this.pokemonColorByIdLoader.load(id);
  }

  /**
   * Get a Pokemon Color by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonColorByName(name: string): Promise<PokemonColorDTO | null> {
    return this.pokemonColorByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Pokemon Colors.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getPokemonColorList(limit: number, offset: number): Promise<PokemonColorListResponse> {
    const cacheKey = `list:pokemon-color:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<PokemonColorListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-color?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonColorListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Pokemon Color list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Pokemon Color by ID with caching.
   */
  private async fetchPokemonColorById(id: number): Promise<PokemonColorDTO | null> {
    const cacheKey = `pokemon-color:${id}`;

    // Check cache first
    const cached = this.cache.get<PokemonColorDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-color/${id}`;
    const pokemonColor = await this.fetch<PokemonColorDTO>(url);

    // Store in cache if found
    if (pokemonColor) {
      this.cache.set(cacheKey, pokemonColor);
    }

    return pokemonColor;
  }

  /**
   * Private method to fetch Pokemon Color by name with caching.
   */
  private async fetchPokemonColorByName(name: string): Promise<PokemonColorDTO | null> {
    const cacheKey = `pokemon-color:name:${name}`;

    // Check cache first
    const cached = this.cache.get<PokemonColorDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-color/${name}`;
    const pokemonColor = await this.fetch<PokemonColorDTO>(url);

    // Store in cache if found
    if (pokemonColor) {
      this.cache.set(cacheKey, pokemonColor);
      // Also cache by ID for consistency
      this.cache.set(`pokemon-color:${pokemonColor.id}`, pokemonColor);
    }

    return pokemonColor;
  }

  /**
   * Get a Pokemon Shape by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonShapeById(id: number): Promise<PokemonShapeDTO | null> {
    return this.pokemonShapeByIdLoader.load(id);
  }

  /**
   * Get a Pokemon Shape by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonShapeByName(name: string): Promise<PokemonShapeDTO | null> {
    return this.pokemonShapeByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Pokemon Shapes.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getPokemonShapeList(limit: number, offset: number): Promise<PokemonShapeListResponse> {
    const cacheKey = `list:pokemon-shape:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<PokemonShapeListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-shape?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonShapeListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Pokemon Shape list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Pokemon Shape by ID with caching.
   */
  private async fetchPokemonShapeById(id: number): Promise<PokemonShapeDTO | null> {
    const cacheKey = `pokemon-shape:${id}`;

    // Check cache first
    const cached = this.cache.get<PokemonShapeDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-shape/${id}`;
    const pokemonShape = await this.fetch<PokemonShapeDTO>(url);

    // Store in cache if found
    if (pokemonShape) {
      this.cache.set(cacheKey, pokemonShape);
    }

    return pokemonShape;
  }

  /**
   * Private method to fetch Pokemon Shape by name with caching.
   */
  private async fetchPokemonShapeByName(name: string): Promise<PokemonShapeDTO | null> {
    const cacheKey = `pokemon-shape:name:${name}`;

    // Check cache first
    const cached = this.cache.get<PokemonShapeDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-shape/${name}`;
    const pokemonShape = await this.fetch<PokemonShapeDTO>(url);

    // Store in cache if found
    if (pokemonShape) {
      this.cache.set(cacheKey, pokemonShape);
      // Also cache by ID for consistency
      this.cache.set(`pokemon-shape:${pokemonShape.id}`, pokemonShape);
    }

    return pokemonShape;
  }

  /**
   * Get a Pokemon Habitat by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonHabitatById(id: number): Promise<PokemonHabitatDTO | null> {
    return this.pokemonHabitatByIdLoader.load(id);
  }

  /**
   * Get a Pokemon Habitat by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPokemonHabitatByName(name: string): Promise<PokemonHabitatDTO | null> {
    return this.pokemonHabitatByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Pokemon Habitats.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getPokemonHabitatList(limit: number, offset: number): Promise<PokemonHabitatListResponse> {
    const cacheKey = `list:pokemon-habitat:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<PokemonHabitatListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-habitat?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonHabitatListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Pokemon Habitat list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Pokemon Habitat by ID with caching.
   */
  private async fetchPokemonHabitatById(id: number): Promise<PokemonHabitatDTO | null> {
    const cacheKey = `pokemon-habitat:${id}`;

    // Check cache first
    const cached = this.cache.get<PokemonHabitatDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-habitat/${id}`;
    const pokemonHabitat = await this.fetch<PokemonHabitatDTO>(url);

    // Store in cache if found
    if (pokemonHabitat) {
      this.cache.set(cacheKey, pokemonHabitat);
    }

    return pokemonHabitat;
  }

  /**
   * Private method to fetch Pokemon Habitat by name with caching.
   */
  private async fetchPokemonHabitatByName(name: string): Promise<PokemonHabitatDTO | null> {
    const cacheKey = `pokemon-habitat:name:${name}`;

    // Check cache first
    const cached = this.cache.get<PokemonHabitatDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/pokemon-habitat/${name}`;
    const pokemonHabitat = await this.fetch<PokemonHabitatDTO>(url);

    // Store in cache if found
    if (pokemonHabitat) {
      this.cache.set(cacheKey, pokemonHabitat);
      // Also cache by ID for consistency
      this.cache.set(`pokemon-habitat:${pokemonHabitat.id}`, pokemonHabitat);
    }

    return pokemonHabitat;
  }
}
