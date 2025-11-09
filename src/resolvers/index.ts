import type { Resolvers } from "../types/generated.js";
import { Query } from "./query.js";
import { Pokemon } from "./pokemon.js";
import { PokemonAbility } from "./pokemonAbility.js";
import { Node } from "./node.js";

export const resolvers: Resolvers = {
  Query,
  Node,
  Pokemon,
  PokemonAbility,
};
