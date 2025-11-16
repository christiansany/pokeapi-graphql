import type { EvolutionTriggerResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Helper to extract ID from PokeAPI URL
 */
function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * EvolutionTrigger resolver
 */
export const EvolutionTrigger: EvolutionTriggerResolvers = {
  id: (parent) => encodeGlobalId("EvolutionTrigger", parent.id),

  name: (parent) => parent.name,

  names: (parent) => parent.names,

  pokemonSpecies: async (parent, _, { dataSources }) => {
    // Fetch all pokemon species referenced by this trigger
    const speciesPromises = parent.pokemon_species.map((speciesRef) => {
      const speciesId = extractIdFromUrl(speciesRef.url);
      return dataSources.pokemon.getSpeciesById(speciesId);
    });

    const species = await Promise.all(speciesPromises);

    // Filter out any null results
    return species.filter((s): s is NonNullable<typeof s> => s !== null);
  },
};
