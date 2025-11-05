import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLFormattedError } from 'graphql';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { resolvers } from './resolvers/index.ts';
import { createContext, Context } from './context.ts';

// Load environment variables
dotenv.config();

// Load GraphQL schema from .graphql files
const relaySchema = readFileSync(join(__dirname, 'schema', 'relay.graphql'), 'utf-8');
const mainSchema = readFileSync(join(__dirname, 'schema', 'schema.graphql'), 'utf-8');
const typeDefs = [relaySchema, mainSchema];

// Determine if running in production
const isProduction = process.env.NODE_ENV === 'production';

// Error formatting function
function formatError(formattedError: GraphQLFormattedError): GraphQLFormattedError {
  // Log error with context
  console.error('[GraphQL Error]', {
    message: formattedError.message,
    code: formattedError.extensions?.code,
    path: formattedError.path,
    timestamp: new Date().toISOString(),
  });

  // In production, sanitize error messages for security
  if (isProduction) {
    // Only expose safe error codes to clients
    const safeErrorCodes = [
      'POKEMON_NOT_FOUND',
      'INVALID_CURSOR',
      'INVALID_GLOBAL_ID',
      'BAD_USER_INPUT',
      'GRAPHQL_VALIDATION_FAILED',
    ];

    const errorCode = formattedError.extensions?.code as string;
    
    // If it's not a safe error code, return a generic error
    if (!safeErrorCodes.includes(errorCode)) {
      return {
        message: 'An internal server error occurred',
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      };
    }
  }

  // Include error code in extensions for client handling
  return {
    ...formattedError,
    extensions: {
      ...formattedError.extensions,
      code: formattedError.extensions?.code || 'INTERNAL_SERVER_ERROR',
    },
  };
}

// Initialize Apollo Server
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: !isProduction,
  includeStacktraceInErrorResponses: !isProduction,
  formatError,
});

// Start the server
async function startServer() {
  const port = parseInt(process.env.PORT || '4000', 10);
  
  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async () => createContext(),
  });
  
  console.log(`🚀 Server ready at ${url}`);
  console.log(`📊 GraphQL Playground: ${url}`);
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
