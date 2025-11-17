import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../../utils/relay.js";
import { encodeCursor } from "../../utils/cursor.js";

/**
 * Query field resolvers for Stat domain
 */
export const statQueries: Pick<
  QueryResolvers,
  "statById" | "stats" | "characteristicById" | "characteristics" | "natureById" | "natures"
> = {
  statById: async (_, { id }, { dataSources }) => {
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
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.stat.getStatList(limit ?? 0, offset);

    const statPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.stat.getStatById(id);
    });

    const stats = await Promise.all(statPromises);

    const edges = stats
      .map((stat, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: stat,
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

  characteristicById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Characteristic") {
      throw new GraphQLError("Invalid Characteristic ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Characteristic ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.stat.getCharacteristicById(numericId);
  },

  characteristics: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.stat.getCharacteristicList(limit ?? 0, offset);

    const characteristicPromises = listResponse.results.map((result: { url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.stat.getCharacteristicById(id);
    });

    const characteristics = await Promise.all(characteristicPromises);

    const edges = characteristics
      .map((characteristic, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: characteristic,
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

  natureById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Nature") {
      throw new GraphQLError("Invalid Nature ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Nature ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.stat.getNatureById(numericId);
  },

  natures: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.stat.getNatureList(limit ?? 0, offset);

    const naturePromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.stat.getNatureById(id);
    });

    const natures = await Promise.all(naturePromises);

    const edges = natures
      .map((nature, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: nature,
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
