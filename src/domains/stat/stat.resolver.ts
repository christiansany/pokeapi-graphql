import type { StatResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Stat: StatResolvers = {
  id: (parent) => encodeGlobalId("Stat", parent.id),
  name: (parent) => parent.name,
  gameIndex: (parent) => parent.game_index,
  isBattleOnly: (parent) => parent.is_battle_only,
  affectingMoves: (parent) => ({
    increase: parent.affecting_moves.increase.map((moveAffect) => ({
      change: moveAffect.change,
      move: {
        name: moveAffect.move.name,
        url: moveAffect.move.url,
      },
    })),
    decrease: parent.affecting_moves.decrease.map((moveAffect) => ({
      change: moveAffect.change,
      move: {
        name: moveAffect.move.name,
        url: moveAffect.move.url,
      },
    })),
  }),
  affectingNatures: (parent) => ({
    increase: parent.affecting_natures.increase.map((nature) => ({
      name: nature.name,
      url: nature.url,
    })),
    decrease: parent.affecting_natures.decrease.map((nature) => ({
      name: nature.name,
      url: nature.url,
    })),
  }),
  characteristics: (parent) =>
    parent.characteristics.map((characteristic) => ({
      name: characteristic.name,
      url: characteristic.url,
    })),
  moveDamageClass: (parent) =>
    parent.move_damage_class
      ? {
          name: parent.move_damage_class.name,
          url: parent.move_damage_class.url,
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
};
