import type { BerryFlavorResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const BerryFlavor: BerryFlavorResolvers = {
  id: (parent) => encodeGlobalId("BerryFlavor", parent.id),
  name: (parent) => parent.name,
  berries: (parent) => ({
    edges: parent.berries.map((berryMap) => ({
      potency: berryMap.potency,
      berry: {
        name: berryMap.berry.name,
        url: berryMap.berry.url,
      },
    })),
  }),
  contestType: (parent) => ({
    name: parent.contest_type.name,
    url: parent.contest_type.url,
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
