import type { AbilityResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Ability: AbilityResolvers = {
  id: (parent) => encodeGlobalId("Ability", parent.id),
  name: (parent) => parent.name,
  effectEntries: (parent) =>
    parent.effect_entries.map((entry) => ({
      effect: entry.effect,
      shortEffect: entry.short_effect,
      language: entry.language.name,
    })),
  flavorTextEntries: (parent) =>
    parent.flavor_text_entries.map((entry) => ({
      flavorText: entry.flavor_text,
      language: entry.language.name,
      versionGroup: entry.version_group.name,
    })),
};
