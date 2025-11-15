import type { Resolvers } from "../types/generated.js";
import { Query } from "./query.js";
import { Pokemon } from "../domains/pokemon/pokemon.resolver.js";
import { PokemonSpecies } from "../domains/pokemon/pokemonSpecies.resolver.js";
import { PokemonForm } from "../domains/pokemon/pokemonForm.resolver.js";
import { Ability } from "../domains/ability/ability.resolver.js";
import { Stat } from "../domains/stat/stat.resolver.js";
import { Type } from "../domains/type/type.resolver.js";
import { Move } from "../domains/move/move.resolver.js";
import { PokemonAbilityEdge } from "../domains/pokemon/edges/pokemonAbility.edge.js";
import { PokemonStatEdge } from "../domains/pokemon/edges/pokemonStat.edge.js";
import { PokemonTypeEdge } from "../domains/pokemon/edges/pokemonType.edge.js";
import { PokemonMoveEdge } from "../domains/pokemon/edges/pokemonMove.edge.js";
import { PokemonVarietyEdge } from "../domains/pokemon/edges/pokemonVariety.edge.js";
import { Node } from "./node.js";

export const resolvers: Resolvers = {
  Query,
  Node,
  Pokemon,
  PokemonSpecies,
  PokemonForm,
  Ability,
  Stat,
  Type,
  Move,
  PokemonAbilityEdge,
  PokemonStatEdge,
  PokemonTypeEdge,
  PokemonMoveEdge,
  PokemonVarietyEdge,
};
