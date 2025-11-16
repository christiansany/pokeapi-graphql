import type { ItemResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Item: ItemResolvers = {
  id: (parent) => encodeGlobalId("Item", parent.id),
  name: (parent) => parent.name,
  cost: (parent) => parent.cost,
  flingPower: (parent) => parent.fling_power,
  flingEffect: (parent) =>
    parent.fling_effect ? { name: parent.fling_effect.name, url: parent.fling_effect.url } : null,
  attributes: (parent) => parent.attributes.map((attr) => ({ name: attr.name, url: attr.url })),
  category: (parent) => ({ name: parent.category.name, url: parent.category.url }),
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
  gameIndices: (parent) =>
    parent.game_indices.map((gi) => ({
      gameIndex: gi.game_index,
      version: { name: gi.version.name, url: gi.version.url },
    })),
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: { name: n.language.name, url: n.language.url },
    })),
  sprites: (parent) => ({
    default: parent.sprites.default,
  }),
  heldByPokemon: (parent) =>
    parent.held_by_pokemon.map((holder) => ({
      pokemon: holder.pokemon.name,
      versionDetails: holder.version_details.map((vd) => ({
        rarity: vd.rarity,
        version: vd.version.name,
      })),
    })),
};
