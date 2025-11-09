/* eslint-disable */
// @ts-nocheck
import { GraphQLResolveInfo } from 'graphql';
import { PokemonDTO } from '../domains/pokemon/pokemon.dto.js';
import { AbilityDTO } from '../domains/ability/ability.dto.js';
import { StatDTO } from '../domains/stat/stat.dto.js';
import { TypeDTO } from '../domains/type/type.dto.js';
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

/** A connection to a list of Pokemon moves. */
export type PokemonMoveConnection = {
  __typename?: 'PokemonMoveConnection';
  /** A list of edges containing Pokemon-specific move learning information. */
  edges: Array<PokemonMoveEdge>;
};

/** An edge representing the relationship between a Pokemon and a Move. */
export type PokemonMoveEdge = {
  __typename?: 'PokemonMoveEdge';
  /** The move reference. */
  move: NamedApiResource;
  /** Version-specific details about how this Pokemon learns this move. */
  versionGroupDetails: Array<MoveVersionGroupDetail>;
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

export type Query = {
  __typename?: 'Query';
  /** Fetch any object that implements the Node interface by its global ID. */
  node?: Maybe<Node>;
  /** Fetch a single Pokemon by its global ID. */
  pokemon?: Maybe<Pokemon>;
  /** Fetch a paginated list of Pokemon using forward-only cursor-based pagination. */
  pokemons: PokemonConnection;
  /** Fetch a single Stat by its global ID. */
  stat?: Maybe<Stat>;
  /** Fetch a paginated list of Stats using forward-only cursor-based pagination. */
  stats: StatConnection;
  /** Fetch a single Type by its global ID. */
  type?: Maybe<Type>;
  /** Fetch a paginated list of Types using forward-only cursor-based pagination. */
  types: TypeConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPokemonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPokemonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStatsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  Node: ( AbilityDTO ) | ( PokemonDTO ) | ( StatDTO ) | ( TypeDTO );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Ability: ResolverTypeWrapper<AbilityDTO>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DamageRelations: ResolverTypeWrapper<DamageRelations>;
  DreamWorldSprites: ResolverTypeWrapper<DreamWorldSprites>;
  EffectEntry: ResolverTypeWrapper<EffectEntry>;
  FlavorTextEntry: ResolverTypeWrapper<FlavorTextEntry>;
  GameIndex: ResolverTypeWrapper<GameIndex>;
  HeldItem: ResolverTypeWrapper<HeldItem>;
  HeldItemVersion: ResolverTypeWrapper<HeldItemVersion>;
  HomeSprites: ResolverTypeWrapper<HomeSprites>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MoveStatAffect: ResolverTypeWrapper<MoveStatAffect>;
  MoveStatAffectSets: ResolverTypeWrapper<MoveStatAffectSets>;
  MoveVersionGroupDetail: ResolverTypeWrapper<MoveVersionGroupDetail>;
  Name: ResolverTypeWrapper<Name>;
  NamedAPIResource: ResolverTypeWrapper<NamedApiResource>;
  NatureStatAffectSets: ResolverTypeWrapper<NatureStatAffectSets>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  OfficialArtworkSprites: ResolverTypeWrapper<OfficialArtworkSprites>;
  OtherPokemonSprites: ResolverTypeWrapper<OtherPokemonSprites>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PastDamageRelations: ResolverTypeWrapper<PastDamageRelations>;
  Pokemon: ResolverTypeWrapper<PokemonDTO>;
  PokemonAbilityConnection: ResolverTypeWrapper<Omit<PokemonAbilityConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonAbilityEdge']> }>;
  PokemonAbilityEdge: ResolverTypeWrapper<{ slot: number; isHidden: boolean; abilityName: string }>;
  PokemonConnection: ResolverTypeWrapper<Omit<PokemonConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonEdge']> }>;
  PokemonEdge: ResolverTypeWrapper<Omit<PokemonEdge, 'node'> & { node: ResolversTypes['Pokemon'] }>;
  PokemonMoveConnection: ResolverTypeWrapper<PokemonMoveConnection>;
  PokemonMoveEdge: ResolverTypeWrapper<PokemonMoveEdge>;
  PokemonSprites: ResolverTypeWrapper<PokemonSprites>;
  PokemonStatConnection: ResolverTypeWrapper<Omit<PokemonStatConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonStatEdge']> }>;
  PokemonStatEdge: ResolverTypeWrapper<{ baseStat: number; effort: number; statName: string }>;
  PokemonTypeConnection: ResolverTypeWrapper<Omit<PokemonTypeConnection, 'edges'> & { edges: Array<ResolversTypes['PokemonTypeEdge']> }>;
  PokemonTypeEdge: ResolverTypeWrapper<{ slot: number; typeName: string }>;
  Query: ResolverTypeWrapper<{}>;
  Stat: ResolverTypeWrapper<StatDTO>;
  StatConnection: ResolverTypeWrapper<Omit<StatConnection, 'edges'> & { edges: Array<ResolversTypes['StatEdge']> }>;
  StatEdge: ResolverTypeWrapper<Omit<StatEdge, 'node'> & { node: ResolversTypes['Stat'] }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Type: ResolverTypeWrapper<TypeDTO>;
  TypeConnection: ResolverTypeWrapper<Omit<TypeConnection, 'edges'> & { edges: Array<ResolversTypes['TypeEdge']> }>;
  TypeEdge: ResolverTypeWrapper<Omit<TypeEdge, 'node'> & { node: ResolversTypes['Type'] }>;
  TypePokemon: ResolverTypeWrapper<TypePokemon>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Ability: AbilityDTO;
  Boolean: Scalars['Boolean']['output'];
  DamageRelations: DamageRelations;
  DreamWorldSprites: DreamWorldSprites;
  EffectEntry: EffectEntry;
  FlavorTextEntry: FlavorTextEntry;
  GameIndex: GameIndex;
  HeldItem: HeldItem;
  HeldItemVersion: HeldItemVersion;
  HomeSprites: HomeSprites;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  MoveStatAffect: MoveStatAffect;
  MoveStatAffectSets: MoveStatAffectSets;
  MoveVersionGroupDetail: MoveVersionGroupDetail;
  Name: Name;
  NamedAPIResource: NamedApiResource;
  NatureStatAffectSets: NatureStatAffectSets;
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  OfficialArtworkSprites: OfficialArtworkSprites;
  OtherPokemonSprites: OtherPokemonSprites;
  PageInfo: PageInfo;
  PastDamageRelations: PastDamageRelations;
  Pokemon: PokemonDTO;
  PokemonAbilityConnection: Omit<PokemonAbilityConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonAbilityEdge']> };
  PokemonAbilityEdge: { slot: number; isHidden: boolean; abilityName: string };
  PokemonConnection: Omit<PokemonConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonEdge']> };
  PokemonEdge: Omit<PokemonEdge, 'node'> & { node: ResolversParentTypes['Pokemon'] };
  PokemonMoveConnection: PokemonMoveConnection;
  PokemonMoveEdge: PokemonMoveEdge;
  PokemonSprites: PokemonSprites;
  PokemonStatConnection: Omit<PokemonStatConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonStatEdge']> };
  PokemonStatEdge: { baseStat: number; effort: number; statName: string };
  PokemonTypeConnection: Omit<PokemonTypeConnection, 'edges'> & { edges: Array<ResolversParentTypes['PokemonTypeEdge']> };
  PokemonTypeEdge: { slot: number; typeName: string };
  Query: {};
  Stat: StatDTO;
  StatConnection: Omit<StatConnection, 'edges'> & { edges: Array<ResolversParentTypes['StatEdge']> };
  StatEdge: Omit<StatEdge, 'node'> & { node: ResolversParentTypes['Stat'] };
  String: Scalars['String']['output'];
  Type: TypeDTO;
  TypeConnection: Omit<TypeConnection, 'edges'> & { edges: Array<ResolversParentTypes['TypeEdge']> };
  TypeEdge: Omit<TypeEdge, 'node'> & { node: ResolversParentTypes['Type'] };
  TypePokemon: TypePokemon;
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
  __resolveType: TypeResolveFn<'Ability' | 'Pokemon' | 'Stat' | 'Type', ParentType, ContextType>;
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

export type PokemonMoveConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonMoveConnection'] = ResolversParentTypes['PokemonMoveConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PokemonMoveEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonMoveEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PokemonMoveEdge'] = ResolversParentTypes['PokemonMoveEdge']> = {
  move?: Resolver<ResolversTypes['NamedAPIResource'], ParentType, ContextType>;
  versionGroupDetails?: Resolver<Array<ResolversTypes['MoveVersionGroupDetail']>, ParentType, ContextType>;
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

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  pokemon?: Resolver<Maybe<ResolversTypes['Pokemon']>, ParentType, ContextType, RequireFields<QueryPokemonArgs, 'id'>>;
  pokemons?: Resolver<ResolversTypes['PokemonConnection'], ParentType, ContextType, Partial<QueryPokemonsArgs>>;
  stat?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType, RequireFields<QueryStatArgs, 'id'>>;
  stats?: Resolver<ResolversTypes['StatConnection'], ParentType, ContextType, Partial<QueryStatsArgs>>;
  type?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType, RequireFields<QueryTypeArgs, 'id'>>;
  types?: Resolver<ResolversTypes['TypeConnection'], ParentType, ContextType, Partial<QueryTypesArgs>>;
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

export type Resolvers<ContextType = Context> = {
  Ability?: AbilityResolvers<ContextType>;
  DamageRelations?: DamageRelationsResolvers<ContextType>;
  DreamWorldSprites?: DreamWorldSpritesResolvers<ContextType>;
  EffectEntry?: EffectEntryResolvers<ContextType>;
  FlavorTextEntry?: FlavorTextEntryResolvers<ContextType>;
  GameIndex?: GameIndexResolvers<ContextType>;
  HeldItem?: HeldItemResolvers<ContextType>;
  HeldItemVersion?: HeldItemVersionResolvers<ContextType>;
  HomeSprites?: HomeSpritesResolvers<ContextType>;
  MoveStatAffect?: MoveStatAffectResolvers<ContextType>;
  MoveStatAffectSets?: MoveStatAffectSetsResolvers<ContextType>;
  MoveVersionGroupDetail?: MoveVersionGroupDetailResolvers<ContextType>;
  Name?: NameResolvers<ContextType>;
  NamedAPIResource?: NamedApiResourceResolvers<ContextType>;
  NatureStatAffectSets?: NatureStatAffectSetsResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  OfficialArtworkSprites?: OfficialArtworkSpritesResolvers<ContextType>;
  OtherPokemonSprites?: OtherPokemonSpritesResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PastDamageRelations?: PastDamageRelationsResolvers<ContextType>;
  Pokemon?: PokemonResolvers<ContextType>;
  PokemonAbilityConnection?: PokemonAbilityConnectionResolvers<ContextType>;
  PokemonAbilityEdge?: PokemonAbilityEdgeResolvers<ContextType>;
  PokemonConnection?: PokemonConnectionResolvers<ContextType>;
  PokemonEdge?: PokemonEdgeResolvers<ContextType>;
  PokemonMoveConnection?: PokemonMoveConnectionResolvers<ContextType>;
  PokemonMoveEdge?: PokemonMoveEdgeResolvers<ContextType>;
  PokemonSprites?: PokemonSpritesResolvers<ContextType>;
  PokemonStatConnection?: PokemonStatConnectionResolvers<ContextType>;
  PokemonStatEdge?: PokemonStatEdgeResolvers<ContextType>;
  PokemonTypeConnection?: PokemonTypeConnectionResolvers<ContextType>;
  PokemonTypeEdge?: PokemonTypeEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stat?: StatResolvers<ContextType>;
  StatConnection?: StatConnectionResolvers<ContextType>;
  StatEdge?: StatEdgeResolvers<ContextType>;
  Type?: TypeResolvers<ContextType>;
  TypeConnection?: TypeConnectionResolvers<ContextType>;
  TypeEdge?: TypeEdgeResolvers<ContextType>;
  TypePokemon?: TypePokemonResolvers<ContextType>;
};

