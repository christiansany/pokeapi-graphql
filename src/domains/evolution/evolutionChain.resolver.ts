import type {
  EvolutionChainResolvers,
  ChainLinkResolvers,
  EvolutionDetailResolvers,
} from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

/**
 * Helper to extract ID from PokeAPI URL
 */
function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * EvolutionChain resolver
 */
export const EvolutionChain: EvolutionChainResolvers = {
  id: (parent) => encodeGlobalId("EvolutionChain", parent.id),

  babyTriggerItem: async (parent, _, { dataSources }) => {
    if (!parent.baby_trigger_item) return null;
    const itemId = extractIdFromUrl(parent.baby_trigger_item.url);
    return dataSources.item.getItemById(itemId);
  },

  chain: (parent) => parent.chain,
};

/**
 * ChainLink resolver
 */
export const ChainLink: ChainLinkResolvers = {
  isBaby: (parent) => parent.is_baby,

  species: async (parent, _, { dataSources }) => {
    const speciesId = extractIdFromUrl(parent.species.url);
    const species = await dataSources.pokemon.getSpeciesById(speciesId);
    if (!species) {
      throw new Error(`Species not found: ${parent.species.name}`);
    }
    return species;
  },

  evolutionDetails: (parent) => parent.evolution_details,

  evolvesTo: (parent) => parent.evolves_to,
};

/**
 * EvolutionDetail resolver
 */
export const EvolutionDetail: EvolutionDetailResolvers = {
  item: async (parent, _, { dataSources }) => {
    if (!parent.item) return null;
    const itemId = extractIdFromUrl(parent.item.url);
    return dataSources.item.getItemById(itemId);
  },

  trigger: async (parent, _, { dataSources }) => {
    const triggerName = parent.trigger.name;
    const trigger = await dataSources.evolution.getEvolutionTriggerByName(triggerName);
    if (!trigger) {
      throw new Error(`Evolution trigger not found: ${triggerName}`);
    }
    return trigger;
  },

  gender: (parent) => parent.gender,

  heldItem: async (parent, _, { dataSources }) => {
    if (!parent.held_item) return null;
    const itemId = extractIdFromUrl(parent.held_item.url);
    return dataSources.item.getItemById(itemId);
  },

  knownMove: async (parent, _, { dataSources }) => {
    if (!parent.known_move) return null;
    const moveId = extractIdFromUrl(parent.known_move.url);
    return dataSources.move.getMoveById(moveId);
  },

  knownMoveType: async (parent, _, { dataSources }) => {
    if (!parent.known_move_type) return null;
    const typeId = extractIdFromUrl(parent.known_move_type.url);
    return dataSources.type.getTypeById(typeId);
  },

  location: async (parent, _, { dataSources }) => {
    if (!parent.location) return null;
    const locationId = extractIdFromUrl(parent.location.url);
    return dataSources.location.getLocationById(locationId);
  },

  minLevel: (parent) => parent.min_level,
  minHappiness: (parent) => parent.min_happiness,
  minBeauty: (parent) => parent.min_beauty,
  minAffection: (parent) => parent.min_affection,
  needsOverworldRain: (parent) => parent.needs_overworld_rain,

  partySpecies: async (parent, _, { dataSources }) => {
    if (!parent.party_species) return null;
    const speciesId = extractIdFromUrl(parent.party_species.url);
    return dataSources.pokemon.getSpeciesById(speciesId);
  },

  partyType: async (parent, _, { dataSources }) => {
    if (!parent.party_type) return null;
    const typeId = extractIdFromUrl(parent.party_type.url);
    return dataSources.type.getTypeById(typeId);
  },

  relativePhysicalStats: (parent) => parent.relative_physical_stats,
  timeOfDay: (parent) => parent.time_of_day,

  tradeSpecies: async (parent, _, { dataSources }) => {
    if (!parent.trade_species) return null;
    const speciesId = extractIdFromUrl(parent.trade_species.url);
    return dataSources.pokemon.getSpeciesById(speciesId);
  },

  turnUpsideDown: (parent) => parent.turn_upside_down,
};
