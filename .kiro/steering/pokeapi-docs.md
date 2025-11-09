# PokeAPI v2 - Complete REST Endpoint Documentation

This document provides a comprehensive overview of all REST endpoints available in the PokeAPI v2 and how they are interconnected.

## Base URL

```
https://pokeapi.co/api/v2
```

## API Characteristics

- **Read-only API**: Only GET requests are supported
- **No authentication required**: All endpoints are publicly accessible
- **No rate limiting**: But please cache resources locally per fair use policy
- **Pagination**: All list endpoints support `?limit=` and `?offset=` query parameters
- **Default page size**: 20 items per page

## Endpoint Categories

### 1. Berries (3 endpoints)

Berries are consumable items that provide various effects when eaten by Pokémon.

```
GET /berry/                    → NamedAPIResourceList
GET /berry/{id or name}        → Berry
GET /berry-firmness/           → NamedAPIResourceList
GET /berry-firmness/{id or name} → BerryFirmness
GET /berry-flavor/             → NamedAPIResourceList
GET /berry-flavor/{id or name} → BerryFlavor
```

**Connections:**
- `Berry` → references `BerryFirmness`, `BerryFlavor`, `Item`, `Type`
- `BerryFlavor` → references `Berry`, `ContestType`
- `BerryFirmness` → references `Berry`

### 2. Contests (3 endpoints)

Contest-related data for Pokémon competitions.

```
GET /contest-type/             → NamedAPIResourceList
GET /contest-type/{id or name} → ContestType
GET /contest-effect/           → APIResourceList (unnamed)
GET /contest-effect/{id}       → ContestEffect
GET /super-contest-effect/     → APIResourceList (unnamed)
GET /super-contest-effect/{id} → SuperContestEffect
```

**Connections:**
- `ContestType` → references `BerryFlavor`
- `ContestEffect` → standalone
- `SuperContestEffect` → references `Move`

### 3. Encounters (3 endpoints)

Details about how and where Pokémon can be encountered in the wild.

```
GET /encounter-method/         → NamedAPIResourceList
GET /encounter-method/{id or name} → EncounterMethod
GET /encounter-condition/      → NamedAPIResourceList
GET /encounter-condition/{id or name} → EncounterCondition
GET /encounter-condition-value/ → NamedAPIResourceList
GET /encounter-condition-value/{id or name} → EncounterConditionValue
```

**Connections:**
- `EncounterCondition` → references `EncounterConditionValue`
- `EncounterConditionValue` → references `EncounterCondition`
- Used by: `LocationArea`

### 4. Evolution (2 endpoints)

Evolution chains and triggers for Pokémon evolution.

```
GET /evolution-chain/          → APIResourceList (unnamed)
GET /evolution-chain/{id}      → EvolutionChain
GET /evolution-trigger/        → NamedAPIResourceList
GET /evolution-trigger/{id or name} → EvolutionTrigger
```

**Connections:**
- `EvolutionChain` → references `Item`, `PokemonSpecies`, `EvolutionTrigger`, `Move`, `Type`, `Location`
- `EvolutionTrigger` → references `PokemonSpecies`
- Referenced by: `PokemonSpecies`

### 5. Games (4 endpoints)

Information about Pokémon game versions, generations, and Pokédexes.

```
GET /generation/               → NamedAPIResourceList
GET /generation/{id or name}   → Generation
GET /pokedex/                  → NamedAPIResourceList
GET /pokedex/{id or name}      → Pokedex
GET /version/                  → NamedAPIResourceList
GET /version/{id or name}      → Version
GET /version-group/            → NamedAPIResourceList
GET /version-group/{id or name} → VersionGroup
```

**Connections:**
- `Generation` → references `Ability`, `Region`, `Move`, `PokemonSpecies`, `Type`, `VersionGroup`
- `Pokedex` → references `PokemonSpecies`, `Region`, `VersionGroup`
- `Version` → references `VersionGroup`
- `VersionGroup` → references `Generation`, `MoveLearnMethod`, `Pokedex`, `Region`, `Version`

### 6. Items (5 endpoints)

All items in the Pokémon games.

```
GET /item/                     → NamedAPIResourceList
GET /item/{id or name}         → Item
GET /item-attribute/           → NamedAPIResourceList
GET /item-attribute/{id or name} → ItemAttribute
GET /item-category/            → NamedAPIResourceList
GET /item-category/{id or name} → ItemCategory
GET /item-fling-effect/        → NamedAPIResourceList
GET /item-fling-effect/{id or name} → ItemFlingEffect
GET /item-pocket/              → NamedAPIResourceList
GET /item-pocket/{id or name}  → ItemPocket
```

**Connections:**
- `Item` → references `ItemFlingEffect`, `ItemAttribute`, `ItemCategory`, `Pokemon`, `EvolutionChain`, `Machine`
- `ItemCategory` → references `Item`, `ItemPocket`
- `ItemAttribute` → references `Item`
- `ItemFlingEffect` → references `Item`
- `ItemPocket` → references `ItemCategory`

### 7. Locations (4 endpoints)

Geographic locations in the Pokémon world.

```
GET /location/                 → NamedAPIResourceList
GET /location/{id or name}     → Location
GET /location-area/            → NamedAPIResourceList
GET /location-area/{id or name} → LocationArea
GET /pal-park-area/            → NamedAPIResourceList
GET /pal-park-area/{id or name} → PalParkArea
GET /region/                   → NamedAPIResourceList
GET /region/{id or name}       → Region
```

**Connections:**
- `Location` → references `Region`, `LocationArea`
- `LocationArea` → references `Location`, `EncounterMethod`, `Pokemon`, `Version`
- `PalParkArea` → references `PokemonSpecies`
- `Region` → references `Location`, `Generation`, `Pokedex`, `VersionGroup`

### 8. Machines (1 endpoint)

TMs and HMs that teach moves to Pokémon.

```
GET /machine/                  → APIResourceList (unnamed)
GET /machine/{id}              → Machine
```

**Connections:**
- `Machine` → references `Item`, `Move`, `VersionGroup`

### 9. Moves (7 endpoints)

All moves that Pokémon can learn.

```
GET /move/                     → NamedAPIResourceList
GET /move/{id or name}         → Move
GET /move-ailment/             → NamedAPIResourceList
GET /move-ailment/{id or name} → MoveAilment
GET /move-battle-style/        → NamedAPIResourceList
GET /move-battle-style/{id or name} → MoveBattleStyle
GET /move-category/            → NamedAPIResourceList
GET /move-category/{id or name} → MoveCategory
GET /move-damage-class/        → NamedAPIResourceList
GET /move-damage-class/{id or name} → MoveDamageClass
GET /move-learn-method/        → NamedAPIResourceList
GET /move-learn-method/{id or name} → MoveLearnMethod
GET /move-target/              → NamedAPIResourceList
GET /move-target/{id or name}  → MoveTarget
```

**Connections:**
- `Move` → references `ContestType`, `ContestEffect`, `MoveDamageClass`, `Generation`, `MoveAilment`, `MoveCategory`, `Stat`, `SuperContestEffect`, `MoveTarget`, `Type`, `Pokemon`
- `MoveAilment` → references `Move`
- `MoveBattleStyle` → standalone
- `MoveCategory` → references `Move`
- `MoveDamageClass` → references `Move`
- `MoveLearnMethod` → references `VersionGroup`
- `MoveTarget` → references `Move`

### 10. Pokémon (15 endpoints)

Core Pokémon data including stats, abilities, types, and species information.

```
GET /ability/                  → NamedAPIResourceList
GET /ability/{id or name}      → Ability
GET /characteristic/           → APIResourceList (unnamed)
GET /characteristic/{id}       → Characteristic
GET /egg-group/                → NamedAPIResourceList
GET /egg-group/{id or name}    → EggGroup
GET /gender/                   → NamedAPIResourceList
GET /gender/{id or name}       → Gender
GET /growth-rate/              → NamedAPIResourceList
GET /growth-rate/{id or name}  → GrowthRate
GET /nature/                   → NamedAPIResourceList
GET /nature/{id or name}       → Nature
GET /pokeathlon-stat/          → NamedAPIResourceList
GET /pokeathlon-stat/{id or name} → PokeathlonStat
GET /pokemon/                  → NamedAPIResourceList
GET /pokemon/{id or name}      → Pokemon
GET /pokemon/{id or name}/encounters → LocationAreaEncounter[]
GET /pokemon-color/            → NamedAPIResourceList
GET /pokemon-color/{id or name} → PokemonColor
GET /pokemon-form/             → NamedAPIResourceList
GET /pokemon-form/{id or name} → PokemonForm
GET /pokemon-habitat/          → NamedAPIResourceList
GET /pokemon-habitat/{id or name} → PokemonHabitat
GET /pokemon-shape/            → NamedAPIResourceList
GET /pokemon-shape/{id or name} → PokemonShape
GET /pokemon-species/          → NamedAPIResourceList
GET /pokemon-species/{id or name} → PokemonSpecies
GET /stat/                     → NamedAPIResourceList
GET /stat/{id or name}         → Stat
GET /type/                     → NamedAPIResourceList
GET /type/{id or name}         → Type
```

**Connections:**
- `Pokemon` → references `Ability`, `PokemonForm`, `Item`, `Move`, `PokemonSpecies`, `Stat`, `Type`, `Version`, `MoveLearnMethod`, `VersionGroup`
- `PokemonSpecies` → references `GrowthRate`, `Pokedex`, `EggGroup`, `PokemonColor`, `PokemonShape`, `PokemonSpecies` (evolves from), `EvolutionChain`, `PokemonHabitat`, `Generation`, `PalParkArea`, `Pokemon`
- `Ability` → references `Generation`, `Pokemon`
- `Characteristic` → references `Stat`
- `EggGroup` → references `PokemonSpecies`
- `Gender` → references `PokemonSpecies`
- `GrowthRate` → references `PokemonSpecies`
- `Nature` → references `Stat`, `BerryFlavor`, `PokeathlonStat`, `MoveBattleStyle`
- `PokeathlonStat` → references `Nature`
- `PokemonColor` → references `PokemonSpecies`
- `PokemonForm` → references `Pokemon`, `Type`, `VersionGroup`
- `PokemonHabitat` → references `PokemonSpecies`
- `PokemonShape` → references `PokemonSpecies`
- `Stat` → references `Move`, `Nature`, `Characteristic`, `MoveDamageClass`
- `Type` → references `Type` (damage relations), `Generation`, `MoveDamageClass`, `Pokemon`, `Move`

### 11. Utility (1 endpoint)

Language information for localized content.

```
GET /language/                 → NamedAPIResourceList
GET /language/{id or name}     → Language
```

**Connections:**
- Used by: Nearly all resources for localized names, descriptions, and flavor text

## Resource Relationship Map

### Core Resource Dependencies

```
Pokemon
├── PokemonSpecies (species information)
│   ├── EvolutionChain (evolution data)
│   │   └── EvolutionTrigger
│   ├── GrowthRate
│   ├── EggGroup
│   ├── PokemonColor
│   ├── PokemonShape
│   ├── PokemonHabitat
│   └── Generation
├── Ability
├── Type
├── Stat
├── Move
│   ├── MoveAilment
│   ├── MoveDamageClass
│   ├── MoveCategory
│   ├── MoveTarget
│   └── ContestType
├── Item
│   ├── ItemCategory
│   ├── ItemAttribute
│   └── ItemFlingEffect
└── PokemonForm

Location
├── Region
│   └── Generation
└── LocationArea
    ├── EncounterMethod
    ├── EncounterCondition
    └── Pokemon (encounters)

Version
└── VersionGroup
    └── Generation
```

## Pagination Examples

All list endpoints support pagination:

```typescript
// Get first 20 items (default)
GET /api/v2/pokemon/

// Get 100 items
GET /api/v2/pokemon/?limit=100

// Get items 101-200
GET /api/v2/pokemon/?limit=100&offset=100

// Response structure
{
  count: 1302,              // Total number of resources
  next: "url to next page", // URL for next page (null if none)
  previous: "url to prev",  // URL for previous page (null if none)
  results: [...]            // Array of resources
}
```

## Resource Types

### Named vs Unnamed Resources

**Named Resources** (have both `name` and `id`):
- Can be accessed by name or ID
- Return `NamedAPIResourceList` for list endpoints
- Examples: `/pokemon/pikachu` or `/pokemon/25`

**Unnamed Resources** (only have `id`):
- Can only be accessed by ID
- Return `APIResourceList` for list endpoints
- Examples: `characteristic`, `contest-effect`, `evolution-chain`, `machine`, `super-contest-effect`

## Common Response Patterns

### NamedAPIResource
```typescript
{
  name: "pikachu",
  url: "https://pokeapi.co/api/v2/pokemon/25/"
}
```

### APIResource
```typescript
{
  url: "https://pokeapi.co/api/v2/evolution-chain/10/"
}
```

### Localized Content
Many resources include localized names/descriptions:
```typescript
{
  names: [
    {
      name: "Pikachu",
      language: { name: "en", url: "..." }
    },
    {
      name: "ピカチュウ",
      language: { name: "ja", url: "..." }
    }
  ]
}
```

## Special Endpoints

### Pokemon Encounters
```
GET /pokemon/{id or name}/encounters
```
Returns a list of `LocationAreaEncounter[]` showing where a specific Pokémon can be found in the wild.

## Usage Example with TypeScript

```typescript
import type { Pokemon, NamedAPIResourceList, PokemonSpecies } from './pokeapi-types';

// Fetch a Pokemon
const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
const pokemon: Pokemon = await response.json();

// Fetch species data (following reference)
const speciesUrl = pokemon.species.url;
const speciesResponse = await fetch(speciesUrl);
const species: PokemonSpecies = await speciesResponse.json();

// Get evolution chain
const evolutionUrl = species.evolution_chain.url;
const evolutionResponse = await fetch(evolutionUrl);
const evolution: EvolutionChain = await evolutionResponse.json();

// List all pokemon with pagination
const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
const list: NamedAPIResourceList = await listResponse.json();
```

## Data Flow Example: Getting Complete Pokemon Information

```
1. GET /pokemon/25
   ↓ Returns Pokemon data
   
2. Follow pokemon.species.url
   GET /pokemon-species/25
   ↓ Returns PokemonSpecies data
   
3. Follow species.evolution_chain.url
   GET /evolution-chain/10
   ↓ Returns EvolutionChain data
   
4. Follow pokemon.moves[].move.url
   GET /move/85
   ↓ Returns Move data
   
5. Follow pokemon.types[].type.url
   GET /type/13
   ↓ Returns Type data with damage relations
```

## Best Practices

1. **Cache Resources**: Store API responses locally to reduce bandwidth
2. **Follow URLs**: Use the provided URLs in resources rather than constructing them manually
3. **Batch Requests**: When possible, fetch list endpoints and cache all results
4. **Handle Nulls**: Many fields can be `null` - always check before accessing nested properties
5. **Respect Fair Use**: Don't hammer the API - implement reasonable request delays
6. **Use Specific Queries**: Use names instead of IDs when you know them (e.g., `/pokemon/pikachu`)

## Complete Endpoint Count

- **Total Endpoints**: 48 unique resource types
- **Named Endpoints**: 43 (accessible by ID or name)
- **Unnamed Endpoints**: 5 (accessible by ID only)
- **List Endpoints**: 48 (all resources have list endpoints)

## Rate Limiting

While there is no official rate limiting since the move to static hosting, the API maintainers request that you:
- Cache resources locally
- Implement reasonable delays between requests
- Avoid denial-of-service patterns

## Error Responses

The API returns standard HTTP status codes:
- `200`: Success
- `404`: Resource not found
- `500`: Server error (rare with static hosting)

## Additional Resources

- Official Documentation: https://pokeapi.co/docs/v2
- GitHub Repository: https://github.com/PokeAPI/pokeapi
- Community Wrappers: Available for many languages (TypeScript, Python, Java, etc.)
