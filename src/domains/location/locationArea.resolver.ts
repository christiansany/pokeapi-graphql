import type { LocationAreaResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Resolver for LocationArea type.
 * Transforms LocationAreaDTO from PokeAPI into GraphQL LocationArea type.
 */
export const LocationArea: LocationAreaResolvers = {
  id: (parent) => encodeGlobalId("LocationArea", parent.id),
  name: (parent) => parent.name,
  gameIndex: (parent) => parent.game_index,
  encounterMethodRates: (parent) =>
    parent.encounter_method_rates.map((rate) => ({
      encounterMethod: rate.encounter_method,
      versionDetails: rate.version_details.map((detail) => ({
        rate: detail.rate,
        version: detail.version,
      })),
    })),
  location: (parent) => parent.location,
  names: (parent) => parent.names,
  /**
   * Pokemon encounters connection following the edge pattern.
   * Flattens version-specific encounter details into individual edges.
   * Each edge contains metadata and a pokemon name for DataLoader batching.
   */
  pokemonEncounters: (parent) => {
    // Flatten all version-specific encounter details into individual edges
    const edges: Array<{
      pokemonName: string;
      minLevel: number;
      maxLevel: number;
      conditionValues: Array<{ name: string; url: string }>;
      chance: number;
      method: { name: string; url: string };
    }> = [];

    for (const encounter of parent.pokemon_encounters) {
      const pokemonName = encounter.pokemon.name;

      // Flatten all version details and their encounter details
      for (const versionDetail of encounter.version_details) {
        for (const encounterDetail of versionDetail.encounter_details) {
          edges.push({
            pokemonName,
            minLevel: encounterDetail.min_level,
            maxLevel: encounterDetail.max_level,
            conditionValues: encounterDetail.condition_values,
            chance: encounterDetail.chance,
            method: encounterDetail.method,
          });
        }
      }
    }

    return { edges };
  },
};
