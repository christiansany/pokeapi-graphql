import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../utils/relay.js";
import { encodeCursor } from "../utils/cursor.js";

export const Query: QueryResolvers = {
  pokemon: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Pokemon") {
      throw new GraphQLError("Invalid Pokemon ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Pokemon ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.pokemon.getPokemonById(numericId);
  },

  pokemons: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Pokemon list from PokéAPI
    const listResponse = await dataSources.pokemon.getPokemonList(limit ?? 0, offset);

    // Fetch full Pokemon data for each result
    const pokemonPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.pokemon.getPokemonById(id);
    });

    const pokemons = await Promise.all(pokemonPromises);

    // Filter out any null results and create edges with cursors
    const edges = pokemons
      .map((pokemon, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: pokemon,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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
  stat: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Stat") {
      throw new GraphQLError("Invalid Stat ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Stat ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.stat.getStatById(numericId);
  },

  stats: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Stat list from PokéAPI
    const listResponse = await dataSources.stat.getStatList(limit ?? 0, offset);

    // Fetch full Stat data for each result
    const statPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/stat/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.stat.getStatById(id);
    });

    const stats = await Promise.all(statPromises);

    // Filter out any null results and create edges with cursors
    const edges = stats
      .map((stat, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: stat,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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

  type: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Type") {
      throw new GraphQLError("Invalid Type ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Type ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.type.getTypeById(numericId);
  },

  types: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Type list from PokéAPI
    const listResponse = await dataSources.type.getTypeList(limit ?? 0, offset);

    // Fetch full Type data for each result
    const typePromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/type/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.type.getTypeById(id);
    });

    const types = await Promise.all(typePromises);

    // Filter out any null results and create edges with cursors
    const edges = types
      .map((type, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: type,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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

  move: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Move") {
      throw new GraphQLError("Invalid Move ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Move ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.move.getMoveById(numericId);
  },

  moves: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Move list from PokéAPI
    const listResponse = await dataSources.move.getMoveList(limit ?? 0, offset);

    // Fetch full Move data for each result
    const movePromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/move/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.move.getMoveById(id);
    });

    const moves = await Promise.all(movePromises);

    // Filter out any null results and create edges with cursors
    const edges = moves
      .map((move, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: move,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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

  pokemonSpecies: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "PokemonSpecies") {
      throw new GraphQLError("Invalid PokemonSpecies ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid PokemonSpecies ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.pokemon.getSpeciesById(numericId);
  },

  pokemonSpeciesList: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Pokemon Species list from PokéAPI
    const listResponse = await dataSources.pokemon.getSpeciesList(limit ?? 0, offset);

    // Fetch full Pokemon Species data for each result
    const speciesPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon-species/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.pokemon.getSpeciesById(id);
    });

    const species = await Promise.all(speciesPromises);

    // Filter out any null results and create edges with cursors
    const edges = species
      .map((speciesItem, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: speciesItem,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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

  pokemonForm: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "PokemonForm") {
      throw new GraphQLError("Invalid PokemonForm ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid PokemonForm ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.pokemon.getFormById(numericId);
  },

  pokemonForms: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Pokemon Form list from PokéAPI
    const listResponse = await dataSources.pokemon.getFormList(limit ?? 0, offset);

    // Fetch full Pokemon Form data for each result
    const formPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon-form/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.pokemon.getFormById(id);
    });

    const forms = await Promise.all(formPromises);

    // Filter out any null results and create edges with cursors
    const edges = forms
      .map((form, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: form,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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
      throw new GraphQLError("Invalid global ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    switch (decoded.typename) {
      case "Pokemon": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Pokemon ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getPokemonById(numericId);
      }
      case "PokemonSpecies": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonSpecies ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getSpeciesById(numericId);
      }
      case "PokemonForm": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonForm ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getFormById(numericId);
      }
      case "Ability": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Ability ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.ability.getAbilityById(numericId);
      }
      case "Stat": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Stat ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.stat.getStatById(numericId);
      }
      case "Type": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Type ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.type.getTypeById(numericId);
      }
      case "Move": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Move ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.move.getMoveById(numericId);
      }
      default:
        // Unknown typename - return null per Relay spec (node not found)
        return null;
    }
  },
};
