import type { GenerationResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Generation: GenerationResolvers = {
  id: (parent) => encodeGlobalId("Generation", parent.id),
  name: (parent) => parent.name,
  abilities: (parent) =>
    parent.abilities.map((ability) => ({
      name: ability.name,
      url: ability.url,
    })),
  mainRegion: (parent) => ({
    name: parent.main_region.name,
    url: parent.main_region.url,
  }),
  moves: (parent) =>
    parent.moves.map((move) => ({
      name: move.name,
      url: move.url,
    })),
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
  pokemonSpecies: (parent) =>
    parent.pokemon_species.map((species) => ({
      name: species.name,
      url: species.url,
    })),
  types: (parent) =>
    parent.types.map((type) => ({
      name: type.name,
      url: type.url,
    })),
  versionGroups: (parent) =>
    parent.version_groups.map((versionGroup) => ({
      name: versionGroup.name,
      url: versionGroup.url,
    })),
};
