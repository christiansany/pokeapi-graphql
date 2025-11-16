import type { NamedAPIResourceDTO, NameDTO } from "../base/common.dto.js";

/**
 * Berry flavor with potency.
 */
export interface BerryFlavorMapDTO {
  potency: number;
  flavor: NamedAPIResourceDTO;
}

/**
 * Berry DTO matching PokeAPI response structure.
 * Represents a berry in the Pokemon games.
 */
export interface BerryDTO {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: NamedAPIResourceDTO;
  flavors: BerryFlavorMapDTO[];
  item: NamedAPIResourceDTO;
  natural_gift_type: NamedAPIResourceDTO;
}

/**
 * Berry flavor potency for a specific berry.
 */
export interface FlavorBerryMapDTO {
  potency: number;
  berry: NamedAPIResourceDTO;
}

/**
 * Berry Flavor DTO matching PokeAPI response structure.
 * Represents a flavor that berries can have.
 */
export interface BerryFlavorDTO {
  id: number;
  name: string;
  berries: FlavorBerryMapDTO[];
  contest_type: NamedAPIResourceDTO;
  names: NameDTO[];
}

/**
 * Berry Firmness DTO matching PokeAPI response structure.
 * Represents the firmness of berries.
 */
export interface BerryFirmnessDTO {
  id: number;
  name: string;
  berries: NamedAPIResourceDTO[];
  names: NameDTO[];
}
