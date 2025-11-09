import { GraphQLError } from "graphql";
import { decodeCursor } from "./cursor.js";

/**
 * Encodes a Global ID according to Relay specification.
 * Format: base64(typename:id)
 *
 * @param typename - The GraphQL type name (e.g., "Pokemon")
 * @param id - The original ID (string or number)
 * @returns Base64-encoded Global ID
 */
export function encodeGlobalId(typename: string, id: string | number): string {
  return Buffer.from(`${typename}:${id}`).toString("base64");
}

/**
 * Decodes a Global ID and extracts typename and original ID.
 *
 * @param globalId - Base64-encoded Global ID
 * @returns Object with typename and id, or null if invalid
 */
export function decodeGlobalId(globalId: string): { typename: string; id: string } | null {
  try {
    const decoded = Buffer.from(globalId, "base64").toString("utf-8");
    const [typename, id] = decoded.split(":");

    // Validate that both typename and id exist
    if (!typename || !id) {
      return null;
    }

    return { typename, id };
  } catch {
    // Handle invalid base64 or other decoding errors
    return null;
  }
}

/**
 * Validates and normalizes pagination arguments.
 * - first: Optional, nullable. When provided, must be 1-50. When not provided, returns 0 (use PokeAPI default).
 * - after: Optional cursor for pagination.
 *
 * @param first - Number of items to return (1-50), or null/undefined for default
 * @param after - Cursor for pagination
 * @returns Object with validated limit and offset
 * @throws GraphQLError if validation fails
 */
export function validatePaginationArgs(
  first?: number | null,
  after?: string | null
): { limit: number; offset: number } {
  // Validate first argument if provided
  let limit: number;
  if (first === null || first === undefined) {
    limit = 0; // No limit specified - use PokeAPI default (20)
  } else {
    // Validate first is between 1 and 50
    if (first < 1 || first > 50) {
      throw new GraphQLError("first must be between 1 and 50", {
        extensions: { code: "INVALID_PAGINATION_ARGS" },
      });
    }
    limit = first;
  }

  // Decode cursor to get offset
  let offset = 0;
  if (after) {
    const decodedOffset = decodeCursor(after);
    if (decodedOffset === null) {
      throw new GraphQLError("Invalid cursor format", {
        extensions: { code: "INVALID_CURSOR" },
      });
    }
    offset = decodedOffset;
  }

  return { limit, offset };
}
