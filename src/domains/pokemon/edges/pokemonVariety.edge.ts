import type { PokemonVarietyEdgeResolvers } from "../../../types/generated.js";
import { GraphQLError } from "graphql";

export const PokemonVarietyEdge: PokemonVarietyEdgeResolvers = {
  isDefault: (parent) => parent.isDefault,
  node: async (parent, _, { dataSources }) => {
    // Fetch full Pokemon object using DataLoader for batching
    const pokemon = await dataSources.pokemon.getPokemonByName(parent.pokemonName);
    if (!pokemon) {
      throw new GraphQLError(`Pokemon not found: ${parent.pokemonName}`, {
        extensions: { code: "NODE_NOT_FOUND" },
      });
    }
    return pokemon;
  },
};
