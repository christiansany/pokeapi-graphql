import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../../utils/relay.js";
import { encodeCursor } from "../../utils/cursor.js";

/**
 * Query field resolvers for Contest domain
 */
export const contestQueries: Pick<
  QueryResolvers,
  | "contestTypeById"
  | "contestTypes"
  | "contestEffectById"
  | "contestEffects"
  | "superContestEffectById"
  | "superContestEffects"
> = {
  contestTypeById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "ContestType") {
      throw new GraphQLError("Invalid ContestType ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid ContestType ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.contest.getContestTypeById(numericId);
  },

  contestTypes: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.contest.getContestTypeList(limit ?? 0, offset);

    const contestTypePromises = listResponse.results.map(
      (result: { name: string; url: string }) => {
        const urlParts = result.url.split("/");
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return dataSources.contest.getContestTypeById(id);
      }
    );

    const contestTypes = await Promise.all(contestTypePromises);

    const edges = contestTypes
      .map((contestType, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: contestType,
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

  contestEffectById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "ContestEffect") {
      throw new GraphQLError("Invalid ContestEffect ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid ContestEffect ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.contest.getContestEffectById(numericId);
  },

  contestEffects: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.contest.getContestEffectList(limit ?? 0, offset);

    const contestEffectPromises = listResponse.results.map((result: { url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.contest.getContestEffectById(id);
    });

    const contestEffects = await Promise.all(contestEffectPromises);

    const edges = contestEffects
      .map((contestEffect, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: contestEffect,
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

  superContestEffectById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "SuperContestEffect") {
      throw new GraphQLError("Invalid SuperContestEffect ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid SuperContestEffect ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.contest.getSuperContestEffectById(numericId);
  },

  superContestEffects: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.contest.getSuperContestEffectList(limit ?? 0, offset);

    const superContestEffectPromises = listResponse.results.map((result: { url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.contest.getSuperContestEffectById(id);
    });

    const superContestEffects = await Promise.all(superContestEffectPromises);

    const edges = superContestEffects
      .map((superContestEffect, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: superContestEffect,
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
