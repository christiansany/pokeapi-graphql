# Project Structure

## Directory Organization

```
src/
├── domains/          # Domain-driven organization by entity type
│   ├── base/         # Shared base classes and common DTOs
│   ├── ability/      # Ability domain (schema, resolver, datasource, DTOs)
│   ├── move/         # Move domain
│   ├── pokemon/      # Pokemon domain
│   ├── stat/         # Stat domain
│   ├── type/         # Type domain
│   └── index.ts      # Domain exports aggregation
├── schema/           # Root GraphQL schema definitions
├── resolvers/        # Root-level resolvers (Query, Node interface)
├── datasources/      # Legacy/shared datasources (being phased out)
├── types/            # Generated TypeScript types
├── utils/            # Utility functions (cursor encoding, Relay helpers)
├── context.ts        # GraphQL context creation
└── index.ts          # Server entry point
```

## Architecture Patterns

### Domain-Driven Structure
Each domain (ability, move, pokemon, etc.) is self-contained with:
- **GraphQL Schema** (`*.graphql`) - Type definitions for the domain
- **Resolver** (`*.resolver.ts`) - GraphQL resolver implementations
- **DataSource** (`*DataSource.ts`) - Data fetching logic with caching/batching
- **DTOs** (`*.dto.ts`) - Data Transfer Objects matching PokéAPI responses

Example domain structure:
```
src/domains/ability/
├── ability.graphql          # GraphQL type definitions
├── ability.resolver.ts      # Resolver implementations
├── AbilityDataSource.ts     # Data fetching with DataLoader
└── ability.dto.ts           # TypeScript interfaces for API responses
```

### Data Layer
- **Base DataSource Pattern**: `BasePokeAPIDataSource` provides shared functionality
  - Shared cache instance across all domains
  - Common fetch method with error handling
  - Helper methods for DataLoader creation
  - URL parsing utilities (extractIdFromUrl, extractNameFromUrl)
- **Domain DataSources**: Each domain extends `BasePokeAPIDataSource`
  - Domain-specific DataLoader instances for batching
  - Type-safe methods for fetching domain entities
- **Caching**: Two-level caching strategy
  - In-memory cache (node-cache) shared across all DataSources
  - DataLoader for per-request batching and deduplication
- **DTOs**: Data Transfer Objects match PokéAPI response structure

### GraphQL Layer
- **Schema-First**: GraphQL schemas defined in `.graphql` files
- **Type Generation**: `graphql-codegen` generates TypeScript types and resolver signatures
- **Resolvers**: Organized by domain, aggregated in `resolvers/index.ts`
- **Relay Compliance**: Implements Node interface and Connection/Edge patterns

### Resolver Organization
- Domain resolvers live within their domain folder
- Root resolvers (Query, Node) in `src/resolvers/`
- `resolvers/index.ts` aggregates all resolvers from domains
- Resolvers are thin - delegate to domain DataSources for data fetching

### Context Pattern
- Context created per-request in `createContext()`
- Contains domain DataSource instances with shared cache
- Each DataSource gets fresh DataLoader instances per request
- Typed via `Context` interface for type safety

## File Naming Conventions
- TypeScript files use `.ts` extension
- GraphQL schemas use `.graphql` extension
- Domain files use lowercase with domain name prefix (e.g., `ability.resolver.ts`)
- DataSource classes use PascalCase with suffix (e.g., `AbilityDataSource.ts`)
- All imports use `.js` extension (required for ES modules)

## Key Files
- `src/index.ts` - Apollo Server setup, Express middleware, error handling
- `src/context.ts` - Context factory with domain DataSource initialization
- `src/domains/base/BasePokeAPIDataSource.ts` - Base class for all DataSources
- `src/domains/base/common.dto.ts` - Shared DTO types across domains
- `src/domains/index.ts` - Aggregates and exports all domain resolvers
- `src/resolvers/index.ts` - Combines root and domain resolvers
- `codegen.ts` - GraphQL Code Generator configuration
- `src/types/generated.ts` - Auto-generated types (do not edit manually)

## Migration Notes
- Legacy `src/datasources/pokeapi.ts` is being phased out in favor of domain-specific DataSources
- New domains should follow the established pattern in `src/domains/ability/` or `src/domains/move/`
