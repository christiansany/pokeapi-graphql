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
          Ability: "../domains/ability/ability.dto.js#AbilityDTO",
          PokemonAbilityEdge: "{ slot: number; isHidden: boolean; abilityName: string }",
          // Future domain-specific mappers will be added here as domains are implemented:
          // Move: "../domains/move/move.dto.js#MoveDTO",
          // Type: "../domains/type/type.dto.js#TypeDTO",
          // Item: "../domains/item/item.dto.js#ItemDTO",
          // etc.
        },
      },
    },
  },
};

export default config;
