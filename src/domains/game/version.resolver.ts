import type { VersionResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Version: VersionResolvers = {
  id: (parent) => encodeGlobalId("Version", parent.id),
  name: (parent) => parent.name,
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
  versionGroup: (parent) => ({
    name: parent.version_group.name,
    url: parent.version_group.url,
  }),
};
