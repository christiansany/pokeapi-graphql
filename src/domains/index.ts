/**
 * Domain resolver aggregation.
 *
 * This file aggregates all domain-specific resolvers into a single resolver map.
 * As new domains are implemented, their resolvers will be imported and added here.
 *
 * Pattern:
 * 1. Each domain exports its resolvers from domains/{domain}/index.ts
 * 2. This file imports and combines them into the main Resolvers object
 * 3. The main server imports resolvers from this file
 */

import type { Resolvers } from "../types/generated.js";

// Import existing resolvers
import { Query } from "../resolvers/query.js";
import { Node } from "../resolvers/node.js";
import { Pokemon } from "../resolvers/pokemon.js";
import { Ability } from "../resolvers/ability.js";
import { PokemonAbilityEdge } from "../resolvers/pokemonAbilityEdge.js";

/**
 * Combined resolver map for all GraphQL types.
 *
 * As new domains are added, import their resolvers and add them here:
 *
 * Example:
 * import { Move, MoveResolvers } from "./move/index.js";
 * import { Type, TypeResolvers } from "./type/index.js";
 *
 * export const resolvers: Resolvers = {
 *   Query,
 *   Node,
 *   Pokemon,
 *   Ability,
 *   Move,
 *   Type,
 *   ...
 * };
 */
export const resolvers: Resolvers = {
  Query,
  Node,
  Pokemon,
  Ability,
  PokemonAbilityEdge,
};
