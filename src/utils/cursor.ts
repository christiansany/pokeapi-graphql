/**
 * Encodes a cursor for Relay pagination.
 * Format: base64(offset:number)
 *
 * @param offset - The numeric offset in the result set
 * @returns Base64-encoded cursor
 */
export function encodeCursor(offset: number): string {
  return Buffer.from(`offset:${offset}`).toString("base64");
}

/**
 * Decodes a cursor and extracts the offset.
 *
 * @param cursor - Base64-encoded cursor
 * @returns The numeric offset, or null if invalid
 */
export function decodeCursor(cursor: string): number | null {
  try {
    const decoded = Buffer.from(cursor, "base64").toString("utf-8");
    const [prefix, offsetStr] = decoded.split(":");

    // Validate prefix is "offset"
    if (prefix !== "offset") {
      return null;
    }

    // Parse and validate the offset number
    const offset = parseInt(offsetStr, 10);
    if (isNaN(offset)) {
      return null;
    }

    return offset;
  } catch {
    // Handle invalid base64 or other decoding errors
    return null;
  }
}
