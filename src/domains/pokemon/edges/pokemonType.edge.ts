import type { PokemonTypeEdgeResolvers } from "../../../types/generated.js";

export const PokemonTypeEdge: PokemonTypeEdgeResolvers = {
  slot: (parent) => parent.slot,
  node: async (parent, _, { dataSources }) => {
    // Use the type DataSource to fetch type data with DataLoader batching
    const typeData = await dataSources.type.getTypeByName(parent.typeName);
    if (!typeData) {
      throw new Error(`Type not found: ${parent.typeName}`);
    }
    return typeData;
  },
};
