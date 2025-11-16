/* eslint-disable */
// @ts-nocheck
import { GraphQLResolveInfo } from 'graphql';
import { PokemonDTO, PokemonSpeciesDTO, PokemonFormDTO } from '../domains/pokemon/pokemon.dto.js';
import { AbilityDTO } from '../domains/ability/ability.dto.js';
import { StatDTO } from '../domains/stat/stat.dto.js';
import { TypeDTO } from '../domains/type/type.dto.js';
import { MoveDTO } from '../domains/move/move.dto.js';
import { ItemDTO, ItemCategoryDTO, ItemAttributeDTO, ItemFlingEffectDTO, ItemPocketDTO } from '../domains/item/item.dto.js';
import { LocationDTO, LocationAreaDTO, RegionDTO, PalParkAreaDTO, PalParkEncounterDTO } from '../domains/location/location.dto.js';
import { Context } from '../context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** An API resource reference (without name). */
export type ApiResource = {
  __typename?: 'APIResource';
  /** The URL of the referenced resource. */
  url: Scalars['String']['output'];
};

/** An ability that Pokemon can have. */
export type Ability = Node & {
  __typename?: 'Ability';
  /** Effect entries describing what this ability does. */
  effectEntries: Array<EffectEntry>;
  /** Flavor text entries from various game versions. */
  flavorTextEntries: Array<FlavorTextEntry>;
  /** The globally unique identifier for this ability. */
  id: Scalars['ID']['output'];
  /** The name of the ability. */
  name: Scalars['String']['output'];
};

/**
 * Damage relations for a type.
 * Describes type effectiveness in battle.
 */
export type DamageRelations = {
  __typename?: 'DamageRelations';
  /** Types that deal double damage to this type. */
  doubleDamageFrom: Array<NamedApiResource>;
  /** Types that this type deals double damage to. */
  doubleDamageTo: Array<NamedApiResource>;
  /** Types that deal half damage to this type. */
  halfDamageFrom: Array<NamedApiResource>;
  /** Types that this type deals half damage to. */
  halfDamageTo: Array<NamedApiResource>;
  /** Types that deal no damage to this type. */
  noDamageFrom: Array<NamedApiResource>;
  /** Types that this type deals no damage to. */
  noDamageTo: Array<NamedApiResource>;
};

/** A description for a resource. */
export type Description = {
  __typename?: 'Description';
  /** The localized description. */
  description: Scalars['String']['output'];
  /** The language this description is in. */
  language: NamedApiResource;
};

/** Dream World sprites. */
export type DreamWorldSprites = {
  __typename?: 'DreamWorldSprites';
  frontDefault?: Maybe<Scalars['String']['output']>;
  frontFemale?: Maybe<Scalars['String']['output']>;
};

/** An effect entry describing an ability's effect. */
export type EffectEntry = {
  __typename?: 'EffectEntry';
  /** The full effect description. */
  effect: Scalars['String']['output'];
  /** The language this effect is written in. */
  language: Scalars['String']['output'];
  /** A short effect description. */
  shortEffect: Scalars['String']['output'];
};

/** Encounter method rate for a location area. */
export type EncounterMethodRate = {
  __typename?: 'EncounterMethodRate';
  /** The encounter method. */
  encounterMethod: NamedApiResource;
  /** Version-specific encounter rates. */
  versionDetails: Array<EncounterVersionDetail>;
};

/** Version-specific encounter rate. */
export type EncounterVersionDetail = {
  __typename?: 'EncounterVersionDetail';
  /** The encounter rate percentage. */
  rate: Scalars['Int']['output'];
  /** The game version. */
  version: NamedApiResource;
};

/** Flavor text for an ability from a specific game version. */
export type FlavorTextEntry = {
  __typename?: 'FlavorTextEntry';
  /** The flavor text. */
  flavorText: Scalars['String']['output'];
  /** The language this text is written in. */
  language: Scalars['String']['output'];
  /** The game version group this text is from. */
  versionGroup: Scalars['String']['output'];
};

/** A game index entry for a Pokemon. */
export type GameIndex = {
  __typename?: 'GameIndex';
  /** The internal ID of this Pokemon in a specific game. */
  gameIndex: Scalars['Int']['output'];
  /** The version this game index is for. */
  version: NamedApiResource;
};

/** A genus (category) for a Pokemon Species. */
export type Genus = {
  __typename?: 'Genus';
  /** The localized genus. */
  genus: Scalars['String']['output'];
  /** The language this genus is in. */
  language: NamedApiResource;
};

/** An item that a Pokemon may hold in the wild. */
export type HeldItem = {
  __typename?: 'HeldItem';
  /** The item being held. */
  item: NamedApiResource;
  /** Version-specific details about this held item. */
  versionDetails: Array<HeldItemVersion>;
};

/** Version-specific details for a held item. */
export type HeldItemVersion = {
  __typename?: 'HeldItemVersion';
  /** How rare this item is (percentage). */
  rarity: Scalars['Int']['output'];
  /** The version this rarity applies to. */
  version: NamedApiResource;
};

/** Pokemon Home sprites. */
export type HomeSprites = {
  __typename?: 'HomeSprites';
  frontDefault?: Maybe<Scalars['String']['output']>;
  frontFemale?: Maybe<Scalars['String']['output']>;
  frontShiny?: Maybe<Scalars['String']['output']>;
  frontShinyFemale?: Maybe<Scalars['String']['output']>;
};

/** An item that can be obtained, held, or used by Pokemon. */
export type Item = Node & {
  __typename?: 'Item';
  /** Attributes that apply to this item. */
  attributes: Array<NamedApiResource>;
  /** The category this item belongs to. */
  category: NamedApiResource;
  /** The cost of the item in Pokedollars. */
  cost: Scalars['Int']['output'];
  /** Effect entries describing what this item does. */
  effectEntries: Array<EffectEntry>;
  /** Flavor text entries from various game versions. */
  flavorTextEntries: Array<FlavorTextEntry>;
  /** The effect of the move Fling when used with this item. */
  flingEffect?: Maybe<NamedApiResource>;
  /** The power of the move Fling when used with this item. */
  flingPower?: Maybe<Scalars['Int']['output']>;
  /** Game indices for this item across different games. */
  gameIndices: Array<GameIndex>;
  /** Pokemon that can hold this item. */
  heldByPokemon: Array<ItemHolderPokemon>;
  /** The globally unique identifier for this item. */
  id: Scalars['ID']['output'];
  /** The name of the item. */
  name: Scalars['String']['output'];
  /** Localized names for this item. */
  names: Array<Name>;
  /** Sprites for this item. */
  sprites: ItemSprites;
};

/** An attribute that items can have. */
export type ItemAttribute = Node & {
  __typename?: 'ItemAttribute';
  /** Descriptions of this attribute. */
  descriptions: Array<Description>;
  /** The globally unique identifier for this item attribute. */
  id: Scalars['ID']['output'];
  /** Items that have this attribute. */
  items: Array<NamedApiResource>;
  /** The name of the item attribute. */
  name: Scalars['String']['output'];
  /** Localized names for this attribute. */
  names: Array<Name>;
};

/** A connection to a list of item attributes. */
export type ItemAttributeConnection = {
  __typename?: 'ItemAttributeConnection';
  /** A list of edges. */
  edges: Array<ItemAttributeEdge>;
  /** Information about pagination. */
  pageInfo: PageInfo;
  /** The total count of item attributes. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in an item attribute connection. */
export type ItemAttributeEdge = {
  __typename?: 'ItemAttributeEdge';
  /** A cursor for pagination. */
  cursor: Scalars['String']['output'];
  /** The item attribute at the end of the edge. */
  node: ItemAttribute;
};

/** A category of items. */
export type ItemCategory = Node & {
  __typename?: 'ItemCategory';
  /** The globally unique identifier for this item category. */
  id: Scalars['ID']['output'];
  /** Items in this category. */
  items: Array<NamedApiResource>;
  /** The name of the item category. */
  name: Scalars['String']['output'];
  /** Localized names for this category. */
  names: Array<Name>;
  /** The pocket this category belongs to. */
  pocket: NamedApiResource;
};

/** A connection to a list of item categories. */
export type ItemCategoryConnection = {
  __typename?: 'ItemCategoryConnection';
  /** A list of edges. */
  edges: Array<ItemCategoryEdge>;
  /** Information about pagination. */
  pageInfo: PageInfo;
  /** The total count of item categories. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in an item category connection. */
export type ItemCategoryEdge = {
  __typename?: 'ItemCategoryEdge';
  /** A cursor for pagination. */
  cursor: Scalars['String']['output'];
  /** The item category at the end of the edge. */
  node: ItemCategory;
};

/** A connection to a list of items. */
export type ItemConnection = {
  __typename?: 'ItemConnection';
  /** A list of edges. */
  edges: Array<ItemEdge>;
  /** Information about pagination. */
  pageInfo: PageInfo;
  /** The total count of items. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in an item connection. */
export type ItemEdge = {
  __typename?: 'ItemEdge';
  /** A cursor for pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Item;
};

/** The effect of flinging an item in battle. */
export type ItemFlingEffect = Node & {
  __typename?: 'ItemFlingEffect';
  /** Effect entries describing what this fling effect does. */
  effectEntries: Array<EffectEntry>;
  /** The globally unique identifier for this fling effect. */
  id: Scalars['ID']['output'];
  /** Items that have this fling effect. */
  items: Array<NamedApiResource>;
  /** The name of the fling effect. */
  name: Scalars['String']['output'];
};

/** A connection to a list of item fling effects. */
export type ItemFlingEffectConnection = {
  __typename?: 'ItemFlingEffectConnection';
  /** A list of edges. */
  edges: Array<ItemFlingEffectEdge>;
  /** Information about pagination. */
  pageInfo: PageInfo;
  /** The total count of item fling effects. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in an item fling effect connection. */
export type ItemFlingEffectEdge = {
  __typename?: 'ItemFlingEffectEdge';
  /** A cursor for pagination. */
  cursor: Scalars['String']['output'];
  /** The item fling effect at the end of the edge. */
  node: ItemFlingEffect;
};

/** A Pokemon that can hold an item. */
export type ItemHolderPokemon = {
  __typename?: 'ItemHolderPokemon';
  /** The Pokemon that can hold this item. */
  pokemon: Scalars['String']['output'];
  /** Version-specific details about this Pokemon holding the item. */
  versionDetails: Array<ItemHolderPokemonVersionDetail>;
};

/** Version-specific details about a Pokemon holding an item. */
export type ItemHolderPokemonVersionDetail = {
  __typename?: 'ItemHolderPokemonVersionDetail';
  /** How rare it is to find this item on this Pokemon. */
  rarity: Scalars['Int']['output'];
  /** The game version this applies to. */
  version: Scalars['String']['output'];
};

/** A pocket in the bag where items are stored. */
export type ItemPocket = Node & {
  __typename?: 'ItemPocket';
  /** Categories in this pocket. */
  categories: Array<NamedApiResource>;
  /** The globally unique identifier for this item pocket. */
  id: Scalars['ID']['output'];
  /** The name of the item pocket. */
  name: Scalars['String']['output'];
  /** Localized names for this pocket. */
  names: Array<Name>;
};

/** A connection to a list of item pockets. */
export type ItemPocketConnection = {
  __typename?: 'ItemPocketConnection';
  /** A list of edges. */
  edges: Array<ItemPocketEdge>;
  /** Information about pagination. */
  pageInfo: PageInfo;
  /** The total count of item pockets. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in an item pocket connection. */
export type ItemPocketEdge = {
  __typename?: 'ItemPocketEdge';
  /** A cursor for pagination. */
  cursor: Scalars['String']['output'];
  /** The item pocket at the end of the edge. */
  node: ItemPocket;
};

/** Sprites for an item. */
export type ItemSprites = {
  __typename?: 'ItemSprites';
  /** The default sprite for this item. */
  default?: Maybe<Scalars['String']['output']>;
};

/** A location in the Pokemon world where Pokemon can be found. */
export type Location = Node & {
  __typename?: 'Location';
  /** Areas within this location. */
  areas: Array<NamedApiResource>;
  /** Game indices for this location across different versions. */
  gameIndices: Array<GameIndex>;
  /** The unique identifier for this location (base64 encoded). */
  id: Scalars['ID']['output'];
  /** The name of this location. */
  name: Scalars['String']['output'];
  /** The localized names for this location. */
  names: Array<Name>;
  /** The region this location is in. */
  region: NamedApiResource;
};

/** A specific area within a location where Pokemon can be encountered. */
export type LocationArea = Node & {
  __typename?: 'LocationArea';
  /** Encounter method rates for this location area. */
  encounterMethodRates: Array<EncounterMethodRate>;
  /** The internal game index for this location area. */
  gameIndex: Scalars['Int']['output'];
  /** The unique identifier for this location area (base64 encoded). */
  id: Scalars['ID']['output'];
  /** The location this area belongs to. */
  location: NamedApiResource;
  /** The name of this location area. */
  name: Scalars['String']['output'];
  /** The localized names for this location area. */
  names: Array<Name>;
  /** Pokemon that can be encountered in this area. */
  pokemonEncounters: PokemonEncounterConnection;
};

/** Connection type for paginated LocationArea lists. */
export type LocationAreaConnection = {
  __typename?: 'LocationAreaConnection';
  edges: Array<LocationAreaEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge type for LocationArea connections. */
export type LocationAreaEdge = {
  __typename?: 'LocationAreaEdge';
  cursor: Scalars['String']['output'];
  node: LocationArea;
};

/** Connection type for paginated Location lists. */
export type LocationConnection = {
  __typename?: 'LocationConnection';
  edges: Array<LocationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge type for Location connections. */
export type LocationEdge = {
  __typename?: 'LocationEdge';
  cursor: Scalars['String']['output'];
  node: Location;
};

/** A move that Pokemon can learn and use in battle. */
export type Move = Node & {
  __typename?: 'Move';
  /**
   * The percent value of how likely this move is to be successful (0-100).
   * Null if the move cannot miss.
   */
  accuracy?: Maybe<Scalars['Int']['output']>;
  /** The effect the move has when used in a contest. */
  contestEffect?: Maybe<NamedApiResource>;
  /** The type of contest this move is used in. */
  contestType?: Maybe<NamedApiResource>;
  /** The type of damage the move inflicts on the target (physical, special, or status). */
  damageClass: NamedApiResource;
  /** The percent value of how likely it is this move will cause an effect (0-100). */
  effectChance?: Maybe<Scalars['Int']['output']>;
  /** The effect of this move listed in different languages. */
  effectEntries: Array<MoveEffectEntry>;
  /** The flavor text of this move listed in different languages. */
  flavorTextEntries: Array<MoveFlavorTextEntry>;
  /** The generation in which this move was introduced. */
  generation: NamedApiResource;
  /** The globally unique identifier for this move. */
  id: Scalars['ID']['output'];
  /** The list of Pokemon that can learn this move. */
  learnedByPokemon: Array<NamedApiResource>;
  /** Metadata about this move. */
  meta?: Maybe<MoveMeta>;
  /** The name of this move. */
  name: Scalars['String']['output'];
  /** The name of this move listed in different languages. */
  names: Array<Name>;
  /** The base power of this move with a value of 0 if it does not have a base power. */
  power?: Maybe<Scalars['Int']['output']>;
  /** Power Points. The number of times this move can be used. */
  pp: Scalars['Int']['output'];
  /**
   * A value between -8 and 8. Sets the order in which moves are executed during battle.
   * Higher values make a move execute later.
   */
  priority: Scalars['Int']['output'];
  /** A list of stats this move effects and how much it effects them. */
  statChanges: Array<MoveStatChange>;
  /** The effect the move has when used in a super contest. */
  superContestEffect?: Maybe<NamedApiResource>;
  /** The type of target that will receive the effects of the attack. */
  target: NamedApiResource;
  /** The elemental type of this move. */
  type: NamedApiResource;
};

/** Connection type for paginated Move lists. */
export type MoveConnection = {
  __typename?: 'MoveConnection';
  /** A list of edges. */
  edges: Array<MoveEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a Move connection. */
export type MoveEdge = {
  __typename?: 'MoveEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Move at the end of the edge. */
  node: Move;
};

/** An effect entry describing a move's effect. */
export type MoveEffectEntry = {
  __typename?: 'MoveEffectEntry';
  /** The full effect description. */
  effect: Scalars['String']['output'];
  /** The language this effect is written in. */
  language: NamedApiResource;
  /** A short effect description. */
  shortEffect: Scalars['String']['output'];
};

/** Flavor text for a move from a specific game version. */
export type MoveFlavorTextEntry = {
  __typename?: 'MoveFlavorTextEntry';
  /** The flavor text. */
  flavorText: Scalars['String']['output'];
  /** The language this text is written in. */
  language: NamedApiResource;
  /** The game version group this text is from. */
  versionGroup?: Maybe<NamedApiResource>;
};

/** Metadata about a move including ailment, category, and battle mechanics. */
export type MoveMeta = {
  __typename?: 'MoveMeta';
  /** The status ailment this move inflicts on its target. */
  ailment: NamedApiResource;
  /** The likelihood this attack will cause an ailment (0-100). */
  ailmentChance: Scalars['Int']['output'];
  /** The category of move this move falls under (damage, ailment, net-good-stats, etc.). */
  category: NamedApiResource;
  /** Critical hit rate bonus. */
  critRate: Scalars['Int']['output'];
  /** HP drain (if positive) or Recoil damage (if negative), in percent of damage done. */
  drain: Scalars['Int']['output'];
  /** The likelihood this attack will cause the target Pokemon to flinch (0-100). */
  flinchChance: Scalars['Int']['output'];
  /** The amount of hp gained by the attacking Pokemon, in percent of its maximum HP. */
  healing: Scalars['Int']['output'];
  /** The maximum number of times this move hits. Null if it always hits once. */
  maxHits?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of turns this move continues to take effect. Null if it always lasts one turn. */
  maxTurns?: Maybe<Scalars['Int']['output']>;
  /** The minimum number of times this move hits. Null if it always hits once. */
  minHits?: Maybe<Scalars['Int']['output']>;
  /** The minimum number of turns this move continues to take effect. Null if it always lasts one turn. */
  minTurns?: Maybe<Scalars['Int']['output']>;
  /** The likelihood this attack will cause a stat change in the target Pokemon (0-100). */
  statChance: Scalars['Int']['output'];
};

/** A move that affects a stat. */
export type MoveStatAffect = {
  __typename?: 'MoveStatAffect';
  /** The amount of change to the stat. */
  change: Scalars['Int']['output'];
  /** The move that causes this change. */
  move: NamedApiResource;
};

/** Sets of moves that affect a stat. */
export type MoveStatAffectSets = {
  __typename?: 'MoveStatAffectSets';
  /** Moves that decrease this stat. */
  decrease: Array<MoveStatAffect>;
  /** Moves that increase this stat. */
  increase: Array<MoveStatAffect>;
};

/** A stat change caused by a move. */
export type MoveStatChange = {
  __typename?: 'MoveStatChange';
  /** The amount of change to the stat. */
  change: Scalars['Int']['output'];
  /** The stat being affected. */
  stat: NamedApiResource;
};

/** Details about how a Pokemon learns a move in a specific version group. */
export type MoveVersionGroupDetail = {
  __typename?: 'MoveVersionGroupDetail';
  /** The level at which this move is learned (0 if not learned by leveling). */
  levelLearnedAt: Scalars['Int']['output'];
  /** The method by which this move is learned. */
  moveLearnMethod: NamedApiResource;
  /** The version group this applies to. */
  versionGroup: NamedApiResource;
};

/** A localized name for a resource. */
export type Name = {
  __typename?: 'Name';
  /** The language this name is in. */
  language: NamedApiResource;
  /** The localized name. */
  name: Scalars['String']['output'];
};

/** A named API resource reference. */
export type NamedApiResource = {
  __typename?: 'NamedAPIResource';
  /** The name of the referenced resource. */
  name: Scalars['String']['output'];
  /** The URL of the referenced resource. */
  url: Scalars['String']['output'];
};

/** Sets of natures that affect a stat. */
export type NatureStatAffectSets = {
  __typename?: 'NatureStatAffectSets';
  /** Natures that decrease this stat. */
  decrease: Array<NamedApiResource>;
  /** Natures that increase this stat. */
  increase: Array<NamedApiResource>;
};

/**
 * The Node interface is used to implement global object identification.
 * All types that implement this interface must have a globally unique ID.
 */
export type Node = {
  /** The globally unique identifier for this object. */
  id: Scalars['ID']['output'];
};

/** Official artwork sprites. */
export type OfficialArtworkSprites = {
  __typename?: 'OfficialArtworkSprites';
  frontDefault?: Maybe<Scalars['String']['output']>;
  frontShiny?: Maybe<Scalars['String']['output']>;
};

/** Other sprite collections for a Pokemon. */
export type OtherPokemonSprites = {
  __typename?: 'OtherPokemonSprites';
  /** Dream World artwork. */
  dreamWorld?: Maybe<DreamWorldSprites>;
  /** Pokemon Home sprites. */
  home?: Maybe<HomeSprites>;
  /** Official artwork. */
  officialArtwork?: Maybe<OfficialArtworkSprites>;
};

/** PageInfo contains information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last node in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor corresponding to the first node in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** An area in Pal Park where Pokemon can be found. */
export type PalParkArea = Node & {
  __typename?: 'PalParkArea';
  /** The unique identifier for this Pal Park area (base64 encoded). */
  id: Scalars['ID']['output'];
  /** The name of this Pal Park area. */
  name: Scalars['String']['output'];
  /** The localized names for this Pal Park area. */
  names: Array<Name>;
  /** Pokemon that can be encountered in this Pal Park area. */
  pokemonEncounters: Array<PalParkEncounter>;
};

/** Connection type for paginated PalParkArea lists. */
export type PalParkAreaConnection = {
  __typename?: 'PalParkAreaConnection';
  edges: Array<PalParkAreaEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge type for PalParkArea connections. */
export type PalParkAreaEdge = {
  __typename?: 'PalParkAreaEdge';
  cursor: Scalars['String']['output'];
  node: PalParkArea;
};

/** Pokemon encounter in Pal Park. */
export type PalParkEncounter = {
  __typename?: 'PalParkEncounter';
  /** Base score for catching this Pokemon. */
  baseScore: Scalars['Int']['output'];
  /** The Pokemon species that can be encountered. */
  pokemonSpecies: NamedApiResource;
  /** Rate of encountering this Pokemon. */
  rate: Scalars['Int']['output'];
};

/** A Pal Park encounter area for a Pokemon Species. */
export type PalParkEncounterArea = {
  __typename?: 'PalParkEncounterArea';
  /** The Pal Park area where this Pokemon can be encountered. */
  area: NamedApiResource;
  /** The base score given to the player when this Pokemon is caught. */
  baseScore: Scalars['Int']['output'];
  /** The base rate for encountering this Pokemon. */
  rate: Scalars['Int']['output'];
};

/** Past damage relations for a type in a previous generation. */
export type PastDamageRelations = {
  __typename?: 'PastDamageRelations';
  /** The damage relations that were in effect. */
  damageRelations: DamageRelations;
  /** The generation this damage relation set was in effect. */
  generation: NamedApiResource;
};

/** A Pokemon from the PokéAPI. */
export type Pokemon = Node & {
  __typename?: 'Pokemon';
  /** The abilities this Pokemon can have. */
  abilities: PokemonAbilityConnection;
  /** The base experience gained for defeating this Pokemon. */
  baseExperience: Scalars['Int']['output'];
  /** The forms this Pokemon can take. */
  forms: Array<NamedApiResource>;
  /** Game indices for this Pokemon across different versions. */
  gameIndices: Array<GameIndex>;
  /** The height of this Pokemon in decimetres. */
  height: Scalars['Int']['output'];
  /** Items this Pokemon may be holding in the wild. */
  heldItems: Array<HeldItem>;
  /** The globally unique identifier for this Pokemon. */
  id: Scalars['ID']['output'];
  /** Whether this is the default form for this Pokemon. */
  isDefault: Scalars['Boolean']['output'];
  /** URL to location areas where this Pokemon can be encountered. */
  locationAreaEncounters: Scalars['String']['output'];
  /** The moves this Pokemon can learn. */
  moves: PokemonMoveConnection;
  /** The name of this Pokemon. */
  name: Scalars['String']['output'];
  /** Order for sorting. Almost national order, except families are grouped together. */
  order: Scalars['Int']['output'];
  /** The species this Pokemon belongs to. */
  species: NamedApiResource;
  /** Sprites (images) for this Pokemon. */
  sprites: PokemonSprites;
  /** The stats for this Pokemon. */
  stats: PokemonStatConnection;
  /** The types this Pokemon has. */
  types: PokemonTypeConnection;
  /** The weight of this Pokemon in hectograms. */
  weight: Scalars['Int']['output'];
};

/** A connection to a list of Pokemon abilities. */
export type PokemonAbilityConnection = {
  __typename?: 'PokemonAbilityConnection';
  /** A list of edges containing Pokemon-specific ability metadata. */
  edges: Array<PokemonAbilityEdge>;
};

/** An edge representing the relationship between a Pokemon and an Ability. */
export type PokemonAbilityEdge = {
  __typename?: 'PokemonAbilityEdge';
  /** Whether this is a hidden ability. */
  isHidden: Scalars['Boolean']['output'];
  /** The ability at the end of this edge. */
  node: Ability;
  /** The slot this ability occupies (1, 2, or 3). */
  slot: Scalars['Int']['output'];
};

/** A connection to a list of Pokemon. */
export type PokemonConnection = {
  __typename?: 'PokemonConnection';
  /** A list of edges. */
  edges: Array<PokemonEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Pokemon available. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a Pokemon connection. */
export type PokemonEdge = {
  __typename?: 'PokemonEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Pokemon at the end of the edge. */
  node: Pokemon;
};

/** Connection type for Pokemon encounters in a location area. */
export type PokemonEncounterConnection = {
  __typename?: 'PokemonEncounterConnection';
  /** List of encounter edges with metadata. */
  edges: Array<PokemonEncounterEdge>;
};

/**
 * Edge type for Pokemon encounters with encounter metadata.
 * Follows the edge pattern: metadata fields + node field for the actual Pokemon.
 */
export type PokemonEncounterEdge = {
  __typename?: 'PokemonEncounterEdge';
  /** Chance of this specific encounter (percentage). */
  chance: Scalars['Int']['output'];
  /** Conditions required for this encounter. */
  conditionValues: Array<NamedApiResource>;
  /** Maximum level of the Pokemon in this encounter. */
  maxLevel: Scalars['Int']['output'];
  /** The encounter method (e.g., walking, surfing). */
  method: NamedApiResource;
  /** Minimum level of the Pokemon in this encounter. */
  minLevel: Scalars['Int']['output'];
  /**
   * The Pokemon that can be encountered.
   * This is the actual Pokemon node, not just a reference.
   */
  node: Pokemon;
};

/**
 * A Pokemon Form from the PokéAPI.
 * Represents a specific form of a Pokemon.
 */
export type PokemonForm = Node & {
  __typename?: 'PokemonForm';
  /** The form name of this Pokemon Form. */
  formName: Scalars['String']['output'];
  /** The form name of this Pokemon Form in different languages. */
  formNames: Array<Name>;
  /** The order in which forms should be sorted within all forms. */
  formOrder: Scalars['Int']['output'];
  /** The globally unique identifier for this Pokemon Form. */
  id: Scalars['ID']['output'];
  /** Whether this form can only be used in battle. */
  isBattleOnly: Scalars['Boolean']['output'];
  /** Whether this is the default form for this Pokemon. */
  isDefault: Scalars['Boolean']['output'];
  /** Whether this form is a mega evolution. */
  isMega: Scalars['Boolean']['output'];
  /** The name of this Pokemon Form. */
  name: Scalars['String']['output'];
  /** The name of this Pokemon Form in different languages. */
  names: Array<Name>;
  /** The order in which forms should be sorted within a species. */
  order: Scalars['Int']['output'];
  /** The Pokemon this form belongs to. */
  pokemon: NamedApiResource;
  /** Sprites (images) for this Pokemon Form. */
  sprites: PokemonFormSprites;
  /** The types this Pokemon Form has. */
  types: Array<TypeReference>;
  /** The version group this Pokemon Form was introduced in. */
  versionGroup: NamedApiResource;
};

/** A connection to a list of Pokemon Forms. */
export type PokemonFormConnection = {
  __typename?: 'PokemonFormConnection';
  /** A list of edges. */
  edges: Array<PokemonFormEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Pokemon Forms available. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a Pokemon Form connection. */
export type PokemonFormEdge = {
  __typename?: 'PokemonFormEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Pokemon Form at the end of the edge. */
  node: PokemonForm;
};

/** Sprites (images) for a Pokemon Form. */
export type PokemonFormSprites = {
  __typename?: 'PokemonFormSprites';
  /** The default back sprite. */
  backDefault?: Maybe<Scalars['String']['output']>;
  /** The shiny back sprite. */
  backShiny?: Maybe<Scalars['String']['output']>;
  /** The default front sprite. */
  frontDefault?: Maybe<Scalars['String']['output']>;
  /** The shiny front sprite. */
  frontShiny?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of Pokemon moves. */
export type PokemonMoveConnection = {
  __typename?: 'PokemonMoveConnection';
  /** A list of edges containing Pokemon-specific move learning information. */
  edges: Array<PokemonMoveEdge>;
};

/** An edge representing the relationship between a Pokemon and a Move. */
export type PokemonMoveEdge = {
  __typename?: 'PokemonMoveEdge';
  /** The move at the end of this edge. */
  node: Move;
  /** Version-specific details about how this Pokemon learns this move. */
  versionGroupDetails: Array<MoveVersionGroupDetail>;
};

/**
 * A Pokemon Species from the PokéAPI.
 * Represents species-level data including evolution, habitat, and varieties.
 */
export type PokemonSpecies = Node & {
  __typename?: 'PokemonSpecies';
  /** The base happiness when caught by a normal Pokéball. */
  baseHappiness: Scalars['Int']['output'];
  /** The base capture rate; up to 255. */
  captureRate: Scalars['Int']['output'];
  /** The color of this Pokemon for Pokedex search. */
  color: NamedApiResource;
  /** Egg groups this Pokemon Species belongs to. */
  eggGroups: Array<NamedApiResource>;
  /** The evolution chain this Pokemon Species belongs to. */
  evolutionChain: ApiResource;
  /** The Pokemon Species that this Pokemon evolves from. */
  evolvesFromSpecies?: Maybe<NamedApiResource>;
  /** Flavor text entries for this Pokemon Species. */
  flavorTextEntries: Array<PokemonSpeciesFlavorText>;
  /** Descriptions of this Pokemon Species in different languages. */
  formDescriptions: Array<Description>;
  /** Whether this Pokemon can switch forms. */
  formsSwitchable: Scalars['Boolean']['output'];
  /** The chance of this Pokemon being female, in eighths; or -1 for genderless. */
  genderRate: Scalars['Int']['output'];
  /** The genus (category) of this Pokemon Species in different languages. */
  genera: Array<Genus>;
  /** The generation this Pokemon Species was introduced in. */
  generation: NamedApiResource;
  /** The growth rate of this Pokemon Species. */
  growthRate: NamedApiResource;
  /** The habitat this Pokemon Species can be encountered in. */
  habitat?: Maybe<NamedApiResource>;
  /** Whether this Pokemon has visual gender differences. */
  hasGenderDifferences: Scalars['Boolean']['output'];
  /** Initial hatch counter: one must walk this many steps before this egg hatches. */
  hatchCounter: Scalars['Int']['output'];
  /** The globally unique identifier for this Pokemon Species. */
  id: Scalars['ID']['output'];
  /** Whether this is a baby Pokemon. */
  isBaby: Scalars['Boolean']['output'];
  /** Whether this is a legendary Pokemon. */
  isLegendary: Scalars['Boolean']['output'];
  /** Whether this is a mythical Pokemon. */
  isMythical: Scalars['Boolean']['output'];
  /** The name of this Pokemon Species. */
  name: Scalars['String']['output'];
  /** The name of this Pokemon Species in different languages. */
  names: Array<Name>;
  /** The order in which species should be sorted. */
  order: Scalars['Int']['output'];
  /** Pal Park encounter areas for this Pokemon Species. */
  palParkEncounters: Array<PalParkEncounterArea>;
  /** Pokedex numbers for this Pokemon Species across different Pokedexes. */
  pokedexNumbers: Array<PokemonSpeciesDexEntry>;
  /** The shape of this Pokemon for Pokedex search. */
  shape: NamedApiResource;
  /** The varieties (forms) of this Pokemon Species. */
  varieties: PokemonVarietyConnection;
};

/** A connection to a list of Pokemon Species. */
export type PokemonSpeciesConnection = {
  __typename?: 'PokemonSpeciesConnection';
  /** A list of edges. */
  edges: Array<PokemonSpeciesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Pokemon Species available. */
  totalCount: Scalars['Int']['output'];
};

/** A Pokedex entry for a Pokemon Species. */
export type PokemonSpeciesDexEntry = {
  __typename?: 'PokemonSpeciesDexEntry';
  /** The entry number in the Pokedex. */
  entryNumber: Scalars['Int']['output'];
  /** The Pokedex this entry is from. */
  pokedex: NamedApiResource;
};

/** An edge in a Pokemon Species connection. */
export type PokemonSpeciesEdge = {
  __typename?: 'PokemonSpeciesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Pokemon Species at the end of the edge. */
  node: PokemonSpecies;
};

/** A flavor text entry for a Pokemon Species. */
export type PokemonSpeciesFlavorText = {
  __typename?: 'PokemonSpeciesFlavorText';
  /** The localized flavor text. */
  flavorText: Scalars['String']['output'];
  /** The language this flavor text is in. */
  language: NamedApiResource;
  /** The game version this flavor text is from. */
  version: NamedApiResource;
};

/** Sprites (images) for a Pokemon. */
export type PokemonSprites = {
  __typename?: 'PokemonSprites';
  /** The default back sprite. */
  backDefault?: Maybe<Scalars['String']['output']>;
  /** The female back sprite. */
  backFemale?: Maybe<Scalars['String']['output']>;
  /** The shiny back sprite. */
  backShiny?: Maybe<Scalars['String']['output']>;
  /** The shiny female back sprite. */
  backShinyFemale?: Maybe<Scalars['String']['output']>;
  /** The default front sprite. */
  frontDefault?: Maybe<Scalars['String']['output']>;
  /** The female front sprite. */
  frontFemale?: Maybe<Scalars['String']['output']>;
  /** The shiny front sprite. */
  frontShiny?: Maybe<Scalars['String']['output']>;
  /** The shiny female front sprite. */
  frontShinyFemale?: Maybe<Scalars['String']['output']>;
  /** Other sprite collections (official artwork, home, dream world). */
  other?: Maybe<OtherPokemonSprites>;
};

/** A connection to a list of Pokemon stats. */
export type PokemonStatConnection = {
  __typename?: 'PokemonStatConnection';
  /** A list of edges containing Pokemon-specific stat values. */
  edges: Array<PokemonStatEdge>;
};

/** An edge representing the relationship between a Pokemon and a Stat. */
export type PokemonStatEdge = {
  __typename?: 'PokemonStatEdge';
  /** The base value of this stat for this Pokemon. */
  baseStat: Scalars['Int']['output'];
  /** The effort points (EVs) gained when defeating this Pokemon. */
  effort: Scalars['Int']['output'];
  /** The stat at the end of this edge. */
  node: Stat;
};

/** A connection to a list of Pokemon types. */
export type PokemonTypeConnection = {
  __typename?: 'PokemonTypeConnection';
  /** A list of edges containing Pokemon-specific type information. */
  edges: Array<PokemonTypeEdge>;
};

/** An edge representing the relationship between a Pokemon and a Type. */
export type PokemonTypeEdge = {
  __typename?: 'PokemonTypeEdge';
  /** The type at the end of this edge. */
  node: Type;
  /** The slot this type occupies (1 or 2). */
  slot: Scalars['Int']['output'];
};

/** A connection to a list of Pokemon varieties. */
export type PokemonVarietyConnection = {
  __typename?: 'PokemonVarietyConnection';
  /** A list of edges containing variety information. */
  edges: Array<PokemonVarietyEdge>;
};

/** An edge representing a variety of a Pokemon Species. */
export type PokemonVarietyEdge = {
  __typename?: 'PokemonVarietyEdge';
  /** Whether this is the default variety. */
  isDefault: Scalars['Boolean']['output'];
  /** The Pokemon at the end of this edge. */
  node: Pokemon;
};

export type Query = {
  __typename?: 'Query';
  /** Get an item attribute by its global ID. */
  itemAttributeById?: Maybe<ItemAttribute>;
  /** Get a paginated list of item attributes. */
  itemAttributes: ItemAttributeConnection;
  /** Get an item by its global ID. */
  itemById?: Maybe<Item>;
  /** Get a paginated list of item categories. */
  itemCategories: ItemCategoryConnection;
  /** Get an item category by its global ID. */
  itemCategoryById?: Maybe<ItemCategory>;
  /** Get an item fling effect by its global ID. */
  itemFlingEffectById?: Maybe<ItemFlingEffect>;
  /** Get a paginated list of item fling effects. */
  itemFlingEffects: ItemFlingEffectConnection;
  /** Get an item pocket by its global ID. */
  itemPocketById?: Maybe<ItemPocket>;
  /** Get a paginated list of item pockets. */
  itemPockets: ItemPocketConnection;
  /** Get a paginated list of items. */
  items: ItemConnection;
  locationAreaById?: Maybe<LocationArea>;
  locationAreas: LocationAreaConnection;
  locationById?: Maybe<Location>;
  locations: LocationConnection;
  /** Get a single move by its global ID. */
  moveById?: Maybe<Move>;
  /** Get a paginated list of moves. */
  moves: MoveConnection;
  /** Fetch any object that implements the Node interface by its global ID. */
  node?: Maybe<Node>;
  palParkAreaById?: Maybe<PalParkArea>;
  palParkAreas: PalParkAreaConnection;
  /** Fetch a single Pokemon by its global ID. */
  pokemonById?: Maybe<Pokemon>;
  /** Fetch a single Pokemon Form by its global ID. */
  pokemonFormById?: Maybe<PokemonForm>;
  /** Fetch a paginated list of Pokemon Forms using forward-only cursor-based pagination. */
  pokemonForms: PokemonFormConnection;
  /** Fetch a paginated list of Pokemon Species using forward-only cursor-based pagination. */
  pokemonSpecies: PokemonSpeciesConnection;
  /** Fetch a single Pokemon Species by its global ID. */
  pokemonSpeciesById?: Maybe<PokemonSpecies>;
  /** Fetch a paginated list of Pokemon using forward-only cursor-based pagination. */
  pokemons: PokemonConnection;
  regionById?: Maybe<Region>;
  regions: RegionConnection;
  /** Fetch a single Stat by its global ID. */
  statById?: Maybe<Stat>;
  /** Fetch a paginated list of Stats using forward-only cursor-based pagination. */
  stats: StatConnection;
  /** Fetch a single Type by its global ID. */
  typeById?: Maybe<Type>;
  /** Fetch a paginated list of Types using forward-only cursor-based pagination. */
  types: TypeConnection;
};


export type QueryItemAttributeByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemAttributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemFlingEffectByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemFlingEffectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemPocketByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemPocketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLocationAreaByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationAreasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLocationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMoveByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMovesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPalParkAreaByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPalParkAreasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPokemonByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPokemonFormByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPokemonFormsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPokemonSpeciesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPokemonSpeciesByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPokemonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRegionByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRegionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStatByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStatsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A region in the Pokemon world. */
export type Region = Node & {
  __typename?: 'Region';
  /** The unique identifier for this region (base64 encoded). */
  id: Scalars['ID']['output'];
  /** Locations within this region. */
  locations: Array<NamedApiResource>;
  /** The main generation this region was introduced in. */
  mainGeneration: NamedApiResource;
  /** The name of this region. */
  name: Scalars['String']['output'];
  /** The localized names for this region. */
  names: Array<Name>;
  /** Pokedexes available in this region. */
  pokedexes: Array<NamedApiResource>;
  /** Version groups available in this region. */
  versionGroups: Array<NamedApiResource>;
};

/** Connection type for paginated Region lists. */
export type RegionConnection = {
  __typename?: 'RegionConnection';
  edges: Array<RegionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge type for Region connections. */
export type RegionEdge = {
  __typename?: 'RegionEdge';
  cursor: Scalars['String']['output'];
  node: Region;
};

/** A Stat that Pokemon can have (HP, Attack, Defense, etc.). */
export type Stat = Node & {
  __typename?: 'Stat';
  /** Moves that affect this stat. */
  affectingMoves: MoveStatAffectSets;
  /** Natures that affect this stat. */
  affectingNatures: NatureStatAffectSets;
  /** Characteristics that are determined by this stat. */
  characteristics: Array<NamedApiResource>;
  /** The internal ID of this Stat in the games. */
  gameIndex: Scalars['Int']['output'];
  /** The globally unique identifier for this Stat. */
  id: Scalars['ID']['output'];
  /** Whether this stat only exists within a battle. */
  isBattleOnly: Scalars['Boolean']['output'];
  /** The class of damage this stat is directly related to (null for most stats). */
  moveDamageClass?: Maybe<NamedApiResource>;
  /** The name of this Stat. */
  name: Scalars['String']['output'];
  /** Localized names for this stat. */
  names: Array<Name>;
};

/** A connection to a list of Stats. */
export type StatConnection = {
  __typename?: 'StatConnection';
  /** A list of edges. */
  edges: Array<StatEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Stats available. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a Stat connection. */
export type StatEdge = {
  __typename?: 'StatEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Stat at the end of the edge. */
  node: Stat;
};

/** A Type that Pokemon and moves can have (Fire, Water, Grass, etc.). */
export type Type = Node & {
  __typename?: 'Type';
  /** Damage relations for this type. */
  damageRelations: DamageRelations;
  /** Game indices for this type across different versions. */
  gameIndices: Array<GameIndex>;
  /** The generation this type was introduced in. */
  generation: NamedApiResource;
  /** The globally unique identifier for this Type. */
  id: Scalars['ID']['output'];
  /** The class of damage this type inflicts (physical, special, or status). */
  moveDamageClass?: Maybe<NamedApiResource>;
  /** Moves that have this type. */
  moves: Array<NamedApiResource>;
  /** The name of this Type. */
  name: Scalars['String']['output'];
  /** Localized names for this type. */
  names: Array<Name>;
  /** Past damage relations for this type in previous generations. */
  pastDamageRelations: Array<PastDamageRelations>;
  /** Pokemon that have this type. */
  pokemon: Array<TypePokemon>;
};

/** A connection to a list of Types. */
export type TypeConnection = {
  __typename?: 'TypeConnection';
  /** A list of edges. */
  edges: Array<TypeEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Types available. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a Type connection. */
export type TypeEdge = {
  __typename?: 'TypeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Type at the end of the edge. */
  node: Type;
};

/** A Pokemon that has a specific type. */
export type TypePokemon = {
  __typename?: 'TypePokemon';
  /** The Pokemon that has this type. */
  pokemon: NamedApiResource;
  /** The slot this type occupies for the Pokemon (1 or 2). */
  slot: Scalars['Int']['output'];
};

/** A type reference for a Pokemon Form. */
export type TypeReference = {
  __typename?: 'TypeReference';
  /** The slot this type occupies. */
  slot: Scalars['Int']['output'];
  /** The type. */
  type: NamedApiResource;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Node: ( AbilityDTO ) | ( ItemDTO ) | ( ItemAttributeDTO ) | ( ItemCategoryDTO ) | ( ItemFlingEffectDTO ) | ( ItemPocketDTO ) | ( LocationDTO ) | ( LocationAreaDTO ) | ( MoveDTO ) | ( PalParkAreaDTO ) | ( PokemonDTO ) | ( PokemonFormDTO ) | ( PokemonSpeciesDTO ) | ( RegionDTO ) | ( StatDTO ) | ( TypeDTO );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  APIResource: ResolverTypeWrapper<ApiResource>;
  Ability: ResolverTypeWrapper<AbilityDTO>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DamageRelations: ResolverTypeWrapper<DamageRelations>;
  Description: ResolverTypeWrapper<Description>;
  DreamWorldSprites: ResolverTypeWrapper<DreamWorldSprites>;
  EffectEntry: ResolverTypeWrapper<EffectEntry>;
  EncounterMethodRate: ResolverTypeWrapper<EncounterMethodRate>;
  EncounterVersionDetail: ResolverTypeWrapper<EncounterVersionDetail>;
  FlavorTextEntry: ResolverTypeWrapper<FlavorTextEntry>;
  GameIndex: ResolverTypeWrapper<GameIndex>;
  Genus: ResolverTypeWrapper<Genus>;
  HeldItem: ResolverTypeWrapper<HeldItem>;
  HeldItemVersion: ResolverTypeWrapper<HeldItemVersion>;
  HomeSprites: ResolverTypeWrapper<HomeSprites>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Item: ResolverTypeWrapper<ItemDTO>;
  ItemAttribute: ResolverTypeWrapper<ItemAttributeDTO>;
  ItemAttributeConnection: ResolverTypeWrapper<Omit<ItemAttributeConnection, 'edges'> & { edges: Array<ResolversTypes['ItemAttributeEdge']> }>;
  ItemAttributeEdge: ResolverTypeWrapper<Omit<ItemAttributeEdge, 'node'> & { node: ResolversTypes['ItemAttribute'] }>;
  ItemCategory: ResolverTypeWrapper<ItemCategoryDTO>;
  ItemCategoryConnection: ResolverTypeWrapper<Omit<ItemCategoryConnection, 'edges'> & { edges: Array<ResolversTypes['ItemCategoryEdge']> }>;
  ItemCategoryEdge: ResolverTypeWrapper<Omit<ItemCategoryEdge, 'node'> & { node: ResolversTypes['ItemCategory'] }>;
  ItemConnection: ResolverTypeWrapper<Omit<ItemConnection, 'edges'> & { edges: Array<ResolversTypes['ItemEdge']> }>;
  ItemEdge: ResolverTypeWrapper<Omit<ItemEdge, 'node'> & { node: ResolversTypes['Item'] }>;
  ItemFlingEffect: ResolverTypeWrapper<ItemFlingEffectDTO>;
  ItemFlingEffectConnection: ResolverTypeWrapper<Omit<ItemFlingEffectConnection, 'edges'> & { edges: Array<ResolversTypes['ItemFlingEffectEdge']> }>;
  ItemFlingEffectEdge: ResolverTypeWrapper<Omit<ItemFlingEffectEdge, 'node'> & { node: ResolversTypes['ItemFlingEffect'] }>;
  ItemHolderPokemon: ResolverTypeWrapper<ItemHolderPokemon>;
  ItemHolderPokemonVersionDetail: ResolverTypeWrapper<ItemHolderPokemonVersionDetail>;
  ItemPocket: ResolverTypeWrapper<ItemPocketDTO>;
  ItemPocketConnection: ResolverTypeWrapper<Omit<ItemPocketConnection, 'edges'> & { edges: Array<ResolversTypes['ItemPocketEdge']> }>;
  ItemPocketEdge: ResolverTypeWrapper<Omit<ItemPocketEdge, 'node'> & { node: ResolversTypes['ItemPocket'] }>;
  ItemSprites: ResolverTypeWrapper<ItemSprites>;
  Location: ResolverTypeWrapper<LocationDTO>;
  LocationArea: ResolverTypeWrapper<LocationAreaDTO>;
  LocationAreaConnection: ResolverTypeWrapper<Omit<LocationAreaConnection, 'edges'> & { edges: Array<ResolversTypes['LocationAreaEdge']> }>;
  LocationAreaEdge: ResolverTypeWrapper<Omit<LocationAreaEdge, 'node'> & { node: ResolversTypes['LocationArea'] }>;
  LocationConnection: ResolverTypeWrapper<Omit<LocationConnection, 'edges'> & { edges: Array<ResolversTypes['LocationEdge']> }>;
  LocationEdge: ResolverTypeWrapper<Omit<LocationEdge, 'node'> & { node: ResolversTypes['Location'] }>;
  Move: ResolverTypeWrapper<MoveDTO>;
  MoveConnection: ResolverTypeWrapper<Omit<MoveConnection, 'edges'> & { edges: Array<ResolversTypes['MoveEdge']> }>;
  MoveEdge: ResolverTypeWrapper<Omit<MoveEdge, 'node'> & { node: ResolversTypes['Move'] }>;
  MoveEffectEntry: ResolverTypeWrapper<MoveEffectEntry>;
  MoveFlavorTextEntry: ResolverTypeWrapper<MoveFlavorTextEntry>;
  MoveMeta: ResolverTypeWrapper<MoveMeta>;
  MoveStatAffect: ResolverTypeWrapper<MoveStatAffect>;
  MoveStatAffectSets: ResolverTypeWrapper<MoveStatAffectSets>;
  MoveStatChange: ResolverTypeWrapper<MoveStatChange>;
  MoveVersionGroupDetail: ResolverTypeWrapper<MoveVersionGroupDetail>;
  Name: ResolverTypeWrapper<Name>;
  NamedAPIResource: ResolverTypeWrapper<NamedApiResource>;
  NatureStatAffectSets: ResolverTypeWrapper<NatureStatAffectSets>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  OfficialArtworkSprites: ResolverTypeWrapper<OfficialArtworkSprites>;
  OtherPokemonSprites: ResolverTypeWrapper<OtherPokemonSprites>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PalParkArea: ResolverTypeWrapper<PalParkAreaDTO>;
  PalParkAreaConnection: ResolverTypeWrapper<Omit<PalParkAreaConnection, 'edges'> & { edges: Array<ResolversTypes['PalParkAreaEdge']> }>;
  PalParkAreaEdge: ResolverTypeWrapper<Omit<PalParkAreaEdge, 'node'> & { node: ResolversTypes['PalParkArea'] }>;
  PalParkEncounter: ResolverTypeWrapper<PalParkEncounterDTO>;
  PalParkEncounterArea: ResolverTypeWrapper<PalParkEncounterArea>;
  PastDamageRelations: ResolverTypeWrapper<PastDamageRelations>;
  Pokemon: ResolverTypeWrapper<PokemonDTO>;
  PokemonAbilityConnection: ResolverTypeWrapper<Omit<PokemonAbilityConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonAbilityEdge']> }>;
  PokemonAbilityEdge: ResolverTypeWrapper<{ slot: number; isHidden: boolean; abilityName: string }>;
  PokemonConnection: ResolverTypeWrapper<Omit<PokemonConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonEdge']> }>;
  PokemonEdge: ResolverTypeWrapper<Omit<PokemonEdge, 'node'> & { node: ResolversTypes['Pokemon'] }>;
  PokemonEncounterConnection: ResolverTypeWrapper<Omit<PokemonEncounterConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonEncounterEdge']> }>;
  PokemonEncounterEdge: ResolverTypeWrapper<{ pokemonName: string; minLevel: number; maxLevel: number; conditionValues: Array<{ name: string; url: string }>; chance: number; method: { name: string; url: string } }>;
  PokemonForm: ResolverTypeWrapper<PokemonFormDTO>;
  PokemonFormConnection: ResolverTypeWrapper<Omit<PokemonFormConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonFormEdge']> }>;
  PokemonFormEdge: ResolverTypeWrapper<Omit<PokemonFormEdge, 'node'> & { node: ResolversTypes['PokemonForm'] }>;
  PokemonFormSprites: ResolverTypeWrapper<PokemonFormSprites>;
  PokemonMoveConnection: ResolverTypeWrapper<Omit<PokemonMoveConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonMoveEdge']> }>;
  PokemonMoveEdge: ResolverTypeWrapper<{ moveName: string; versionGroupDetails: Array<{ levelLearnedAt: number; moveLearnMethod: { name: string; url: string }; versionGroup: { name: string; url: string } }> }>;
  PokemonSpecies: ResolverTypeWrapper<PokemonSpeciesDTO>;
  PokemonSpeciesConnection: ResolverTypeWrapper<Omit<PokemonSpeciesConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonSpeciesEdge']> }>;
  PokemonSpeciesDexEntry: ResolverTypeWrapper<PokemonSpeciesDexEntry>;
  PokemonSpeciesEdge: ResolverTypeWrapper<Omit<PokemonSpeciesEdge, 'node'> & { node: ResolversTypes['PokemonSpecies'] }>;
  PokemonSpeciesFlavorText: ResolverTypeWrapper<PokemonSpeciesFlavorText>;
  PokemonSprites: ResolverTypeWrapper<PokemonSprites>;
  PokemonStatConnection: ResolverTypeWrapper<Omit<PokemonStatConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonStatEdge']> }>;
  PokemonStatEdge: ResolverTypeWrapper<{ baseStat: number; effort: number; statName: string }>;
  PokemonTypeConnection: ResolverTypeWrapper<Omit<PokemonTypeConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonTypeEdge']> }>;
  PokemonTypeEdge: ResolverTypeWrapper<{ slot: number; typeName: string }>;
  PokemonVarietyConnection: ResolverTypeWrapper<Omit<PokemonVarietyConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonVarietyEdge']> }>;
  PokemonVarietyEdge: ResolverTypeWrapper<{ isDefault: boolean; pokemonName: string }>;
  Query: ResolverTypeWrapper<{}>;
  Region: ResolverTypeWrapper<RegionDTO>;
  RegionConnection: ResolverTypeWrapper<Omit<RegionConnection, 'edges'> & { edges: Array<ResolversTypes['RegionEdge']> }>;
  RegionEdge: ResolverTypeWrapper<Omit<RegionEdge, 'node'> & { node: ResolversTypes['Region'] }>;
  Stat: ResolverTypeWrapper<StatDTO>;
  StatConnection: ResolverTypeWrapper<Omit<StatConnection, 'edges'> & { edges: Array<ResolversTypes['StatEdge']> }>;
  StatEdge: ResolverTypeWrapper<Omit<StatEdge, 'node'> & { node: ResolversTypes['Stat'] }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Type: ResolverTypeWrapper<TypeDTO>;
  TypeConnection: ResolverTypeWrapper<Omit<TypeConnection, 'edges'> & { edges: Array<ResolversTypes['TypeEdge']> }>;
  TypeEdge: ResolverTypeWrapper<Omit<TypeEdge, 'node'> & { node: ResolversTypes['Type'] }>;
  TypePokemon: ResolverTypeWrapper<TypePokemon>;
  TypeReference: ResolverTypeWrapper<TypeReference>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  APIResource: ApiResource;
  Ability: AbilityDTO;
  Boolean: Scalars['Boolean']['output'];
  DamageRelations: DamageRelations;
  Description: Description;
  DreamWorldSprites: DreamWorldSprites;
  EffectEntry: EffectEntry;
  EncounterMethodRate: EncounterMethodRate;
  EncounterVersionDetail: EncounterVersionDetail;
  FlavorTextEntry: FlavorTextEntry;
  GameIndex: GameIndex;
  Genus: Genus;
  HeldItem: HeldItem;
  HeldItemVersion: HeldItemVersion;
  HomeSprites: HomeSprites;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Item: ItemDTO;
  ItemAttribute: ItemAttributeDTO;
  ItemAttributeConnection: Omit<ItemAttributeConnection, 'edges'> & { edges: Array<ResolversParentTypes['ItemAttributeEdge']> };
  ItemAttributeEdge: Omit<ItemAttributeEdge, 'node'> & { node: ResolversParentTypes['ItemAttribute'] };
  ItemCategory: ItemCategoryDTO;
  ItemCategoryConnection: Omit<ItemCategoryConnection, 'edges'> & { edges: Array<ResolversParentTypes['ItemCategoryEdge']> };
  ItemCategoryEdge: Omit<ItemCategoryEdge, 'node'> & { node: ResolversParentTypes['ItemCategory'] };
  ItemConnection: Omit<ItemConnection, 'edges'> & { edges: Array<ResolversParentTypes['ItemEdge']> };
  ItemEdge: Omit<ItemEdge, 'node'> & { node: ResolversParentTypes['Item'] };
  ItemFlingEffect: ItemFlingEffectDTO;
  ItemFlingEffectConnection: Omit<ItemFlingEffectConnection, 'edges'> & { edges: Array<ResolversParentTypes['ItemFlingEffectEdge']> };
  ItemFlingEffectEdge: Omit<ItemFlingEffectEdge, 'node'> & { node: ResolversParentTypes['ItemFlingEffect'] };
  ItemHolderPokemon: ItemHolderPokemon;
  ItemHolderPokemonVersionDetail: ItemHolderPokemonVersionDetail;
  ItemPocket: ItemPocketDTO;
  ItemPocketConnection: Omit<ItemPocketConnection, 'edges'> & { edges: Array<ResolversParentTypes['ItemPocketEdge']> };
  ItemPocketEdge: Omit<ItemPocketEdge, 'node'> & { node: ResolversParentTypes['ItemPocket'] };
  ItemSprites: ItemSprites;
  Location: LocationDTO;
  LocationArea: LocationAreaDTO;
  LocationAreaConnection: Omit<LocationAreaConnection, 'edges'> & { edges: Array<ResolversParentTypes['LocationAreaEdge']> };
  LocationAreaEdge: Omit<LocationAreaEdge, 'node'> & { node: ResolversParentTypes['LocationArea'] };
  LocationConnection: Omit<LocationConnection, 'edges'> & { edges: Array<ResolversParentTypes['LocationEdge']> };
  LocationEdge: Omit<LocationEdge, 'node'> & { node: ResolversParentTypes['Location'] };
  Move: MoveDTO;
  MoveConnection: Omit<MoveConnection, 'edges'> & { edges: Array<ResolversParentTypes['MoveEdge']> };
  MoveEdge: Omit<MoveEdge, 'node'> & { node: ResolversParentTypes['Move'] };
  MoveEffectEntry: MoveEffectEntry;
  MoveFlavorTextEntry: MoveFlavorTextEntry;
  MoveMeta: MoveMeta;
  MoveStatAffect: MoveStatAffect;
  MoveStatAffectSets: MoveStatAffectSets;
  MoveStatChange: MoveStatChange;
  MoveVersionGroupDetail: MoveVersionGroupDetail;
  Name: Name;
  NamedAPIResource: NamedApiResource;
  NatureStatAffectSets: NatureStatAffectSets;
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  OfficialArtworkSprites: OfficialArtworkSprites;
  OtherPokemonSprites: OtherPokemonSprites;
  PageInfo: PageInfo;
  PalParkArea: PalParkAreaDTO;
  PalParkAreaConnection: Omit<PalParkAreaConnection, 'edges'> & { edges: Array<ResolversParentTypes['PalParkAreaEdge']> };
  PalParkAreaEdge: Omit<PalParkAreaEdge, 'node'> & { node: ResolversParentTypes['PalParkArea'] };
  PalParkEncounter: PalParkEncounterDTO;
  PalParkEncounterArea: PalParkEncounterArea;
  PastDamageRelations: PastDamageRelations;
  Pokemon: PokemonDTO;
  PokemonAbilityConnection: Omit<PokemonAbilityConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonAbilityEdge']> };
  PokemonAbilityEdge: { slot: number; isHidden: boolean; abilityName: string };
  PokemonConnection: Omit<PokemonConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonEdge']> };
  PokemonEdge: Omit<PokemonEdge, 'node'> & { node: ResolversParentTypes['Pokemon'] };
  PokemonEncounterConnection: Omit<PokemonEncounterConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonEncounterEdge']> };
  PokemonEncounterEdge: { pokemonName: string; minLevel: number; maxLevel: number; conditionValues: Array<{ name: string; url: string }>; chance: number; method: { name: string; url: string } };
  PokemonForm: PokemonFormDTO;
  PokemonFormConnection: Omit<PokemonFormConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonFormEdge']> };
  PokemonFormEdge: Omit<PokemonFormEdge, 'node'> & { node: ResolversParentTypes['PokemonForm'] };
  PokemonFormSprites: PokemonFormSprites;
  PokemonMoveConnection: Omit<PokemonMoveConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonMoveEdge']> };
  PokemonMoveEdge: { moveName: string; versionGroupDetails: Array<{ levelLearnedAt: number; moveLearnMethod: { name: string; url: string }; versionGroup: { name: string; url: string } }> };
  PokemonSpecies: PokemonSpeciesDTO;
  PokemonSpeciesConnection: Omit<PokemonSpeciesConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonSpeciesEdge']> };
  PokemonSpeciesDexEntry: PokemonSpeciesDexEntry;
  PokemonSpeciesEdge: Omit<PokemonSpeciesEdge, 'node'> & { node: ResolversParentTypes['PokemonSpecies'] };
  PokemonSpeciesFlavorText: PokemonSpeciesFlavorText;
  PokemonSprites: PokemonSprites;
  PokemonStatConnection: Omit<PokemonStatConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonStatEdge']> };
  PokemonStatEdge: { baseStat: number; effort: number; statName: string };
  PokemonTypeConnection: Omit<PokemonTypeConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonTypeEdge']> };
  PokemonTypeEdge: { slot: number; typeName: string };
  PokemonVarietyConnection: Omit<PokemonVarietyConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonVarietyEdge']> };
  PokemonVarietyEdge: { isDefault: boolean; pokemonName: string };
  Query: {};
  Region: RegionDTO;
  RegionConnection: Omit<RegionConnection, 'edges'> & { edges: Array<ResolversParentTypes['RegionEdge']> };
  RegionEdge: Omit<RegionEdge, 'node'> & { node: ResolversParentTypes['Region'] };
  Stat: StatDTO;
  StatConnection: Omit<StatConnection, 'edges'> & { edges: Array<ResolversParentTypes['StatEdge']> };
  StatEdge: Omit<StatEdge, 'node'> & { node: ResolversParentTypes['Stat'] };
  String: Scalars['String']['output'];
  Type: TypeDTO;
  TypeConnection: Omit<TypeConnection, 'edges'> & { edges: Array<ResolversParentTypes['TypeEdge']> };
  TypeEdge: Omit<TypeEdge, 'node'> & { node: ResolversParentTypes['Type'] };
  TypePokemon: TypePokemon;
  TypeReference: TypeReference;
};

export type ApiResourceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['APIResource'] = ResolversParentTypes['APIResource']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AbilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Ability'] = ResolversParentTypes['Ability']> = {
  effectEntries?: Resolver<Array<ResolversTypes['EffectEntry']>, ParentType, ContextType>;
  flavorTextEntries?: Resolver<Array<ResolversTypes['FlavorTextEntry']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DamageRelationsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DamageRelations'] = ResolversParentTypes['DamageRelations']> = {
  doubleDamageFrom?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  doubleDamageTo?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  halfDamageFrom?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  halfDamageTo?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  noDamageFrom?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  noDamageTo?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DescriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Description'] = ResolversParentTypes['Description']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DreamWorldSpritesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DreamWorldSprites'] = ResolversParentTypes['DreamWorldSprites']> = {
  frontDefault?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontFemale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EffectEntryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EffectEntry'] = ResolversParentTypes['EffectEntry']> = {
  effect?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortEffect?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EncounterMethodRateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EncounterMethodRate'] = ResolversParentTypes['EncounterMethodRate']> = {
  encounterMethod?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  versionDetails?: Resolver<Array<ResolversTypes['EncounterVersionDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EncounterVersionDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EncounterVersionDetail'] = ResolversParentTypes['EncounterVersionDetail']> = {
  rate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlavorTextEntryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FlavorTextEntry'] = ResolversParentTypes['FlavorTextEntry']> = {
  flavorText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  versionGroup?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameIndexResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GameIndex'] = ResolversParentTypes['GameIndex']> = {
  gameIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenusResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Genus'] = ResolversParentTypes['Genus']> = {
  genus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HeldItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HeldItem'] = ResolversParentTypes['HeldItem']> = {
  item?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  versionDetails?: Resolver<Array<ResolversTypes['HeldItemVersion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HeldItemVersionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HeldItemVersion'] = ResolversParentTypes['HeldItemVersion']> = {
  rarity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomeSpritesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HomeSprites'] = ResolversParentTypes['HomeSprites']> = {
  frontDefault?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontFemale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontShiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontShinyFemale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  attributes?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  effectEntries?: Resolver<Array<ResolversTypes['EffectEntry']>, ParentType, ContextType>;
  flavorTextEntries?: Resolver<Array<ResolversTypes['FlavorTextEntry']>, ParentType, ContextType>;
  flingEffect?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  flingPower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gameIndices?: Resolver<Array<ResolversTypes['GameIndex']>, ParentType, ContextType>;
  heldByPokemon?: Resolver<Array<ResolversTypes['ItemHolderPokemon']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  sprites?: Resolver<ResolversTypes['ItemSprites'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemAttributeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemAttribute'] = ResolversParentTypes['ItemAttribute']> = {
  descriptions?: Resolver<Array<ResolversTypes['Description']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemAttributeConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemAttributeConnection'] = ResolversParentTypes['ItemAttributeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ItemAttributeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemAttributeEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemAttributeEdge'] = ResolversParentTypes['ItemAttributeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ItemAttribute'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemCategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemCategory'] = ResolversParentTypes['ItemCategory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  pocket?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemCategoryConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemCategoryConnection'] = ResolversParentTypes['ItemCategoryConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ItemCategoryEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemCategoryEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemCategoryEdge'] = ResolversParentTypes['ItemCategoryEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ItemCategory'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemConnection'] = ResolversParentTypes['ItemConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemEdge'] = ResolversParentTypes['ItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemFlingEffectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemFlingEffect'] = ResolversParentTypes['ItemFlingEffect']> = {
  effectEntries?: Resolver<Array<ResolversTypes['EffectEntry']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemFlingEffectConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemFlingEffectConnection'] = ResolversParentTypes['ItemFlingEffectConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ItemFlingEffectEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemFlingEffectEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemFlingEffectEdge'] = ResolversParentTypes['ItemFlingEffectEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ItemFlingEffect'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemHolderPokemonResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemHolderPokemon'] = ResolversParentTypes['ItemHolderPokemon']> = {
  pokemon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  versionDetails?: Resolver<Array<ResolversTypes['ItemHolderPokemonVersionDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemHolderPokemonVersionDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemHolderPokemonVersionDetail'] = ResolversParentTypes['ItemHolderPokemonVersionDetail']> = {
  rarity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemPocketResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemPocket'] = ResolversParentTypes['ItemPocket']> = {
  categories?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemPocketConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemPocketConnection'] = ResolversParentTypes['ItemPocketConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ItemPocketEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemPocketEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemPocketEdge'] = ResolversParentTypes['ItemPocketEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ItemPocket'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemSpritesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemSprites'] = ResolversParentTypes['ItemSprites']> = {
  default?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  areas?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  gameIndices?: Resolver<Array<ResolversTypes['GameIndex']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  region?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationAreaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LocationArea'] = ResolversParentTypes['LocationArea']> = {
  encounterMethodRates?: Resolver<Array<ResolversTypes['EncounterMethodRate']>, ParentType, ContextType>;
  gameIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  pokemonEncounters?: Resolver<ResolversTypes['PokemonEncounterConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationAreaConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LocationAreaConnection'] = ResolversParentTypes['LocationAreaConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LocationAreaEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationAreaEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LocationAreaEdge'] = ResolversParentTypes['LocationAreaEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LocationArea'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LocationConnection'] = ResolversParentTypes['LocationConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LocationEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LocationEdge'] = ResolversParentTypes['LocationEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Move'] = ResolversParentTypes['Move']> = {
  accuracy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contestEffect?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  contestType?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  damageClass?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  effectChance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  effectEntries?: Resolver<Array<ResolversTypes['MoveEffectEntry']>, ParentType, ContextType>;
  flavorTextEntries?: Resolver<Array<ResolversTypes['MoveFlavorTextEntry']>, ParentType, ContextType>;
  generation?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  learnedByPokemon?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['MoveMeta']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statChanges?: Resolver<Array<ResolversTypes['MoveStatChange']>, ParentType, ContextType>;
  superContestEffect?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  target?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveConnection'] = ResolversParentTypes['MoveConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MoveEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveEdge'] = ResolversParentTypes['MoveEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveEffectEntryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveEffectEntry'] = ResolversParentTypes['MoveEffectEntry']> = {
  effect?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  shortEffect?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveFlavorTextEntryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveFlavorTextEntry'] = ResolversParentTypes['MoveFlavorTextEntry']> = {
  flavorText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  versionGroup?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveMetaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveMeta'] = ResolversParentTypes['MoveMeta']> = {
  ailment?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  ailmentChance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  critRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  drain?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  flinchChance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  healing?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxHits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxTurns?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minHits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minTurns?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  statChance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveStatAffectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveStatAffect'] = ResolversParentTypes['MoveStatAffect']> = {
  change?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  move?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveStatAffectSetsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveStatAffectSets'] = ResolversParentTypes['MoveStatAffectSets']> = {
  decrease?: Resolver<Array<ResolversTypes['MoveStatAffect']>, ParentType, ContextType>;
  increase?: Resolver<Array<ResolversTypes['MoveStatAffect']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveStatChangeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveStatChange'] = ResolversParentTypes['MoveStatChange']> = {
  change?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stat?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveVersionGroupDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MoveVersionGroupDetail'] = ResolversParentTypes['MoveVersionGroupDetail']> = {
  levelLearnedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  moveLearnMethod?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  versionGroup?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NameResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Name'] = ResolversParentTypes['Name']> = {
  language?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NamedApiResourceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NamedAPIResource'] = ResolversParentTypes['NamedAPIResource']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NatureStatAffectSetsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NatureStatAffectSets'] = ResolversParentTypes['NatureStatAffectSets']> = {
  decrease?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  increase?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Ability' | 'Item' | 'ItemAttribute' | 'ItemCategory' | 'ItemFlingEffect' | 'ItemPocket' | 'Location' | 'LocationArea' | 'Move' | 'PalParkArea' | 'Pokemon' | 'PokemonForm' | 'PokemonSpecies' | 'Region' | 'Stat' | 'Type', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type OfficialArtworkSpritesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OfficialArtworkSprites'] = ResolversParentTypes['OfficialArtworkSprites']> = {
  frontDefault?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontShiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OtherPokemonSpritesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OtherPokemonSprites'] = ResolversParentTypes['OtherPokemonSprites']> = {
  dreamWorld?: Resolver<Maybe<ResolversTypes['DreamWorldSprites']>, ParentType, ContextType>;
  home?: Resolver<Maybe<ResolversTypes['HomeSprites']>, ParentType, ContextType>;
  officialArtwork?: Resolver<Maybe<ResolversTypes['OfficialArtworkSprites']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PalParkAreaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PalParkArea'] = ResolversParentTypes['PalParkArea']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  pokemonEncounters?: Resolver<Array<ResolversTypes['PalParkEncounter']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PalParkAreaConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PalParkAreaConnection'] = ResolversParentTypes['PalParkAreaConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PalParkAreaEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PalParkAreaEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PalParkAreaEdge'] = ResolversParentTypes['PalParkAreaEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PalParkArea'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PalParkEncounterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PalParkEncounter'] = ResolversParentTypes['PalParkEncounter']> = {
  baseScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pokemonSpecies?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PalParkEncounterAreaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PalParkEncounterArea'] = ResolversParentTypes['PalParkEncounterArea']> = {
  area?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  baseScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PastDamageRelationsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PastDamageRelations'] = ResolversParentTypes['PastDamageRelations']> = {
  damageRelations?: Resolver<ResolversTypes['DamageRelations'], ParentType, ContextType>;
  generation?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Pokemon'] = ResolversParentTypes['Pokemon']> = {
  abilities?: Resolver<ResolversTypes['PokemonAbilityConnection'], ParentType, ContextType>;
  baseExperience?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  forms?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  gameIndices?: Resolver<Array<ResolversTypes['GameIndex']>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  heldItems?: Resolver<Array<ResolversTypes['HeldItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  locationAreaEncounters?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moves?: Resolver<ResolversTypes['PokemonMoveConnection'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  species?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  sprites?: Resolver<ResolversTypes['PokemonSprites'], ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['PokemonStatConnection'], ParentType, ContextType>;
  types?: Resolver<ResolversTypes['PokemonTypeConnection'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonAbilityConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonAbilityConnection'] = ResolversParentTypes['PokemonAbilityConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonAbilityEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonAbilityEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonAbilityEdge'] = ResolversParentTypes['PokemonAbilityEdge']> = {
  isHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Ability'], ParentType, ContextType>;
  slot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonConnection'] = ResolversParentTypes['PokemonConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonEdge'] = ResolversParentTypes['PokemonEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Pokemon'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonEncounterConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonEncounterConnection'] = ResolversParentTypes['PokemonEncounterConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonEncounterEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonEncounterEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonEncounterEdge'] = ResolversParentTypes['PokemonEncounterEdge']> = {
  chance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  conditionValues?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  maxLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  method?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  minLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Pokemon'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonFormResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonForm'] = ResolversParentTypes['PokemonForm']> = {
  formName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  formNames?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  formOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isBattleOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isMega?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pokemon?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  sprites?: Resolver<ResolversTypes['PokemonFormSprites'], ParentType, ContextType>;
  types?: Resolver<Array<ResolversTypes['TypeReference']>, ParentType, ContextType>;
  versionGroup?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonFormConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonFormConnection'] = ResolversParentTypes['PokemonFormConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonFormEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonFormEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonFormEdge'] = ResolversParentTypes['PokemonFormEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PokemonForm'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonFormSpritesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonFormSprites'] = ResolversParentTypes['PokemonFormSprites']> = {
  backDefault?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backShiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontDefault?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontShiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonMoveConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonMoveConnection'] = ResolversParentTypes['PokemonMoveConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonMoveEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonMoveEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonMoveEdge'] = ResolversParentTypes['PokemonMoveEdge']> = {
  node?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  versionGroupDetails?: Resolver<Array<ResolversTypes['MoveVersionGroupDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonSpeciesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonSpecies'] = ResolversParentTypes['PokemonSpecies']> = {
  baseHappiness?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  captureRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  eggGroups?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  evolutionChain?: Resolver<ResolversTypes['APIResource'], ParentType, ContextType>;
  evolvesFromSpecies?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  flavorTextEntries?: Resolver<Array<ResolversTypes['PokemonSpeciesFlavorText']>, ParentType, ContextType>;
  formDescriptions?: Resolver<Array<ResolversTypes['Description']>, ParentType, ContextType>;
  formsSwitchable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  genderRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  genera?: Resolver<Array<ResolversTypes['Genus']>, ParentType, ContextType>;
  generation?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  growthRate?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  habitat?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  hasGenderDifferences?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hatchCounter?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isBaby?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isLegendary?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isMythical?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  palParkEncounters?: Resolver<Array<ResolversTypes['PalParkEncounterArea']>, ParentType, ContextType>;
  pokedexNumbers?: Resolver<Array<ResolversTypes['PokemonSpeciesDexEntry']>, ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  varieties?: Resolver<ResolversTypes['PokemonVarietyConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonSpeciesConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonSpeciesConnection'] = ResolversParentTypes['PokemonSpeciesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonSpeciesEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonSpeciesDexEntryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonSpeciesDexEntry'] = ResolversParentTypes['PokemonSpeciesDexEntry']> = {
  entryNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pokedex?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonSpeciesEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonSpeciesEdge'] = ResolversParentTypes['PokemonSpeciesEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PokemonSpecies'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonSpeciesFlavorTextResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonSpeciesFlavorText'] = ResolversParentTypes['PokemonSpeciesFlavorText']> = {
  flavorText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonSpritesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonSprites'] = ResolversParentTypes['PokemonSprites']> = {
  backDefault?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backFemale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backShiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backShinyFemale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontDefault?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontFemale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontShiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontShinyFemale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  other?: Resolver<Maybe<ResolversTypes['OtherPokemonSprites']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonStatConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonStatConnection'] = ResolversParentTypes['PokemonStatConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonStatEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonStatEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonStatEdge'] = ResolversParentTypes['PokemonStatEdge']> = {
  baseStat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  effort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Stat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonTypeConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonTypeConnection'] = ResolversParentTypes['PokemonTypeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonTypeEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonTypeEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonTypeEdge'] = ResolversParentTypes['PokemonTypeEdge']> = {
  node?: Resolver<ResolversTypes['Type'], ParentType, ContextType>;
  slot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonVarietyConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonVarietyConnection'] = ResolversParentTypes['PokemonVarietyConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonVarietyEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonVarietyEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonVarietyEdge'] = ResolversParentTypes['PokemonVarietyEdge']> = {
  isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Pokemon'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  itemAttributeById?: Resolver<Maybe<ResolversTypes['ItemAttribute']>, ParentType, ContextType, RequireFields<QueryItemAttributeByIdArgs, 'id'>>;
  itemAttributes?: Resolver<ResolversTypes['ItemAttributeConnection'], ParentType, ContextType, Partial<QueryItemAttributesArgs>>;
  itemById?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemByIdArgs, 'id'>>;
  itemCategories?: Resolver<ResolversTypes['ItemCategoryConnection'], ParentType, ContextType, Partial<QueryItemCategoriesArgs>>;
  itemCategoryById?: Resolver<Maybe<ResolversTypes['ItemCategory']>, ParentType, ContextType, RequireFields<QueryItemCategoryByIdArgs, 'id'>>;
  itemFlingEffectById?: Resolver<Maybe<ResolversTypes['ItemFlingEffect']>, ParentType, ContextType, RequireFields<QueryItemFlingEffectByIdArgs, 'id'>>;
  itemFlingEffects?: Resolver<ResolversTypes['ItemFlingEffectConnection'], ParentType, ContextType, Partial<QueryItemFlingEffectsArgs>>;
  itemPocketById?: Resolver<Maybe<ResolversTypes['ItemPocket']>, ParentType, ContextType, RequireFields<QueryItemPocketByIdArgs, 'id'>>;
  itemPockets?: Resolver<ResolversTypes['ItemPocketConnection'], ParentType, ContextType, Partial<QueryItemPocketsArgs>>;
  items?: Resolver<ResolversTypes['ItemConnection'], ParentType, ContextType, Partial<QueryItemsArgs>>;
  locationAreaById?: Resolver<Maybe<ResolversTypes['LocationArea']>, ParentType, ContextType, RequireFields<QueryLocationAreaByIdArgs, 'id'>>;
  locationAreas?: Resolver<ResolversTypes['LocationAreaConnection'], ParentType, ContextType, Partial<QueryLocationAreasArgs>>;
  locationById?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryLocationByIdArgs, 'id'>>;
  locations?: Resolver<ResolversTypes['LocationConnection'], ParentType, ContextType, Partial<QueryLocationsArgs>>;
  moveById?: Resolver<Maybe<ResolversTypes['Move']>, ParentType, ContextType, RequireFields<QueryMoveByIdArgs, 'id'>>;
  moves?: Resolver<ResolversTypes['MoveConnection'], ParentType, ContextType, Partial<QueryMovesArgs>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  palParkAreaById?: Resolver<Maybe<ResolversTypes['PalParkArea']>, ParentType, ContextType, RequireFields<QueryPalParkAreaByIdArgs, 'id'>>;
  palParkAreas?: Resolver<ResolversTypes['PalParkAreaConnection'], ParentType, ContextType, Partial<QueryPalParkAreasArgs>>;
  pokemonById?: Resolver<Maybe<ResolversTypes['Pokemon']>, ParentType, ContextType, RequireFields<QueryPokemonByIdArgs, 'id'>>;
  pokemonFormById?: Resolver<Maybe<ResolversTypes['PokemonForm']>, ParentType, ContextType, RequireFields<QueryPokemonFormByIdArgs, 'id'>>;
  pokemonForms?: Resolver<ResolversTypes['PokemonFormConnection'], ParentType, ContextType, Partial<QueryPokemonFormsArgs>>;
  pokemonSpecies?: Resolver<ResolversTypes['PokemonSpeciesConnection'], ParentType, ContextType, Partial<QueryPokemonSpeciesArgs>>;
  pokemonSpeciesById?: Resolver<Maybe<ResolversTypes['PokemonSpecies']>, ParentType, ContextType, RequireFields<QueryPokemonSpeciesByIdArgs, 'id'>>;
  pokemons?: Resolver<ResolversTypes['PokemonConnection'], ParentType, ContextType, Partial<QueryPokemonsArgs>>;
  regionById?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType, RequireFields<QueryRegionByIdArgs, 'id'>>;
  regions?: Resolver<ResolversTypes['RegionConnection'], ParentType, ContextType, Partial<QueryRegionsArgs>>;
  statById?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType, RequireFields<QueryStatByIdArgs, 'id'>>;
  stats?: Resolver<ResolversTypes['StatConnection'], ParentType, ContextType, Partial<QueryStatsArgs>>;
  typeById?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType, RequireFields<QueryTypeByIdArgs, 'id'>>;
  types?: Resolver<ResolversTypes['TypeConnection'], ParentType, ContextType, Partial<QueryTypesArgs>>;
};

export type RegionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locations?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  mainGeneration?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  pokedexes?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  versionGroups?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegionConnection'] = ResolversParentTypes['RegionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['RegionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegionEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegionEdge'] = ResolversParentTypes['RegionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Region'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stat'] = ResolversParentTypes['Stat']> = {
  affectingMoves?: Resolver<ResolversTypes['MoveStatAffectSets'], ParentType, ContextType>;
  affectingNatures?: Resolver<ResolversTypes['NatureStatAffectSets'], ParentType, ContextType>;
  characteristics?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  gameIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isBattleOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  moveDamageClass?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StatConnection'] = ResolversParentTypes['StatConnection']> = {
  edges?: Resolver<Array<ResolversTypes['StatEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StatEdge'] = ResolversParentTypes['StatEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Stat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Type'] = ResolversParentTypes['Type']> = {
  damageRelations?: Resolver<ResolversTypes['DamageRelations'], ParentType, ContextType>;
  gameIndices?: Resolver<Array<ResolversTypes['GameIndex']>, ParentType, ContextType>;
  generation?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moveDamageClass?: Resolver<Maybe<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  moves?: Resolver<Array<ResolversTypes['NamedAPIResource']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['Name']>, ParentType, ContextType>;
  pastDamageRelations?: Resolver<Array<ResolversTypes['PastDamageRelations']>, ParentType, ContextType>;
  pokemon?: Resolver<Array<ResolversTypes['TypePokemon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TypeConnection'] = ResolversParentTypes['TypeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TypeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TypeEdge'] = ResolversParentTypes['TypeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Type'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypePokemonResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TypePokemon'] = ResolversParentTypes['TypePokemon']> = {
  pokemon?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  slot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TypeReferenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TypeReference'] = ResolversParentTypes['TypeReference']> = {
  slot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  APIResource?: ApiResourceResolvers<ContextType>;
  Ability?: AbilityResolvers<ContextType>;
  DamageRelations?: DamageRelationsResolvers<ContextType>;
  Description?: DescriptionResolvers<ContextType>;
  DreamWorldSprites?: DreamWorldSpritesResolvers<ContextType>;
  EffectEntry?: EffectEntryResolvers<ContextType>;
  EncounterMethodRate?: EncounterMethodRateResolvers<ContextType>;
  EncounterVersionDetail?: EncounterVersionDetailResolvers<ContextType>;
  FlavorTextEntry?: FlavorTextEntryResolvers<ContextType>;
  GameIndex?: GameIndexResolvers<ContextType>;
  Genus?: GenusResolvers<ContextType>;
  HeldItem?: HeldItemResolvers<ContextType>;
  HeldItemVersion?: HeldItemVersionResolvers<ContextType>;
  HomeSprites?: HomeSpritesResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemAttribute?: ItemAttributeResolvers<ContextType>;
  ItemAttributeConnection?: ItemAttributeConnectionResolvers<ContextType>;
  ItemAttributeEdge?: ItemAttributeEdgeResolvers<ContextType>;
  ItemCategory?: ItemCategoryResolvers<ContextType>;
  ItemCategoryConnection?: ItemCategoryConnectionResolvers<ContextType>;
  ItemCategoryEdge?: ItemCategoryEdgeResolvers<ContextType>;
  ItemConnection?: ItemConnectionResolvers<ContextType>;
  ItemEdge?: ItemEdgeResolvers<ContextType>;
  ItemFlingEffect?: ItemFlingEffectResolvers<ContextType>;
  ItemFlingEffectConnection?: ItemFlingEffectConnectionResolvers<ContextType>;
  ItemFlingEffectEdge?: ItemFlingEffectEdgeResolvers<ContextType>;
  ItemHolderPokemon?: ItemHolderPokemonResolvers<ContextType>;
  ItemHolderPokemonVersionDetail?: ItemHolderPokemonVersionDetailResolvers<ContextType>;
  ItemPocket?: ItemPocketResolvers<ContextType>;
  ItemPocketConnection?: ItemPocketConnectionResolvers<ContextType>;
  ItemPocketEdge?: ItemPocketEdgeResolvers<ContextType>;
  ItemSprites?: ItemSpritesResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LocationArea?: LocationAreaResolvers<ContextType>;
  LocationAreaConnection?: LocationAreaConnectionResolvers<ContextType>;
  LocationAreaEdge?: LocationAreaEdgeResolvers<ContextType>;
  LocationConnection?: LocationConnectionResolvers<ContextType>;
  LocationEdge?: LocationEdgeResolvers<ContextType>;
  Move?: MoveResolvers<ContextType>;
  MoveConnection?: MoveConnectionResolvers<ContextType>;
  MoveEdge?: MoveEdgeResolvers<ContextType>;
  MoveEffectEntry?: MoveEffectEntryResolvers<ContextType>;
  MoveFlavorTextEntry?: MoveFlavorTextEntryResolvers<ContextType>;
  MoveMeta?: MoveMetaResolvers<ContextType>;
  MoveStatAffect?: MoveStatAffectResolvers<ContextType>;
  MoveStatAffectSets?: MoveStatAffectSetsResolvers<ContextType>;
  MoveStatChange?: MoveStatChangeResolvers<ContextType>;
  MoveVersionGroupDetail?: MoveVersionGroupDetailResolvers<ContextType>;
  Name?: NameResolvers<ContextType>;
  NamedAPIResource?: NamedApiResourceResolvers<ContextType>;
  NatureStatAffectSets?: NatureStatAffectSetsResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  OfficialArtworkSprites?: OfficialArtworkSpritesResolvers<ContextType>;
  OtherPokemonSprites?: OtherPokemonSpritesResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PalParkArea?: PalParkAreaResolvers<ContextType>;
  PalParkAreaConnection?: PalParkAreaConnectionResolvers<ContextType>;
  PalParkAreaEdge?: PalParkAreaEdgeResolvers<ContextType>;
  PalParkEncounter?: PalParkEncounterResolvers<ContextType>;
  PalParkEncounterArea?: PalParkEncounterAreaResolvers<ContextType>;
  PastDamageRelations?: PastDamageRelationsResolvers<ContextType>;
  Pokemon?: PokemonResolvers<ContextType>;
  PokemonAbilityConnection?: PokemonAbilityConnectionResolvers<ContextType>;
  PokemonAbilityEdge?: PokemonAbilityEdgeResolvers<ContextType>;
  PokemonConnection?: PokemonConnectionResolvers<ContextType>;
  PokemonEdge?: PokemonEdgeResolvers<ContextType>;
  PokemonEncounterConnection?: PokemonEncounterConnectionResolvers<ContextType>;
  PokemonEncounterEdge?: PokemonEncounterEdgeResolvers<ContextType>;
  PokemonForm?: PokemonFormResolvers<ContextType>;
  PokemonFormConnection?: PokemonFormConnectionResolvers<ContextType>;
  PokemonFormEdge?: PokemonFormEdgeResolvers<ContextType>;
  PokemonFormSprites?: PokemonFormSpritesResolvers<ContextType>;
  PokemonMoveConnection?: PokemonMoveConnectionResolvers<ContextType>;
  PokemonMoveEdge?: PokemonMoveEdgeResolvers<ContextType>;
  PokemonSpecies?: PokemonSpeciesResolvers<ContextType>;
  PokemonSpeciesConnection?: PokemonSpeciesConnectionResolvers<ContextType>;
  PokemonSpeciesDexEntry?: PokemonSpeciesDexEntryResolvers<ContextType>;
  PokemonSpeciesEdge?: PokemonSpeciesEdgeResolvers<ContextType>;
  PokemonSpeciesFlavorText?: PokemonSpeciesFlavorTextResolvers<ContextType>;
  PokemonSprites?: PokemonSpritesResolvers<ContextType>;
  PokemonStatConnection?: PokemonStatConnectionResolvers<ContextType>;
  PokemonStatEdge?: PokemonStatEdgeResolvers<ContextType>;
  PokemonTypeConnection?: PokemonTypeConnectionResolvers<ContextType>;
  PokemonTypeEdge?: PokemonTypeEdgeResolvers<ContextType>;
  PokemonVarietyConnection?: PokemonVarietyConnectionResolvers<ContextType>;
  PokemonVarietyEdge?: PokemonVarietyEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Region?: RegionResolvers<ContextType>;
  RegionConnection?: RegionConnectionResolvers<ContextType>;
  RegionEdge?: RegionEdgeResolvers<ContextType>;
  Stat?: StatResolvers<ContextType>;
  StatConnection?: StatConnectionResolvers<ContextType>;
  StatEdge?: StatEdgeResolvers<ContextType>;
  Type?: TypeResolvers<ContextType>;
  TypeConnection?: TypeConnectionResolvers<ContextType>;
  TypeEdge?: TypeEdgeResolvers<ContextType>;
  TypePokemon?: TypePokemonResolvers<ContextType>;
  TypeReference?: TypeReferenceResolvers<ContextType>;
};

