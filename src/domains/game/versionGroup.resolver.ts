import type { VersionGroupResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const VersionGroup: VersionGroupResolvers = {
  id: (parent) => encodeGlobalId("VersionGroup", parent.id),
  name: (parent) => parent.name,
  order: (parent) => parent.order,
  generation: (parent) => ({
    name: parent.generation.name,
    url: parent.generation.url,
  }),
  moveLearnMethods: (parent) =>
    parent.move_learn_methods.map((method) => ({
      name: method.name,
      url: method.url,
    })),
  pokedexes: (parent) =>
    parent.pokedexes.map((pokedex) => ({
      name: pokedex.name,
      url: pokedex.url,
    })),
  regions: (parent) =>
    parent.regions.map((region) => ({
      name: region.name,
      url: region.url,
    })),
  versions: (parent) =>
    parent.versions.map((version) => ({
      name: version.name,
      url: version.url,
    })),
};
