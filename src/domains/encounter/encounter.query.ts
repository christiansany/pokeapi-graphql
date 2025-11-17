import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../../utils/relay.js";
import { encodeCursor } from "../../utils/cursor.js";

/**
 * Query field resolvers for Encounter domain
 */
export const encounterQueries: Pick<
  QueryResolvers,
  | "encounterMethodById"
  | "encounterMethods"
  | "encounterConditionById"
  | "encounterConditions"
  | "encounterConditionValueById"
  | "encounterConditionValues"
> = {
  encounterMethodById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "EncounterMethod") {
      throw new GraphQLError("Invalid EncounterMethod ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid EncounterMethod ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.encounter.getEncounterMethodById(numericId);
  },

  encounterMethods: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.encounter.getEncounterMethodList(limit ?? 0, offset);

    const encounterMethodPromises = listResponse.results.map(
      (result: { name: string; url: string }) => {
        const urlParts = result.url.split("/");
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return dataSources.encounter.getEncounterMethodById(id);
      }
    );

    const encounterMethods = await Promise.all(encounterMethodPromises);

    const edges = encounterMethods
      .map((encounterMethod, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: encounterMethod,
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

  encounterConditionById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "EncounterCondition") {
      throw new GraphQLError("Invalid EncounterCondition ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid EncounterCondition ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.encounter.getEncounterConditionById(numericId);
  },

  encounterConditions: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.encounter.getEncounterConditionList(limit ?? 0, offset);

    const encounterConditionPromises = listResponse.results.map(
      (result: { name: string; url: string }) => {
        const urlParts = result.url.split("/");
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return dataSources.encounter.getEncounterConditionById(id);
      }
    );

    const encounterConditions = await Promise.all(encounterConditionPromises);

    const edges = encounterConditions
      .map((encounterCondition, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: encounterCondition,
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

  encounterConditionValueById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "EncounterConditionValue") {
      throw new GraphQLError("Invalid EncounterConditionValue ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid EncounterConditionValue ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.encounter.getEncounterConditionValueById(numericId);
  },

  encounterConditionValues: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.encounter.getEncounterConditionValueList(
      limit ?? 0,
      offset
    );

    const encounterConditionValuePromises = listResponse.results.map(
      (result: { name: string; url: string }) => {
        const urlParts = result.url.split("/");
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return dataSources.encounter.getEncounterConditionValueById(id);
      }
    );

    const encounterConditionValues = await Promise.all(encounterConditionValuePromises);

    const edges = encounterConditionValues
      .map((encounterConditionValue, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: encounterConditionValue,
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
