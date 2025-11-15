import type { NamedAPIResourceDTO } from "../base/common.dto.js";

/**
 * Pokemon DTO matching PokeAPI response structure.
 * Represents a single Pokemon with all its base data.
 */
export interface PokemonDTO {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  sprites: SpritesDTO;
  abilities: AbilityReferenceDTO[];
  forms: NamedAPIResourceDTO[];
  game_indices: GameIndexDTO[];
  held_items: HeldItemDTO[];
  location_area_encounters: string;
  moves: MoveReferenceDTO[];
  species: NamedAPIResourceDTO;
  stats: StatReferenceDTO[];
  types: TypeReferenceDTO[];
}

/**
 * Sprites for a Pokemon including all visual representations.
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
  other?: {
    dream_world?: {
      front_default: string | null;
      front_female: string | null;
    };
    home?: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork"?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions?: Record<string, Record<string, SpriteVersionDTO>>;
}

/**
 * Sprite version for a specific game version.
 */
export interface SpriteVersionDTO {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
}

/**
 * Reference to an ability with Pokemon-specific metadata.
 */
export interface AbilityReferenceDTO {
  ability: NamedAPIResourceDTO;
  is_hidden: boolean;
  slot: number;
}

/**
 * Reference to a stat with Pokemon-specific values.
 */
export interface StatReferenceDTO {
  stat: NamedAPIResourceDTO;
  base_stat: number;
  effort: number;
}

/**
 * Reference to a type with Pokemon-specific slot information.
 */
export interface TypeReferenceDTO {
  type: NamedAPIResourceDTO;
  slot: number;
}

/**
 * Reference to a move with version-specific learning details.
 */
export interface MoveReferenceDTO {
  move: NamedAPIResourceDTO;
  version_group_details: VersionGroupDetailDTO[];
}

/**
 * Details about how a Pokemon learns a move in a specific version.
 */
export interface VersionGroupDetailDTO {
  level_learned_at: number;
  move_learn_method: NamedAPIResourceDTO;
  version_group: NamedAPIResourceDTO;
}

/**
 * Game index for a Pokemon in a specific version.
 */
export interface GameIndexDTO {
  game_index: number;
  version: NamedAPIResourceDTO;
}

/**
 * Item held by a Pokemon with version-specific rarity.
 */
export interface HeldItemDTO {
  item: NamedAPIResourceDTO;
  version_details: HeldItemVersionDTO[];
}

/**
 * Version-specific details for a held item.
 */
export interface HeldItemVersionDTO {
  rarity: number;
  version: NamedAPIResourceDTO;
}

/**
 * Response structure for paginated Pokemon list endpoint.
 */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Pokemon Species DTO matching PokeAPI response structure.
 * Represents species-level data including evolution, habitat, and varieties.
 */
export interface PokemonSpeciesDTO {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResourceDTO;
  pokedex_numbers: PokemonSpeciesDexEntryDTO[];
  egg_groups: NamedAPIResourceDTO[];
  color: NamedAPIResourceDTO;
  shape: NamedAPIResourceDTO;
  evolves_from_species: NamedAPIResourceDTO | null;
  evolution_chain: {
    url: string;
  };
  habitat: NamedAPIResourceDTO | null;
  generation: NamedAPIResourceDTO;
  names: NameDTO[];
  pal_park_encounters: PalParkEncounterAreaDTO[];
  flavor_text_entries: FlavorTextEntryDTO[];
  form_descriptions: DescriptionDTO[];
  genera: GenusDTO[];
  varieties: PokemonSpeciesVarietyDTO[];
}

/**
 * Pokedex entry for a Pokemon species.
 */
export interface PokemonSpeciesDexEntryDTO {
  entry_number: number;
  pokedex: NamedAPIResourceDTO;
}

/**
 * Pal Park encounter area for a Pokemon species.
 */
export interface PalParkEncounterAreaDTO {
  base_score: number;
  rate: number;
  area: NamedAPIResourceDTO;
}

/**
 * Genus (category) for a Pokemon species in different languages.
 */
export interface GenusDTO {
  genus: string;
  language: NamedAPIResourceDTO;
}

/**
 * Variety of a Pokemon species (different forms).
 */
export interface PokemonSpeciesVarietyDTO {
  is_default: boolean;
  pokemon: NamedAPIResourceDTO;
}

/**
 * Localized name for a resource.
 */
export interface NameDTO {
  name: string;
  language: NamedAPIResourceDTO;
}

/**
 * Flavor text entry for a resource.
 */
export interface FlavorTextEntryDTO {
  flavor_text: string;
  language: NamedAPIResourceDTO;
  version: NamedAPIResourceDTO;
}

/**
 * Description for a resource.
 */
export interface DescriptionDTO {
  description: string;
  language: NamedAPIResourceDTO;
}

/**
 * Response structure for paginated Pokemon Species list endpoint.
 */
export interface PokemonSpeciesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}

/**
 * Pokemon Form DTO matching PokeAPI response structure.
 * Represents a specific form of a Pokemon.
 */
export interface PokemonFormDTO {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: NamedAPIResourceDTO;
  types: TypeReferenceDTO[];
  sprites: PokemonFormSpritesDTO;
  version_group: NamedAPIResourceDTO;
  names: NameDTO[];
  form_names: NameDTO[];
}

/**
 * Sprites for a Pokemon form.
 */
export interface PokemonFormSpritesDTO {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

/**
 * Response structure for paginated Pokemon Form list endpoint.
 */
export interface PokemonFormListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResourceDTO[];
}
