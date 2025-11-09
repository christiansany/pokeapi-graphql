import { PokeAPIDataSource } from "./datasources/pokeapi.js";
import { PokemonDataSource } from "./domains/pokemon/PokemonDataSource.js";
import { AbilityDataSource } from "./domains/ability/AbilityDataSource.js";

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
    pokemon: PokemonDataSource;
    ability: AbilityDataSource;
    // Future domain-specific DataSources will be added here:
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
  const config = { baseURL };

  return {
    dataSources: {
      pokeapi: new PokeAPIDataSource(config),
      pokemon: new PokemonDataSource(config),
      ability: new AbilityDataSource(config),
      // Future domain-specific DataSources will be initialized here
    },
  };
}
