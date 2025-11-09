import type { Resolvers } from "../types/generated.js";
import { Query } from "./query.js";
import { Pokemon } from "./pokemon.js";
import { Ability } from "./ability.js";
import { PokemonAbilityEdge } from "./pokemonAbilityEdge.js";
import { Node } from "./node.js";

export const resolvers: Resolvers = {
  Query,
  Node,
  Pokemon,
  Ability,
  PokemonAbilityEdge,
};
