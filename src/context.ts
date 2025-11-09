import { PokeAPIDataSource } from "./datasources/pokeapi.js";

/**
 * GraphQL context interface.
 * Contains all DataSource instances for accessing PokeAPI data.
 *
 * Note: As new domain-specific DataSources are added, they will be included here.
 * For now, we maintain the existing pokeapi DataSource for backward compatibility.
 */
export interface Context {
  dataSources: {
    pokeapi: PokeAPIDataSource;
    // Future domain-specific DataSources will be added here:
    // pokemon: PokemonDataSource;
    // ability: AbilityDataSource;
    // move: MoveDataSource;
    // type: TypeDataSource;
    // item: ItemDataSource;
    // location: LocationDataSource;
    // evolution: EvolutionDataSource;
    // berry: BerryDataSource;
    // game: GameDataSource;
    // stat: StatDataSource;
    // contest: ContestDataSource;
    // encounter: EncounterDataSource;
    // machine: MachineDataSource;
  };
}

/**
 * Creates a new context for each GraphQL request.
 * Initializes all DataSource instances with shared configuration.
 */
export function createContext(): Context {
  const baseURL = process.env.POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";

  return {
    dataSources: {
      pokeapi: new PokeAPIDataSource({
        baseURL,
      }),
      // Future domain-specific DataSources will be initialized here
    },
  };
}
