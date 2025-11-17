import type { NodeResolvers } from "../types/generated.js";

export const Node: NodeResolvers = {
  __resolveType: (parent) => {
    // Check if it's a Pokemon by looking for Pokemon-specific fields
    if ("base_experience" in parent && "sprites" in parent) {
      return "Pokemon";
    }
    // Check if it's an Ability by looking for ability-specific fields
    if (
      "effect_entries" in parent &&
      "flavor_text_entries" in parent &&
      "is_main_series" in parent
    ) {
      return "Ability";
    }
    // Check if it's a Stat by looking for stat-specific fields
    if ("game_index" in parent && "is_battle_only" in parent && "affecting_moves" in parent) {
      return "Stat";
    }
    // Check if it's a Characteristic by looking for characteristic-specific fields
    if ("gene_modulo" in parent && "possible_values" in parent && "highest_stat" in parent) {
      return "Characteristic";
    }
    // Check if it's a Nature by looking for nature-specific fields
    if ("decreased_stat" in parent && "increased_stat" in parent && "hates_flavor" in parent) {
      return "Nature";
    }
    // Check if it's a Type by looking for type-specific fields
    if ("damage_relations" in parent && "move_damage_class" in parent) {
      return "Type";
    }
    // Check if it's a Machine by looking for machine-specific fields
    if ("item" in parent && "move" in parent && "version_group" in parent) {
      return "Machine";
    }
    return null;
  },
};
