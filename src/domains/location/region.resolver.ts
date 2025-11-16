import type { RegionResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Resolver for Region type.
 * Transforms RegionDTO from PokeAPI into GraphQL Region type.
 */
export const Region: RegionResolvers = {
  id: (parent) => encodeGlobalId("Region", parent.id),
  name: (parent) => parent.name,
  locations: (parent) => parent.locations,
  names: (parent) => parent.names,
  mainGeneration: (parent) => parent.main_generation,
  pokedexes: (parent) => parent.pokedexes,
  versionGroups: (parent) => parent.version_groups,
};
