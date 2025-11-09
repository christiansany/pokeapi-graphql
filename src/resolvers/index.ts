import type { Resolvers } from "../types/generated.js";
import { Query } from "./query.js";
import { Pokemon } from "../domains/pokemon/pokemon.resolver.js";
import { Ability } from "../domains/ability/ability.resolver.js";
import { Stat } from "../domains/stat/stat.resolver.js";
import { Type } from "../domains/type/type.resolver.js";
import { PokemonAbilityEdge } from "../domains/pokemon/edges/pokemonAbility.edge.js";
import { PokemonStatEdge } from "../domains/pokemon/edges/pokemonStat.edge.js";
import { PokemonTypeEdge } from "../domains/pokemon/edges/pokemonType.edge.js";
import { Node } from "./node.js";

export const resolvers: Resolvers = {
  Query,
  Node,
  Pokemon,
  Ability,
  Stat,
  Type,
  PokemonAbilityEdge,
  PokemonStatEdge,
  PokemonTypeEdge,
};
