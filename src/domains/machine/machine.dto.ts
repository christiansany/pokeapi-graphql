import type { NamedAPIResourceDTO } from "../base/common.dto.js";

/**
 * Machine DTO - Represents a TM or HM that teaches a move to Pokemon
 * Corresponds to PokeAPI Machine resource
 */
export interface MachineDTO {
  id: number;
  item: NamedAPIResourceDTO;
  move: NamedAPIResourceDTO;
  version_group: NamedAPIResourceDTO;
}
