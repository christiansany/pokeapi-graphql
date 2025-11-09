import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../types/generated.js";
import { decodeGlobalId } from "../utils/relay.js";
import { decodeCursor, encodeCursor } from "../utils/cursor.js";

export const Query: QueryResolvers = {
  pokemon: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Pokemon") {
      throw new GraphQLError("Invalid Pokemon ID format", {
        extensions: { code: "INVALID_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Pokemon ID format", {
        extensions: { code: "INVALID_ID" },
      });
    }

    return dataSources.pokeapi.getPokemonById(numericId);
  },

  pokemons: async (_, args, { dataSources }) => {
    const { first: limit, after } = args;

    // Validate pagination arguments
    if (limit !== undefined && limit !== null && (limit <= 0 || limit > 50)) {
      throw new GraphQLError('"limit" must be a positive integer, and no more than 50', {
        extensions: { code: "INVALID_PAGINATION_ARGS" },
      });
    }

    // Decode after cursor to get starting offset
    let offset = 0;
    if (after) {
      const decodedOffset = decodeCursor(after);
      if (decodedOffset === null) {
        throw new GraphQLError("Invalid cursor format", {
          extensions: { code: "INVALID_CURSOR" },
        });
      }
      offset = decodedOffset + 1; // Start after the cursor position
    }

    // Fetch Pokemon list from PokéAPI
    const listResponse = await dataSources.pokeapi.getPokemonList(limit ?? 0, offset);

    // Fetch full Pokemon data for each result
    const pokemonPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.pokeapi.getPokemonById(id);
    });

    const pokemons = await Promise.all(pokemonPromises);

    // Filter out any null results
    const validPokemons = pokemons.filter((p) => p !== null);

    // Create edges with cursors
    const edges = validPokemons.map((pokemon, index: number) => ({
      cursor: encodeCursor(offset + index),
      node: pokemon,
    }));

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },
  node: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded) {
      return null;
    }

    switch (decoded.typename) {
      case "Pokemon": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          return null;
        }
        return dataSources.pokeapi.getPokemonById(numericId);
      }
      default:
        return null;
    }
  },
};
