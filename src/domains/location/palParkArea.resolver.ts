import type { PalParkAreaResolvers, PalParkEncounterResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Resolver for PalParkArea type.
 * Maps PalParkAreaDTO from PokeAPI to GraphQL PalParkArea type.
 */
export const PalParkArea: PalParkAreaResolvers = {
  // Encode the global ID
  id: (parent) => encodeGlobalId("PalParkArea", parent.id),

  // Direct field mappings
  name: (parent) => parent.name,
  names: (parent) => parent.names,
  pokemonEncounters: (parent) => parent.pokemon_encounters,
};

/**
 * Resolver for PalParkEncounter type.
 * Maps PalParkEncounterDTO fields from snake_case to camelCase.
 */
export const PalParkEncounter: PalParkEncounterResolvers = {
  baseScore: (parent) => parent.base_score,
  rate: (parent) => parent.rate,
  pokemonSpecies: (parent) => parent.pokemon_species,
};
