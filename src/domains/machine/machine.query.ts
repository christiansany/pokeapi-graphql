import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../../utils/relay.js";
import { encodeCursor } from "../../utils/cursor.js";

/**
 * Query field resolvers for Machine domain
 */
export const machineQueries: Pick<QueryResolvers, "machineById" | "machines"> = {
  machineById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Machine") {
      throw new GraphQLError("Invalid Machine ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Machine ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.machine.getMachineById(numericId);
  },

  machines: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Machine list from PokéAPI
    const listResponse = await dataSources.machine.getMachineList(limit ?? 0, offset);

    // Fetch full Machine data for each result
    const machinePromises = listResponse.results.map((result: { url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/machine/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.machine.getMachineById(id);
    });

    const machines = await Promise.all(machinePromises);

    // Filter out any null results and create edges with cursors
    const edges = machines
      .map((machine, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: machine,
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
};
