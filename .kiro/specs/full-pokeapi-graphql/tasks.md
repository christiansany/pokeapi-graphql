# Implementation Plan

This implementation plan breaks down the full PokeAPI GraphQL endpoint into discrete, testable tasks. Each task focuses on implementing one or more related resource types completely, including DTOs, DataSource, GraphQL schema, and resolvers.

## Task Organization

Tasks are organized to:
1. Build foundation first (base classes, utilities)
2. Implement domains incrementally
3. Each task is independently testable
4. Related types are grouped together
5. Dependencies are handled in order

## Important Notes

**GraphQL Code Generator Mappers**: Each task that introduces new GraphQL types MUST update the `codegen.ts` mappers configuration to map GraphQL types to their corresponding DTOs. This ensures type-safe resolvers with proper parent types.

Example mapper entries:
```typescript
mappers: {
  Pokemon: "../domains/pokemon/pokemon.dto.js#PokemonDTO",
  Ability: "../domains/ability/ability.dto.js#AbilityDTO",
  PokemonAbilityEdge: "{ slot: number; isHidden: boolean; abilityName: string }",
}
```

**Mapper Update Rule**: For ALL tasks that create new GraphQL types (types implementing Node, Edge types, etc.), you MUST:
1. Add mapper entries in codegen.ts for each new GraphQL type
2. Map to the corresponding DTO interface (for entity types)
3. Use inline type definitions for edge types with metadata
4. Run `npm run codegen` after updating mappers to regenerate types

---

- [ ] 1. Foundation and Base Infrastructure
  - Create BasePokeAPIDataSource abstract class with shared fetch, cache, and DataLoader initialization logic in domains/base/
  - Create common DTOs (NamedAPIResource, APIResource, NamedAPIResourceList, etc.) in domains/base/common.dto.ts
  - Update pagination utilities to support nullable first argument (1-50 validation, 0 for default)
  - Update Context interface to support multiple DataSources
  - Create domain index aggregation pattern in domains/index.ts
  - Update codegen.ts schema path to include domains/*/*.graphql
  - _Requirements: 15.1, 15.2, 17.3, 17.4, 20.1_

- [ ] 2. Refactor Existing Pokemon and Ability Implementation
  - [ ] 2.1 Migrate Pokemon to domain-based structure
    - Move Pokemon DTOs to domains/pokemon/pokemon.dto.ts
    - Create PokemonDataSource extending BasePokeAPIDataSource with DataLoaders
    - Move pokemon.graphql schema to domains/pokemon/
    - Move Pokemon resolvers to domains/pokemon/pokemon.resolver.ts
    - Move PokemonAbilityEdge to domains/pokemon/edges/pokemonAbility.edge.ts
    - Update codegen.ts mappers: Pokemon → domains/pokemon/pokemon.dto.ts#PokemonDTO
    - Update codegen.ts mappers: PokemonAbilityEdge → inline type definition
    - Update imports and context access patterns (context.dataSources.pokemon)
    - _Requirements: 1.1, 1.2, 15.1, 15.2, 16.1, 21.1_
  
  - [ ] 2.2 Migrate Ability to domain-based structure
    - Move Ability DTOs to domains/ability/ability.dto.ts
    - Create AbilityDataSource extending BasePokeAPIDataSource with DataLoaders
    - Move ability.graphql schema to domains/ability/
    - Move Ability resolvers to domains/ability/ability.resolver.ts
    - Update codegen.ts mappers: Ability → domains/ability/ability.dto.ts#AbilityDTO
    - Update imports and context access patterns (context.dataSources.ability)
    - _Requirements: 2.1, 2.2, 2.4, 15.1, 15.2, 16.1, 21.1_

- [ ] 3. Complete Pokemon Domain with Stats and Types
  - [ ] 3.1 Implement Pokemon stats edge and Stat type
    - Create Stat DTOs in domains/stat/stat.dto.ts
    - Create StatDataSource with DataLoaders for stats by ID and name
    - Create stat.graphql schema with Stat type implementing Node
    - Create PokemonStatEdge resolver in domains/pokemon/edges/pokemonStat.edge.ts
    - Create Stat resolver in domains/stat/stat.resolver.ts
    - Add Query.stat(id: ID!) and Query.stats(first: Int, after: String) fields
    - Update Pokemon resolver to return stats connection with edges
    - Update codegen.ts mappers: Stat → domains/stat/stat.dto.ts#StatDTO, PokemonStatEdge → inline type
    - _Requirements: 1.3, 11.1, 11.2, 11.5, 16.1, 18.4_
  
  - [ ] 3.2 Implement Pokemon types edge and Type system
    - Create Type DTOs in domains/type/type.dto.ts including DamageRelationsDTO
    - Create TypeDataSource with DataLoaders for types by ID and name
    - Create type.graphql schema with Type type implementing Node and damage relations
    - Create PokemonTypeEdge resolver in domains/pokemon/edges/pokemonType.edge.ts
    - Create Type resolver in domains/type/type.resolver.ts with damage relations connections
    - Add Query.type(id: ID!) and Query.types(first: Int, after: String) fields
    - Update Pokemon resolver to return types connection with edges
    - Update codegen.ts mappers: Type → domains/type/type.dto.ts#TypeDTO, PokemonTypeEdge → inline type
    - _Requirements: 1.4, 4.1, 4.2, 4.3, 4.4, 16.1, 18.2_

- [ ] 4. Implement Move System
  - [ ] 4.1 Create Move domain structure
    - Create Move DTOs in domains/move/move.dto.ts (MoveDTO, MoveMetaDTO, etc.)
    - Create MoveDataSource with DataLoaders for moves by ID and name
    - Create move.graphql schema with Move type implementing Node
    - Create Move resolver in domains/move/move.resolver.ts
    - Add Query.move(id: ID!) and Query.moves(first: Int, after: String) fields
    - Update codegen.ts mappers: Move → domains/move/move.dto.ts#MoveDTO
    - _Requirements: 3.1, 3.2, 3.5, 16.1_
  
  - [ ] 4.2 Implement Pokemon moves edge with version group details
    - Create PokemonMoveEdge resolver in domains/pokemon/edges/pokemonMove.edge.ts
    - Handle version_group_details array with learn method, level, and version group
    - Update Pokemon resolver to return moves connection with edges
    - Update codegen.ts mappers: PokemonMoveEdge → inline type with version group details
    - _Requirements: 1.5, 3.3, 18.3_
  
  - [ ] 4.3 Implement Move-related types (MoveAilment, MoveDamageClass, etc.)
    - Create DTOs for MoveAilment, MoveDamageClass, MoveCategory, MoveTarget
    - Add DataLoader methods to MoveDataSource for related types
    - Create resolvers for move-related types
    - Update Move resolver to resolve related type references
    - _Requirements: 3.1, 3.2_

- [ ] 5. Implement PokemonSpecies and Forms
  - [ ] 5.1 Implement PokemonSpecies type
    - Create PokemonSpecies DTOs in domains/pokemon/pokemon.dto.ts
    - Add species methods to PokemonDataSource with DataLoaders
    - Add PokemonSpecies type to pokemon.graphql schema implementing Node
    - Create PokemonSpecies resolver in domains/pokemon/pokemonSpecies.resolver.ts
    - Add Query.pokemonSpecies(id: ID!) and Query.pokemonSpecies(first: Int, after: String) fields
    - Update Pokemon resolver to resolve species reference
    - Update codegen.ts mappers for PokemonSpecies
    - _Requirements: 10.1, 10.5, 16.1_
  
  - [ ] 5.2 Implement PokemonForm type
    - Create PokemonForm DTOs in domains/pokemon/pokemon.dto.ts
    - Add form methods to PokemonDataSource with DataLoaders
    - Add PokemonForm type to pokemon.graphql schema implementing Node
    - Create PokemonForm resolver in domains/pokemon/pokemonForm.resolver.ts
    - Update Pokemon resolver to resolve forms references
    - _Requirements: 10.2, 16.1_
  
  - [ ] 5.3 Implement PokemonSpecies varieties edge
    - Create PokemonVarietyEdge resolver in domains/pokemon/edges/pokemonVariety.edge.ts
    - Update PokemonSpecies resolver to return varieties connection with edges
    - _Requirements: 10.4, 18.5_

- [ ] 6. Implement Item System
  - [ ] 6.1 Create Item domain structure
    - Create Item DTOs in domains/item/item.dto.ts (ItemDTO, ItemCategoryDTO, ItemAttributeDTO, etc.)
    - Create ItemDataSource with DataLoaders for items, categories, and attributes
    - Create item.graphql schema with Item, ItemCategory, ItemAttribute types implementing Node
    - Create Item resolver in domains/item/item.resolver.ts
    - Add Query.item(id: ID!) and Query.items(first: Int, after: String) fields
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 16.1_
  
  - [ ] 6.2 Implement ItemCategory and ItemAttribute types
    - Create ItemCategory resolver in domains/item/itemCategory.resolver.ts
    - Create ItemAttribute resolver in domains/item/itemAttribute.resolver.ts
    - Add Query fields for categories and attributes with pagination
    - Update Item resolver to resolve category and attributes references
    - _Requirements: 5.3, 5.4, 5.5, 16.1_
  
  - [ ] 6.3 Implement ItemFlingEffect and ItemPocket types
    - Create DTOs for ItemFlingEffect and ItemPocket
    - Add DataLoader methods to ItemDataSource
    - Create resolvers for ItemFlingEffect and ItemPocket
    - Update Item resolver to resolve fling effect reference
    - _Requirements: 5.5, 16.1_

- [ ] 7. Implement Location System
  - [ ] 7.1 Create Location and Region domain structure
    - Create Location DTOs in domains/location/location.dto.ts (LocationDTO, RegionDTO, etc.)
    - Create LocationDataSource with DataLoaders for locations and regions
    - Create location.graphql schema with Location and Region types implementing Node
    - Create Location resolver in domains/location/location.resolver.ts
    - Create Region resolver in domains/location/region.resolver.ts
    - Add Query.location(id: ID!), Query.locations(), Query.region(id: ID!), Query.regions() fields
    - _Requirements: 6.1, 6.5, 16.1_
  
  - [ ] 7.2 Implement LocationArea type
    - Create LocationArea DTOs in domains/location/location.dto.ts
    - Add LocationArea methods to LocationDataSource with DataLoaders
    - Add LocationArea type to location.graphql schema implementing Node
    - Create LocationArea resolver in domains/location/locationArea.resolver.ts
    - Update Location resolver to resolve areas references
    - _Requirements: 6.2, 6.5, 16.1_
  
  - [ ] 7.3 Implement Pokemon encounters edge
    - Create PokemonEncounterEdge resolver in domains/location/edges/pokemonEncounter.edge.ts
    - Handle encounter data with chance, min/max level, conditions, and method
    - Update LocationArea resolver to return encounters connection with edges
    - _Requirements: 6.3, 18.5_
  
  - [ ] 7.4 Implement PalParkArea type
    - Create PalParkArea DTOs in domains/location/location.dto.ts
    - Add PalParkArea methods to LocationDataSource with DataLoaders
    - Add PalParkArea type to location.graphql schema implementing Node
    - Create PalParkArea resolver in domains/location/palParkArea.resolver.ts
    - _Requirements: 6.5, 16.1_

- [ ] 8. Implement Evolution System
  - [ ] 8.1 Create Evolution domain structure
    - Create Evolution DTOs in domains/evolution/evolution.dto.ts (EvolutionChainDTO, ChainLinkDTO, etc.)
    - Create EvolutionDataSource with DataLoaders for evolution chains and triggers
    - Create evolution.graphql schema with EvolutionChain and EvolutionTrigger types implementing Node
    - Create EvolutionChain resolver in domains/evolution/evolutionChain.resolver.ts
    - Add Query.evolutionChain(id: ID!) and Query.evolutionChains() fields
    - _Requirements: 7.1, 7.4, 7.5, 16.1_
  
  - [ ] 8.2 Implement EvolutionTrigger type
    - Create EvolutionTrigger DTOs in domains/evolution/evolution.dto.ts
    - Add EvolutionTrigger methods to EvolutionDataSource with DataLoaders
    - Add EvolutionTrigger type to evolution.graphql schema implementing Node
    - Create EvolutionTrigger resolver in domains/evolution/evolutionTrigger.resolver.ts
    - Update EvolutionChain resolver to resolve trigger references
    - _Requirements: 7.3, 7.4, 16.1_
  
  - [ ] 8.3 Implement evolution details and requirements
    - Update EvolutionChain resolver to handle nested evolution chains
    - Implement evolution detail fields (min level, item, held item, known move, location, time of day, gender, etc.)
    - Resolve all evolution requirement references using appropriate DataLoaders
    - _Requirements: 7.2, 7.4_

- [ ] 9. Implement Berry System
  - [ ] 9.1 Create Berry domain structure
    - Create Berry DTOs in domains/berry/berry.dto.ts (BerryDTO, BerryFlavorDTO, BerryFirmnessDTO)
    - Create BerryDataSource with DataLoaders for berries, flavors, and firmness
    - Create berry.graphql schema with Berry, BerryFlavor, BerryFirmness types implementing Node
    - Create Berry resolver in domains/berry/berry.resolver.ts
    - Add Query.berry(id: ID!) and Query.berries() fields
    - _Requirements: 8.1, 8.3, 8.4, 16.1_
  
  - [ ] 9.2 Implement BerryFlavor and BerryFirmness types
    - Create BerryFlavor resolver in domains/berry/berryFlavor.resolver.ts
    - Create BerryFirmness resolver in domains/berry/berryFirmness.resolver.ts
    - Add Query fields for flavors and firmness with pagination
    - _Requirements: 8.3, 8.4, 8.5, 16.1_
  
  - [ ] 9.3 Implement Berry flavors edge
    - Create BerryFlavorEdge resolver in domains/berry/edges/berryFlavor.edge.ts
    - Handle flavor potency metadata
    - Update Berry resolver to return flavors connection with edges
    - _Requirements: 8.2, 18.5_

- [ ] 10. Implement Game Version System
  - [ ] 10.1 Create Game domain structure
    - Create Game DTOs in domains/game/game.dto.ts (GenerationDTO, VersionDTO, VersionGroupDTO, PokedexDTO)
    - Create GameDataSource with DataLoaders for all game-related types
    - Create game.graphql schema with Generation, Version, VersionGroup, Pokedex types implementing Node
    - Create Generation resolver in domains/game/generation.resolver.ts
    - Add Query.generation(id: ID!) and Query.generations() fields
    - _Requirements: 9.1, 9.4, 9.5, 16.1_
  
  - [ ] 10.2 Implement Version and VersionGroup types
    - Create Version resolver in domains/game/version.resolver.ts
    - Create VersionGroup resolver in domains/game/versionGroup.resolver.ts
    - Add Query fields for versions and version groups with pagination
    - Update resolvers to resolve cross-references between versions, groups, and generations
    - _Requirements: 9.2, 9.3, 9.5, 16.1_
  
  - [ ] 10.3 Implement Pokedex type
    - Create Pokedex resolver in domains/game/pokedex.resolver.ts
    - Add Query.pokedex(id: ID!) and Query.pokedexes() fields
    - Update Generation resolver to resolve pokedexes references
    - _Requirements: 9.5, 16.1_

- [ ] 11. Complete Stat System with Characteristics and Natures
  - [ ] 11.1 Implement Characteristic type
    - Create Characteristic DTOs in domains/stat/stat.dto.ts
    - Add Characteristic methods to StatDataSource with DataLoaders
    - Add Characteristic type to stat.graphql schema implementing Node
    - Create Characteristic resolver in domains/stat/characteristic.resolver.ts
    - Update Stat resolver to resolve characteristics references
    - _Requirements: 11.2, 11.4, 16.1_
  
  - [ ] 11.2 Implement Nature type
    - Create Nature DTOs in domains/stat/stat.dto.ts
    - Add Nature methods to StatDataSource with DataLoaders
    - Add Nature type to stat.graphql schema implementing Node
    - Create Nature resolver in domains/stat/nature.resolver.ts
    - Add Query.nature(id: ID!) and Query.natures() fields
    - _Requirements: 11.4, 11.5, 16.1_
  
  - [ ] 11.3 Implement Stat affecting natures connections
    - Update Stat resolver to return increase and decrease nature connections
    - Update Nature resolver to resolve stat references
    - _Requirements: 11.4, 18.5_

- [ ] 12. Implement Pokemon Taxonomy Types
  - [ ] 12.1 Implement EggGroup, GrowthRate, and Gender types
    - Create DTOs for EggGroup, GrowthRate, Gender in domains/pokemon/pokemon.dto.ts
    - Add methods to PokemonDataSource with DataLoaders for these types
    - Add types to pokemon.graphql schema implementing Node
    - Create resolvers for EggGroup, GrowthRate, Gender
    - Update PokemonSpecies resolver to resolve these references
    - _Requirements: 10.3, 16.1_
  
  - [ ] 12.2 Implement PokemonColor, PokemonShape, PokemonHabitat types
    - Create DTOs for PokemonColor, PokemonShape, PokemonHabitat in domains/pokemon/pokemon.dto.ts
    - Add methods to PokemonDataSource with DataLoaders for these types
    - Add types to pokemon.graphql schema implementing Node
    - Create resolvers for PokemonColor, PokemonShape, PokemonHabitat
    - Update PokemonSpecies resolver to resolve these references
    - _Requirements: 10.3, 16.1_

- [ ] 13. Implement Contest System
  - [ ] 13.1 Create Contest domain structure
    - Create Contest DTOs in domains/contest/contest.dto.ts (ContestTypeDTO, ContestEffectDTO, SuperContestEffectDTO)
    - Create ContestDataSource with DataLoaders for all contest types
    - Create contest.graphql schema with ContestType, ContestEffect, SuperContestEffect types implementing Node
    - Create ContestType resolver in domains/contest/contestType.resolver.ts
    - Add Query.contestType(id: ID!) and Query.contestTypes() fields
    - _Requirements: 12.1, 12.4, 12.5, 16.1_
  
  - [ ] 13.2 Implement ContestEffect and SuperContestEffect types
    - Create ContestEffect resolver in domains/contest/contestEffect.resolver.ts
    - Create SuperContestEffect resolver in domains/contest/superContestEffect.resolver.ts
    - Add Query fields for contest effects with pagination
    - Update Move resolver to resolve contest effect references
    - _Requirements: 12.2, 12.3, 12.5, 16.1_

- [ ] 14. Implement Encounter System
  - [ ] 14.1 Create Encounter domain structure
    - Create Encounter DTOs in domains/encounter/encounter.dto.ts (EncounterMethodDTO, EncounterConditionDTO, EncounterConditionValueDTO)
    - Create EncounterDataSource with DataLoaders for all encounter types
    - Create encounter.graphql schema with EncounterMethod, EncounterCondition, EncounterConditionValue types implementing Node
    - Create EncounterMethod resolver in domains/encounter/encounterMethod.resolver.ts
    - Add Query.encounterMethod(id: ID!) and Query.encounterMethods() fields
    - _Requirements: 13.1, 13.4, 13.5, 16.1_
  
  - [ ] 14.2 Implement EncounterCondition and EncounterConditionValue types
    - Create EncounterCondition resolver in domains/encounter/encounterCondition.resolver.ts
    - Create EncounterConditionValue resolver in domains/encounter/encounterConditionValue.resolver.ts
    - Add Query fields for encounter conditions with pagination
    - Update resolvers to resolve cross-references between conditions and values
    - _Requirements: 13.2, 13.3, 13.5, 16.1_

- [ ] 15. Implement Machine System
  - [ ] 15.1 Create Machine domain structure
    - Create Machine DTOs in domains/machine/machine.dto.ts
    - Create MachineDataSource with DataLoaders for machines by ID
    - Create machine.graphql schema with Machine type implementing Node
    - Create Machine resolver in domains/machine/machine.resolver.ts
    - Add Query.machine(id: ID!) and Query.machines() fields
    - Update Machine resolver to resolve item, move, and version group references
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 16.1_

- [ ] 16. Implement Ability Pokemon Edge
  - [ ] 16.1 Create AbilityPokemonEdge resolver
    - Create AbilityPokemonEdge resolver in domains/ability/edges/abilityPokemon.edge.ts
    - Handle slot and hidden status metadata
    - Update Ability resolver to return pokemon connection with edges
    - _Requirements: 2.3, 18.5_

- [ ] 17. Complete Node Interface Implementation
  - [ ] 17.1 Update node resolver to support all types
    - Update Query.node resolver to route all 48+ resource types to appropriate DataSources
    - Add cases for all implemented types (Pokemon, Ability, Move, Type, Item, Location, Berry, Evolution, Species, Stat, Nature, Generation, Contest, Encounter, Machine, etc.)
    - Ensure proper error handling for invalid typenames
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_
  
  - [ ] 17.2 Update Node.__resolveType implementation
    - Implement type resolution logic for all concrete types
    - Use discriminating fields to determine concrete type from DTO structure
    - _Requirements: 16.1, 16.5_

- [ ] 18. Update Documentation and Structure
  - [ ] 18.1 Update structure.md steering file
    - Document co-located domain architecture
    - Document BasePokeAPIDataSource pattern
    - Document DataLoader usage for all fetch operations
    - Document edge resolver patterns
    - Document pagination rules (first: 1-50, nullable)
    - Update architecture diagrams
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5_
  
  - [ ] 18.2 Add inline documentation
    - Add JSDoc comments to all DataSource methods
    - Add JSDoc comments to all resolver functions
    - Add comments explaining edge patterns
    - Add comments explaining pagination logic
    - _Requirements: 20.5, 21.5_
  
  - [ ] 18.3 Update README and API documentation
    - Document all available Query fields
    - Document pagination behavior
    - Document error codes
    - Provide example queries for each resource type
    - _Requirements: 21.5_

- [ ] 19. Error Handling and Validation
  - [ ] 19.1 Implement comprehensive error handling
    - Ensure all DataSource methods handle 404 responses gracefully
    - Ensure all resolvers handle null responses appropriately
    - Implement proper error codes (INVALID_GLOBAL_ID, INVALID_CURSOR, INVALID_PAGINATION_ARGS, EXTERNAL_API_ERROR)
    - Add error logging for debugging
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_
  
  - [ ] 19.2 Implement input validation
    - Validate global IDs before decoding
    - Validate cursors before decoding
    - Validate pagination arguments (first: 1-50)
    - Sanitize numeric IDs
    - _Requirements: 17.3, 17.4, 19.1, 19.2, 19.3_

- [ ] 20. Integration Testing and Verification
  - [ ] 20.1 Test all Query fields
    - Test single resource queries for all types
    - Test paginated list queries for all types
    - Test node interface queries for all types
    - Verify pagination works correctly with first and after arguments
    - _Requirements: 16.1, 16.5, 17.1, 17.2, 17.5_
  
  - [ ] 20.2 Test edge resolvers and connections
    - Test all edge types resolve correctly with DataLoader batching
    - Test nested queries with multiple levels of edges
    - Verify metadata fields on edges are correct
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_
  
  - [ ] 20.3 Test error scenarios
    - Test invalid global IDs return appropriate errors
    - Test invalid cursors return appropriate errors
    - Test invalid pagination arguments return appropriate errors
    - Test not found scenarios return null
    - Test PokeAPI unavailability returns appropriate errors
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_
  
  - [ ] 20.4 Performance testing
    - Verify DataLoader batching is working for all resource types
    - Verify cache hit rates are acceptable
    - Test query performance with complex nested queries
    - Monitor memory usage with large result sets
    - _Requirements: 15.1, 15.2, 15.5_

- [ ] 21. Final Polish and Optimization
  - [ ] 21.1 Code review and cleanup
    - Review all code for consistency
    - Remove any unused imports or code
    - Ensure all TypeScript types are correct
    - Run linter and fix all issues
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_
  
  - [ ] 21.2 Performance optimization
    - Optimize DataLoader batch functions
    - Review cache key strategies
    - Consider implementing cache size limits if needed
    - _Requirements: 15.1, 15.2_
  
  - [ ] 21.3 Final testing
    - Run full test suite
    - Test in GraphiQL playground
    - Verify all 48 resource types are accessible
    - Verify all edge patterns work correctly
    - _Requirements: All requirements_
