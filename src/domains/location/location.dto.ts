import type {
  NamedAPIResourceDTO,
  NameDTO,
  GameIndexDTO,
  VersionEncounterDetailDTO,
} from "../base/common.dto.js";

/**
 * Location DTO matching PokeAPI response structure.
 * Represents a location in the Pokemon world.
 */
export interface LocationDTO {
  id: number;
  name: string;
  region: NamedAPIResourceDTO;
  names: NameDTO[];
  game_indices: GameIndexDTO[];
  areas: NamedAPIResourceDTO[];
}

/**
 * Location Area DTO matching PokeAPI response structure.
 * Represents a specific area within a location.
 */
export interface LocationAreaDTO {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRateDTO[];
  location: NamedAPIResourceDTO;
  names: NameDTO[];
  pokemon_encounters: PokemonEncounterDTO[];
}

/**
 * Encounter method rate for a location area.
 */
export interface EncounterMethodRateDTO {
  encounter_method: NamedAPIResourceDTO;
  version_details: EncounterVersionDetailDTO[];
}

/**
 * Version-specific encounter rate.
 */
export interface EncounterVersionDetailDTO {
  rate: number;
  version: NamedAPIResourceDTO;
}

/**
 * Pokemon encounter in a location area.
 */
export interface PokemonEncounterDTO {
  pokemon: NamedAPIResourceDTO;
  version_details: VersionEncounterDetailDTO[];
}

/**
 * Region DTO matching PokeAPI response structure.
 * Represents a region in the Pokemon world.
 */
export interface RegionDTO {
  id: number;
  name: string;
  locations: NamedAPIResourceDTO[];
  names: NameDTO[];
  main_generation: NamedAPIResourceDTO;
  pokedexes: NamedAPIResourceDTO[];
  version_groups: NamedAPIResourceDTO[];
}

/**
 * Pal Park Area DTO matching PokeAPI response structure.
 * Represents an area in Pal Park where Pokemon can be found.
 */
export interface PalParkAreaDTO {
  id: number;
  name: string;
  names: NameDTO[];
  pokemon_encounters: PalParkEncounterDTO[];
}

/**
 * Pokemon encounter in Pal Park.
 */
export interface PalParkEncounterDTO {
  base_score: number;
  rate: number;
  pokemon_species: NamedAPIResourceDTO;
}
