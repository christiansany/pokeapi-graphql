import type { Resolvers } from "../types/generated.js";
import { Query } from "./query.js";
import { Pokemon } from "../domains/pokemon/pokemon.resolver.js";
import { Ability } from "../domains/ability/ability.resolver.js";
import { PokemonAbilityEdge } from "../domains/pokemon/edges/pokemonAbility.edge.js";
import { Node } from "./node.js";

export const resolvers: Resolvers = {
  Query,
  Node,
  Pokemon,
  Ability,
  PokemonAbilityEdge,
};
