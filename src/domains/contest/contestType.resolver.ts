import type { ContestTypeResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const ContestType: ContestTypeResolvers = {
  id: (parent) => encodeGlobalId("ContestType", parent.id),
  name: (parent) => parent.name,
  berryFlavor: (parent) => ({
    name: parent.berry_flavor.name,
    url: parent.berry_flavor.url,
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
