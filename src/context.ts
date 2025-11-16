import { PokeAPIDataSource } from "./datasources/pokeapi.js";
import { PokemonDataSource } from "./domains/pokemon/PokemonDataSource.js";
import { AbilityDataSource } from "./domains/ability/AbilityDataSource.js";
import { StatDataSource } from "./domains/stat/StatDataSource.js";
import { TypeDataSource } from "./domains/type/TypeDataSource.js";
import { MoveDataSource } from "./domains/move/MoveDataSource.js";
import { ItemDataSource } from "./domains/item/ItemDataSource.js";
import { LocationDataSource } from "./domains/location/LocationDataSource.js";

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
    stat: StatDataSource;
    type: TypeDataSource;
    move: MoveDataSource;
    item: ItemDataSource;
    location: LocationDataSource;
    // Future domain-specific DataSources will be added here:
    // evolution: EvolutionDataSource;
    // berry: BerryDataSource;
    // game: GameDataSource;
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
      stat: new StatDataSource(config),
      type: new TypeDataSource(config),
      move: new MoveDataSource(config),
      item: new ItemDataSource(config),
      location: new LocationDataSource(config),
      // Future domain-specific DataSources will be initialized here
    },
  };
}
