/**
 * Common DTO interfaces shared across all PokeAPI resources.
 * These types match the PokeAPI v2 response structures.
 *
 * IMPORTANT: All DTOs use the "DTO" suffix to avoid naming conflicts
 * with generated GraphQL types from the schema.
 */

/**
 * A reference to a named API resource (has both name and URL).
 */
export interface NamedAPIResourceDTO {
  name: string;
  url: string;
}

/**
 * A reference to an API resource (has only URL, no name).
 */
export interface APIResourceDTO {
  url: string;
}

/**
 * Paginated list response for named resources.
 */
export interface NamedAPIResourceListDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Paginated list response for unnamed resources.
 */
export interface APIResourceListDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: APIResourceDTO[];
}

/**
 * Localized name with language reference.
 */
export interface NameDTO {
  name: string;
  language: NamedAPIResourceDTO;
}

/**
 * Effect entry with effect text and language.
 */
export interface EffectEntryDTO {
  effect: string;
  short_effect: string;
  language: NamedAPIResourceDTO;
}

/**
 * Flavor text entry with text, language, and version.
 */
export interface FlavorTextEntryDTO {
  flavor_text: string;
  language: NamedAPIResourceDTO;
  version?: NamedAPIResourceDTO;
  version_group?: NamedAPIResourceDTO;
}

/**
 * Game index entry linking resource to game version.
 */
export interface GameIndexDTO {
  game_index: number;
  version: NamedAPIResourceDTO;
}

/**
 * Description entry with description text and language.
 */
export interface DescriptionDTO {
  description: string;
  language: NamedAPIResourceDTO;
}

/**
 * Version encounter detail.
 */
export interface VersionEncounterDetailDTO {
  version: NamedAPIResourceDTO;
  max_chance: number;
  encounter_details: EncounterDetailDTO[];
}

/**
 * Encounter detail with method, chance, and conditions.
 */
export interface EncounterDetailDTO {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResourceDTO[];
  chance: number;
  method: NamedAPIResourceDTO;
}

/**
 * Sprite URLs for different game versions and forms.
 */
export interface SpritesDTO {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  [key: string]: string | null | SpritesDTO;
}
