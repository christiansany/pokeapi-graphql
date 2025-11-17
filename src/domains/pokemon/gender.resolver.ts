import type { GenderResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Gender: GenderResolvers = {
  id: (parent) => encodeGlobalId("Gender", parent.id),
  name: (parent) => parent.name,
  pokemonSpeciesDetails: (parent) =>
    parent.pokemon_species_details.map((detail) => ({
      rate: detail.rate,
      pokemonSpecies: {
        name: detail.pokemon_species.name,
        url: detail.pokemon_species.url,
      },
    })),
  requiredForEvolution: (parent) =>
    parent.required_for_evolution.map((species) => ({
      name: species.name,
      url: species.url,
    })),
};
