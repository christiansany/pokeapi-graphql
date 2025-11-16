import type { PokedexResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Pokedex: PokedexResolvers = {
  id: (parent) => encodeGlobalId("Pokedex", parent.id),
  name: (parent) => parent.name,
  isMainSeries: (parent) => parent.is_main_series,
  descriptions: (parent) =>
    parent.descriptions.map((desc) => ({
      description: desc.description,
      language: {
        name: desc.language.name,
        url: desc.language.url,
      },
    })),
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
  pokemonEntries: (parent) =>
    parent.pokemon_entries.map((entry) => ({
      entryNumber: entry.entry_number,
      pokemonSpecies: {
        name: entry.pokemon_species.name,
        url: entry.pokemon_species.url,
      },
    })),
  region: (parent) =>
    parent.region
      ? {
          name: parent.region.name,
          url: parent.region.url,
        }
      : null,
  versionGroups: (parent) =>
    parent.version_groups.map((versionGroup) => ({
      name: versionGroup.name,
      url: versionGroup.url,
    })),
};
