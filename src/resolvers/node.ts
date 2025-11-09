import type { NodeResolvers } from "../types/generated.js";

export const Node: NodeResolvers = {
  __resolveType: (parent) => {
    // Check if it's a Pokemon by looking for Pokemon-specific fields
    if ("base_experience" in parent && "sprites" in parent) {
      return "Pokemon";
    }
    // Check if it's an Ability by looking for ability-specific fields
    if ("effect_entries" in parent && "flavor_text_entries" in parent) {
      return "Ability";
    }
    return null;
  },
};
