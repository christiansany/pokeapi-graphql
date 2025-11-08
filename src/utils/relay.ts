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
