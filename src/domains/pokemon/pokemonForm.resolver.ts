import type { PokemonFormResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const PokemonForm: PokemonFormResolvers = {
  id: (parent) => encodeGlobalId("PokemonForm", parent.id),
  name: (parent) => parent.name,
  order: (parent) => parent.order,
  formOrder: (parent) => parent.form_order,
  isDefault: (parent) => parent.is_default,
  isBattleOnly: (parent) => parent.is_battle_only,
  isMega: (parent) => parent.is_mega,
  formName: (parent) => parent.form_name,
  pokemon: (parent) => ({
    name: parent.pokemon.name,
    url: parent.pokemon.url,
  }),
  types: (parent) =>
    parent.types.map((typeRef) => ({
      slot: typeRef.slot,
      type: {
        name: typeRef.type.name,
        url: typeRef.type.url,
      },
    })),
  sprites: (parent) => ({
    frontDefault: parent.sprites.front_default,
    frontShiny: parent.sprites.front_shiny,
    backDefault: parent.sprites.back_default,
    backShiny: parent.sprites.back_shiny,
  }),
  versionGroup: (parent) => ({
    name: parent.version_group.name,
    url: parent.version_group.url,
  }),
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
  formNames: (parent) =>
    parent.form_names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
};
