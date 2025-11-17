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
- **Type Resolver** (`*.resolver.ts`) - GraphQL type field resolver implementations
- **Query Resolver** (`*.query.ts`) - Query field resolver implementations for this domain
- **DataSource** (`*DataSource.ts`) - Data fetching logic with caching/batching
- **DTOs** (`*.dto.ts`) - Data Transfer Objects matching PokéAPI responses

Example domain structure:
```
src/domains/machine/
├── machine.graphql          # GraphQL type definitions
├── machine.resolver.ts      # Type field resolvers (Machine type)
├── machine.query.ts         # Query field resolvers (machineById, machines)
├── MachineDataSource.ts     # Data fetching with DataLoader
└── machine.dto.ts           # TypeScript interfaces for API responses
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

#### Type Resolvers
- Domain type resolvers live within their domain folder (e.g., `src/domains/pokemon/pokemon.resolver.ts`)
- These resolve fields on GraphQL types (e.g., Pokemon.id, Pokemon.name)
- `src/resolvers/index.ts` is the **single source of truth** that aggregates ALL type resolvers
- When adding new domain type resolvers, they MUST be imported and exported in `src/resolvers/index.ts`
- Type resolvers are thin - delegate to domain DataSources for data fetching

**Critical Pattern for Adding New Type Resolvers:**
```typescript
// In src/resolvers/index.ts
import { NewType } from "../domains/newdomain/newtype.resolver.js";
import { NewTypeEdge } from "../domains/newdomain/edges/newtypeEdge.edge.js";

export const resolvers: Resolvers = {
  Query,
  Node,
  // ... existing resolvers
  NewType,        // Add new type resolver
  NewTypeEdge,    // Add new edge resolver
};
```

#### Query Resolvers
- Domain query resolvers live within their domain folder (e.g., `src/domains/machine/machine.query.ts`)
- These resolve Query fields (e.g., Query.machineById, Query.machines)
- Query resolvers are aggregated in `src/resolvers/query.ts` using the spread operator
- This pattern keeps the main query.ts file manageable as the API grows

**Critical Pattern for Adding New Query Resolvers:**
```typescript
// In src/domains/machine/machine.query.ts
import type { QueryResolvers } from "../../types/generated.js";

export const machineQueries: Pick<QueryResolvers, "machineById" | "machines"> = {
  machineById: async (_, { id }, { dataSources }) => {
    // Implementation
  },
  machines: async (_, args, { dataSources }) => {
    // Implementation
  },
};

// In src/resolvers/query.ts
import { machineQueries } from "../domains/machine/machine.query.js";

export const Query: QueryResolvers = {
  // ... other query fields
  
  // Machine queries
  ...machineQueries,
};
```

**Important:** 
- The server imports from `src/resolvers/index.ts`, not from `src/domains/`
- Forgetting to add type resolvers to index.ts will cause GraphQL to use default resolvers
- Query resolvers MUST be spread into the Query object in `src/resolvers/query.ts`
- Always use the `Pick<QueryResolvers, "field1" | "field2">` type for domain query exports

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
- `src/resolvers/index.ts` - **Single source of truth** - aggregates ALL type resolvers (root + domain)
- `src/resolvers/query.ts` - Root Query resolver that aggregates domain query resolvers using spread operator
- `src/resolvers/node.ts` - Node interface resolver for global ID lookups
- `src/domains/{domain}/{domain}.query.ts` - Domain-specific Query field resolvers
- `codegen.ts` - GraphQL Code Generator configuration
- `src/types/generated.ts` - Auto-generated types (do not edit manually)

## Migration Notes
- Legacy `src/datasources/pokeapi.ts` is being phased out in favor of domain-specific DataSources
- New domains should follow the established pattern in `src/domains/ability/` or `src/domains/move/`
