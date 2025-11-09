import type { PokemonAbilityEdgeResolvers } from "../../../types/generated.js";

export const PokemonAbilityEdge: PokemonAbilityEdgeResolvers = {
  slot: (parent) => parent.slot,
  isHidden: (parent) => parent.isHidden,
  node: async (parent, _, { dataSources }) => {
    // Use the ability DataSource to fetch ability data with DataLoader batching
    const abilityData = await dataSources.ability.getAbilityByName(parent.abilityName);
    if (!abilityData) {
      throw new Error(`Ability not found: ${parent.abilityName}`);
    }
    return abilityData;
  },
};
