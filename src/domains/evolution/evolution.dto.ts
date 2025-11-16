import type { NamedAPIResourceDTO, NameDTO } from "../base/common.dto.js";

/**
 * Evolution Detail DTO
 * Represents the conditions required for a Pokémon to evolve
 */
export interface EvolutionDetailDTO {
  /** The item required to cause evolution */
  item: NamedAPIResourceDTO | null;
  /** The type of event that triggers evolution */
  trigger: NamedAPIResourceDTO;
  /** The id of the gender of the evolving Pokémon species must be in order to evolve */
  gender: number | null;
  /** The item the evolving Pokémon species must be holding */
  held_item: NamedAPIResourceDTO | null;
  /** The move that must be known by the evolving Pokémon species */
  known_move: NamedAPIResourceDTO | null;
  /** The evolving Pokémon species must know a move with this type */
  known_move_type: NamedAPIResourceDTO | null;
  /** The location the evolution must be triggered at */
  location: NamedAPIResourceDTO | null;
  /** The minimum required level of the evolving Pokémon species */
  min_level: number | null;
  /** The minimum required level of happiness */
  min_happiness: number | null;
  /** The minimum required level of beauty */
  min_beauty: number | null;
  /** The minimum required level of affection */
  min_affection: number | null;
  /** Whether or not it must be raining in the overworld */
  needs_overworld_rain: boolean;
  /** The Pokémon species that must be in the players party */
  party_species: NamedAPIResourceDTO | null;
  /** The player must have a Pokémon of this type in their party */
  party_type: NamedAPIResourceDTO | null;
  /** The required relation between the Pokémon's Attack and Defense stats */
  relative_physical_stats: number | null;
  /** The required time of day. Day or night */
  time_of_day: string;
  /** Pokémon species for which this one must be traded */
  trade_species: NamedAPIResourceDTO | null;
  /** Whether or not the 3DS needs to be turned upside-down */
  turn_upside_down: boolean;
}

/**
 * Chain Link DTO
 * Represents a link in the evolution chain
 */
export interface ChainLinkDTO {
  /** Whether or not this link is for a baby Pokémon */
  is_baby: boolean;
  /** The Pokémon species at this point in the evolution chain */
  species: NamedAPIResourceDTO;
  /** All details regarding the specific details of the referenced Pokémon species evolution */
  evolution_details: EvolutionDetailDTO[] | null;
  /** A List of chain objects */
  evolves_to: ChainLinkDTO[];
}

/**
 * Evolution Chain DTO
 * GET /api/v2/evolution-chain/{id}
 */
export interface EvolutionChainDTO {
  /** The identifier for this resource */
  id: number;
  /** The item that a Pokémon would be holding when mating */
  baby_trigger_item: NamedAPIResourceDTO | null;
  /** The base chain link object */
  chain: ChainLinkDTO;
}

/**
 * Evolution Trigger DTO
 * GET /api/v2/evolution-trigger/{id or name}
 */
export interface EvolutionTriggerDTO {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: NameDTO[];
  /** A list of pokemon species that result from this evolution trigger */
  pokemon_species: NamedAPIResourceDTO[];
}
