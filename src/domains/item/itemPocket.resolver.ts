import type { ItemPocketResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const ItemPocket: ItemPocketResolvers = {
  id: (parent) => encodeGlobalId("ItemPocket", parent.id),
  name: (parent) => parent.name,
  categories: (parent) => parent.categories.map((cat) => ({ name: cat.name, url: cat.url })),
  names: (parent) =>
    parent.names.map((n) => ({
      name: n.name,
      language: { name: n.language.name, url: n.language.url },
    })),
};
