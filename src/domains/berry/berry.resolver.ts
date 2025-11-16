import type { BerryResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Berry: BerryResolvers = {
  id: (parent) => encodeGlobalId("Berry", parent.id),
  name: (parent) => parent.name,
  growthTime: (parent) => parent.growth_time,
  maxHarvest: (parent) => parent.max_harvest,
  naturalGiftPower: (parent) => parent.natural_gift_power,
  size: (parent) => parent.size,
  smoothness: (parent) => parent.smoothness,
  soilDryness: (parent) => parent.soil_dryness,
  firmness: (parent) => ({
    name: parent.firmness.name,
    url: parent.firmness.url,
  }),
  flavors: (parent) => ({
    edges: parent.flavors.map((flavorMap) => ({
      potency: flavorMap.potency,
      flavorName: flavorMap.flavor.name,
    })),
  }),
  item: (parent) => ({
    name: parent.item.name,
    url: parent.item.url,
  }),
  naturalGiftType: (parent) => ({
    name: parent.natural_gift_type.name,
    url: parent.natural_gift_type.url,
  }),
};
