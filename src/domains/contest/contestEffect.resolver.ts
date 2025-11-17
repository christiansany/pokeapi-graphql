import type { ContestEffectResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const ContestEffect: ContestEffectResolvers = {
  id: (parent) => encodeGlobalId("ContestEffect", parent.id),
  appeal: (parent) => parent.appeal,
  jam: (parent) => parent.jam,
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
      versionGroup: entry.version_group?.name ?? "",
    })),
};
