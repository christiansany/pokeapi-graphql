import type { EncounterConditionValueResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const EncounterConditionValue: EncounterConditionValueResolvers = {
  id: (parent) => encodeGlobalId("EncounterConditionValue", parent.id),
  name: (parent) => parent.name,
  condition: (parent) => ({
    name: parent.condition.name,
    url: parent.condition.url,
  }),
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: {
        name: n.language.name,
        url: n.language.url,
      },
    })),
};
