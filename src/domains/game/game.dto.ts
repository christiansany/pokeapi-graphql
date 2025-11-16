import type { NamedAPIResourceDTO, NameDTO } from "../base/common.dto.js";

/**
 * Pokedex entry for a Pokemon species.
 */
export interface PokemonEntryDTO {
  entry_number: number;
  pokemon_species: NamedAPIResourceDTO;
}

/**
 * Pokedex DTO matching PokeAPI response structure.
 * Represents a Pokedex in the Pokemon games.
 */
export interface PokedexDTO {
  id: number;
  name: string;
  is_main_series: boolean;
  descriptions: {
    description: string;
    language: NamedAPIResourceDTO;
  }[];
  names: NameDTO[];
  pokemon_entries: PokemonEntryDTO[];
  region: NamedAPIResourceDTO | null;
  version_groups: NamedAPIResourceDTO[];
}

/**
 * Generation DTO matching PokeAPI response structure.
 * Represents a generation of Pokemon games.
 */
export interface GenerationDTO {
  id: number;
  name: string;
  abilities: NamedAPIResourceDTO[];
  main_region: NamedAPIResourceDTO;
  moves: NamedAPIResourceDTO[];
  names: NameDTO[];
  pokemon_species: NamedAPIResourceDTO[];
  types: NamedAPIResourceDTO[];
  version_groups: NamedAPIResourceDTO[];
}

/**
 * Version DTO matching PokeAPI response structure.
 * Represents a specific game version.
 */
export interface VersionDTO {
  id: number;
  name: string;
  names: NameDTO[];
  version_group: NamedAPIResourceDTO;
}

/**
 * Version Group DTO matching PokeAPI response structure.
 * Represents a group of game versions.
 */
export interface VersionGroupDTO {
  id: number;
  name: string;
  order: number;
  generation: NamedAPIResourceDTO;
  move_learn_methods: NamedAPIResourceDTO[];
  pokedexes: NamedAPIResourceDTO[];
  regions: NamedAPIResourceDTO[];
  versions: NamedAPIResourceDTO[];
}
