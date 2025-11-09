# PokeAPI v2 - Quick Reference Guide

## Quick Start

```typescript
import type { Pokemon, PokemonSpecies, NamedAPIResourceList } from './pokeapi-types';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Get a single Pokemon
const pokemon: Pokemon = await fetch(`${BASE_URL}/pokemon/pikachu`).then(r => r.json());

// Get a list of Pokemon
const list: NamedAPIResourceList = await fetch(`${BASE_URL}/pokemon?limit=151`).then(r => r.json());
```

## All 48 Endpoints At a Glance

### Berries
| Endpoint | Type | Example |
|----------|------|---------|
| `/berry` | Named | `/berry/1` or `/berry/cheri` |
| `/berry-firmness` | Named | `/berry-firmness/1` or `/berry-firmness/very-soft` |
| `/berry-flavor` | Named | `/berry-flavor/1` or `/berry-flavor/spicy` |

### Contests
| Endpoint | Type | Example |
|----------|------|---------|
| `/contest-type` | Named | `/contest-type/1` or `/contest-type/cool` |
| `/contest-effect` | Unnamed | `/contest-effect/1` |
| `/super-contest-effect` | Unnamed | `/super-contest-effect/1` |

### Encounters
| Endpoint | Type | Example |
|----------|------|---------|
| `/encounter-method` | Named | `/encounter-method/1` or `/encounter-method/walk` |
| `/encounter-condition` | Named | `/encounter-condition/1` or `/encounter-condition/swarm` |
| `/encounter-condition-value` | Named | `/encounter-condition-value/1` or `/encounter-condition-value/swarm-yes` |

### Evolution
| Endpoint | Type | Example |
|----------|------|---------|
| `/evolution-chain` | Unnamed | `/evolution-chain/1` |
| `/evolution-trigger` | Named | `/evolution-trigger/1` or `/evolution-trigger/level-up` |

### Games
| Endpoint | Type | Example |
|----------|------|---------|
| `/generation` | Named | `/generation/1` or `/generation/generation-i` |
| `/pokedex` | Named | `/pokedex/1` or `/pokedex/national` |
| `/version` | Named | `/version/1` or `/version/red` |
| `/version-group` | Named | `/version-group/1` or `/version-group/red-blue` |

### Items
| Endpoint | Type | Example |
|----------|------|---------|
| `/item` | Named | `/item/1` or `/item/master-ball` |
| `/item-attribute` | Named | `/item-attribute/1` or `/item-attribute/countable` |
| `/item-category` | Named | `/item-category/1` or `/item-category/stat-boosts` |
| `/item-fling-effect` | Named | `/item-fling-effect/1` or `/item-fling-effect/badly-poison` |
| `/item-pocket` | Named | `/item-pocket/1` or `/item-pocket/misc` |

### Locations
| Endpoint | Type | Example |
|----------|------|---------|
| `/location` | Named | `/location/1` or `/location/canalave-city` |
| `/location-area` | Named | `/location-area/1` or `/location-area/canalave-city-area` |
| `/pal-park-area` | Named | `/pal-park-area/1` or `/pal-park-area/forest` |
| `/region` | Named | `/region/1` or `/region/kanto` |

### Machines
| Endpoint | Type | Example |
|----------|------|---------|
| `/machine` | Unnamed | `/machine/1` |

### Moves
| Endpoint | Type | Example |
|----------|------|---------|
| `/move` | Named | `/move/1` or `/move/pound` |
| `/move-ailment` | Named | `/move-ailment/1` or `/move-ailment/paralysis` |
| `/move-battle-style` | Named | `/move-battle-style/1` or `/move-battle-style/attack` |
| `/move-category` | Named | `/move-category/1` or `/move-category/ailment` |
| `/move-damage-class` | Named | `/move-damage-class/1` or `/move-damage-class/status` |
| `/move-learn-method` | Named | `/move-learn-method/1` or `/move-learn-method/level-up` |
| `/move-target` | Named | `/move-target/1` or `/move-target/specific-move` |

### Pokemon
| Endpoint | Type | Example |
|----------|------|---------|
| `/ability` | Named | `/ability/1` or `/ability/stench` |
| `/characteristic` | Unnamed | `/characteristic/1` |
| `/egg-group` | Named | `/egg-group/1` or `/egg-group/monster` |
| `/gender` | Named | `/gender/1` or `/gender/female` |
| `/growth-rate` | Named | `/growth-rate/1` or `/growth-rate/slow` |
| `/nature` | Named | `/nature/1` or `/nature/hardy` |
| `/pokeathlon-stat` | Named | `/pokeathlon-stat/1` or `/pokeathlon-stat/speed` |
| `/pokemon` | Named | `/pokemon/25` or `/pokemon/pikachu` |
| `/pokemon/{id}/encounters` | Special | `/pokemon/25/encounters` |
| `/pokemon-color` | Named | `/pokemon-color/1` or `/pokemon-color/black` |
| `/pokemon-form` | Named | `/pokemon-form/1` or `/pokemon-form/bulbasaur` |
| `/pokemon-habitat` | Named | `/pokemon-habitat/1` or `/pokemon-habitat/cave` |
| `/pokemon-shape` | Named | `/pokemon-shape/1` or `/pokemon-shape/ball` |
| `/pokemon-species` | Named | `/pokemon-species/25` or `/pokemon-species/pikachu` |
| `/stat` | Named | `/stat/1` or `/stat/hp` |
| `/type` | Named | `/type/1` or `/type/normal` |

### Utility
| Endpoint | Type | Example |
|----------|------|---------|
| `/language` | Named | `/language/1` or `/language/ja` |

## Common Usage Patterns

### 1. Get Complete Pokemon Information

```typescript
// Step 1: Get Pokemon base data
const pokemon: Pokemon = await fetch(
  'https://pokeapi.co/api/v2/pokemon/pikachu'
).then(r => r.json());

// Step 2: Get species data (evolution, habitat, etc.)
const species: PokemonSpecies = await fetch(
  pokemon.species.url
).then(r => r.json());

// Step 3: Get evolution chain
const evolutionChain: EvolutionChain = await fetch(
  species.evolution_chain.url
).then(r => r.json());

// Step 4: Get encounter locations
const encounters: LocationAreaEncounter[] = await fetch(
  pokemon.location_area_encounters
).then(r => r.json());
```

### 2. Get All Pokemon with Pagination

```typescript
async function getAllPokemon(): Promise<NamedAPIResource[]> {
  let allPokemon: NamedAPIResource[] = [];
  let url: string | null = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  
  while (url) {
    const response: NamedAPIResourceList = await fetch(url).then(r => r.json());
    allPokemon = [...allPokemon, ...response.results];
    url = response.next;
  }
  
  return allPokemon;
}
```

### 3. Get Pokemon by Type

```typescript
// Get all electric type Pokemon
const electricType: Type = await fetch(
  'https://pokeapi.co/api/v2/type/electric'
).then(r => r.json());

// electricType.pokemon contains all Pokemon with this type
const electricPokemon = electricType.pokemon.map(p => p.pokemon);
```

### 4. Get Moves a Pokemon Can Learn

```typescript
const pokemon: Pokemon = await fetch(
  'https://pokeapi.co/api/v2/pokemon/pikachu'
).then(r => r.json());

// Get all moves learned by level up
const levelUpMoves = pokemon.moves.filter(m => 
  m.version_group_details.some(v => 
    v.move_learn_method.name === 'level-up'
  )
);

// Get move details
const moveDetails: Move[] = await Promise.all(
  levelUpMoves.slice(0, 5).map(m => 
    fetch(m.move.url).then(r => r.json())
  )
);
```

### 5. Get Evolution Chain

```typescript
const species: PokemonSpecies = await fetch(
  'https://pokeapi.co/api/v2/pokemon-species/1' // Bulbasaur
).then(r => r.json());

const evolutionChain: EvolutionChain = await fetch(
  species.evolution_chain.url
).then(r => r.json());

// Traverse the chain
function printEvolutionChain(chain: ChainLink, level = 0) {
  console.log('  '.repeat(level) + chain.species.name);
  chain.evolves_to.forEach(evolution => 
    printEvolutionChain(evolution, level + 1)
  );
}

printEvolutionChain(evolutionChain.chain);
// Output:
// bulbasaur
//   ivysaur
//     venusaur
```

### 6. Get Localized Names

```typescript
const pokemon: Pokemon = await fetch(
  'https://pokeapi.co/api/v2/pokemon/pikachu'
).then(r => r.json());

const species: PokemonSpecies = await fetch(
  pokemon.species.url
).then(r => r.json());

// Get Japanese name
const japaneseName = species.names.find(
  n => n.language.name === 'ja'
)?.name;

console.log(japaneseName); // "ピカチュウ"
```

### 7. Search for Pokemon by Color

```typescript
const yellowColor: PokemonColor = await fetch(
  'https://pokeapi.co/api/v2/pokemon-color/yellow'
).then(r => r.json());

// Get first 10 yellow Pokemon species
const yellowPokemon = yellowColor.pokemon_species.slice(0, 10);
```

### 8. Get Type Effectiveness

```typescript
const fireType: Type = await fetch(
  'https://pokeapi.co/api/v2/type/fire'
).then(r => r.json());

console.log('Fire is super effective against:', 
  fireType.damage_relations.double_damage_to.map(t => t.name)
); // ["grass", "ice", "bug", "steel"]

console.log('Fire is not very effective against:', 
  fireType.damage_relations.half_damage_to.map(t => t.name)
); // ["fire", "water", "rock", "dragon"]
```

## Response Structures

### NamedAPIResourceList (Paginated List)
```typescript
{
  count: 1302,                           // Total resources
  next: "https://.../pokemon?offset=20", // Next page URL
  previous: null,                        // Previous page URL
  results: [                             // Current page results
    { name: "bulbasaur", url: "..." },
    { name: "ivysaur", url: "..." }
  ]
}
```

### APIResourceList (Paginated List for Unnamed Resources)
```typescript
{
  count: 541,
  next: "https://.../evolution-chain?offset=20",
  previous: null,
  results: [
    { url: "https://.../evolution-chain/1/" },
    { url: "https://.../evolution-chain/2/" }
  ]
}
```

## Helper Functions

### Generic Fetch with Type Safety

```typescript
async function fetchPokeAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`https://pokeapi.co/api/v2${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`PokeAPI error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Usage
const pikachu = await fetchPokeAPI<Pokemon>('/pokemon/pikachu');
const moves = await fetchPokeAPI<NamedAPIResourceList>('/move?limit=100');
```

### Fetch All Pages

```typescript
async function fetchAllPages<T extends { results: any[] }>(
  initialUrl: string
): Promise<T['results']> {
  let allResults: T['results'] = [];
  let url: string | null = initialUrl;
  
  while (url) {
    const response: T = await fetch(url).then(r => r.json());
    allResults = [...allResults, ...response.results];
    url = (response as any).next;
  }
  
  return allResults;
}

// Usage
const allPokemon = await fetchAllPages<NamedAPIResourceList>(
  'https://pokeapi.co/api/v2/pokemon'
);
```

### Follow Resource URL

```typescript
async function followResource<T>(resource: NamedAPIResource | APIResource): Promise<T> {
  return fetch(resource.url).then(r => r.json());
}

// Usage
const pokemon: Pokemon = await fetchPokeAPI<Pokemon>('/pokemon/1');
const species: PokemonSpecies = await followResource(pokemon.species);
const evolution: EvolutionChain = await followResource(species.evolution_chain);
```

## Caching Strategy

```typescript
class PokeAPICache {
  private cache = new Map<string, any>();
  
  async fetch<T>(url: string): Promise<T> {
    // Check cache
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }
    
    // Fetch and cache
    const response = await fetch(url);
    const data: T = await response.json();
    this.cache.set(url, data);
    
    return data;
  }
  
  clear() {
    this.cache.clear();
  }
}

// Usage
const cache = new PokeAPICache();
const pokemon = await cache.fetch<Pokemon>('https://pokeapi.co/api/v2/pokemon/1');
```

## Error Handling

```typescript
async function safeFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2${endpoint}`);
    
    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

## Rate Limiting Helper

```typescript
class RateLimiter {
  private queue: (() => Promise<any>)[] = [];
  private processing = false;
  private delay = 100; // ms between requests
  
  async fetch<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }
  
  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
        await new Promise(resolve => setTimeout(resolve, this.delay));
      }
    }
    
    this.processing = false;
  }
}

// Usage
const limiter = new RateLimiter();
const pokemon = await limiter.fetch<Pokemon>('https://pokeapi.co/api/v2/pokemon/1');
```

## Common Gotchas

1. **Nullable Fields**: Many fields can be `null` - always check before accessing
   ```typescript
   const power = move.power ?? 0; // Use nullish coalescing
   ```

2. **Array Access**: Check array length before accessing
   ```typescript
   const primaryType = pokemon.types[0]?.type.name;
   ```

3. **URL Following**: Always use provided URLs, don't construct manually
   ```typescript
   // ✅ Good
   const species = await fetch(pokemon.species.url).then(r => r.json());
   
   // ❌ Bad
   const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`).then(r => r.json());
   ```

4. **Version-Specific Data**: Many resources have version-specific arrays
   ```typescript
   // Get moves for a specific version
   const redBlueMoves = pokemon.moves.filter(m =>
     m.version_group_details.some(v => 
       v.version_group.name === 'red-blue'
     )
   );
   ```

## Resources

- **TypeScript Types**: See `pokeapi-types.ts`
- **Full Documentation**: See `pokeapi-docs.md`
- **Official Docs**: https://pokeapi.co/docs/v2
- **GitHub**: https://github.com/PokeAPI/pokeapi
