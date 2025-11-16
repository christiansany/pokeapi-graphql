import type { NatureResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Helper to extract ID from PokeAPI URL
 */
function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export const Nature: NatureResolvers = {
  id: (parent) => encodeGlobalId("Nature", parent.id),
  name: (parent) => parent.name,
  decreasedStat: async (parent, _args, context) => {
    if (!parent.decreased_stat) {
      return null;
    }
    const statId = extractIdFromUrl(parent.decreased_stat.url);
    const stat = await context.dataSources.stat.getStatById(statId);
    return stat;
  },
  increasedStat: async (parent, _args, context) => {
    if (!parent.increased_stat) {
      return null;
    }
    const statId = extractIdFromUrl(parent.increased_stat.url);
    const stat = await context.dataSources.stat.getStatById(statId);
    return stat;
  },
  hatesFlavor: (parent) =>
    parent.hates_flavor
      ? {
          name: parent.hates_flavor.name,
          url: parent.hates_flavor.url,
        }
      : null,
  likesFlavor: (parent) =>
    parent.likes_flavor
      ? {
          name: parent.likes_flavor.name,
          url: parent.likes_flavor.url,
        }
      : null,
  pokeathlonStatChanges: (parent) =>
    parent.pokeathlon_stat_changes.map((change) => ({
      maxChange: change.max_change,
      pokeathlonStat: {
        name: change.pokeathlon_stat.name,
        url: change.pokeathlon_stat.url,
      },
    })),
  moveBattleStylePreferences: (parent) =>
    parent.move_battle_style_preferences.map((pref) => ({
      lowHpPreference: pref.low_hp_preference,
      highHpPreference: pref.high_hp_preference,
      moveBattleStyle: {
        name: pref.move_battle_style.name,
        url: pref.move_battle_style.url,
      },
    })),
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
};
