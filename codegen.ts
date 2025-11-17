import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    "./src/schema/**/*.graphql",
    "./src/domains/**/*.graphql", // Include domain-specific schemas
  ],
  generates: {
    "./src/types/generated.ts": {
      plugins: [
        {
          add: {
            content: ["/* eslint-disable */", "// @ts-nocheck"],
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
      config: {
        contextType: "../context.js#Context",
        mappers: {
          Pokemon: "../domains/pokemon/pokemon.dto.js#PokemonDTO",
          PokemonSpecies: "../domains/pokemon/pokemon.dto.js#PokemonSpeciesDTO",
          PokemonForm: "../domains/pokemon/pokemon.dto.js#PokemonFormDTO",
          EggGroup: "../domains/pokemon/pokemon.dto.js#EggGroupDTO",
          GrowthRate: "../domains/pokemon/pokemon.dto.js#GrowthRateDTO",
          Gender: "../domains/pokemon/pokemon.dto.js#GenderDTO",
          PokemonColor: "../domains/pokemon/pokemon.dto.js#PokemonColorDTO",
          PokemonShape: "../domains/pokemon/pokemon.dto.js#PokemonShapeDTO",
          PokemonHabitat: "../domains/pokemon/pokemon.dto.js#PokemonHabitatDTO",
          Ability: "../domains/ability/ability.dto.js#AbilityDTO",
          Stat: "../domains/stat/stat.dto.js#StatDTO",
          Characteristic: "../domains/stat/stat.dto.js#CharacteristicDTO",
          Nature: "../domains/stat/stat.dto.js#NatureDTO",
          Type: "../domains/type/type.dto.js#TypeDTO",
          Move: "../domains/move/move.dto.js#MoveDTO",
          Item: "../domains/item/item.dto.js#ItemDTO",
          ItemCategory: "../domains/item/item.dto.js#ItemCategoryDTO",
          ItemAttribute: "../domains/item/item.dto.js#ItemAttributeDTO",
          ItemFlingEffect: "../domains/item/item.dto.js#ItemFlingEffectDTO",
          ItemPocket: "../domains/item/item.dto.js#ItemPocketDTO",
          Location: "../domains/location/location.dto.js#LocationDTO",
          LocationArea: "../domains/location/location.dto.js#LocationAreaDTO",
          Region: "../domains/location/location.dto.js#RegionDTO",
          PalParkArea: "../domains/location/location.dto.js#PalParkAreaDTO",
          PalParkEncounter: "../domains/location/location.dto.js#PalParkEncounterDTO",
          PokemonAbilityEdge: "{ slot: number; isHidden: boolean; abilityName: string }",
          PokemonStatEdge: "{ baseStat: number; effort: number; statName: string }",
          PokemonTypeEdge: "{ slot: number; typeName: string }",
          PokemonMoveEdge:
            "{ moveName: string; versionGroupDetails: Array<{ levelLearnedAt: number; moveLearnMethod: { name: string; url: string }; versionGroup: { name: string; url: string } }> }",
          PokemonVarietyEdge: "{ isDefault: boolean; pokemonName: string }",
          PokemonEncounterEdge:
            "{ pokemonName: string; minLevel: number; maxLevel: number; conditionValues: Array<{ name: string; url: string }>; chance: number; method: { name: string; url: string } }",
          EvolutionChain: "../domains/evolution/evolution.dto.js#EvolutionChainDTO",
          EvolutionTrigger: "../domains/evolution/evolution.dto.js#EvolutionTriggerDTO",
          ChainLink: "../domains/evolution/evolution.dto.js#ChainLinkDTO",
          EvolutionDetail: "../domains/evolution/evolution.dto.js#EvolutionDetailDTO",
          Berry: "../domains/berry/berry.dto.js#BerryDTO",
          BerryFlavor: "../domains/berry/berry.dto.js#BerryFlavorDTO",
          BerryFirmness: "../domains/berry/berry.dto.js#BerryFirmnessDTO",
          BerryFlavorEdge: "{ potency: number; flavorName: string }",
          Generation: "../domains/game/game.dto.js#GenerationDTO",
          Pokedex: "../domains/game/game.dto.js#PokedexDTO",
          Version: "../domains/game/game.dto.js#VersionDTO",
          VersionGroup: "../domains/game/game.dto.js#VersionGroupDTO",
          ContestType: "../domains/contest/contest.dto.js#ContestTypeDTO",
          ContestEffect: "../domains/contest/contest.dto.js#ContestEffectDTO",
          SuperContestEffect: "../domains/contest/contest.dto.js#SuperContestEffectDTO",
          EncounterMethod: "../domains/encounter/encounter.dto.js#EncounterMethodDTO",
          EncounterCondition: "../domains/encounter/encounter.dto.js#EncounterConditionDTO",
          EncounterConditionValue:
            "../domains/encounter/encounter.dto.js#EncounterConditionValueDTO",
          Machine: "../domains/machine/machine.dto.js#MachineDTO",
        },
      },
    },
  },
};

export default config;
