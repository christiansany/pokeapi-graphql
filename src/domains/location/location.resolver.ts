import type { LocationResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Resolver for Location type.
 * Transforms LocationDTO from PokeAPI into GraphQL Location type.
 */
export const Location: LocationResolvers = {
  id: (parent) => encodeGlobalId("Location", parent.id),
  name: (parent) => parent.name,
  region: (parent) => parent.region,
  names: (parent) => parent.names,
  gameIndices: (parent) =>
    parent.game_indices.map((gi) => ({
      gameIndex: gi.game_index,
      version: gi.version,
    })),
  areas: (parent) => parent.areas,
};
