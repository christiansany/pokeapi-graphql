import type { PokemonResolvers } from "../../types/generated.js";
import { encodeGlobalId } from "../../utils/relay.js";

export const Pokemon: PokemonResolvers = {
  id: (parent) => encodeGlobalId("Pokemon", parent.id),
  name: (parent) => parent.name,
  height: (parent) => parent.height,
  weight: (parent) => parent.weight,
  baseExperience: (parent) => parent.base_experience,
  order: (parent) => parent.order,
  isDefault: (parent) => parent.is_default,
  sprites: (parent) => ({
    frontDefault: parent.sprites.front_default,
    frontShiny: parent.sprites.front_shiny,
    frontFemale: parent.sprites.front_female,
    frontShinyFemale: parent.sprites.front_shiny_female,
    backDefault: parent.sprites.back_default,
    backShiny: parent.sprites.back_shiny,
    backFemale: parent.sprites.back_female,
    backShinyFemale: parent.sprites.back_shiny_female,
    other: parent.sprites.other
      ? {
          dreamWorld: parent.sprites.other.dream_world
            ? {
                frontDefault: parent.sprites.other.dream_world.front_default,
                frontFemale: parent.sprites.other.dream_world.front_female,
              }
            : null,
          home: parent.sprites.other.home
            ? {
                frontDefault: parent.sprites.other.home.front_default,
                frontFemale: parent.sprites.other.home.front_female,
                frontShiny: parent.sprites.other.home.front_shiny,
                frontShinyFemale: parent.sprites.other.home.front_shiny_female,
              }
            : null,
          officialArtwork: parent.sprites.other["official-artwork"]
            ? {
                frontDefault: parent.sprites.other["official-artwork"].front_default,
                frontShiny: parent.sprites.other["official-artwork"].front_shiny,
              }
            : null,
        }
      : null,
  }),
  abilities: (parent) => ({
    edges: parent.abilities.map((abilityRef) => ({
      slot: abilityRef.slot,
      isHidden: abilityRef.is_hidden,
      abilityName: abilityRef.ability.name,
    })),
  }),
  stats: (parent) => ({
    edges: parent.stats.map((statRef) => ({
      baseStat: statRef.base_stat,
      effort: statRef.effort,
      stat: {
        name: statRef.stat.name,
        url: statRef.stat.url,
      },
    })),
  }),
  types: (parent) => ({
    edges: parent.types.map((typeRef) => ({
      slot: typeRef.slot,
      type: {
        name: typeRef.type.name,
        url: typeRef.type.url,
      },
    })),
  }),
  moves: (parent) => ({
    edges: parent.moves.map((moveRef) => ({
      move: {
        name: moveRef.move.name,
        url: moveRef.move.url,
      },
      versionGroupDetails: moveRef.version_group_details.map((detail) => ({
        levelLearnedAt: detail.level_learned_at,
        moveLearnMethod: {
          name: detail.move_learn_method.name,
          url: detail.move_learn_method.url,
        },
        versionGroup: {
          name: detail.version_group.name,
          url: detail.version_group.url,
        },
      })),
    })),
  }),
  species: (parent) => ({
    name: parent.species.name,
    url: parent.species.url,
  }),
  forms: (parent) =>
    parent.forms.map((form) => ({
      name: form.name,
      url: form.url,
    })),
  gameIndices: (parent) =>
    parent.game_indices.map((gameIndex) => ({
      gameIndex: gameIndex.game_index,
      version: {
        name: gameIndex.version.name,
        url: gameIndex.version.url,
      },
    })),
  heldItems: (parent) =>
    parent.held_items.map((heldItem) => ({
      item: {
        name: heldItem.item.name,
        url: heldItem.item.url,
      },
      versionDetails: heldItem.version_details.map((versionDetail) => ({
        rarity: versionDetail.rarity,
        version: {
          name: versionDetail.version.name,
          url: versionDetail.version.url,
        },
      })),
    })),
  locationAreaEncounters: (parent) => parent.location_area_encounters,
};
