import type { PokemonSpeciesResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const PokemonSpecies: PokemonSpeciesResolvers = {
  id: (parent) => encodeGlobalId("PokemonSpecies", parent.id),
  name: (parent) => parent.name,
  order: (parent) => parent.order,
  genderRate: (parent) => parent.gender_rate,
  captureRate: (parent) => parent.capture_rate,
  baseHappiness: (parent) => parent.base_happiness,
  isBaby: (parent) => parent.is_baby,
  isLegendary: (parent) => parent.is_legendary,
  isMythical: (parent) => parent.is_mythical,
  hatchCounter: (parent) => parent.hatch_counter,
  hasGenderDifferences: (parent) => parent.has_gender_differences,
  formsSwitchable: (parent) => parent.forms_switchable,
  growthRate: (parent) => ({
    name: parent.growth_rate.name,
    url: parent.growth_rate.url,
  }),
  pokedexNumbers: (parent) =>
    parent.pokedex_numbers.map((entry) => ({
      entryNumber: entry.entry_number,
      pokedex: {
        name: entry.pokedex.name,
        url: entry.pokedex.url,
      },
    })),
  eggGroups: (parent) =>
    parent.egg_groups.map((group) => ({
      name: group.name,
      url: group.url,
    })),
  color: (parent) => ({
    name: parent.color.name,
    url: parent.color.url,
  }),
  shape: (parent) => ({
    name: parent.shape.name,
    url: parent.shape.url,
  }),
  evolvesFromSpecies: (parent) =>
    parent.evolves_from_species
      ? {
          name: parent.evolves_from_species.name,
          url: parent.evolves_from_species.url,
        }
      : null,
  evolutionChain: (parent) => ({
    url: parent.evolution_chain.url,
  }),
  habitat: (parent) =>
    parent.habitat
      ? {
          name: parent.habitat.name,
          url: parent.habitat.url,
        }
      : null,
  generation: (parent) => ({
    name: parent.generation.name,
    url: parent.generation.url,
  }),
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
  palParkEncounters: (parent) =>
    parent.pal_park_encounters.map((encounter) => ({
      baseScore: encounter.base_score,
      rate: encounter.rate,
      area: {
        name: encounter.area.name,
        url: encounter.area.url,
      },
    })),
  flavorTextEntries: (parent) =>
    parent.flavor_text_entries.map((entry) => ({
      flavorText: entry.flavor_text,
      language: {
        name: entry.language.name,
        url: entry.language.url,
      },
      version: {
        name: entry.version.name,
        url: entry.version.url,
      },
    })),
  formDescriptions: (parent) =>
    parent.form_descriptions.map((desc) => ({
      description: desc.description,
      language: {
        name: desc.language.name,
        url: desc.language.url,
      },
    })),
  genera: (parent) =>
    parent.genera.map((genus) => ({
      genus: genus.genus,
      language: {
        name: genus.language.name,
        url: genus.language.url,
      },
    })),
  varieties: (parent) => ({
    edges: parent.varieties.map((variety) => ({
      isDefault: variety.is_default,
      pokemonName: variety.pokemon.name, // Just the name for DataLoader batching
    })),
  }),
};
