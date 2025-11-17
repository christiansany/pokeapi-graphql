import type { EncounterConditionResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const EncounterCondition: EncounterConditionResolvers = {
  id: (parent) => encodeGlobalId("EncounterCondition", parent.id),
  name: (parent) => parent.name,
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: {
        name: n.language.name,
        url: n.language.url,
      },
    })),
  values: (parent) =>
    parent.values.map((v) => ({
      name: v.name,
      url: v.url,
    })),
};
