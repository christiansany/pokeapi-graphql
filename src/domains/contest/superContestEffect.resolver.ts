import type { SuperContestEffectResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const SuperContestEffect: SuperContestEffectResolvers = {
  id: (parent) => encodeGlobalId("SuperContestEffect", parent.id),
  appeal: (parent) => parent.appeal,
  flavorTextEntries: (parent) =>
    parent.flavor_text_entries.map((entry) => ({
      flavorText: entry.flavor_text,
      language: entry.language.name,
      versionGroup: entry.version_group?.name ?? "",
    })),
  moves: (parent) =>
    parent.moves.map((move) => ({
      name: move.name,
      url: move.url,
    })),
};
