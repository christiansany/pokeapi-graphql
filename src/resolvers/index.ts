import type { Resolvers } from '../types/generated.ts';
import { Query } from './query.ts';
import { Pokemon } from './pokemon.ts';

export const resolvers: Resolvers = {
  Query,
  Pokemon,
};
