import { PokeAPIDataSource } from "./datasources/pokeapi.js";

export interface Context {
  dataSources: {
    pokeapi: PokeAPIDataSource;
  };
}

export function createContext(): Context {
  const baseURL = process.env.POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";

  return {
    dataSources: {
      pokeapi: new PokeAPIDataSource({
        baseURL,
      }),
    },
  };
}
