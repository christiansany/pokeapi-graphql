import type { ItemAttributeResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const ItemAttribute: ItemAttributeResolvers = {
  id: (parent) => encodeGlobalId("ItemAttribute", parent.id),
  name: (parent) => parent.name,
  items: (parent) => parent.items.map((item) => ({ name: item.name, url: item.url })),
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: { name: n.language.name, url: n.language.url },
    })),
  descriptions: (parent) =>
    parent.descriptions.map((d) => ({
      description: d.description,
      language: { name: d.language.name, url: d.language.url },
    })),
};
