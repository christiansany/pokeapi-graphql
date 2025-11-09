import type { NamedAPIResourceDTO, GameIndexDTO } from "../base/common.dto.js";

/**
 * Type DTO matching PokeAPI response structure.
 * Represents a Pokemon type (Fire, Water, Grass, etc.).
 */
export interface TypeDTO {
  id: number;
  name: string;
  damage_relations: DamageRelationsDTO;
  past_damage_relations: PastDamageRelationsDTO[];
  game_indices: GameIndexDTO[];
  generation: NamedAPIResourceDTO;
  move_damage_class: NamedAPIResourceDTO | null;
  names: NameDTO[];
  pokemon: TypePokemonDTO[];
  moves: NamedAPIResourceDTO[];
}

/**
 * Localized name for a type.
 */
export interface NameDTO {
  name: string;
  language: NamedAPIResourceDTO;
}

/**
 * Damage relations for a type.
 * Describes type effectiveness in battle.
 */
export interface DamageRelationsDTO {
  no_damage_to: NamedAPIResourceDTO[];
  half_damage_to: NamedAPIResourceDTO[];
  double_damage_to: NamedAPIResourceDTO[];
  no_damage_from: NamedAPIResourceDTO[];
  half_damage_from: NamedAPIResourceDTO[];
  double_damage_from: NamedAPIResourceDTO[];
}

/**
 * Past damage relations for a type in previous generations.
 */
export interface PastDamageRelationsDTO {
  generation: NamedAPIResourceDTO;
  damage_relations: DamageRelationsDTO;
}

/**
 * A Pokemon that has this type.
 */
export interface TypePokemonDTO {
  slot: number;
  pokemon: NamedAPIResourceDTO;
}

/**
 * Response structure for paginated Type list endpoint.
 */
export interface TypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}
