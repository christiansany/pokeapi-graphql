import { PokeAPIDataSource } from './datasources/pokeapi.ts';

export interface Context {
  dataSources: {
    pokeapi: PokeAPIDataSource;
  };
}

export function createContext(): Context {
  const baseURL = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';
  const pokemonTTL = parseInt(process.env.CACHE_TTL_POKEMON || '3600', 10);
  const listTTL = parseInt(process.env.CACHE_TTL_LIST || '300', 10);
  const maxCacheSize = parseInt(process.env.CACHE_MAX_SIZE || '1000', 10);

  return {
    dataSources: {
      pokeapi: new PokeAPIDataSource({
        baseURL,
        pokemonTTL,
        listTTL,
        maxCacheSize,
      }),
    },
  };
}
