import type { PokemonEncounterEdgeResolvers } from "../../../types/generated.js";

/**
 * Resolver for PokemonEncounterEdge type.
 * Handles encounter metadata and resolves the Pokemon node using DataLoader for batching.
 *
 * Edge Pattern:
 * - Parent resolver passes minimal data (pokemonName + metadata)
 * - Edge resolver fetches full Pokemon using DataLoader
 * - Enables efficient batching of Pokemon requests
 */
export const PokemonEncounterEdge: PokemonEncounterEdgeResolvers = {
  chance: (parent) => parent.chance,
  minLevel: (parent) => parent.minLevel,
  maxLevel: (parent) => parent.maxLevel,
  conditionValues: (parent) => parent.conditionValues,
  method: (parent) => parent.method,

  /**
   * Resolve the Pokemon node using DataLoader for batching.
   * This allows multiple encounter edges to batch their Pokemon requests.
   */
  node: async (parent, _args, { dataSources }) => {
    const pokemon = await dataSources.pokemon.getPokemonByName(parent.pokemonName);
    if (!pokemon) {
      throw new Error(`Pokemon not found: ${parent.pokemonName}`);
    }
    return pokemon;
  },
};
