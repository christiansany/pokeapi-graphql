import type { PokemonMoveEdgeResolvers } from "../../../types/generated.js";

/**
 * Resolver for PokemonMoveEdge.
 * Handles the relationship between Pokemon and Move with version-specific learning details.
 */
export const PokemonMoveEdge: PokemonMoveEdgeResolvers = {
  versionGroupDetails: (parent) => parent.versionGroupDetails,

  /**
   * Fetch the full Move object using DataLoader for batching.
   * This enables efficient loading of moves when querying multiple Pokemon.
   */
  node: async (parent, _args, { dataSources }) => {
    const move = await dataSources.move.getMoveByName(parent.moveName);

    if (!move) {
      throw new Error(`Move not found: ${parent.moveName}`);
    }

    return move;
  },
};
