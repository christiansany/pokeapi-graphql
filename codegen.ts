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
          Ability: "../domains/ability/ability.dto.js#AbilityDTO",
          Stat: "../domains/stat/stat.dto.js#StatDTO",
          Type: "../domains/type/type.dto.js#TypeDTO",
          Move: "../domains/move/move.dto.js#MoveDTO",
          Item: "../domains/item/item.dto.js#ItemDTO",
          ItemCategory: "../domains/item/item.dto.js#ItemCategoryDTO",
          ItemAttribute: "../domains/item/item.dto.js#ItemAttributeDTO",
          ItemFlingEffect: "../domains/item/item.dto.js#ItemFlingEffectDTO",
          ItemPocket: "../domains/item/item.dto.js#ItemPocketDTO",
          PokemonAbilityEdge: "{ slot: number; isHidden: boolean; abilityName: string }",
          PokemonStatEdge: "{ baseStat: number; effort: number; statName: string }",
          PokemonTypeEdge: "{ slot: number; typeName: string }",
          PokemonMoveEdge:
            "{ moveName: string; versionGroupDetails: Array<{ levelLearnedAt: number; moveLearnMethod: { name: string; url: string }; versionGroup: { name: string; url: string } }> }",
          PokemonVarietyEdge: "{ isDefault: boolean; pokemonName: string }",
          // Future domain-specific mappers will be added here as domains are implemented:
          // Location: "../domains/location/location.dto.js#LocationDTO",
          // etc.
        },
      },
    },
  },
};

export default config;
