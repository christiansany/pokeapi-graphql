---
inclusion: manual
---

/**
 * TypeScript Types for PokeAPI v2
 * Generated from: https://pokeapi.co/docs/v2
 * 
 * This file contains comprehensive TypeScript type definitions for all
 * REST endpoints provided by the PokeAPI v2.
 */

// ============================================================================
// COMMON / UTILITY TYPES
// ============================================================================

/**
 * A generic API resource (unnamed)
 */
export interface APIResource {
  /** The URL of the referenced resource */
  url: string;
}

/**
 * A named API resource with name and URL
 */
export interface NamedAPIResource {
  /** The name of the referenced resource */
  name: string;
  /** The URL of the referenced resource */
  url: string;
}

/**
 * A description in a specific language
 */
export interface Description {
  /** The localized description for an API resource in a specific language */
  description: string;
  /** The language this description is in */
  language: NamedAPIResource;
}

/**
 * An effect with language information
 */
export interface Effect {
  /** The localized effect text for an API resource in a specific language */
  effect: string;
  /** The language this effect is in */
  language: NamedAPIResource;
}

/**
 * A verbose effect with short and full descriptions
 */
export interface VerboseEffect {
  /** The localized effect text for an API resource in a specific language */
  effect: string;
  /** The localized short effect text for an API resource in a specific language */
  short_effect: string;
  /** The language this effect is in */
  language: NamedAPIResource;
}

/**
 * A localized name
 */
export interface Name {
  /** The localized name for an API resource in a specific language */
  name: string;
  /** The language this name is in */
  language: NamedAPIResource;
}

/**
 * Flavor text in a specific language and version
 */
export interface FlavorText {
  /** The localized flavor text for an API resource */
  flavor_text: string;
  /** The language this flavor text is in */
  language: NamedAPIResource;
  /** The game version this flavor text is extracted from */
  version: NamedAPIResource;
}

/**
 * A game index for a generation
 */
export interface GenerationGameIndex {
  /** The internal id of an API resource within game data */
  game_index: number;
  /** The generation relevant to this game index */
  generation: NamedAPIResource;
}

/**
 * A game index for a version
 */
export interface VersionGameIndex {
  /** The internal id of an API resource within game data */
  game_index: number;
  /** The version relevant to this game index */
  version: NamedAPIResource;
}

/**
 * Version group flavor text
 */
export interface VersionGroupFlavorText {
  /** The localized name for an API resource in a specific language */
  text: string;
  /** The language this name is in */
  language: NamedAPIResource;
  /** The version group which uses this flavor text */
  version_group: NamedAPIResource;
}

/**
 * Machine version detail
 */
export interface MachineVersionDetail {
  /** The machine that teaches a move from an item */
  machine: APIResource;
  /** The version group of this specific machine */
  version_group: NamedAPIResource;
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

/**
 * Response for named API resource lists (with pagination)
 */
export interface NamedAPIResourceList {
  /** The total number of resources available from this API */
  count: number;
  /** The URL for the next page in the list */
  next: string | null;
  /** The URL for the previous page in the list */
  previous: string | null;
  /** A list of named API resources */
  results: NamedAPIResource[];
}

/**
 * Response for unnamed API resource lists (with pagination)
 */
export interface APIResourceList {
  /** The total number of resources available from this API */
  count: number;
  /** The URL for the next page in the list */
  next: string | null;
  /** The URL for the previous page in the list */
  previous: string | null;
  /** A list of unnamed API resources */
  results: APIResource[];
}

// ============================================================================
// BERRIES
// ============================================================================

/**
 * Berry flavor map
 */
export interface BerryFlavorMap {
  /** How powerful the referenced flavor is for this berry */
  potency: number;
  /** The referenced berry flavor */
  flavor: NamedAPIResource;
}

/**
 * Berry resource
 * GET /api/v2/berry/{id or name}
 */
export interface Berry {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** Time it takes the tree to grow one stage, in hours */
  growth_time: number;
  /** The maximum number of these berries that can grow on one tree in Generation IV */
  max_harvest: number;
  /** The power of the move "Natural Gift" when used with this Berry */
  natural_gift_power: number;
  /** The size of this Berry, in millimeters */
  size: number;
  /** The smoothness of this Berry, used in making Pokéblocks or Poffins */
  smoothness: number;
  /** The speed at which this Berry dries out the soil as it grows */
  soil_dryness: number;
  /** The firmness of this berry */
  firmness: NamedAPIResource;
  /** A list of references to each flavor a berry can have */
  flavors: BerryFlavorMap[];
  /** Berries are actually items. This is a reference to the item specific data */
  item: NamedAPIResource;
  /** The type inherited by "Natural Gift" when used with this Berry */
  natural_gift_type: NamedAPIResource;
}

/**
 * Berry Firmness resource
 * GET /api/v2/berry-firmness/{id or name}
 */
export interface BerryFirmness {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of the berries with this firmness */
  berries: NamedAPIResource[];
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Flavor berry map
 */
export interface FlavorBerryMap {
  /** How powerful the referenced flavor is for this berry */
  potency: number;
  /** The berry with the referenced flavor */
  berry: NamedAPIResource;
}

/**
 * Berry Flavor resource
 * GET /api/v2/berry-flavor/{id or name}
 */
export interface BerryFlavor {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of the berries with this flavor */
  berries: FlavorBerryMap[];
  /** The contest type that correlates with this berry flavor */
  contest_type: NamedAPIResource;
  /** The name of this resource listed in different languages */
  names: Name[];
}

// ============================================================================
// CONTESTS
// ============================================================================

/**
 * Contest Name
 */
export interface ContestName {
  /** The name for this contest */
  name: string;
  /** The color associated with this contest's name */
  color: string;
  /** The language that this name is in */
  language: NamedAPIResource;
}

/**
 * Contest Type resource
 * GET /api/v2/contest-type/{id or name}
 */
export interface ContestType {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The berry flavor that correlates with this contest type */
  berry_flavor: NamedAPIResource;
  /** The name of this contest type listed in different languages */
  names: ContestName[];
}

/**
 * Contest Effect resource
 * GET /api/v2/contest-effect/{id}
 */
export interface ContestEffect {
  /** The identifier for this resource */
  id: number;
  /** The base number of hearts the user of this move gets */
  appeal: number;
  /** The base number of hearts the user's opponent loses */
  jam: number;
  /** The result of this contest effect listed in different languages */
  effect_entries: Effect[];
  /** The flavor text of this contest effect listed in different languages */
  flavor_text_entries: FlavorText[];
}

/**
 * Super Contest Effect resource
 * GET /api/v2/super-contest-effect/{id}
 */
export interface SuperContestEffect {
  /** The identifier for this resource */
  id: number;
  /** The level of appeal this super contest effect has */
  appeal: number;
  /** The flavor text of this super contest effect listed in different languages */
  flavor_text_entries: FlavorText[];
  /** A list of moves that have the effect when used in super contests */
  moves: NamedAPIResource[];
}

// ============================================================================
// ENCOUNTERS
// ============================================================================

/**
 * Encounter Method resource
 * GET /api/v2/encounter-method/{id or name}
 */
export interface EncounterMethod {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A good value for sorting */
  order: number;
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Encounter Condition resource
 * GET /api/v2/encounter-condition/{id or name}
 */
export interface EncounterCondition {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of possible values for this encounter condition */
  values: NamedAPIResource[];
}

/**
 * Encounter Condition Value resource
 * GET /api/v2/encounter-condition-value/{id or name}
 */
export interface EncounterConditionValue {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The condition this encounter condition value pertains to */
  condition: NamedAPIResource;
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Encounter details
 */
export interface Encounter {
  /** The lowest level the Pokémon could be encountered at */
  min_level: number;
  /** The highest level the Pokémon could be encountered at */
  max_level: number;
  /** A list of condition values that must be in effect for this encounter to occur */
  condition_values: NamedAPIResource[];
  /** Percent chance that this encounter will occur */
  chance: number;
  /** The method by which this encounter happens */
  method: NamedAPIResource;
}

/**
 * Version encounter detail
 */
export interface VersionEncounterDetail {
  /** The game version this encounter happens in */
  version: NamedAPIResource;
  /** The total percentage of all encounter potential */
  max_chance: number;
  /** A list of encounters and their specifics */
  encounter_details: Encounter[];
}

// ============================================================================
// EVOLUTION
// ============================================================================

/**
 * Evolution Detail
 */
export interface EvolutionDetail {
  /** The item required to cause evolution */
  item: NamedAPIResource | null;
  /** The type of event that triggers evolution */
  trigger: NamedAPIResource;
  /** The id of the gender of the evolving Pokémon species must be in order to evolve */
  gender: number | null;
  /** The item the evolving Pokémon species must be holding */
  held_item: NamedAPIResource | null;
  /** The move that must be known by the evolving Pokémon species */
  known_move: NamedAPIResource | null;
  /** The evolving Pokémon species must know a move with this type */
  known_move_type: NamedAPIResource | null;
  /** The location the evolution must be triggered at */
  location: NamedAPIResource | null;
  /** The minimum required level of the evolving Pokémon species */
  min_level: number | null;
  /** The minimum required level of happiness */
  min_happiness: number | null;
  /** The minimum required level of beauty */
  min_beauty: number | null;
  /** The minimum required level of affection */
  min_affection: number | null;
  /** Whether or not it must be raining in the overworld */
  needs_overworld_rain: boolean;
  /** The Pokémon species that must be in the players party */
  party_species: NamedAPIResource | null;
  /** The player must have a Pokémon of this type in their party */
  party_type: NamedAPIResource | null;
  /** The required relation between the Pokémon's Attack and Defense stats */
  relative_physical_stats: number | null;
  /** The required time of day. Day or night */
  time_of_day: string;
  /** Pokémon species for which this one must be traded */
  trade_species: NamedAPIResource | null;
  /** Whether or not the 3DS needs to be turned upside-down */
  turn_upside_down: boolean;
}

/**
 * Chain Link
 */
export interface ChainLink {
  /** Whether or not this link is for a baby Pokémon */
  is_baby: boolean;
  /** The Pokémon species at this point in the evolution chain */
  species: NamedAPIResource;
  /** All details regarding the specific details of the referenced Pokémon species evolution */
  evolution_details: EvolutionDetail[] | null;
  /** A List of chain objects */
  evolves_to: ChainLink[];
}

/**
 * Evolution Chain resource
 * GET /api/v2/evolution-chain/{id}
 */
export interface EvolutionChain {
  /** The identifier for this resource */
  id: number;
  /** The item that a Pokémon would be holding when mating */
  baby_trigger_item: NamedAPIResource | null;
  /** The base chain link object */
  chain: ChainLink;
}

/**
 * Evolution Trigger resource
 * GET /api/v2/evolution-trigger/{id or name}
 */
export interface EvolutionTrigger {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of pokemon species that result from this evolution trigger */
  pokemon_species: NamedAPIResource[];
}

// ============================================================================
// GAMES
// ============================================================================

/**
 * Generation resource
 * GET /api/v2/generation/{id or name}
 */
export interface Generation {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of abilities that were introduced in this generation */
  abilities: NamedAPIResource[];
  /** The name of this resource listed in different languages */
  names: Name[];
  /** The main region travelled in this generation */
  main_region: NamedAPIResource;
  /** A list of moves that were introduced in this generation */
  moves: NamedAPIResource[];
  /** A list of Pokémon species that were introduced in this generation */
  pokemon_species: NamedAPIResource[];
  /** A list of types that were introduced in this generation */
  types: NamedAPIResource[];
  /** A list of version groups that were introduced in this generation */
  version_groups: NamedAPIResource[];
}

/**
 * Pokemon Entry
 */
export interface PokemonEntry {
  /** The index of this Pokémon species entry within the Pokédex */
  entry_number: number;
  /** The Pokémon species being encountered */
  pokemon_species: NamedAPIResource;
}

/**
 * Pokedex resource
 * GET /api/v2/pokedex/{id or name}
 */
export interface Pokedex {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** Whether or not this Pokédex originated in the main series */
  is_main_series: boolean;
  /** The description of this resource listed in different languages */
  descriptions: Description[];
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of Pokémon catalogued in this Pokédex and their indexes */
  pokemon_entries: PokemonEntry[];
  /** The region this Pokédex catalogues Pokémon for */
  region: NamedAPIResource | null;
  /** A list of version groups this Pokédex is relevant to */
  version_groups: NamedAPIResource[];
}

/**
 * Version resource
 * GET /api/v2/version/{id or name}
 */
export interface Version {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** The version group this version belongs to */
  version_group: NamedAPIResource;
}

/**
 * Version Group resource
 * GET /api/v2/version-group/{id or name}
 */
export interface VersionGroup {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** Order for sorting */
  order: number;
  /** The generation this version was introduced in */
  generation: NamedAPIResource;
  /** A list of methods in which Pokémon can learn moves in this version group */
  move_learn_methods: NamedAPIResource[];
  /** A list of Pokédexes introduces in this version group */
  pokedexes: NamedAPIResource[];
  /** A list of regions that can be visited in this version group */
  regions: NamedAPIResource[];
  /** The versions this version group owns */
  versions: NamedAPIResource[];
}

// ============================================================================
// ITEMS
// ============================================================================

/**
 * Item Sprites
 */
export interface ItemSprites {
  /** The default depiction of this item */
  default: string;
}

/**
 * Item Holder Pokemon Version Detail
 */
export interface ItemHolderPokemonVersionDetail {
  /** How often this Pokémon holds this item in this version */
  rarity: number;
  /** The version that this item is held in by the Pokémon */
  version: NamedAPIResource;
}

/**
 * Item Holder Pokemon
 */
export interface ItemHolderPokemon {
  /** The Pokémon that holds this item */
  pokemon: NamedAPIResource;
  /** The details for the version that this item is held in by the Pokémon */
  version_details: ItemHolderPokemonVersionDetail[];
}

/**
 * Item resource
 * GET /api/v2/item/{id or name}
 */
export interface Item {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The price of this item in stores */
  cost: number;
  /** The power of the move Fling when used with this item */
  fling_power: number | null;
  /** The effect of the move Fling when used with this item */
  fling_effect: NamedAPIResource | null;
  /** A list of attributes this item has */
  attributes: NamedAPIResource[];
  /** The category of items this item falls into */
  category: NamedAPIResource;
  /** The effect of this ability listed in different languages */
  effect_entries: VerboseEffect[];
  /** The flavor text of this ability listed in different languages */
  flavor_text_entries: VersionGroupFlavorText[];
  /** A list of game indices relevent to this item by generation */
  game_indices: GenerationGameIndex[];
  /** The name of this item listed in different languages */
  names: Name[];
  /** A set of sprites used to depict this item in the game */
  sprites: ItemSprites;
  /** A list of Pokémon that might be found in the wild holding this item */
  held_by_pokemon: ItemHolderPokemon[];
  /** An evolution chain this item requires to produce a baby during mating */
  baby_trigger_for: APIResource | null;
  /** A list of the machines related to this item */
  machines: MachineVersionDetail[];
}

/**
 * Item Attribute resource
 * GET /api/v2/item-attribute/{id or name}
 */
export interface ItemAttribute {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of items that have this attribute */
  items: NamedAPIResource[];
  /** The name of this item attribute listed in different languages */
  names: Name[];
  /** The description of this item attribute listed in different languages */
  descriptions: Description[];
}

/**
 * Item Category resource
 * GET /api/v2/item-category/{id or name}
 */
export interface ItemCategory {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of items that are a part of this category */
  items: NamedAPIResource[];
  /** The name of this item category listed in different languages */
  names: Name[];
  /** The pocket items in this category would be put in */
  pocket: NamedAPIResource;
}

/**
 * Item Fling Effect resource
 * GET /api/v2/item-fling-effect/{id or name}
 */
export interface ItemFlingEffect {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The result of this fling effect listed in different languages */
  effect_entries: Effect[];
  /** A list of items that have this fling effect */
  items: NamedAPIResource[];
}

/**
 * Item Pocket resource
 * GET /api/v2/item-pocket/{id or name}
 */
export interface ItemPocket {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of item categories that are relevant to this item pocket */
  categories: NamedAPIResource[];
  /** The name of this resource listed in different languages */
  names: Name[];
}

// ============================================================================
// LOCATIONS
// ============================================================================

/**
 * Location resource
 * GET /api/v2/location/{id or name}
 */
export interface Location {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The region this location can be found in */
  region: NamedAPIResource | null;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of game indices relevent to this location by generation */
  game_indices: GenerationGameIndex[];
  /** Areas that can be found within this location */
  areas: NamedAPIResource[];
}

/**
 * Encounter Method Rate
 */
export interface EncounterMethodRate {
  /** The method in which Pokémon may be encountered in an area */
  encounter_method: NamedAPIResource;
  /** The chance of the encounter to occur on a version of the game */
  version_details: EncounterVersionDetails[];
}

/**
 * Encounter Version Details
 */
export interface EncounterVersionDetails {
  /** The chance of an encounter to occur */
  rate: number;
  /** The version of the game in which the encounter can occur */
  version: NamedAPIResource;
}

/**
 * Pokemon Encounter
 */
export interface PokemonEncounter {
  /** The Pokémon being encountered */
  pokemon: NamedAPIResource;
  /** A list of versions and encounters with Pokémon that might happen */
  version_details: VersionEncounterDetail[];
}

/**
 * Location Area resource
 * GET /api/v2/location-area/{id or name}
 */
export interface LocationArea {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The internal id of an API resource within game data */
  game_index: number;
  /** A list of methods in which Pokémon may be encountered in this area */
  encounter_method_rates: EncounterMethodRate[];
  /** The region this location area can be found in */
  location: NamedAPIResource;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of Pokémon that can be encountered in this area */
  pokemon_encounters: PokemonEncounter[];
}

/**
 * Pal Park Encounter Species
 */
export interface PalParkEncounterSpecies {
  /** The base score given to the player when this Pokémon is caught */
  base_score: number;
  /** The base rate for encountering this Pokémon in this pal park area */
  rate: number;
  /** The Pokémon species being encountered */
  pokemon_species: NamedAPIResource;
}

/**
 * Pal Park Area resource
 * GET /api/v2/pal-park-area/{id or name}
 */
export interface PalParkArea {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of Pokémon encountered in this pal park area along with details */
  pokemon_encounters: PalParkEncounterSpecies[];
}

/**
 * Region resource
 * GET /api/v2/region/{id or name}
 */
export interface Region {
  /** The identifier for this resource */
  id: number;
  /** A list of locations that can be found in this region */
  locations: NamedAPIResource[];
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** The generation this region was introduced in */
  main_generation: NamedAPIResource;
  /** A list of pokédexes that catalogue Pokémon in this region */
  pokedexes: NamedAPIResource[];
  /** A list of version groups where this region can be visited */
  version_groups: NamedAPIResource[];
}

// ============================================================================
// MACHINES
// ============================================================================

/**
 * Machine resource
 * GET /api/v2/machine/{id}
 */
export interface Machine {
  /** The identifier for this resource */
  id: number;
  /** The TM or HM item that corresponds to this machine */
  item: NamedAPIResource;
  /** The move that is taught by this machine */
  move: NamedAPIResource;
  /** The version group that this machine applies to */
  version_group: NamedAPIResource;
}

// ============================================================================
// MOVES
// ============================================================================

/**
 * Contest Combo Detail
 */
export interface ContestComboDetail {
  /** A list of moves to use before this move */
  use_before: NamedAPIResource[] | null;
  /** A list of moves to use after this move */
  use_after: NamedAPIResource[] | null;
}

/**
 * Contest Combo Sets
 */
export interface ContestComboSets {
  /** A detail of moves this move can be used before or after */
  normal: ContestComboDetail | null;
  /** A detail of moves this move can be used before or after */
  super: ContestComboDetail | null;
}

/**
 * Move Meta Data
 */
export interface MoveMetaData {
  /** The status ailment this move inflicts on its target */
  ailment: NamedAPIResource;
  /** The category of move this move falls under */
  category: NamedAPIResource;
  /** The minimum number of times this move hits */
  min_hits: number | null;
  /** The maximum number of times this move hits */
  max_hits: number | null;
  /** The minimum number of turns this move continues to take effect */
  min_turns: number | null;
  /** The maximum number of turns this move continues to take effect */
  max_turns: number | null;
  /** HP drain (if positive) or Recoil damage (if negative) */
  drain: number;
  /** The amount of hp gained by the attacking Pokemon */
  healing: number;
  /** Critical hit rate bonus */
  crit_rate: number;
  /** The likelihood this attack will cause an ailment */
  ailment_chance: number;
  /** The likelihood this attack will cause the target Pokémon to flinch */
  flinch_chance: number;
  /** The likelihood this attack will cause a stat change in the target */
  stat_chance: number;
}

/**
 * Move Stat Change
 */
export interface MoveStatChange {
  /** The amount of change */
  change: number;
  /** The stat being affected */
  stat: NamedAPIResource;
}

/**
 * Past Move Stat Values
 */
export interface PastMoveStatValues {
  /** The percent value of how likely this move is to be successful */
  accuracy: number | null;
  /** The percent value of how likely it is this moves effect will happen */
  effect_chance: number | null;
  /** The base power of this move with a value of 0 if it does not have a base power */
  power: number | null;
  /** Power points. The number of times this move can be used */
  pp: number | null;
  /** The effect of this move listed in different languages */
  effect_entries: VerboseEffect[];
  /** The elemental type of this move */
  type: NamedAPIResource | null;
  /** The version group in which these move stat values were in effect */
  version_group: NamedAPIResource;
}

/**
 * Move Flavor Text
 */
export interface MoveFlavorText {
  /** The localized flavor text for an API resource in a specific language */
  flavor_text: string;
  /** The language this name is in */
  language: NamedAPIResource;
  /** The version group that uses this flavor text */
  version_group: NamedAPIResource;
}

/**
 * Move resource
 * GET /api/v2/move/{id or name}
 */
export interface Move {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The percent value of how likely this move is to be successful */
  accuracy: number | null;
  /** The percent value of how likely it is this moves effect will take effect */
  effect_chance: number | null;
  /** Power points. The number of times this move can be used */
  pp: number;
  /** A value between -8 and 8. Sets the order in which moves are executed */
  priority: number;
  /** The base power of this move with a value of 0 if it does not have a base power */
  power: number | null;
  /** A detail of normal and super contest combos that require this move */
  contest_combos: ContestComboSets | null;
  /** The type of appeal this move gives a Pokémon when used in a contest */
  contest_type: NamedAPIResource | null;
  /** The effect the move has when used in a contest */
  contest_effect: APIResource | null;
  /** The type of damage the move inflicts on the target */
  damage_class: NamedAPIResource;
  /** The effect of this move listed in different languages */
  effect_entries: VerboseEffect[];
  /** The list of previous effects this move has had across version groups */
  effect_changes: AbilityEffectChange[];
  /** List of Pokemon that can learn this move */
  learned_by_pokemon: NamedAPIResource[];
  /** The flavor text of this move listed in different languages */
  flavor_text_entries: MoveFlavorText[];
  /** The generation in which this move was introduced */
  generation: NamedAPIResource;
  /** Metadata about this move */
  meta: MoveMetaData | null;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of move resource value changes across version groups */
  past_values: PastMoveStatValues[];
  /** A list of stats this moves effects and how much it effects them */
  stat_changes: MoveStatChange[];
  /** The effect the move has when used in a super contest */
  super_contest_effect: APIResource | null;
  /** The type of target that will receive the effects of the attack */
  target: NamedAPIResource;
  /** The elemental type of this move */
  type: NamedAPIResource;
}

/**
 * Move Ailment resource
 * GET /api/v2/move-ailment/{id or name}
 */
export interface MoveAilment {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of moves that cause this ailment */
  moves: NamedAPIResource[];
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Move Battle Style resource
 * GET /api/v2/move-battle-style/{id or name}
 */
export interface MoveBattleStyle {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Move Category resource
 * GET /api/v2/move-category/{id or name}
 */
export interface MoveCategory {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of moves that fall into this category */
  moves: NamedAPIResource[];
  /** The description of this resource listed in different languages */
  descriptions: Description[];
}

/**
 * Move Damage Class resource
 * GET /api/v2/move-damage-class/{id or name}
 */
export interface MoveDamageClass {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The description of this resource listed in different languages */
  descriptions: Description[];
  /** A list of moves that fall into this damage class */
  moves: NamedAPIResource[];
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Move Learn Method resource
 * GET /api/v2/move-learn-method/{id or name}
 */
export interface MoveLearnMethod {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The description of this resource listed in different languages */
  descriptions: Description[];
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of version groups where moves can be learned through this method */
  version_groups: NamedAPIResource[];
}

/**
 * Move Target resource
 * GET /api/v2/move-target/{id or name}
 */
export interface MoveTarget {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The description of this resource listed in different languages */
  descriptions: Description[];
  /** A list of moves that are directed at this target */
  moves: NamedAPIResource[];
  /** The name of this resource listed in different languages */
  names: Name[];
}

// ============================================================================
// POKEMON
// ============================================================================

/**
 * Ability Effect Change
 */
export interface AbilityEffectChange {
  /** The previous effect of this ability listed in different languages */
  effect_entries: Effect[];
  /** The version group in which the previous effect of this ability originated */
  version_group: NamedAPIResource;
}

/**
 * Ability Flavor Text
 */
export interface AbilityFlavorText {
  /** The localized name for an API resource in a specific language */
  flavor_text: string;
  /** The language this text resource is in */
  language: NamedAPIResource;
  /** The version group that uses this flavor text */
  version_group: NamedAPIResource;
}

/**
 * Ability Pokemon
 */
export interface AbilityPokemon {
  /** Whether or not this a hidden ability for the referenced Pokémon */
  is_hidden: boolean;
  /** Pokémon have 3 ability 'slots' */
  slot: number;
  /** The Pokémon this ability could belong to */
  pokemon: NamedAPIResource;
}

/**
 * Ability resource
 * GET /api/v2/ability/{id or name}
 */
export interface Ability {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** Whether or not this ability originated in the main series */
  is_main_series: boolean;
  /** The generation this ability originated in */
  generation: NamedAPIResource;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** The effect of this ability listed in different languages */
  effect_entries: VerboseEffect[];
  /** The list of previous effects this ability has had */
  effect_changes: AbilityEffectChange[];
  /** The flavor text of this ability listed in different languages */
  flavor_text_entries: AbilityFlavorText[];
  /** A list of Pokémon that could potentially have this ability */
  pokemon: AbilityPokemon[];
}

/**
 * Characteristic resource
 * GET /api/v2/characteristic/{id}
 */
export interface Characteristic {
  /** The identifier for this resource */
  id: number;
  /** The remainder of the highest stat/IV divided by 5 */
  gene_modulo: number;
  /** The possible values of the highest stat that would result in a Pokemon receiving this characteristic */
  possible_values: number[];
  /** The stat which the characteristic describes */
  highest_stat: NamedAPIResource;
  /** The descriptions of this characteristic */
  descriptions: Description[];
}

/**
 * Egg Group resource
 * GET /api/v2/egg-group/{id or name}
 */
export interface EggGroup {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of all Pokémon species that are members of this egg group */
  pokemon_species: NamedAPIResource[];
}

/**
 * Pokemon Species Gender
 */
export interface PokemonSpeciesGender {
  /** The chance of this Pokémon being female, in eighths; or -1 for genderless */
  rate: number;
  /** A Pokémon species that can be the referenced gender */
  pokemon_species: NamedAPIResource;
}

/**
 * Gender resource
 * GET /api/v2/gender/{id or name}
 */
export interface Gender {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A list of Pokémon species that can be this gender */
  pokemon_species_details: PokemonSpeciesGender[];
  /** A list of Pokémon species that required this gender in order for evolution */
  required_for_evolution: NamedAPIResource[];
}

/**
 * Growth Rate Experience Level
 */
export interface GrowthRateExperienceLevel {
  /** The level gained */
  level: number;
  /** The amount of experience required to reach the referenced level */
  experience: number;
}

/**
 * Growth Rate resource
 * GET /api/v2/growth-rate/{id or name}
 */
export interface GrowthRate {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The formula used to calculate the rate at which the Pokémon species gains level */
  formula: string;
  /** The descriptions of this growth rate */
  descriptions: Description[];
  /** A list of levels and the amount of experience needed to atain them */
  levels: GrowthRateExperienceLevel[];
  /** A list of Pokémon species that gain levels at this growth rate */
  pokemon_species: NamedAPIResource[];
}

/**
 * Nature Stat Change
 */
export interface NatureStatChange {
  /** The amount of change */
  max_change: number;
  /** The stat being affected */
  pokeathlon_stat: NamedAPIResource;
}

/**
 * Move Battle Style Preference
 */
export interface MoveBattleStylePreference {
  /** Chance of using the move, in percent, if HP is under one half */
  low_hp_preference: number;
  /** Chance of using the move, in percent, if HP is over one half */
  high_hp_preference: number;
  /** The move battle style */
  move_battle_style: NamedAPIResource;
}

/**
 * Nature resource
 * GET /api/v2/nature/{id or name}
 */
export interface Nature {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The stat decreased by 10% in Pokémon with this nature */
  decreased_stat: NamedAPIResource | null;
  /** The stat increased by 10% in Pokémon with this nature */
  increased_stat: NamedAPIResource | null;
  /** The flavor hated by Pokémon with this nature */
  hates_flavor: NamedAPIResource | null;
  /** The flavor liked by Pokémon with this nature */
  likes_flavor: NamedAPIResource | null;
  /** A list of Pokéathlon stats this nature effects */
  pokeathlon_stat_changes: NatureStatChange[];
  /** A list of battle styles and how likely a Pokémon with this nature is to use them */
  move_battle_style_preferences: MoveBattleStylePreference[];
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Nature Pokeathlon Stat Affect
 */
export interface NaturePokeathlonStatAffect {
  /** The maximum amount of change to the referenced stat */
  max_change: number;
  /** The nature causing the change */
  nature: NamedAPIResource;
}

/**
 * Nature Pokeathlon Stat Affect Sets
 */
export interface NaturePokeathlonStatAffectSets {
  /** A list of natures and how they change the referenced Pokéathlon stat */
  increase: NaturePokeathlonStatAffect[];
  /** A list of natures and how they change the referenced Pokéathlon stat */
  decrease: NaturePokeathlonStatAffect[];
}

/**
 * Pokeathlon Stat resource
 * GET /api/v2/pokeathlon-stat/{id or name}
 */
export interface PokeathlonStat {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A detail of natures which affect this Pokéathlon stat */
  affecting_natures: NaturePokeathlonStatAffectSets;
}

/**
 * Pokemon Ability
 */
export interface PokemonAbility {
  /** Whether or not this is a hidden ability */
  is_hidden: boolean;
  /** The slot this ability occupies in this Pokémon species */
  slot: number;
  /** The ability the Pokémon may have */
  ability: NamedAPIResource;
}

/**
 * Pokemon Type
 */
export interface PokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The type the referenced Pokémon has */
  type: NamedAPIResource;
}

/**
 * Pokemon Form Type
 */
export interface PokemonFormType {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The type the referenced form has */
  type: NamedAPIResource;
}

/**
 * Pokemon Type Past
 */
export interface PokemonTypePast {
  /** The generation of this Pokémon type */
  generation: NamedAPIResource;
  /** Types this Pokémon had in that generation */
  types: PokemonType[];
}

/**
 * Pokemon Ability Past
 */
export interface PokemonAbilityPast {
  /** The generation of this Pokémon ability */
  generation: NamedAPIResource;
  /** Abilities this Pokémon had in that generation */
  abilities: PokemonAbility[];
}

/**
 * Pokemon Held Item Version
 */
export interface PokemonHeldItemVersion {
  /** The version in which the item is held */
  version: NamedAPIResource;
  /** How often the item is held */
  rarity: number;
}

/**
 * Pokemon Held Item
 */
export interface PokemonHeldItem {
  /** The item the referenced Pokémon holds */
  item: NamedAPIResource;
  /** The details of the different versions in which the item is held */
  version_details: PokemonHeldItemVersion[];
}

/**
 * Pokemon Move Version
 */
export interface PokemonMoveVersion {
  /** The method by which the move is learned */
  move_learn_method: NamedAPIResource;
  /** The version group in which the move is learned */
  version_group: NamedAPIResource;
  /** The minimum level to learn the move */
  level_learned_at: number;
}

/**
 * Pokemon Move
 */
export interface PokemonMove {
  /** The move the Pokémon can learn */
  move: NamedAPIResource;
  /** The details of the version in which the Pokémon can learn the move */
  version_group_details: PokemonMoveVersion[];
}

/**
 * Pokemon Stat
 */
export interface PokemonStat {
  /** The stat the Pokémon has */
  stat: NamedAPIResource;
  /** The effort points (EV) the Pokémon has in the stat */
  effort: number;
  /** The base value of the stat */
  base_stat: number;
}

/**
 * Pokemon Sprites (simplified - actual structure is much more nested)
 */
export interface PokemonSprites {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** Other sprite sources */
  other?: Record<string, any>;
  /** Version specific sprites */
  versions?: Record<string, any>;
}

/**
 * Pokemon Cries
 */
export interface PokemonCries {
  /** The latest cry audio file */
  latest: string;
  /** The legacy cry audio file */
  legacy: string;
}

/**
 * Pokemon resource
 * GET /api/v2/pokemon/{id or name}
 */
export interface Pokemon {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The base experience gained for defeating this Pokémon */
  base_experience: number | null;
  /** The height of this Pokémon in decimetres */
  height: number;
  /** Set for exactly one Pokémon used as the default for each species */
  is_default: boolean;
  /** Order for sorting. Almost national order, except families are grouped together */
  order: number;
  /** The weight of this Pokémon in hectograms */
  weight: number;
  /** A list of abilities this Pokémon could potentially have */
  abilities: PokemonAbility[];
  /** A list of forms this Pokémon can take on */
  forms: NamedAPIResource[];
  /** A list of game indices relevent to Pokémon item by generation */
  game_indices: VersionGameIndex[];
  /** A list of items this Pokémon may be holding when encountered */
  held_items: PokemonHeldItem[];
  /** A link to a list of location areas as well as encounter details */
  location_area_encounters: string;
  /** A list of moves along with learn methods */
  moves: PokemonMove[];
  /** A list of details showing types this Pokémon had in previous generations */
  past_types: PokemonTypePast[];
  /** A list of details showing abilities this Pokémon had in previous generations */
  past_abilities?: PokemonAbilityPast[];
  /** The species this Pokémon belongs to */
  species: NamedAPIResource;
  /** A set of sprites used to depict this Pokémon in the game */
  sprites: PokemonSprites;
  /** A set of cries used to depict this Pokémon in the game */
  cries: PokemonCries;
  /** A list of base stat values for this Pokémon */
  stats: PokemonStat[];
  /** A list of details showing types this Pokémon has */
  types: PokemonType[];
}

/**
 * Location Area Encounter (returned from pokemon/{id or name}/encounters)
 */
export interface LocationAreaEncounter {
  /** The location area the referenced Pokémon can be encountered in */
  location_area: NamedAPIResource;
  /** A list of versions and encounters with the referenced Pokémon */
  version_details: VersionEncounterDetail[];
}

/**
 * Pokemon Color resource
 * GET /api/v2/pokemon-color/{id or name}
 */
export interface PokemonColor {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of the Pokémon species that have this color */
  pokemon_species: NamedAPIResource[];
}

/**
 * Pokemon Form Sprites
 */
export interface PokemonFormSprites {
  /** The default depiction of this Pokémon form from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon form from the front in battle */
  front_shiny: string | null;
  /** The default depiction of this Pokémon form from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon form from the back in battle */
  back_shiny: string | null;
}

/**
 * Pokemon Form resource
 * GET /api/v2/pokemon-form/{id or name}
 */
export interface PokemonForm {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The order in which forms should be sorted within all forms */
  order: number;
  /** The order in which forms should be sorted within a species' forms */
  form_order: number;
  /** True for exactly one form used as the default for each Pokémon */
  is_default: boolean;
  /** Whether or not this form can only happen during battle */
  is_battle_only: boolean;
  /** Whether or not this form requires mega evolution */
  is_mega: boolean;
  /** The name of this form */
  form_name: string;
  /** The Pokémon that can take on this form */
  pokemon: NamedAPIResource;
  /** A list of details showing types this Pokémon form has */
  types: PokemonFormType[];
  /** A set of sprites used to depict this Pokémon form in the game */
  sprites: PokemonFormSprites;
  /** The version group this Pokémon form was introduced in */
  version_group: NamedAPIResource;
  /** The form specific full name of this Pokémon form */
  names: Name[];
  /** The form specific form name of this Pokémon form */
  form_names: Name[];
}

/**
 * Pokemon Habitat resource
 * GET /api/v2/pokemon-habitat/{id or name}
 */
export interface PokemonHabitat {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of the Pokémon species that can be found in this habitat */
  pokemon_species: NamedAPIResource[];
}

/**
 * Awesome Name
 */
export interface AwesomeName {
  /** The localized "scientific" name for an API resource in a specific language */
  awesome_name: string;
  /** The language this "scientific" name is in */
  language: NamedAPIResource;
}

/**
 * Pokemon Shape resource
 * GET /api/v2/pokemon-shape/{id or name}
 */
export interface PokemonShape {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The "scientific" names of this Pokémon shape */
  awesome_names: AwesomeName[];
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of the Pokémon species that have this shape */
  pokemon_species: NamedAPIResource[];
}

/**
 * Genus
 */
export interface Genus {
  /** The localized genus for the referenced Pokémon species */
  genus: string;
  /** The language this genus is in */
  language: NamedAPIResource;
}

/**
 * Pokemon Species Dex Entry
 */
export interface PokemonSpeciesDexEntry {
  /** The index number within the Pokédex */
  entry_number: number;
  /** The Pokédex the referenced Pokémon species can be found in */
  pokedex: NamedAPIResource;
}

/**
 * Pal Park Encounter Area
 */
export interface PalParkEncounterArea {
  /** The base score given to the player when the referenced Pokémon is caught */
  base_score: number;
  /** The base rate for encountering the referenced Pokémon */
  rate: number;
  /** The pal park area where this encounter happens */
  area: NamedAPIResource;
}

/**
 * Pokemon Species Variety
 */
export interface PokemonSpeciesVariety {
  /** Whether this variety is the default variety */
  is_default: boolean;
  /** The Pokémon variety */
  pokemon: NamedAPIResource;
}

/**
 * Pokemon Species resource
 * GET /api/v2/pokemon-species/{id or name}
 */
export interface PokemonSpecies {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The order in which species should be sorted */
  order: number;
  /** The chance of this Pokémon being female, in eighths; or -1 for genderless */
  gender_rate: number;
  /** The base capture rate; up to 255 */
  capture_rate: number;
  /** The happiness when caught by a normal Pokéball; up to 255 */
  base_happiness: number;
  /** Whether or not this is a baby Pokémon */
  is_baby: boolean;
  /** Whether or not this is a legendary Pokémon */
  is_legendary: boolean;
  /** Whether or not this is a mythical Pokémon */
  is_mythical: boolean;
  /** Initial hatch counter: one must walk X * 255 steps before egg hatches */
  hatch_counter: number;
  /** Whether or not this Pokémon has visual gender differences */
  has_gender_differences: boolean;
  /** Whether or not this Pokémon has multiple forms and can switch between them */
  forms_switchable: boolean;
  /** The rate at which this Pokémon species gains levels */
  growth_rate: NamedAPIResource;
  /** A list of Pokedexes and the indexes reserved within them */
  pokedex_numbers: PokemonSpeciesDexEntry[];
  /** A list of egg groups this Pokémon species is a member of */
  egg_groups: NamedAPIResource[];
  /** The color of this Pokémon for Pokédex search */
  color: NamedAPIResource;
  /** The shape of this Pokémon for Pokédex search */
  shape: NamedAPIResource;
  /** The Pokémon species that evolves into this Pokemon_species */
  evolves_from_species: NamedAPIResource | null;
  /** The evolution chain this Pokémon species is a member of */
  evolution_chain: APIResource;
  /** The habitat this Pokémon species can be encountered in */
  habitat: NamedAPIResource | null;
  /** The generation this Pokémon species was introduced in */
  generation: NamedAPIResource;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of encounters that can be had with this Pokémon species in pal park */
  pal_park_encounters: PalParkEncounterArea[];
  /** A list of flavor text entries for this Pokémon species */
  flavor_text_entries: FlavorText[];
  /** Descriptions of different forms Pokémon take on within the Pokémon species */
  form_descriptions: Description[];
  /** The genus of this Pokémon species listed in multiple languages */
  genera: Genus[];
  /** A list of the Pokémon that exist within this Pokémon species */
  varieties: PokemonSpeciesVariety[];
}

/**
 * Move Stat Affect
 */
export interface MoveStatAffect {
  /** The maximum amount of change to the referenced stat */
  change: number;
  /** The move causing the change */
  move: NamedAPIResource;
}

/**
 * Move Stat Affect Sets
 */
export interface MoveStatAffectSets {
  /** A list of moves and how they change the referenced stat */
  increase: MoveStatAffect[];
  /** A list of moves and how they change the referenced stat */
  decrease: MoveStatAffect[];
}

/**
 * Nature Stat Affect Sets
 */
export interface NatureStatAffectSets {
  /** A list of natures and how they change the referenced stat */
  increase: NamedAPIResource[];
  /** A list of natures and how they change the referenced stat */
  decrease: NamedAPIResource[];
}

/**
 * Stat resource
 * GET /api/v2/stat/{id or name}
 */
export interface Stat {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** ID the games use for this stat */
  game_index: number;
  /** Whether this stat only exists within a battle */
  is_battle_only: boolean;
  /** A detail of moves which affect this stat */
  affecting_moves: MoveStatAffectSets;
  /** A detail of natures which affect this stat */
  affecting_natures: NatureStatAffectSets;
  /** A list of characteristics that are set on a Pokémon when its highest base stat is this stat */
  characteristics: APIResource[];
  /** The class of damage this stat is directly related to */
  move_damage_class: NamedAPIResource | null;
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Type Pokemon
 */
export interface TypePokemon {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The Pokémon that has the referenced type */
  pokemon: NamedAPIResource;
}

/**
 * Type Relations
 */
export interface TypeRelations {
  /** A list of types this type has no effect on */
  no_damage_to: NamedAPIResource[];
  /** A list of types this type is not very effective against */
  half_damage_to: NamedAPIResource[];
  /** A list of types this type is very effective against */
  double_damage_to: NamedAPIResource[];
  /** A list of types that have no effect on this type */
  no_damage_from: NamedAPIResource[];
  /** A list of types that are not very effective against this type */
  half_damage_from: NamedAPIResource[];
  /** A list of types that are very effective against this type */
  double_damage_from: NamedAPIResource[];
}

/**
 * Type Relations Past
 */
export interface TypeRelationsPast {
  /** The generation of this type relation */
  generation: NamedAPIResource;
  /** The damage relations the referenced type had in that generation */
  damage_relations: TypeRelations;
}

/**
 * Type resource
 * GET /api/v2/type/{id or name}
 */
export interface Type {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** A detail of how effective this type is toward others and vice versa */
  damage_relations: TypeRelations;
  /** A list of details of how effective this type was toward others and vice versa in previous generations */
  past_damage_relations: TypeRelationsPast[];
  /** A list of game indices relevent to this item by generation */
  game_indices: GenerationGameIndex[];
  /** The generation this type was introduced in */
  generation: NamedAPIResource;
  /** The class of damage inflicted by this type */
  move_damage_class: NamedAPIResource | null;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of details of Pokémon that have this type */
  pokemon: TypePokemon[];
  /** A list of moves that have this type */
  moves: NamedAPIResource[];
}

// ============================================================================
// UTILITY
// ============================================================================

/**
 * Language resource
 * GET /api/v2/language/{id or name}
 */
export interface Language {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** Whether or not the games are published in this language */
  official: boolean;
  /** The two-letter code of the country where this language is spoken */
  iso639: string;
  /** The two-letter code of the language */
  iso3166: string;
  /** The name of this resource listed in different languages */
  names: Name[];
}

// ============================================================================
// ENDPOINT REFERENCE MAP
// ============================================================================

/**
 * Complete mapping of all PokeAPI v2 endpoints to their response types
 */
export interface PokeAPIEndpoints {
  // Berries
  "/berry": NamedAPIResourceList;
  "/berry/{id}": Berry;
  "/berry-firmness": NamedAPIResourceList;
  "/berry-firmness/{id}": BerryFirmness;
  "/berry-flavor": NamedAPIResourceList;
  "/berry-flavor/{id}": BerryFlavor;

  // Contests
  "/contest-type": NamedAPIResourceList;
  "/contest-type/{id}": ContestType;
  "/contest-effect": APIResourceList;
  "/contest-effect/{id}": ContestEffect;
  "/super-contest-effect": APIResourceList;
  "/super-contest-effect/{id}": SuperContestEffect;

  // Encounters
  "/encounter-method": NamedAPIResourceList;
  "/encounter-method/{id}": EncounterMethod;
  "/encounter-condition": NamedAPIResourceList;
  "/encounter-condition/{id}": EncounterCondition;
  "/encounter-condition-value": NamedAPIResourceList;
  "/encounter-condition-value/{id}": EncounterConditionValue;

  // Evolution
  "/evolution-chain": APIResourceList;
  "/evolution-chain/{id}": EvolutionChain;
  "/evolution-trigger": NamedAPIResourceList;
  "/evolution-trigger/{id}": EvolutionTrigger;

  // Games
  "/generation": NamedAPIResourceList;
  "/generation/{id}": Generation;
  "/pokedex": NamedAPIResourceList;
  "/pokedex/{id}": Pokedex;
  "/version": NamedAPIResourceList;
  "/version/{id}": Version;
  "/version-group": NamedAPIResourceList;
  "/version-group/{id}": VersionGroup;

  // Items
  "/item": NamedAPIResourceList;
  "/item/{id}": Item;
  "/item-attribute": NamedAPIResourceList;
  "/item-attribute/{id}": ItemAttribute;
  "/item-category": NamedAPIResourceList;
  "/item-category/{id}": ItemCategory;
  "/item-fling-effect": NamedAPIResourceList;
  "/item-fling-effect/{id}": ItemFlingEffect;
  "/item-pocket": NamedAPIResourceList;
  "/item-pocket/{id}": ItemPocket;

  // Locations
  "/location": NamedAPIResourceList;
  "/location/{id}": Location;
  "/location-area": NamedAPIResourceList;
  "/location-area/{id}": LocationArea;
  "/pal-park-area": NamedAPIResourceList;
  "/pal-park-area/{id}": PalParkArea;
  "/region": NamedAPIResourceList;
  "/region/{id}": Region;

  // Machines
  "/machine": APIResourceList;
  "/machine/{id}": Machine;

  // Moves
  "/move": NamedAPIResourceList;
  "/move/{id}": Move;
  "/move-ailment": NamedAPIResourceList;
  "/move-ailment/{id}": MoveAilment;
  "/move-battle-style": NamedAPIResourceList;
  "/move-battle-style/{id}": MoveBattleStyle;
  "/move-category": NamedAPIResourceList;
  "/move-category/{id}": MoveCategory;
  "/move-damage-class": NamedAPIResourceList;
  "/move-damage-class/{id}": MoveDamageClass;
  "/move-learn-method": NamedAPIResourceList;
  "/move-learn-method/{id}": MoveLearnMethod;
  "/move-target": NamedAPIResourceList;
  "/move-target/{id}": MoveTarget;

  // Pokemon
  "/ability": NamedAPIResourceList;
  "/ability/{id}": Ability;
  "/characteristic": APIResourceList;
  "/characteristic/{id}": Characteristic;
  "/egg-group": NamedAPIResourceList;
  "/egg-group/{id}": EggGroup;
  "/gender": NamedAPIResourceList;
  "/gender/{id}": Gender;
  "/growth-rate": NamedAPIResourceList;
  "/growth-rate/{id}": GrowthRate;
  "/nature": NamedAPIResourceList;
  "/nature/{id}": Nature;
  "/pokeathlon-stat": NamedAPIResourceList;
  "/pokeathlon-stat/{id}": PokeathlonStat;
  "/pokemon": NamedAPIResourceList;
  "/pokemon/{id}": Pokemon;
  "/pokemon/{id}/encounters": LocationAreaEncounter[];
  "/pokemon-color": NamedAPIResourceList;
  "/pokemon-color/{id}": PokemonColor;
  "/pokemon-form": NamedAPIResourceList;
  "/pokemon-form/{id}": PokemonForm;
  "/pokemon-habitat": NamedAPIResourceList;
  "/pokemon-habitat/{id}": PokemonHabitat;
  "/pokemon-shape": NamedAPIResourceList;
  "/pokemon-shape/{id}": PokemonShape;
  "/pokemon-species": NamedAPIResourceList;
  "/pokemon-species/{id}": PokemonSpecies;
  "/stat": NamedAPIResourceList;
  "/stat/{id}": Stat;
  "/type": NamedAPIResourceList;
  "/type/{id}": Type;

  // Utility
  "/language": NamedAPIResourceList;
  "/language/{id}": Language;
}
