import type { NamedAPIResourceDTO } from "../base/common.dto.js";

/**
 * Stat DTO matching PokeAPI response structure.
 * Represents a stat that Pokemon can have (HP, Attack, Defense, etc.).
 */
export interface StatDTO {
  id: number;
  name: string;
  game_index: number;
  is_battle_only: boolean;
  affecting_moves: MoveStatAffectSetsDTO;
  affecting_natures: NatureStatAffectSetsDTO;
  characteristics: NamedAPIResourceDTO[];
  move_damage_class: NamedAPIResourceDTO | null;
  names: NameDTO[];
}

/**
 * Localized name for a stat.
 */
export interface NameDTO {
  name: string;
  language: NamedAPIResourceDTO;
}

/**
 * Sets of moves that affect a stat.
 */
export interface MoveStatAffectSetsDTO {
  increase: MoveStatAffectDTO[];
  decrease: MoveStatAffectDTO[];
}

/**
 * A move that affects a stat.
 */
export interface MoveStatAffectDTO {
  change: number;
  move: NamedAPIResourceDTO;
}

/**
 * Sets of natures that affect a stat.
 */
export interface NatureStatAffectSetsDTO {
  increase: NamedAPIResourceDTO[];
  decrease: NamedAPIResourceDTO[];
}

/**
 * Response structure for paginated Stat list endpoint.
 */
export interface StatListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Characteristic DTO matching PokeAPI response structure.
 * Represents a characteristic that is determined by a Pokemon's highest stat.
 */
export interface CharacteristicDTO {
  id: number;
  gene_modulo: number;
  possible_values: number[];
  highest_stat: NamedAPIResourceDTO;
  descriptions: DescriptionDTO[];
}

/**
 * Localized description for a characteristic.
 */
export interface DescriptionDTO {
  description: string;
  language: NamedAPIResourceDTO;
}

/**
 * Response structure for paginated Characteristic list endpoint.
 */
export interface CharacteristicListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { url: string }[];
}

/**
 * Nature DTO matching PokeAPI response structure.
 * Represents a nature that affects Pokemon stats and preferences.
 */
export interface NatureDTO {
  id: number;
  name: string;
  decreased_stat: NamedAPIResourceDTO | null;
  increased_stat: NamedAPIResourceDTO | null;
  hates_flavor: NamedAPIResourceDTO | null;
  likes_flavor: NamedAPIResourceDTO | null;
  pokeathlon_stat_changes: PokeathlonStatChangeDTO[];
  move_battle_style_preferences: MoveBattleStylePreferenceDTO[];
  names: NameDTO[];
}

/**
 * Pokeathlon stat change caused by a nature.
 */
export interface PokeathlonStatChangeDTO {
  max_change: number;
  pokeathlon_stat: NamedAPIResourceDTO;
}

/**
 * Move battle style preference for a nature.
 */
export interface MoveBattleStylePreferenceDTO {
  low_hp_preference: number;
  high_hp_preference: number;
  move_battle_style: NamedAPIResourceDTO;
}

/**
 * Response structure for paginated Nature list endpoint.
 */
export interface NatureListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}
