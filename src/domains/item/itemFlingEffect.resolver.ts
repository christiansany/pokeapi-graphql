import type { ItemFlingEffectResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const ItemFlingEffect: ItemFlingEffectResolvers = {
  id: (parent) => encodeGlobalId("ItemFlingEffect", parent.id),
  name: (parent) => parent.name,
  effectEntries: (parent) =>
    parent.effect_entries.map((entry) => ({
      effect: entry.effect,
      shortEffect: entry.short_effect,
      language: entry.language.name,
    })),
  items: (parent) => parent.items.map((item) => ({ name: item.name, url: item.url })),
};
