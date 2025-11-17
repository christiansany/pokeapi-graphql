import type { EncounterMethodResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const EncounterMethod: EncounterMethodResolvers = {
  id: (parent) => encodeGlobalId("EncounterMethod", parent.id),
  name: (parent) => parent.name,
  order: (parent) => parent.order,
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: {
        name: n.language.name,
        url: n.language.url,
      },
    })),
};
