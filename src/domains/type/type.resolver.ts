import type { TypeResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Type: TypeResolvers = {
  id: (parent) => encodeGlobalId("Type", parent.id),
  name: (parent) => parent.name,
  damageRelations: (parent) => ({
    noDamageTo: parent.damage_relations.no_damage_to.map((type) => ({
      name: type.name,
      url: type.url,
    })),
    halfDamageTo: parent.damage_relations.half_damage_to.map((type) => ({
      name: type.name,
      url: type.url,
    })),
    doubleDamageTo: parent.damage_relations.double_damage_to.map((type) => ({
      name: type.name,
      url: type.url,
    })),
    noDamageFrom: parent.damage_relations.no_damage_from.map((type) => ({
      name: type.name,
      url: type.url,
    })),
    halfDamageFrom: parent.damage_relations.half_damage_from.map((type) => ({
      name: type.name,
      url: type.url,
    })),
    doubleDamageFrom: parent.damage_relations.double_damage_from.map((type) => ({
      name: type.name,
      url: type.url,
    })),
  }),
  pastDamageRelations: (parent) =>
    parent.past_damage_relations.map((pastRelation) => ({
      generation: {
        name: pastRelation.generation.name,
        url: pastRelation.generation.url,
      },
      damageRelations: {
        noDamageTo: pastRelation.damage_relations.no_damage_to.map((type) => ({
          name: type.name,
          url: type.url,
        })),
        halfDamageTo: pastRelation.damage_relations.half_damage_to.map((type) => ({
          name: type.name,
          url: type.url,
        })),
        doubleDamageTo: pastRelation.damage_relations.double_damage_to.map((type) => ({
          name: type.name,
          url: type.url,
        })),
        noDamageFrom: pastRelation.damage_relations.no_damage_from.map((type) => ({
          name: type.name,
          url: type.url,
        })),
        halfDamageFrom: pastRelation.damage_relations.half_damage_from.map((type) => ({
          name: type.name,
          url: type.url,
        })),
        doubleDamageFrom: pastRelation.damage_relations.double_damage_from.map((type) => ({
          name: type.name,
          url: type.url,
        })),
      },
    })),
  gameIndices: (parent) =>
    parent.game_indices.map((gameIndex) => ({
      gameIndex: gameIndex.game_index,
      version: {
        name: gameIndex.version.name,
        url: gameIndex.version.url,
      },
    })),
  generation: (parent) => ({
    name: parent.generation.name,
    url: parent.generation.url,
  }),
  moveDamageClass: (parent) =>
    parent.move_damage_class
      ? {
          name: parent.move_damage_class.name,
          url: parent.move_damage_class.url,
        }
      : null,
  names: (parent) =>
    parent.names.map((name) => ({
      name: name.name,
      language: {
        name: name.language.name,
        url: name.language.url,
      },
    })),
  pokemon: (parent) =>
    parent.pokemon.map((typePokemon) => ({
      slot: typePokemon.slot,
      pokemon: {
        name: typePokemon.pokemon.name,
        url: typePokemon.pokemon.url,
      },
    })),
  moves: (parent) =>
    parent.moves.map((move) => ({
      name: move.name,
      url: move.url,
    })),
};
