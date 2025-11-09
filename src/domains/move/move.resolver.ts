import type { MoveResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Move: MoveResolvers = {
  id: (parent) => encodeGlobalId("Move", parent.id),
  name: (parent) => parent.name,
  accuracy: (parent) => parent.accuracy,
  effectChance: (parent) => parent.effect_chance,
  pp: (parent) => parent.pp,
  priority: (parent) => parent.priority,
  power: (parent) => parent.power,
  damageClass: (parent) => ({
    name: parent.damage_class.name,
    url: parent.damage_class.url,
  }),
  effectEntries: (parent) =>
    parent.effect_entries.map((entry) => ({
      effect: entry.effect,
      shortEffect: entry.short_effect,
      language: {
        name: entry.language.name,
        url: entry.language.url,
      },
    })),
  learnedByPokemon: (parent) =>
    parent.learned_by_pokemon.map((pokemon) => ({
      name: pokemon.name,
      url: pokemon.url,
    })),
  flavorTextEntries: (parent) =>
    parent.flavor_text_entries.map((entry) => ({
      flavorText: entry.flavor_text,
      language: {
        name: entry.language.name,
        url: entry.language.url,
      },
      versionGroup: entry.version_group
        ? {
            name: entry.version_group.name,
            url: entry.version_group.url,
          }
        : null,
    })),
  generation: (parent) => ({
    name: parent.generation.name,
    url: parent.generation.url,
  }),
  meta: (parent) =>
    parent.meta
      ? {
          ailment: {
            name: parent.meta.ailment.name,
            url: parent.meta.ailment.url,
          },
          category: {
            name: parent.meta.category.name,
            url: parent.meta.category.url,
          },
          minHits: parent.meta.min_hits,
          maxHits: parent.meta.max_hits,
          minTurns: parent.meta.min_turns,
          maxTurns: parent.meta.max_turns,
          drain: parent.meta.drain,
          healing: parent.meta.healing,
          critRate: parent.meta.crit_rate,
          ailmentChance: parent.meta.ailment_chance,
          flinchChance: parent.meta.flinch_chance,
          statChance: parent.meta.stat_chance,
        }
      : null,
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
  target: (parent) => ({
    name: parent.target.name,
    url: parent.target.url,
  }),
  type: (parent) => ({
    name: parent.type.name,
    url: parent.type.url,
  }),
  contestType: (parent) =>
    parent.contest_type
      ? {
          name: parent.contest_type.name,
          url: parent.contest_type.url,
        }
      : null,
  contestEffect: (parent) =>
    parent.contest_effect
      ? {
          name: parent.contest_effect.name,
          url: parent.contest_effect.url,
        }
      : null,
  superContestEffect: (parent) =>
    parent.super_contest_effect
      ? {
          name: parent.super_contest_effect.name,
          url: parent.super_contest_effect.url,
        }
      : null,
  statChanges: (parent) =>
    parent.stat_changes.map((statChange) => ({
      change: statChange.change,
      stat: {
        name: statChange.stat.name,
        url: statChange.stat.url,
      },
    })),
};
