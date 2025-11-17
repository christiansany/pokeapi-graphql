import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../../utils/relay.js";
import { encodeCursor } from "../../utils/cursor.js";

/**
 * Query field resolvers for Game domain
 */
export const gameQueries: Pick<
  QueryResolvers,
  | "generationById"
  | "generations"
  | "versionById"
  | "versions"
  | "versionGroupById"
  | "versionGroups"
  | "pokedexById"
  | "pokedexes"
> = {
  generationById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Generation") {
      throw new GraphQLError("Invalid Generation ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Generation ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getGenerationById(numericId);
  },

  generations: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.game.getGenerationList(limit ?? 0, offset);

    const generationPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.game.getGenerationById(id);
    });

    const generations = await Promise.all(generationPromises);

    const edges = generations
      .map((generation, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: generation,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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

  versionById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Version") {
      throw new GraphQLError("Invalid Version ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Version ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getVersionById(numericId);
  },

  versions: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.game.getVersionList(limit ?? 0, offset);

    const versionPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.game.getVersionById(id);
    });

    const versions = await Promise.all(versionPromises);

    const edges = versions
      .map((version, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: version,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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

  versionGroupById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "VersionGroup") {
      throw new GraphQLError("Invalid VersionGroup ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid VersionGroup ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getVersionGroupById(numericId);
  },

  versionGroups: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.game.getVersionGroupList(limit ?? 0, offset);

    const versionGroupPromises = listResponse.results.map(
      (result: { name: string; url: string }) => {
        const urlParts = result.url.split("/");
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return dataSources.game.getVersionGroupById(id);
      }
    );

    const versionGroups = await Promise.all(versionGroupPromises);

    const edges = versionGroups
      .map((versionGroup, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: versionGroup,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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

  pokedexById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Pokedex") {
      throw new GraphQLError("Invalid Pokedex ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Pokedex ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getPokedexById(numericId);
  },

  pokedexes: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.game.getPokedexList(limit ?? 0, offset);

    const pokedexPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.game.getPokedexById(id);
    });

    const pokedexes = await Promise.all(pokedexPromises);

    const edges = pokedexes
      .map((pokedex, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: pokedex,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

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
};
