import type { GrowthRateResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const GrowthRate: GrowthRateResolvers = {
  id: (parent) => encodeGlobalId("GrowthRate", parent.id),
  name: (parent) => parent.name,
  formula: (parent) => parent.formula,
  descriptions: (parent) =>
    parent.descriptions.map((desc) => ({
      description: desc.description,
      language: {
        name: desc.language.name,
        url: desc.language.url,
      },
    })),
  levels: (parent) =>
    parent.levels.map((level) => ({
      level: level.level,
      experience: level.experience,
    })),
  pokemonSpecies: (parent) =>
    parent.pokemon_species.map((species) => ({
      name: species.name,
      url: species.url,
    })),
};
