import type { Resolvers } from "../types/generated.js";
import { Query } from "./query.js";
import { Pokemon } from "../domains/pokemon/pokemon.resolver.js";
import { PokemonSpecies } from "../domains/pokemon/pokemonSpecies.resolver.js";
import { PokemonForm } from "../domains/pokemon/pokemonForm.resolver.js";
import { Ability } from "../domains/ability/ability.resolver.js";
import { Stat } from "../domains/stat/stat.resolver.js";
import { Characteristic } from "../domains/stat/characteristic.resolver.js";
import { Nature } from "../domains/stat/nature.resolver.js";
import { Type } from "../domains/type/type.resolver.js";
import { Move } from "../domains/move/move.resolver.js";
import { Item } from "../domains/item/item.resolver.js";
import { ItemCategory } from "../domains/item/itemCategory.resolver.js";
import { ItemAttribute } from "../domains/item/itemAttribute.resolver.js";
import { ItemFlingEffect } from "../domains/item/itemFlingEffect.resolver.js";
import { ItemPocket } from "../domains/item/itemPocket.resolver.js";
import { Location } from "../domains/location/location.resolver.js";
import { LocationArea } from "../domains/location/locationArea.resolver.js";
import { Region } from "../domains/location/region.resolver.js";
import { PalParkArea, PalParkEncounter } from "../domains/location/palParkArea.resolver.js";
import { PokemonAbilityEdge } from "../domains/pokemon/edges/pokemonAbility.edge.js";
import { PokemonStatEdge } from "../domains/pokemon/edges/pokemonStat.edge.js";
import { PokemonTypeEdge } from "../domains/pokemon/edges/pokemonType.edge.js";
import { PokemonMoveEdge } from "../domains/pokemon/edges/pokemonMove.edge.js";
import { PokemonVarietyEdge } from "../domains/pokemon/edges/pokemonVariety.edge.js";
import { PokemonEncounterEdge } from "../domains/location/edges/pokemonEncounter.edge.js";
import {
  EvolutionChain,
  ChainLink,
  EvolutionDetail,
} from "../domains/evolution/evolutionChain.resolver.js";
import { EvolutionTrigger } from "../domains/evolution/evolutionTrigger.resolver.js";
import { Berry } from "../domains/berry/berry.resolver.js";
import { BerryFlavor } from "../domains/berry/berryFlavor.resolver.js";
import { BerryFirmness } from "../domains/berry/berryFirmness.resolver.js";
import { BerryFlavorEdge } from "../domains/berry/edges/berryFlavor.edge.js";
import { Generation } from "../domains/game/generation.resolver.js";
import { Version } from "../domains/game/version.resolver.js";
import { VersionGroup } from "../domains/game/versionGroup.resolver.js";
import { Pokedex } from "../domains/game/pokedex.resolver.js";
import { Node } from "./node.js";

export const resolvers: Resolvers = {
  Query,
  Node,
  Pokemon,
  PokemonSpecies,
  PokemonForm,
  Ability,
  Stat,
  Characteristic,
  Nature,
  Type,
  Move,
  Item,
  ItemCategory,
  ItemAttribute,
  ItemFlingEffect,
  ItemPocket,
  Location,
  LocationArea,
  Region,
  PalParkArea,
  PalParkEncounter,
  PokemonAbilityEdge,
  PokemonStatEdge,
  PokemonTypeEdge,
  PokemonMoveEdge,
  PokemonVarietyEdge,
  PokemonEncounterEdge,
  EvolutionChain,
  ChainLink,
  EvolutionDetail,
  EvolutionTrigger,
  Berry,
  BerryFlavor,
  BerryFirmness,
  BerryFlavorEdge,
  Generation,
  Version,
  VersionGroup,
  Pokedex,
};
