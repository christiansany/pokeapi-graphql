import type { NamedAPIResourceDTO } from "../base/common.dto.js";

/**
 * Effect entry describing an ability's effect.
 */
export interface EffectEntryDTO {
  effect: string;
  short_effect: string;
  language: NamedAPIResourceDTO;
}

/**
 * Flavor text for an ability from a specific game version.
 */
export interface FlavorTextEntryDTO {
  flavor_text: string;
  language: NamedAPIResourceDTO;
  version_group: NamedAPIResourceDTO;
}

/**
 * Ability DTO matching PokeAPI response structure.
 * Represents a Pokemon ability with its effects and descriptions.
 */
export interface AbilityDTO {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedAPIResourceDTO;
  effect_entries: EffectEntryDTO[];
  flavor_text_entries: FlavorTextEntryDTO[];
  pokemon: AbilityPokemonDTO[];
}

/**
 * Reference to a Pokemon that has this ability.
 */
export interface AbilityPokemonDTO {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedAPIResourceDTO;
}
