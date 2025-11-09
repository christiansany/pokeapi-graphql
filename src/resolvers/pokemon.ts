import type { PokemonResolvers } from "../types/generated.js";
import { encodeGlobalId } from "../utils/relay.js";

export const Pokemon: PokemonResolvers = {
  id: (parent) => encodeGlobalId("Pokemon", parent.id),
  name: (parent) => parent.name,
  height: (parent) => parent.height,
  weight: (parent) => parent.weight,
  baseExperience: (parent) => parent.base_experience,
  order: (parent) => parent.order,
  image: (parent) => parent.sprites.front_default || "",
  abilities: (parent) => parent.abilities,
};
