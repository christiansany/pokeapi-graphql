import type { MachineResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Resolver for Machine type
 * Machines are TMs/HMs that teach moves to Pokemon
 */
export const Machine: MachineResolvers = {
  id: (parent) => encodeGlobalId("Machine", parent.id),

  item: (parent) => ({
    name: parent.item.name,
    url: parent.item.url,
  }),

  move: (parent) => ({
    name: parent.move.name,
    url: parent.move.url,
  }),

  versionGroup: (parent) => ({
    name: parent.version_group.name,
    url: parent.version_group.url,
  }),
};
