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
