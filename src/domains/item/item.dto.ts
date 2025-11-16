import type {
  NamedAPIResourceDTO,
  EffectEntryDTO,
  FlavorTextEntryDTO,
  NameDTO,
  GameIndexDTO,
} from "../base/common.dto.js";

/**
 * Sprites for an item.
 */
export interface ItemSpritesDTO {
  default: string | null;
}

/**
 * Held item version details.
 */
export interface ItemHolderPokemonVersionDetailDTO {
  rarity: number;
  version: NamedAPIResourceDTO;
}

/**
 * Pokemon that can hold this item.
 */
export interface ItemHolderPokemonDTO {
  pokemon: NamedAPIResourceDTO;
  version_details: ItemHolderPokemonVersionDetailDTO[];
}

/**
 * Item DTO matching PokeAPI response structure.
 * Represents an item in the Pokemon games.
 */
export interface ItemDTO {
  id: number;
  name: string;
  cost: number;
  fling_power: number | null;
  fling_effect: NamedAPIResourceDTO | null;
  attributes: NamedAPIResourceDTO[];
  category: NamedAPIResourceDTO;
  effect_entries: EffectEntryDTO[];
  flavor_text_entries: FlavorTextEntryDTO[];
  game_indices: GameIndexDTO[];
  names: NameDTO[];
  sprites: ItemSpritesDTO;
  held_by_pokemon: ItemHolderPokemonDTO[];
  baby_trigger_for: NamedAPIResourceDTO | null;
  machines: {
    machine: string; // URL to machine
    version_group: NamedAPIResourceDTO;
  }[];
}

/**
 * Item Category DTO matching PokeAPI response structure.
 * Represents a category of items.
 */
export interface ItemCategoryDTO {
  id: number;
  name: string;
  items: NamedAPIResourceDTO[];
  names: NameDTO[];
  pocket: NamedAPIResourceDTO;
}

/**
 * Item Attribute DTO matching PokeAPI response structure.
 * Represents an attribute that items can have.
 */
export interface ItemAttributeDTO {
  id: number;
  name: string;
  items: NamedAPIResourceDTO[];
  names: NameDTO[];
  descriptions: {
    description: string;
    language: NamedAPIResourceDTO;
  }[];
}

/**
 * Item Fling Effect DTO matching PokeAPI response structure.
 * Represents the effect of flinging an item in battle.
 */
export interface ItemFlingEffectDTO {
  id: number;
  name: string;
  effect_entries: EffectEntryDTO[];
  items: NamedAPIResourceDTO[];
}

/**
 * Item Pocket DTO matching PokeAPI response structure.
 * Represents a pocket in the bag where items are stored.
 */
export interface ItemPocketDTO {
  id: number;
  name: string;
  categories: NamedAPIResourceDTO[];
  names: NameDTO[];
}
