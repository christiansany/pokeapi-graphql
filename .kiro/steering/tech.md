# Technology Stack

## Core Technologies

- **Runtime**: Node.js with ES modules
- **Language**: TypeScript 5.3+ with strict mode
- **GraphQL Server**: Apollo Server 4.10 with Express middleware
- **Schema**: Code-first approach using .graphql files

## Key Libraries

- `@apollo/server` - GraphQL server implementation
- `express` - HTTP server framework
- `dataloader` - Request batching and caching
- `node-cache` - In-memory caching layer
- `graphql-codegen` - Type generation from GraphQL schema
- `dotenv` - Environment variable management

## Development Tools

- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Type Checking**: TypeScript compiler (tsc)
- **Code Generation**: GraphQL Code Generator

## Common Commands

```bash
# Development
npm run dev              # Start dev server with nodemon
npm run codegen          # Generate TypeScript types from schema
npm run codegen:watch    # Watch mode for type generation

# Type Checking & Linting
npm run tsc              # Type check without emitting files
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues

# Formatting
npm run format           # Format all TypeScript files
npm run format:check     # Check formatting without changes

# Production
npm start                # Run compiled JavaScript
```

## Build Configuration

- **Module System**: ES modules (type: "module" in package.json)
- **TypeScript Config**: NodeNext module resolution, strict mode enabled
- **No Emit**: TypeScript used only for type checking (noEmit: true)
- **Deployment**: Vercel serverless functions
