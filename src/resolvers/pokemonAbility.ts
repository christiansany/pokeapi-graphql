import type { PokemonAbilityResolvers } from "../types/generated.js";
import { encodeGlobalId } from "../utils/relay.js";

export const PokemonAbility: PokemonAbilityResolvers = {
  id: async (parent, _, { dataSources }) => {
    const abilityData = await dataSources.pokeapi.abilityLoader.load(parent.ability.name);
    const numericId = abilityData?.id ?? 0;
    return encodeGlobalId("PokemonAbility", numericId);
  },
  name: (parent) => parent.ability.name,
  slot: (parent) => parent.slot,
  isHidden: (parent) => parent.is_hidden,
  effectEntries: async (parent, _, { dataSources }) => {
    const abilityData = await dataSources.pokeapi.abilityLoader.load(parent.ability.name);

    if (!abilityData) {
      return [];
    }

    return abilityData.effect_entries.map((entry) => ({
      effect: entry.effect,
      shortEffect: entry.short_effect,
      language: entry.language.name,
    }));
  },
  flavorTextEntries: async (parent, _, { dataSources }) => {
    const abilityData = await dataSources.pokeapi.abilityLoader.load(parent.ability.name);

    if (!abilityData) {
      return [];
    }

    return abilityData.flavor_text_entries.map((entry) => ({
      flavorText: entry.flavor_text,
      language: entry.language.name,
      versionGroup: entry.version_group.name,
    }));
  },
};
