import type { PokemonStatEdgeResolvers } from "../../../types/generated.js";

export const PokemonStatEdge: PokemonStatEdgeResolvers = {
  baseStat: (parent) => parent.baseStat,
  effort: (parent) => parent.effort,
  node: async (parent, _, { dataSources }) => {
    // Use the stat DataSource to fetch stat data with DataLoader batching
    const statData = await dataSources.stat.getStatByName(parent.statName);
    if (!statData) {
      throw new Error(`Stat not found: ${parent.statName}`);
    }
    return statData;
  },
};
