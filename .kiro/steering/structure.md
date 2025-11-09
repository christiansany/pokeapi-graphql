# Project Structure

## Directory Organization

```
src/
├── schema/           # GraphQL schema definitions (.graphql files)
├── resolvers/        # GraphQL resolver implementations
├── datasources/      # Data fetching layer (PokéAPI client)
├── types/            # Generated TypeScript types
├── utils/            # Utility functions (cursor encoding, Relay helpers)
├── context.ts        # GraphQL context creation
└── index.ts          # Server entry point
```

## Architecture Patterns

### Data Layer
- **DataSource Pattern**: `PokeAPIDataSource` class encapsulates all PokéAPI interactions
- **Caching**: Two-level caching strategy
  - In-memory cache (node-cache) for cross-request persistence
  - DataLoader for per-request batching and deduplication
- **DTOs**: Data Transfer Objects match PokéAPI response structure

### GraphQL Layer
- **Schema-First**: GraphQL schemas defined in `.graphql` files
- **Type Generation**: `graphql-codegen` generates TypeScript types and resolver signatures
- **Resolvers**: Organized by type (Query, Pokemon, Ability, etc.)
- **Relay Compliance**: Implements Node interface and Connection/Edge patterns

### Resolver Organization
- Each GraphQL type has its own resolver file
- `resolvers/index.ts` aggregates all resolvers
- Resolvers are thin - delegate to datasources for data fetching

### Context Pattern
- Context created per-request in `createContext()`
- Contains datasource instances with shared cache/loaders
- Typed via `Context` interface for type safety

## File Naming Conventions
- TypeScript files use `.ts` extension
- GraphQL schemas use `.graphql` extension
- Resolver files named after their GraphQL type (lowercase)
- All imports use `.js` extension (required for ES modules)

## Key Files
- `src/index.ts` - Apollo Server setup, Express middleware, error handling
- `src/context.ts` - Context factory with datasource initialization
- `src/datasources/pokeapi.ts` - PokéAPI client with caching and batching
- `codegen.ts` - GraphQL Code Generator configuration
- `src/types/generated.ts` - Auto-generated types (do not edit manually)
