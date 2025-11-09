import type { Resolvers } from "../types/generated.js";
import { Query } from "./query.js";
import { Pokemon } from "./pokemon.js";
import { PokemonAbility } from "./pokemonAbility.js";

export const resolvers: Resolvers = {
  Query,
  Pokemon,
  PokemonAbility,
};
