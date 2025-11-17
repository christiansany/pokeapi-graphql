import type {
  NamedAPIResourceDTO,
  NameDTO,
  EffectEntryDTO,
  FlavorTextEntryDTO,
} from "../base/common.dto.js";

/**
 * Contest Type DTO matching PokeAPI response structure.
 * Represents a type of Pokemon contest.
 */
export interface ContestTypeDTO {
  id: number;
  name: string;
  berry_flavor: NamedAPIResourceDTO;
  names: NameDTO[];
}

/**
 * Contest Effect DTO matching PokeAPI response structure.
 * Represents an effect that can occur during a Pokemon contest.
 */
export interface ContestEffectDTO {
  id: number;
  appeal: number;
  jam: number;
  effect_entries: EffectEntryDTO[];
  flavor_text_entries: FlavorTextEntryDTO[];
}

/**
 * Super Contest Effect DTO matching PokeAPI response structure.
 * Represents a super contest effect.
 */
export interface SuperContestEffectDTO {
  id: number;
  appeal: number;
  flavor_text_entries: FlavorTextEntryDTO[];
  moves: NamedAPIResourceDTO[];
}
