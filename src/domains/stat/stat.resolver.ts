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
  affectingNatures: async (parent, _args, context) => {
    // Fetch all increasing natures
    const increasePromises = parent.affecting_natures.increase.map((nature) =>
      context.dataSources.stat.getNatureByName(nature.name)
    );

    // Fetch all decreasing natures
    const decreasePromises = parent.affecting_natures.decrease.map((nature) =>
      context.dataSources.stat.getNatureByName(nature.name)
    );

    const [increaseNatures, decreaseNatures] = await Promise.all([
      Promise.all(increasePromises),
      Promise.all(decreasePromises),
    ]);

    return {
      increase: increaseNatures.filter(
        (nature): nature is NonNullable<typeof nature> => nature !== null
      ),
      decrease: decreaseNatures.filter(
        (nature): nature is NonNullable<typeof nature> => nature !== null
      ),
    };
  },
  characteristics: async (parent, _args, context) => {
    // Extract IDs from characteristic URLs and fetch them
    const characteristicIds = parent.characteristics
      .map((char) => {
        const match = char.url.match(/\/characteristic\/(\d+)\//);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((id): id is number => id !== null);

    // Fetch all characteristics using DataLoader for batching
    const characteristics = await Promise.all(
      characteristicIds.map((id) => context.dataSources.stat.getCharacteristicById(id))
    );

    // Filter out nulls and return
    return characteristics.filter((char): char is NonNullable<typeof char> => char !== null);
  },
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
