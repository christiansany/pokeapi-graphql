import type { NodeResolvers } from "../types/generated.js";

export const Node: NodeResolvers = {
  __resolveType: (parent) => {
    // Check if it's a Pokemon by looking for Pokemon-specific fields
    if ("base_experience" in parent && "sprites" in parent) {
      return "Pokemon";
    }
    // Check if it's a PokemonAbility by looking for ability-specific fields
    if ("ability" in parent && "slot" in parent && "is_hidden" in parent) {
      return "PokemonAbility";
    }
    return null;
  },
};
