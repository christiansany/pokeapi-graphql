import type { PokemonShapeResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const PokemonShape: PokemonShapeResolvers = {
  id: (parent) => encodeGlobalId("PokemonShape", parent.id),
  name: (parent) => parent.name,
  awesomeNames: (parent) =>
    parent.awesome_names.map((awesomeName) => ({
      awesomeName: awesomeName.awesome_name,
      language: {
        name: awesomeName.language.name,
        url: awesomeName.language.url,
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
  pokemonSpecies: (parent) =>
    parent.pokemon_species.map((species) => ({
      name: species.name,
      url: species.url,
    })),
};
