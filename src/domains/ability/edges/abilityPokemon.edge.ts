import type { AbilityPokemonEdgeResolvers } from "../../../types/generated.js";

/**
 * Resolver for AbilityPokemonEdge type.
 * Represents a Pokemon that has this ability with metadata (slot, hidden status).
 */
export const AbilityPokemonEdge: AbilityPokemonEdgeResolvers = {
  slot: (parent) => parent.slot,
  isHidden: (parent) => parent.isHidden,
  node: async (parent, _, { dataSources }) => {
    // Use the pokemon DataSource to fetch pokemon data with DataLoader batching
    const pokemonData = await dataSources.pokemon.getPokemonByName(parent.pokemonName);
    if (!pokemonData) {
      throw new Error(`Pokemon not found: ${parent.pokemonName}`);
    }
    return pokemonData;
  },
};
