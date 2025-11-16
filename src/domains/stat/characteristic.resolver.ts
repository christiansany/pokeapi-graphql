import type { CharacteristicResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Helper to extract ID from PokeAPI URL
 */
function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export const Characteristic: CharacteristicResolvers = {
  id: (parent) => encodeGlobalId("Characteristic", parent.id),
  geneModulo: (parent) => parent.gene_modulo,
  possibleValues: (parent) => parent.possible_values,
  highestStat: async (parent, _args, context) => {
    const statId = extractIdFromUrl(parent.highest_stat.url);
    const stat = await context.dataSources.stat.getStatById(statId);
    if (!stat) {
      throw new Error(`Stat not found: ${parent.highest_stat.name}`);
    }
    return stat;
  },
  descriptions: (parent) =>
    parent.descriptions.map((desc) => ({
      description: desc.description,
      language: {
        name: desc.language.name,
        url: desc.language.url,
      },
    })),
};
