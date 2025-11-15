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
- `INVALID_CURSOR` - Malformed or expired cursor
- `INVALID_GLOBAL_ID` - Malformed global ID
- `INVALID_PAGINATION_ARGS` - Invalid first/last/after/before combination
- `NODE_NOT_FOUND` - Node ID doesn't exist
