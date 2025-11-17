import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../types/generated.js";
import { decodeGlobalId } from "../utils/relay.js";

// Import domain query resolvers
import { pokemonQueries } from "../domains/pokemon/pokemon.query.js";
import { statQueries } from "../domains/stat/stat.query.js";
import { typeQueries } from "../domains/type/type.query.js";
import { moveQueries } from "../domains/move/move.query.js";
import { itemQueries } from "../domains/item/item.query.js";
import { locationQueries } from "../domains/location/location.query.js";
import { evolutionQueries } from "../domains/evolution/evolution.query.js";
import { berryQueries } from "../domains/berry/berry.query.js";
import { gameQueries } from "../domains/game/game.query.js";
import { contestQueries } from "../domains/contest/contest.query.js";
import { encounterQueries } from "../domains/encounter/encounter.query.js";
import { machineQueries } from "../domains/machine/machine.query.js";

/**
 * Root Query resolver
 * Aggregates all domain-specific query resolvers and implements the node interface
 */
export const Query: QueryResolvers = {
  // Node interface resolver - handles global ID lookups
  node: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded) {
      throw new GraphQLError("Invalid global ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    switch (decoded.typename) {
      case "Pokemon": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Pokemon ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getPokemonById(numericId);
      }
      case "PokemonSpecies": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonSpecies ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getSpeciesById(numericId);
      }
      case "PokemonForm": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonForm ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getFormById(numericId);
      }
      case "Ability": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Ability ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.ability.getAbilityById(numericId);
      }
      case "Stat": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Stat ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.stat.getStatById(numericId);
      }
      case "Characteristic": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Characteristic ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.stat.getCharacteristicById(numericId);
      }
      case "Nature": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Nature ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.stat.getNatureById(numericId);
      }
      case "Type": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Type ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.type.getTypeById(numericId);
      }
      case "Move": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Move ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.move.getMoveById(numericId);
      }
      case "Item": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Item ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemById(numericId);
      }
      case "ItemCategory": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemCategory ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemCategoryById(numericId);
      }
      case "ItemAttribute": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemAttribute ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemAttributeById(numericId);
      }
      case "ItemFlingEffect": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemFlingEffect ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemFlingEffectById(numericId);
      }
      case "ItemPocket": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemPocket ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemPocketById(numericId);
      }
      case "Location": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Location ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getLocationById(numericId);
      }
      case "Region": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Region ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getRegionById(numericId);
      }
      case "LocationArea": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid LocationArea ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getLocationAreaById(numericId);
      }
      case "PalParkArea": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PalParkArea ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getPalParkAreaById(numericId);
      }
      case "EvolutionChain": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EvolutionChain ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.evolution.getEvolutionChainById(numericId);
      }
      case "EvolutionTrigger": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EvolutionTrigger ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.evolution.getEvolutionTriggerById(numericId);
      }
      case "Berry": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Berry ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.berry.getBerryById(numericId);
      }
      case "BerryFlavor": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid BerryFlavor ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.berry.getBerryFlavorById(numericId);
      }
      case "BerryFirmness": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid BerryFirmness ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.berry.getBerryFirmnessById(numericId);
      }
      case "Generation": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Generation ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getGenerationById(numericId);
      }
      case "Version": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Version ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getVersionById(numericId);
      }
      case "VersionGroup": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid VersionGroup ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getVersionGroupById(numericId);
      }
      case "Pokedex": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Pokedex ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getPokedexById(numericId);
      }
      case "EggGroup": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EggGroup ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getEggGroupById(numericId);
      }
      case "GrowthRate": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid GrowthRate ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getGrowthRateById(numericId);
      }
      case "Gender": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Gender ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getGenderById(numericId);
      }
      case "PokemonColor": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonColor ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getPokemonColorById(numericId);
      }
      case "PokemonShape": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonShape ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getPokemonShapeById(numericId);
      }
      case "PokemonHabitat": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonHabitat ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getPokemonHabitatById(numericId);
      }
      case "ContestType": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ContestType ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.contest.getContestTypeById(numericId);
      }
      case "ContestEffect": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ContestEffect ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.contest.getContestEffectById(numericId);
      }
      case "SuperContestEffect": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid SuperContestEffect ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.contest.getSuperContestEffectById(numericId);
      }
      case "EncounterMethod": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EncounterMethod ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.encounter.getEncounterMethodById(numericId);
      }
      case "EncounterCondition": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EncounterCondition ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.encounter.getEncounterConditionById(numericId);
      }
      case "EncounterConditionValue": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EncounterConditionValue ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.encounter.getEncounterConditionValueById(numericId);
      }
      case "Machine": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Machine ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.machine.getMachineById(numericId);
      }
      default:
        // Unknown typename - return null per Relay spec (node not found)
        return null;
    }
  },

  // Domain query resolvers
  ...pokemonQueries,
  ...statQueries,
  ...typeQueries,
  ...moveQueries,
  ...itemQueries,
  ...locationQueries,
  ...evolutionQueries,
  ...berryQueries,
  ...gameQueries,
  ...contestQueries,
  ...encounterQueries,
  ...machineQueries,
};
