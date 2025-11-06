import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import type { GraphQLFormattedError } from "graphql";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { resolvers } from "./resolvers/index.ts";
import { createContext } from "./context.ts";
import type { Context } from "./context.ts";

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

// Determine if running in production
const isProduction = process.env.NODE_ENV === "production";

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
  introspection: true, // Enable introspection for GraphiQL
  includeStacktraceInErrorResponses: !isProduction,
  formatError,
});

// Create Express application
const app = express();

// Start the server
async function startServer() {
  const port = process.env.PORT || 3000;

  // Start Apollo Server
  await server.start();

  // Configure middleware
  app.use(cors());
  app.use(express.json());

  // Apply Apollo middleware to /graphql route for POST requests
  app.use(
    "/",
    expressMiddleware(server, {
      context: async () => createContext(),
    })
  );

  // Conditionally start server for local development
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

// Export Express app for Vercel
export default app;
