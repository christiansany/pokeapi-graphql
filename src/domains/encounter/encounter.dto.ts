import type { NamedAPIResourceDTO, NameDTO } from "../base/common.dto.js";

/**
 * Encounter Method DTO matching PokeAPI response structure.
 * Represents a method by which a Pokemon can be encountered in the wild.
 */
export interface EncounterMethodDTO {
  id: number;
  name: string;
  order: number;
  names: NameDTO[];
}

/**
 * Encounter Condition DTO matching PokeAPI response structure.
 * Represents a condition that affects Pokemon encounters.
 */
export interface EncounterConditionDTO {
  id: number;
  name: string;
  names: NameDTO[];
  values: NamedAPIResourceDTO[];
}

/**
 * Encounter Condition Value DTO matching PokeAPI response structure.
 * Represents a specific value for an encounter condition.
 */
export interface EncounterConditionValueDTO {
  id: number;
  name: string;
  condition: NamedAPIResourceDTO;
  names: NameDTO[];
}
