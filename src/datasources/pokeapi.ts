import NodeCache from "node-cache";
import DataLoader from "dataloader";

// Ability-related interfaces
export interface AbilityReferenceDTO {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface EffectEntryDTO {
  effect: string;
  short_effect: string;
  language: {
    name: string;
    url: string;
  };
}

export interface FlavorTextEntryDTO {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface AbilityDTO {
  id: number;
  name: string;
  effect_entries: EffectEntryDTO[];
  flavor_text_entries: FlavorTextEntryDTO[];
}

// PokemonDTO interface matching PokéAPI response structure
export interface PokemonDTO {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  sprites: {
    front_default: string | null;
  };
  abilities: AbilityReferenceDTO[];
}

// PokemonListResponse interface for paginated list endpoint
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

const cache = new NodeCache({
  stdTTL: 0,
  checkperiod: 6000,
  maxKeys: 5000,
  useClones: false,
});

export class PokeAPIDataSource {
  private baseURL: string;
  public abilityLoader: DataLoader<string, AbilityDTO | null>;

  constructor(config: { baseURL: string }) {
    this.baseURL = config.baseURL;

    // Initialize DataLoader with batching logic
    this.abilityLoader = new DataLoader<string, AbilityDTO | null>(
      async (names: readonly string[]) => {
        // Fetch all abilities in parallel
        const abilities = await Promise.all(names.map((name) => this.getAbilityByName(name)));
        return abilities;
      },
      {
        // Cache results within the same request
        cache: true,
      }
    );
  }

  private async fetch<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (response.status === 404 || !response.ok) {
        throw new Error(`PokéAPI request failed: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error && error.message.includes("fetch")) {
        throw new Error(`Network error: Unable to reach PokéAPI - ${error.message}`);
      }
      throw error;
    }
  }

  async getPokemonById(id: number): Promise<PokemonDTO> {
    const cacheKey = `pokemon:${id}`;

    // Check cache first
    const cached = cache.get<PokemonDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokéAPI
    const url = `${this.baseURL}/pokemon/${id}`;
    const pokemon = await this.fetch<PokemonDTO>(url);

    // Store in cache if found
    if (pokemon) {
      cache.set(cacheKey, pokemon);
    }

    return pokemon;
  }

  async getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
    const cacheKey = `list:${limit}:${offset}`;

    // Check cache first
    const cached = cache.get<PokemonListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokéAPI
    const url = `${this.baseURL}/pokemon?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Pokemon list from PokéAPI");
    }

    // Store in cache
    cache.set(cacheKey, list);

    return list;
  }

  async getAbilityByName(name: string): Promise<AbilityDTO | null> {
    const cacheKey = `ability:${name}`;

    // Check cache first
    const cached = cache.get<AbilityDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Fetch from PokéAPI
      const url = `${this.baseURL}/ability/${name}`;
      const ability = await this.fetch<AbilityDTO>(url);

      // Store in cache if found
      if (ability) {
        cache.set(cacheKey, ability);
      }

      return ability;
    } catch (error) {
      // Handle 404 responses by returning null
      if (error instanceof Error && error.message.includes("404")) {
        console.warn(`Ability not found: ${name}`);
        return null;
      }
      // Re-throw network errors
      throw error;
    }
  }

  async getAbilityById(id: number): Promise<AbilityDTO | null> {
    const cacheKey = `ability:id:${id}`;

    // Check cache first
    const cached = cache.get<AbilityDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Fetch from PokéAPI
      const url = `${this.baseURL}/ability/${id}`;
      const ability = await this.fetch<AbilityDTO>(url);

      // Store in cache if found
      if (ability) {
        cache.set(cacheKey, ability);
        // Also cache by name for consistency
        cache.set(`ability:${ability.name}`, ability);
      }

      return ability;
    } catch (error) {
      // Handle 404 responses by returning null
      if (error instanceof Error && error.message.includes("404")) {
        console.warn(`Ability not found with ID: ${id}`);
        return null;
      }
      // Re-throw network errors
      throw error;
    }
  }
}
