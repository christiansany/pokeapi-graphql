# GraphQL Conventions

## Relay Specification Compliance

This project adheres to the Relay GraphQL Server Specification for consistency and client compatibility.

### Connection Specification

All paginated fields MUST follow or be compatible with the Relay Connection specification:

**Full Connection Implementation** (preferred for root queries):
- Use `Connection` and `Edge` types
- Include `PageInfo` with `hasNextPage`, `hasPreviousPage`, `startCursor`, `endCursor`
- Support `first`/`after` arguments (forward pagination)
- Support `last`/`before` arguments if bidirectional pagination is needed
- Include `totalCount` when feasible

Example: `Query.pokemons` field implements full Connection spec with pagination support.

**Connection-Compatible Implementation** (acceptable for nested fields):
- Use `Connection` suffix on type name
- Use `Edge` suffix for edge types
- Include `edges` array with `node` field
- May omit `PageInfo` if pagination is not needed
- May omit cursor-based pagination arguments

Example: `Pokemon.abilities` field uses `PokemonAbilityConnection` structure but doesn't implement full pagination (no cursors, no PageInfo) since all abilities are returned at once.

### Query Field Naming Convention

All Query fields MUST follow this naming pattern:

**Single Entity Queries** (by ID):
- Use `{entityName}ById` suffix for queries that fetch a single entity by its global ID
- Examples: `pokemonById(id: ID!)`, `moveById(id: ID!)`, `typeById(id: ID!)`
- This ensures the plural form is available for list/connection queries

**List/Connection Queries**:
- Use plural form without suffix for paginated list queries
- Examples: `pokemons(first: Int, after: String)`, `moves(first: Int, after: String)`
- Always return a Connection type with edges, pageInfo, and totalCount

**Rationale:**
- Keeps naming clean and predictable
- Avoids awkward names like `pokemonSpeciesList`
- Makes it clear which queries return single entities vs collections
- Follows common GraphQL patterns

### Node Interface

All types representing entities MUST implement the `Node` interface:
- Include globally unique `id: ID!` field
- Support fetching via `Query.node(id: ID!)` field
- Use base64-encoded format: `base64(TypeName:localId)`

### Global ID Format

- Encode: `base64("TypeName:localId")` 
- Decode: Extract typename and local ID from base64 string
- Always validate typename matches expected type
- Use utility functions in `src/utils/relay.ts`

### Cursor Format

- Cursors are opaque strings (clients should not parse them)
- Encode offset/position information as base64
- Always validate cursor format before use
- Return appropriate error codes for invalid cursors

### When to Use Full vs Compatible Connections

**Use Full Connection** when:
- Field is on root Query type
- Pagination is required or likely in the future
- Dataset can be large
- Client needs to know if more data exists

**Use Connection-Compatible** when:
- Field is nested on another type
- Dataset is always small/bounded
- Pagination adds unnecessary complexity
- Maintaining consistent naming is the priority

### Pagination Validation

All paginated query resolvers MUST use the `validatePaginationArgs` utility from `src/utils/relay.ts`:

```typescript
import { validatePaginationArgs } from "../utils/relay.js";

pokemons: async (_, args, { dataSources }) => {
  const { first, after } = args;
  
  // Validate pagination arguments
  const { limit, offset } = validatePaginationArgs(first, after);
  
  // Fetch data using validated limit and offset
  const listResponse = await dataSources.pokemon.getPokemonList(limit, offset);
  // ... rest of resolver
}
```

**Benefits:**
- Consistent validation across all paginated queries
- Proper error codes and messages
- Handles nullable `first` argument (uses PokeAPI default when null/undefined)
- Validates `first` is between 1-50 when provided
- Decodes and validates cursor format
- Returns offset starting AFTER cursor position (Relay forward pagination semantics)

### Error Handling

Use specific error codes for Relay-related errors:
- `INVALID_CURSOR` - Malformed or expired cursor (can't decode base64, invalid format)
- `INVALID_GLOBAL_ID` - Malformed global ID (can't decode, wrong typename, non-numeric ID when number expected)
- `INVALID_PAGINATION_ARGS` - Invalid first/last/after/before combination (e.g., first < 1 or first > 50)
- `NODE_NOT_FOUND` - Node ID is valid but the resource doesn't exist (use null return for `node` resolver with unknown typename)

**Error Handling Pattern:**

```typescript
// Specific query resolver (e.g., Query.pokemon)
pokemon: async (_, { id }, { dataSources }) => {
  const decoded = decodeGlobalId(id);
  
  // Throw error if can't decode or wrong typename
  if (!decoded || decoded.typename !== "Pokemon") {
    throw new GraphQLError("Invalid Pokemon ID format", {
      extensions: { code: "INVALID_GLOBAL_ID" },
    });
  }
  
  // Throw error if ID isn't numeric when expected
  const numericId = parseInt(decoded.id, 10);
  if (isNaN(numericId)) {
    throw new GraphQLError("Invalid Pokemon ID format", {
      extensions: { code: "INVALID_GLOBAL_ID" },
    });
  }
  
  // Return null if resource doesn't exist (DataSource returns null)
  return dataSources.pokemon.getPokemonById(numericId);
},

// Node resolver (generic)
node: async (_, { id }, { dataSources }) => {
  const decoded = decodeGlobalId(id);
  
  // Throw error if can't decode
  if (!decoded) {
    throw new GraphQLError("Invalid global ID format", {
      extensions: { code: "INVALID_GLOBAL_ID" },
    });
  }
  
  // Return null for unknown typename (per Relay spec)
  switch (decoded.typename) {
    case "Pokemon": {
      const numericId = parseInt(decoded.id, 10);
      if (isNaN(numericId)) {
        throw new GraphQLError("Invalid Pokemon ID format", {
          extensions: { code: "INVALID_GLOBAL_ID" },
        });
      }
      return dataSources.pokemon.getPokemonById(numericId);
    }
    default:
      return null; // Unknown typename
  }
}
```
