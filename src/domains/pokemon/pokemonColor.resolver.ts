import type { PokemonColorResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const PokemonColor: PokemonColorResolvers = {
  id: (parent) => encodeGlobalId("PokemonColor", parent.id),
  name: (parent) => parent.name,
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
};
