import type { BerryFlavorEdgeResolvers } from "../../../types/generated.js";

export const BerryFlavorEdge: BerryFlavorEdgeResolvers = {
  potency: (parent) => parent.potency,
  node: async (parent, _, { dataSources }) => {
    // Fetch full BerryFlavor object using DataLoader for batching
    const flavor = await dataSources.berry.getBerryFlavorByName(parent.flavorName);
    if (!flavor) {
      throw new Error(`BerryFlavor not found: ${parent.flavorName}`);
    }
    return flavor;
  },
};
