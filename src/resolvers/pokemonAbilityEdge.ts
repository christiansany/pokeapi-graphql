import type { PokemonAbilityEdgeResolvers } from "../types/generated.js";

export const PokemonAbilityEdge: PokemonAbilityEdgeResolvers = {
  slot: (parent) => parent.slot,
  isHidden: (parent) => parent.isHidden,
  node: async (parent, _, { dataSources }) => {
    const abilityData = await dataSources.pokeapi.abilityLoader.load(parent.abilityName);
    if (!abilityData) {
      throw new Error(`Ability not found: ${parent.abilityName}`);
    }
    return abilityData;
  },
};
