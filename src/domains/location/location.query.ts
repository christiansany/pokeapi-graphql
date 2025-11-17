import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../../utils/relay.js";
import { encodeCursor } from "../../utils/cursor.js";

/**
 * Query field resolvers for Location domain
 */
export const locationQueries: Pick<
  QueryResolvers,
  | "locationById"
  | "locations"
  | "regionById"
  | "regions"
  | "locationAreaById"
  | "locationAreas"
  | "palParkAreaById"
  | "palParkAreas"
> = {
  locationById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Location") {
      throw new GraphQLError("Invalid Location ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Location ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getLocationById(numericId);
  },

  locations: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.location.getLocationList(limit ?? 0, offset);

    const locationPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getLocationById(id);
    });

    const locations = await Promise.all(locationPromises);

    const edges = locations
      .map((location, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: location,
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

  regionById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Region") {
      throw new GraphQLError("Invalid Region ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Region ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getRegionById(numericId);
  },

  regions: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.location.getRegionList(limit ?? 0, offset);

    const regionPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getRegionById(id);
    });

    const regions = await Promise.all(regionPromises);

    const edges = regions
      .map((region, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: region,
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

  locationAreaById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "LocationArea") {
      throw new GraphQLError("Invalid LocationArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid LocationArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getLocationAreaById(numericId);
  },

  locationAreas: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.location.getLocationAreaList(limit ?? 0, offset);

    const areaPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getLocationAreaById(id);
    });

    const areas = await Promise.all(areaPromises);

    const edges = areas
      .map((area, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: area,
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

  palParkAreaById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "PalParkArea") {
      throw new GraphQLError("Invalid PalParkArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid PalParkArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getPalParkAreaById(numericId);
  },

  palParkAreas: async (_, args, { dataSources }) => {
    const { first, after } = args;
    const { limit, offset } = validatePaginationArgs(first, after);

    const listResponse = await dataSources.location.getPalParkAreaList(limit ?? 0, offset);

    const areaPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getPalParkAreaById(id);
    });

    const areas = await Promise.all(areaPromises);

    const edges = areas
      .map((area, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: area,
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
