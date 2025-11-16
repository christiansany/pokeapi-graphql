import type { BerryFirmnessResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const BerryFirmness: BerryFirmnessResolvers = {
  id: (parent) => encodeGlobalId("BerryFirmness", parent.id),
  name: (parent) => parent.name,
  berries: (parent) =>
    parent.berries.map((berry) => ({
      name: berry.name,
      url: berry.url,
    })),
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: {
        name: n.language.name,
        url: n.language.url,
      },
    })),
};
