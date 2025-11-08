import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema/**/*.graphql",
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
          Pokemon: "../datasources/pokeapi.js#PokemonDTO",
        },
      },
    },
  },
};

export default config;
