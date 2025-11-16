import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../types/generated.js";
import { decodeGlobalId, validatePaginationArgs } from "../utils/relay.js";
import { encodeCursor } from "../utils/cursor.js";

export const Query: QueryResolvers = {
  pokemonById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Pokemon") {
      throw new GraphQLError("Invalid Pokemon ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Pokemon ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.pokemon.getPokemonById(numericId);
  },

  pokemons: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Pokemon list from PokéAPI
    const listResponse = await dataSources.pokemon.getPokemonList(limit ?? 0, offset);

    // Fetch full Pokemon data for each result
    const pokemonPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.pokemon.getPokemonById(id);
    });

    const pokemons = await Promise.all(pokemonPromises);

    // Filter out any null results and create edges with cursors
    const edges = pokemons
      .map((pokemon, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: pokemon,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },
  statById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Stat") {
      throw new GraphQLError("Invalid Stat ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Stat ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.stat.getStatById(numericId);
  },

  stats: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Stat list from PokéAPI
    const listResponse = await dataSources.stat.getStatList(limit ?? 0, offset);

    // Fetch full Stat data for each result
    const statPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/stat/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.stat.getStatById(id);
    });

    const stats = await Promise.all(statPromises);

    // Filter out any null results and create edges with cursors
    const edges = stats
      .map((stat, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: stat,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  characteristicById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Characteristic") {
      throw new GraphQLError("Invalid Characteristic ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Characteristic ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.stat.getCharacteristicById(numericId);
  },

  characteristics: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Characteristic list from PokéAPI
    const listResponse = await dataSources.stat.getCharacteristicList(limit ?? 0, offset);

    // Fetch full Characteristic data for each result
    const characteristicPromises = listResponse.results.map((result: { url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/characteristic/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.stat.getCharacteristicById(id);
    });

    const characteristics = await Promise.all(characteristicPromises);

    // Filter out any null results and create edges with cursors
    const edges = characteristics
      .map((characteristic, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: characteristic,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  natureById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Nature") {
      throw new GraphQLError("Invalid Nature ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Nature ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.stat.getNatureById(numericId);
  },

  natures: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Nature list from PokéAPI
    const listResponse = await dataSources.stat.getNatureList(limit ?? 0, offset);

    // Fetch full Nature data for each result
    const naturePromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/nature/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.stat.getNatureById(id);
    });

    const natures = await Promise.all(naturePromises);

    // Filter out any null results and create edges with cursors
    const edges = natures
      .map((nature, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: nature,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  typeById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Type") {
      throw new GraphQLError("Invalid Type ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Type ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.type.getTypeById(numericId);
  },

  types: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Type list from PokéAPI
    const listResponse = await dataSources.type.getTypeList(limit ?? 0, offset);

    // Fetch full Type data for each result
    const typePromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/type/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.type.getTypeById(id);
    });

    const types = await Promise.all(typePromises);

    // Filter out any null results and create edges with cursors
    const edges = types
      .map((type, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: type,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  moveById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Move") {
      throw new GraphQLError("Invalid Move ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Move ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.move.getMoveById(numericId);
  },

  moves: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Move list from PokéAPI
    const listResponse = await dataSources.move.getMoveList(limit ?? 0, offset);

    // Fetch full Move data for each result
    const movePromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/move/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.move.getMoveById(id);
    });

    const moves = await Promise.all(movePromises);

    // Filter out any null results and create edges with cursors
    const edges = moves
      .map((move, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: move,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  pokemonSpeciesById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "PokemonSpecies") {
      throw new GraphQLError("Invalid PokemonSpecies ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid PokemonSpecies ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.pokemon.getSpeciesById(numericId);
  },

  pokemonSpecies: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Pokemon Species list from PokéAPI
    const listResponse = await dataSources.pokemon.getSpeciesList(limit ?? 0, offset);

    // Fetch full Pokemon Species data for each result
    const speciesPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon-species/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.pokemon.getSpeciesById(id);
    });

    const species = await Promise.all(speciesPromises);

    // Filter out any null results and create edges with cursors
    const edges = species
      .map((speciesItem, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: speciesItem,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  pokemonFormById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "PokemonForm") {
      throw new GraphQLError("Invalid PokemonForm ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid PokemonForm ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.pokemon.getFormById(numericId);
  },

  pokemonForms: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Pokemon Form list from PokéAPI
    const listResponse = await dataSources.pokemon.getFormList(limit ?? 0, offset);

    // Fetch full Pokemon Form data for each result
    const formPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon-form/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.pokemon.getFormById(id);
    });

    const forms = await Promise.all(formPromises);

    // Filter out any null results and create edges with cursors
    const edges = forms
      .map((form, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: form,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  itemById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Item") {
      throw new GraphQLError("Invalid Item ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Item ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.item.getItemById(numericId);
  },

  items: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Item list from PokéAPI
    const listResponse = await dataSources.item.getItemList(limit ?? 0, offset);

    // Fetch full Item data for each result
    const itemPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/item/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.item.getItemById(id);
    });

    const items = await Promise.all(itemPromises);

    // Filter out any null results and create edges with cursors
    const edges = items
      .map((item, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: item,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  itemCategoryById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "ItemCategory") {
      throw new GraphQLError("Invalid ItemCategory ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid ItemCategory ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.item.getItemCategoryById(numericId);
  },

  itemCategories: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch ItemCategory list from PokéAPI
    const listResponse = await dataSources.item.getItemCategoryList(limit ?? 0, offset);

    // Fetch full ItemCategory data for each result
    const categoryPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/item-category/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.item.getItemCategoryById(id);
    });

    const categories = await Promise.all(categoryPromises);

    // Filter out any null results and create edges with cursors
    const edges = categories
      .map((category, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: category,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  itemAttributeById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "ItemAttribute") {
      throw new GraphQLError("Invalid ItemAttribute ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid ItemAttribute ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.item.getItemAttributeById(numericId);
  },

  itemAttributes: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch ItemAttribute list from PokéAPI
    const listResponse = await dataSources.item.getItemAttributeList(limit ?? 0, offset);

    // Fetch full ItemAttribute data for each result
    const attributePromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/item-attribute/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.item.getItemAttributeById(id);
    });

    const attributes = await Promise.all(attributePromises);

    // Filter out any null results and create edges with cursors
    const edges = attributes
      .map((attribute, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: attribute,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  itemFlingEffectById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "ItemFlingEffect") {
      throw new GraphQLError("Invalid ItemFlingEffect ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid ItemFlingEffect ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.item.getItemFlingEffectById(numericId);
  },

  itemFlingEffects: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch ItemFlingEffect list from PokéAPI
    const listResponse = await dataSources.item.getItemFlingEffectList(limit ?? 0, offset);

    // Fetch full ItemFlingEffect data for each result
    const effectPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/item-fling-effect/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.item.getItemFlingEffectById(id);
    });

    const effects = await Promise.all(effectPromises);

    // Filter out any null results and create edges with cursors
    const edges = effects
      .map((effect, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: effect,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  itemPocketById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "ItemPocket") {
      throw new GraphQLError("Invalid ItemPocket ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid ItemPocket ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.item.getItemPocketById(numericId);
  },

  itemPockets: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch ItemPocket list from PokéAPI
    const listResponse = await dataSources.item.getItemPocketList(limit ?? 0, offset);

    // Fetch full ItemPocket data for each result
    const pocketPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/item-pocket/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.item.getItemPocketById(id);
    });

    const pockets = await Promise.all(pocketPromises);

    // Filter out any null results and create edges with cursors
    const edges = pockets
      .map((pocket, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: pocket,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  locationById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Location") {
      throw new GraphQLError("Invalid Location ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Location ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getLocationById(numericId);
  },

  locations: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Location list from PokéAPI
    const listResponse = await dataSources.location.getLocationList(limit ?? 0, offset);

    // Fetch full Location data for each result
    const locationPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/location/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getLocationById(id);
    });

    const locations = await Promise.all(locationPromises);

    // Filter out any null results and create edges with cursors
    const edges = locations
      .map((location, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: location,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  regionById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Region") {
      throw new GraphQLError("Invalid Region ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Region ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getRegionById(numericId);
  },

  regions: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Region list from PokéAPI
    const listResponse = await dataSources.location.getRegionList(limit ?? 0, offset);

    // Fetch full Region data for each result
    const regionPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/region/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getRegionById(id);
    });

    const regions = await Promise.all(regionPromises);

    // Filter out any null results and create edges with cursors
    const edges = regions
      .map((region, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: region,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  locationAreaById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "LocationArea") {
      throw new GraphQLError("Invalid LocationArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid LocationArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getLocationAreaById(numericId);
  },

  locationAreas: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch LocationArea list from PokéAPI
    const listResponse = await dataSources.location.getLocationAreaList(limit ?? 0, offset);

    // Fetch full LocationArea data for each result
    const areaPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/location-area/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getLocationAreaById(id);
    });

    const areas = await Promise.all(areaPromises);

    // Filter out any null results and create edges with cursors
    const edges = areas
      .map((area, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: area,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  palParkAreaById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "PalParkArea") {
      throw new GraphQLError("Invalid PalParkArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid PalParkArea ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.location.getPalParkAreaById(numericId);
  },

  palParkAreas: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch PalParkArea list from PokéAPI
    const listResponse = await dataSources.location.getPalParkAreaList(limit ?? 0, offset);

    // Fetch full PalParkArea data for each result
    const areaPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pal-park-area/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.location.getPalParkAreaById(id);
    });

    const areas = await Promise.all(areaPromises);

    // Filter out any null results and create edges with cursors
    const edges = areas
      .map((area, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: area,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  evolutionChainById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "EvolutionChain") {
      throw new GraphQLError("Invalid EvolutionChain ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid EvolutionChain ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.evolution.getEvolutionChainById(numericId);
  },

  evolutionChains: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch EvolutionChain list from PokéAPI
    const listResponse = await dataSources.evolution.getEvolutionChainList(limit ?? 0, offset);

    // Fetch full EvolutionChain data for each result
    const chainPromises = listResponse.results.map((result: { url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/evolution-chain/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.evolution.getEvolutionChainById(id);
    });

    const chains = await Promise.all(chainPromises);

    // Filter out any null results and create edges with cursors
    const edges = chains
      .map((chain, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: chain,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  evolutionTriggerById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "EvolutionTrigger") {
      throw new GraphQLError("Invalid EvolutionTrigger ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid EvolutionTrigger ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.evolution.getEvolutionTriggerById(numericId);
  },

  evolutionTriggers: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch EvolutionTrigger list from PokéAPI
    const listResponse = await dataSources.evolution.getEvolutionTriggerList(limit ?? 0, offset);

    // Fetch full EvolutionTrigger data for each result
    const triggerPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/evolution-trigger/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.evolution.getEvolutionTriggerById(id);
    });

    const triggers = await Promise.all(triggerPromises);

    // Filter out any null results and create edges with cursors
    const edges = triggers
      .map((trigger, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: trigger,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  berryById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Berry") {
      throw new GraphQLError("Invalid Berry ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Berry ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.berry.getBerryById(numericId);
  },

  berries: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Berry list from PokéAPI
    const listResponse = await dataSources.berry.getBerryList(limit ?? 0, offset);

    // Fetch full Berry data for each result
    const berryPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/berry/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.berry.getBerryById(id);
    });

    const berries = await Promise.all(berryPromises);

    // Filter out any null results and create edges with cursors
    const edges = berries
      .map((berry, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: berry,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  berryFlavorById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "BerryFlavor") {
      throw new GraphQLError("Invalid BerryFlavor ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid BerryFlavor ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.berry.getBerryFlavorById(numericId);
  },

  berryFlavors: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch BerryFlavor list from PokéAPI
    const listResponse = await dataSources.berry.getBerryFlavorList(limit ?? 0, offset);

    // Fetch full BerryFlavor data for each result
    const flavorPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/berry-flavor/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.berry.getBerryFlavorById(id);
    });

    const flavors = await Promise.all(flavorPromises);

    // Filter out any null results and create edges with cursors
    const edges = flavors
      .map((flavor, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: flavor,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  berryFirmnessById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "BerryFirmness") {
      throw new GraphQLError("Invalid BerryFirmness ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid BerryFirmness ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.berry.getBerryFirmnessById(numericId);
  },

  berryFirmnesses: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch BerryFirmness list from PokéAPI
    const listResponse = await dataSources.berry.getBerryFirmnessList(limit ?? 0, offset);

    // Fetch full BerryFirmness data for each result
    const firmnessPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/berry-firmness/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.berry.getBerryFirmnessById(id);
    });

    const firmnesses = await Promise.all(firmnessPromises);

    // Filter out any null results and create edges with cursors
    const edges = firmnesses
      .map((firmness, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: firmness,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  generationById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Generation") {
      throw new GraphQLError("Invalid Generation ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Generation ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getGenerationById(numericId);
  },

  generations: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Generation list from PokéAPI
    const listResponse = await dataSources.game.getGenerationList(limit ?? 0, offset);

    // Fetch full Generation data for each result
    const generationPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/generation/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.game.getGenerationById(id);
    });

    const generations = await Promise.all(generationPromises);

    // Filter out any null results and create edges with cursors
    const edges = generations
      .map((generation, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: generation,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  versionById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Version") {
      throw new GraphQLError("Invalid Version ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Version ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getVersionById(numericId);
  },

  versions: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Version list from PokéAPI
    const listResponse = await dataSources.game.getVersionList(limit ?? 0, offset);

    // Fetch full Version data for each result
    const versionPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/version/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.game.getVersionById(id);
    });

    const versions = await Promise.all(versionPromises);

    // Filter out any null results and create edges with cursors
    const edges = versions
      .map((version, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: version,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  versionGroupById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "VersionGroup") {
      throw new GraphQLError("Invalid VersionGroup ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid VersionGroup ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getVersionGroupById(numericId);
  },

  versionGroups: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch VersionGroup list from PokéAPI
    const listResponse = await dataSources.game.getVersionGroupList(limit ?? 0, offset);

    // Fetch full VersionGroup data for each result
    const versionGroupPromises = listResponse.results.map(
      (result: { name: string; url: string }) => {
        // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/version-group/1/" -> 1)
        const urlParts = result.url.split("/");
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return dataSources.game.getVersionGroupById(id);
      }
    );

    const versionGroups = await Promise.all(versionGroupPromises);

    // Filter out any null results and create edges with cursors
    const edges = versionGroups
      .map((versionGroup, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: versionGroup,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  pokedexById: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded || decoded.typename !== "Pokedex") {
      throw new GraphQLError("Invalid Pokedex ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    const numericId = parseInt(decoded.id, 10);
    if (isNaN(numericId)) {
      throw new GraphQLError("Invalid Pokedex ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    return dataSources.game.getPokedexById(numericId);
  },

  pokedexes: async (_, args, { dataSources }) => {
    const { first, after } = args;

    // Validate pagination arguments
    const { limit, offset } = validatePaginationArgs(first, after);

    // Fetch Pokedex list from PokéAPI
    const listResponse = await dataSources.game.getPokedexList(limit ?? 0, offset);

    // Fetch full Pokedex data for each result
    const pokedexPromises = listResponse.results.map((result: { name: string; url: string }) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokedex/1/" -> 1)
      const urlParts = result.url.split("/");
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      return dataSources.game.getPokedexById(id);
    });

    const pokedexes = await Promise.all(pokedexPromises);

    // Filter out any null results and create edges with cursors
    const edges = pokedexes
      .map((pokedex, index: number) => ({
        cursor: encodeCursor(offset + index),
        node: pokedex,
      }))
      .filter(
        (edge): edge is { cursor: string; node: NonNullable<typeof edge.node> } =>
          edge.node !== null
      );

    // Calculate pagination info
    const hasNextPage = offset + (limit ?? 0) < listResponse.count;
    const hasPreviousPage = offset > 0;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
      totalCount: listResponse.count,
    };
  },

  node: async (_, { id }, { dataSources }) => {
    const decoded = decodeGlobalId(id);

    if (!decoded) {
      throw new GraphQLError("Invalid global ID format", {
        extensions: { code: "INVALID_GLOBAL_ID" },
      });
    }

    switch (decoded.typename) {
      case "Pokemon": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Pokemon ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getPokemonById(numericId);
      }
      case "PokemonSpecies": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonSpecies ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getSpeciesById(numericId);
      }
      case "PokemonForm": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PokemonForm ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.pokemon.getFormById(numericId);
      }
      case "Ability": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Ability ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.ability.getAbilityById(numericId);
      }
      case "Stat": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Stat ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.stat.getStatById(numericId);
      }
      case "Characteristic": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Characteristic ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.stat.getCharacteristicById(numericId);
      }
      case "Nature": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Nature ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.stat.getNatureById(numericId);
      }
      case "Type": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Type ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.type.getTypeById(numericId);
      }
      case "Move": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Move ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.move.getMoveById(numericId);
      }
      case "Item": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Item ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemById(numericId);
      }
      case "ItemCategory": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemCategory ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemCategoryById(numericId);
      }
      case "ItemAttribute": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemAttribute ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemAttributeById(numericId);
      }
      case "ItemFlingEffect": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemFlingEffect ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemFlingEffectById(numericId);
      }
      case "ItemPocket": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid ItemPocket ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.item.getItemPocketById(numericId);
      }
      case "Location": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Location ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getLocationById(numericId);
      }
      case "Region": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Region ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getRegionById(numericId);
      }
      case "LocationArea": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid LocationArea ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getLocationAreaById(numericId);
      }
      case "PalParkArea": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid PalParkArea ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.location.getPalParkAreaById(numericId);
      }
      case "EvolutionChain": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EvolutionChain ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.evolution.getEvolutionChainById(numericId);
      }
      case "EvolutionTrigger": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid EvolutionTrigger ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.evolution.getEvolutionTriggerById(numericId);
      }
      case "Berry": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Berry ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.berry.getBerryById(numericId);
      }
      case "BerryFlavor": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid BerryFlavor ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.berry.getBerryFlavorById(numericId);
      }
      case "BerryFirmness": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid BerryFirmness ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.berry.getBerryFirmnessById(numericId);
      }
      case "Generation": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Generation ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getGenerationById(numericId);
      }
      case "Version": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Version ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getVersionById(numericId);
      }
      case "VersionGroup": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid VersionGroup ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getVersionGroupById(numericId);
      }
      case "Pokedex": {
        const numericId = parseInt(decoded.id, 10);
        if (isNaN(numericId)) {
          throw new GraphQLError("Invalid Pokedex ID format", {
            extensions: { code: "INVALID_GLOBAL_ID" },
          });
        }
        return dataSources.game.getPokedexById(numericId);
      }
      default:
        // Unknown typename - return null per Relay spec (node not found)
        return null;
    }
  },
};
