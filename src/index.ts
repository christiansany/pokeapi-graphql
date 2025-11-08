import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import type { GraphQLFormattedError } from "graphql";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { resolvers } from "./resolvers/index.js";
import { createContext } from "./context.js";
import type { Context } from "./context.js";

// Determine if running in production
const isProduction = process.env.NODE_ENV === "production";

const ENDPOINT = isProduction ? "https://pokeapi-graphql-one.vercel.app" : "http://localhost:3000/graphql";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Load GraphQL schema from .graphql files
const relaySchema = readFileSync(
  join(__dirname, "schema", "relay.graphql"),
  "utf-8"
);
const mainSchema = readFileSync(
  join(__dirname, "schema", "schema.graphql"),
  "utf-8"
);
const typeDefs = [relaySchema, mainSchema];

// Error formatting function
function formatError(
  formattedError: GraphQLFormattedError
): GraphQLFormattedError {
  // Log error with context
  console.error("[GraphQL Error]", {
    message: formattedError.message,
    code: formattedError.extensions?.code,
    path: formattedError.path,
    timestamp: new Date().toISOString(),
  });

  // In production, sanitize error messages for security
  if (isProduction) {
    // Only expose safe error codes to clients
    const safeErrorCodes = [
      "POKEMON_NOT_FOUND",
      "INVALID_CURSOR",
      "INVALID_GLOBAL_ID",
      "BAD_USER_INPUT",
      "GRAPHQL_VALIDATION_FAILED",
    ];

    const errorCode = formattedError.extensions?.code as string;

    // If it's not a safe error code, return a generic error
    if (!safeErrorCodes.includes(errorCode)) {
      return {
        message: "An internal server error occurred",
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      };
    }
  }

  // Include error code in extensions for client handling
  return {
    ...formattedError,
    extensions: {
      ...formattedError.extensions,
      code: formattedError.extensions?.code || "INTERNAL_SERVER_ERROR",
    },
  };
}

// Initialize Apollo Server
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  includeStacktraceInErrorResponses: !isProduction,
  formatError,
  plugins: [
    {
      async serverWillStart() {
        return {
          async renderLandingPage() {
            const html = `
<!--
 *  Copyright (c) 2025 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
-->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GraphiQL 5 with React 19 and GraphiQL Explorer</title>
    <style>
      body {
        margin: 0;
      }

      #graphiql {
        height: 100dvh;
      }

      .loading {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
      }
    </style>
    <link rel="stylesheet" href="https://esm.sh/graphiql/dist/style.css" />
    <link
      rel="stylesheet"
      href="https://esm.sh/@graphiql/plugin-explorer/dist/style.css"
    />
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@19.1.0",
          "react/": "https://esm.sh/react@19.1.0/",

          "react-dom": "https://esm.sh/react-dom@19.1.0",
          "react-dom/": "https://esm.sh/react-dom@19.1.0/",

          "graphiql": "https://esm.sh/graphiql?standalone&external=react,react-dom,@graphiql/react,graphql",
          "graphiql/": "https://esm.sh/graphiql/",
          "@graphiql/plugin-explorer": "https://esm.sh/@graphiql/plugin-explorer?standalone&external=react,@graphiql/react,graphql",
          "@graphiql/react": "https://esm.sh/@graphiql/react?standalone&external=react,react-dom,graphql,@graphiql/toolkit,@emotion/is-prop-valid",

          "@graphiql/toolkit": "https://esm.sh/@graphiql/toolkit?standalone&external=graphql",
          "graphql": "https://esm.sh/graphql@16.11.0",
          "@emotion/is-prop-valid": "data:text/javascript,"
        }
      }
    </script>
    <script type="module">
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import { GraphiQL, HISTORY_PLUGIN } from 'graphiql';
      import { createGraphiQLFetcher } from '@graphiql/toolkit';
      import { explorerPlugin } from '@graphiql/plugin-explorer';
      import 'graphiql/setup-workers/esm.sh';

      const fetcher = createGraphiQLFetcher({
        url: '${ENDPOINT}',
      });
      const plugins = [HISTORY_PLUGIN, explorerPlugin()];

      function App() {
        return React.createElement(GraphiQL, {
          fetcher,
          plugins,
          defaultEditorToolsVisibility: true,
        });
      }

      const container = document.getElementById('graphiql');
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(App));
    </script>
  </head>
  <body>
    <div id="graphiql">
      <div class="loading">Loading…</div>
    </div>
  </body>
</html>`;
            return { html };
          },
        };
      },
    },
  ],
});

// Create Express application
const app = express();

await server.start();

// Configure middleware
app.use(cors());
app.use(express.json());

// Apply Apollo middleware to /graphql route for POST requests
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async () => createContext(),
  })
);

export default app;
