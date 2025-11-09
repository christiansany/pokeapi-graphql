import type {
  NamedAPIResourceDTO,
  EffectEntryDTO,
  FlavorTextEntryDTO,
  NameDTO,
  DescriptionDTO,
} from "../base/common.dto.js";

/**
 * Move DTO matching PokeAPI response structure.
 * Represents a move that Pokemon can learn and use in battle.
 */
export interface MoveDTO {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  contest_combos: ContestCombosDTO | null;
  contest_type: NamedAPIResourceDTO | null;
  contest_effect: NamedAPIResourceDTO | null;
  damage_class: NamedAPIResourceDTO;
  effect_entries: EffectEntryDTO[];
  effect_changes: EffectChangeDTO[];
  learned_by_pokemon: NamedAPIResourceDTO[];
  flavor_text_entries: FlavorTextEntryDTO[];
  generation: NamedAPIResourceDTO;
  machines: MachineVersionDetailDTO[];
  meta: MoveMetaDTO | null;
  names: NameDTO[];
  past_values: PastMoveStatValuesDTO[];
  stat_changes: MoveStatChangeDTO[];
  super_contest_effect: NamedAPIResourceDTO | null;
  target: NamedAPIResourceDTO;
  type: NamedAPIResourceDTO;
}

/**
 * Contest combo information for a move.
 */
export interface ContestCombosDTO {
  normal: ContestComboDetailDTO | null;
  super: ContestComboDetailDTO | null;
}

/**
 * Contest combo detail with use before/after moves.
 */
export interface ContestComboDetailDTO {
  use_before: NamedAPIResourceDTO[] | null;
  use_after: NamedAPIResourceDTO[] | null;
}

/**
 * Effect change for a move in a specific version group.
 */
export interface EffectChangeDTO {
  effect_entries: EffectEntryDTO[];
  version_group: NamedAPIResourceDTO;
}

/**
 * Machine version detail linking move to TM/HM.
 */
export interface MachineVersionDetailDTO {
  machine: NamedAPIResourceDTO;
  version_group: NamedAPIResourceDTO;
}

/**
 * Move metadata including ailment, category, and other battle mechanics.
 */
export interface MoveMetaDTO {
  ailment: NamedAPIResourceDTO;
  category: NamedAPIResourceDTO;
  min_hits: number | null;
  max_hits: number | null;
  min_turns: number | null;
  max_turns: number | null;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number;
  flinch_chance: number;
  stat_chance: number;
}

/**
 * Past stat values for a move in older game versions.
 */
export interface PastMoveStatValuesDTO {
  accuracy: number | null;
  effect_chance: number | null;
  power: number | null;
  pp: number | null;
  effect_entries: EffectEntryDTO[];
  type: NamedAPIResourceDTO | null;
  version_group: NamedAPIResourceDTO;
}

/**
 * Stat change caused by a move.
 */
export interface MoveStatChangeDTO {
  change: number;
  stat: NamedAPIResourceDTO;
}

/**
 * Response structure for paginated Move list endpoint.
 */
export interface MoveListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Move Ailment DTO matching PokeAPI response structure.
 * Represents a status ailment that a move can inflict.
 */
export interface MoveAilmentDTO {
  id: number;
  name: string;
  moves: NamedAPIResourceDTO[];
  names: NameDTO[];
}

/**
 * Move Damage Class DTO matching PokeAPI response structure.
 * Represents the type of damage a move inflicts (physical, special, or status).
 */
export interface MoveDamageClassDTO {
  id: number;
  name: string;
  descriptions: DescriptionDTO[];
  moves: NamedAPIResourceDTO[];
  names: NameDTO[];
}

/**
 * Move Category DTO matching PokeAPI response structure.
 * Represents the category of move (damage, ailment, net-good-stats, etc.).
 */
export interface MoveCategoryDTO {
  id: number;
  name: string;
  descriptions: DescriptionDTO[];
  moves: NamedAPIResourceDTO[];
}

/**
 * Move Target DTO matching PokeAPI response structure.
 * Represents the target of a move (specific-move, selected-pokemon, etc.).
 */
export interface MoveTargetDTO {
  id: number;
  name: string;
  descriptions: DescriptionDTO[];
  moves: NamedAPIResourceDTO[];
  names: NameDTO[];
}

/**
 * Response structure for paginated MoveAilment list endpoint.
 */
export interface MoveAilmentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Response structure for paginated MoveDamageClass list endpoint.
 */
export interface MoveDamageClassListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Response structure for paginated MoveCategory list endpoint.
 */
export interface MoveCategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Response structure for paginated MoveTarget list endpoint.
 */
export interface MoveTargetListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}
