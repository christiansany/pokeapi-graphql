import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../../utils/relay.js";
import { encodeCursor } from "../../utils/cursor.js";

/**
 * Query field resolvers for Evolution domain
 */
export const evolutionQueries: Pick<
  QueryResolvers,
  "evolutionChainById" | "evolutionChains" | "evolutionTriggerById" | "evolutionTriggers"
> = {
  evolutionChainById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "EvolutionChain") {
      throw new GraphQLError("Invalid EvolutionChain ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid EvolutionChain ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.evolution.getEvolutionChainById(numericId);
  },

  evolutionChains: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.evolution.getEvolutionChainList(limit ?? 0, offset);

    const chainPromises = listResponse.results.map((result: { url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.evolution.getEvolutionChainById(id);
    });

    const chains = await Promise.all(chainPromises);

    const edges = chains
      .map((chain, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: chain,
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

  evolutionTriggerById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "EvolutionTrigger") {
      throw new GraphQLError("Invalid EvolutionTrigger ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid EvolutionTrigger ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.evolution.getEvolutionTriggerById(numericId);
  },

  evolutionTriggers: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.evolution.getEvolutionTriggerList(limit ?? 0, offset);

    const triggerPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.evolution.getEvolutionTriggerById(id);
    });

    const triggers = await Promise.all(triggerPromises);

    const edges = triggers
      .map((trigger, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: trigger,
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
