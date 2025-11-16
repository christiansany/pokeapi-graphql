import type { ItemCategoryResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const ItemCategory: ItemCategoryResolvers = {
  id: (parent) => encodeGlobalId("ItemCategory", parent.id),
  name: (parent) => parent.name,
  items: (parent) => parent.items.map((item) => ({ name: item.name, url: item.url })),
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: { name: n.language.name, url: n.language.url },
    })),
  pocket: (parent) => ({ name: parent.pocket.name, url: parent.pocket.url }),
};
