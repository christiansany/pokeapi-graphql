import NodeCache from 'node-cache';

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
}

// PokemonListResponse interface for paginated list endpoint
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

export class PokeAPIDataSource {
  private baseURL: string;
  private cache: NodeCache;
  private pokemonTTL: number;
  private listTTL: number;

  constructor(config: {
    baseURL: string;
    pokemonTTL?: number;
    listTTL?: number;
    maxCacheSize?: number;
  }) {
    this.baseURL = config.baseURL;
    this.pokemonTTL = config.pokemonTTL || 3600; // 1 hour default
    this.listTTL = config.listTTL || 300; // 5 minutes default
    
    this.cache = new NodeCache({
      stdTTL: this.pokemonTTL,
      checkperiod: 600,
      maxKeys: config.maxCacheSize || 1000,
      useClones: false
    });
  }

  private async fetch<T>(url: string): Promise<T | null> {
    try {
      const response = await fetch(url);
      
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`PokéAPI request failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as T;
    } catch (error) {
      if (error instanceof Error && error.message.includes('fetch')) {
        throw new Error(`Network error: Unable to reach PokéAPI - ${error.message}`);
      }
      throw error;
    }
  }

  async getPokemonById(id: number): Promise<PokemonDTO | null> {
    const cacheKey = `pokemon:${id}`;
    
    // Check cache first
    const cached = this.cache.get<PokemonDTO>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Fetch from PokéAPI
    const url = `${this.baseURL}/pokemon/${id}`;
    const pokemon = await this.fetch<PokemonDTO>(url);
    
    // Store in cache if found
    if (pokemon) {
      this.cache.set(cacheKey, pokemon, this.pokemonTTL);
    }
    
    return pokemon;
  }

  async getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
    const cacheKey = `list:${limit}:${offset}`;
    
    // Check cache first
    const cached = this.cache.get<PokemonListResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Fetch from PokéAPI
    const url = `${this.baseURL}/pokemon?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<PokemonListResponse>(url);
    
    if (!list) {
      throw new Error('Failed to fetch Pokemon list from PokéAPI');
    }
    
    // Store in cache
    this.cache.set(cacheKey, list, this.listTTL);
    
    return list;
  }
}
