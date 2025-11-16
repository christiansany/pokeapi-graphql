import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type {
  ItemDTO,
  ItemCategoryDTO,
  ItemAttributeDTO,
  ItemFlingEffectDTO,
  ItemPocketDTO,
} from "./item.dto.js";
import type { NamedAPIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Item domain.
 * Handles fetching Item, ItemCategory, ItemAttribute, ItemFlingEffect, and ItemPocket data from PokeAPI with caching and batching.
 */
export class ItemDataSource extends BasePokeAPIDataSource {
  // Item loaders
  public itemByIdLoader: DataLoader<number, ItemDTO | null>;
  public itemByNameLoader: DataLoader<string, ItemDTO | null>;

  // ItemCategory loaders
  public itemCategoryByIdLoader: DataLoader<number, ItemCategoryDTO | null>;
  public itemCategoryByNameLoader: DataLoader<string, ItemCategoryDTO | null>;

  // ItemAttribute loaders
  public itemAttributeByIdLoader: DataLoader<number, ItemAttributeDTO | null>;
  public itemAttributeByNameLoader: DataLoader<string, ItemAttributeDTO | null>;

  // ItemFlingEffect loaders
  public itemFlingEffectByIdLoader: DataLoader<number, ItemFlingEffectDTO | null>;
  public itemFlingEffectByNameLoader: DataLoader<string, ItemFlingEffectDTO | null>;

  // ItemPocket loaders
  public itemPocketByIdLoader: DataLoader<number, ItemPocketDTO | null>;
  public itemPocketByNameLoader: DataLoader<string, ItemPocketDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize Item loaders
    this.itemByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchItemById(id)));
    });

    this.itemByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchItemByName(name)));
    });

    // Initialize ItemCategory loaders
    this.itemCategoryByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchItemCategoryById(id)));
    });

    this.itemCategoryByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchItemCategoryByName(name)));
    });

    // Initialize ItemAttribute loaders
    this.itemAttributeByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchItemAttributeById(id)));
    });

    this.itemAttributeByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchItemAttributeByName(name)));
    });

    // Initialize ItemFlingEffect loaders
    this.itemFlingEffectByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchItemFlingEffectById(id)));
    });

    this.itemFlingEffectByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchItemFlingEffectByName(name)));
    });

    // Initialize ItemPocket loaders
    this.itemPocketByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchItemPocketById(id)));
    });

    this.itemPocketByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchItemPocketByName(name)));
    });
  }

  // ===== Item Methods =====

  /**
   * Get an Item by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemById(id: number): Promise<ItemDTO | null> {
    return this.itemByIdLoader.load(id);
  }

  /**
   * Get an Item by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemByName(name: string): Promise<ItemDTO | null> {
    return this.itemByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Items.
   */
  async getItemList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:item:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/item?offset=${offset}`
        : `${this.baseURL}/item?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch Item by ID with caching.
   */
  private async fetchItemById(id: number): Promise<ItemDTO | null> {
    const cacheKey = `item:id:${id}`;
    const cached = this.cache.get<ItemDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item/${id}`;
    const item = await this.fetch<ItemDTO>(url);
    if (item) {
      this.cache.set(cacheKey, item);
      this.cache.set(`item:${item.name}`, item);
    }
    return item;
  }

  /**
   * Private method to fetch Item by name with caching.
   */
  private async fetchItemByName(name: string): Promise<ItemDTO | null> {
    const cacheKey = `item:${name}`;
    const cached = this.cache.get<ItemDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item/${name}`;
    const item = await this.fetch<ItemDTO>(url);
    if (item) {
      this.cache.set(cacheKey, item);
      this.cache.set(`item:id:${item.id}`, item);
    }
    return item;
  }

  // ===== ItemCategory Methods =====

  /**
   * Get an ItemCategory by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemCategoryById(id: number): Promise<ItemCategoryDTO | null> {
    return this.itemCategoryByIdLoader.load(id);
  }

  /**
   * Get an ItemCategory by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemCategoryByName(name: string): Promise<ItemCategoryDTO | null> {
    return this.itemCategoryByNameLoader.load(name);
  }

  /**
   * Get a paginated list of ItemCategories.
   */
  async getItemCategoryList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:item-category:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/item-category?offset=${offset}`
        : `${this.baseURL}/item-category?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch ItemCategory by ID with caching.
   */
  private async fetchItemCategoryById(id: number): Promise<ItemCategoryDTO | null> {
    const cacheKey = `item-category:id:${id}`;
    const cached = this.cache.get<ItemCategoryDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-category/${id}`;
    const category = await this.fetch<ItemCategoryDTO>(url);
    if (category) {
      this.cache.set(cacheKey, category);
      this.cache.set(`item-category:${category.name}`, category);
    }
    return category;
  }

  /**
   * Private method to fetch ItemCategory by name with caching.
   */
  private async fetchItemCategoryByName(name: string): Promise<ItemCategoryDTO | null> {
    const cacheKey = `item-category:${name}`;
    const cached = this.cache.get<ItemCategoryDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-category/${name}`;
    const category = await this.fetch<ItemCategoryDTO>(url);
    if (category) {
      this.cache.set(cacheKey, category);
      this.cache.set(`item-category:id:${category.id}`, category);
    }
    return category;
  }

  // ===== ItemAttribute Methods =====

  /**
   * Get an ItemAttribute by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemAttributeById(id: number): Promise<ItemAttributeDTO | null> {
    return this.itemAttributeByIdLoader.load(id);
  }

  /**
   * Get an ItemAttribute by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemAttributeByName(name: string): Promise<ItemAttributeDTO | null> {
    return this.itemAttributeByNameLoader.load(name);
  }

  /**
   * Get a paginated list of ItemAttributes.
   */
  async getItemAttributeList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:item-attribute:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/item-attribute?offset=${offset}`
        : `${this.baseURL}/item-attribute?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch ItemAttribute by ID with caching.
   */
  private async fetchItemAttributeById(id: number): Promise<ItemAttributeDTO | null> {
    const cacheKey = `item-attribute:id:${id}`;
    const cached = this.cache.get<ItemAttributeDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-attribute/${id}`;
    const attribute = await this.fetch<ItemAttributeDTO>(url);
    if (attribute) {
      this.cache.set(cacheKey, attribute);
      this.cache.set(`item-attribute:${attribute.name}`, attribute);
    }
    return attribute;
  }

  /**
   * Private method to fetch ItemAttribute by name with caching.
   */
  private async fetchItemAttributeByName(name: string): Promise<ItemAttributeDTO | null> {
    const cacheKey = `item-attribute:${name}`;
    const cached = this.cache.get<ItemAttributeDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-attribute/${name}`;
    const attribute = await this.fetch<ItemAttributeDTO>(url);
    if (attribute) {
      this.cache.set(cacheKey, attribute);
      this.cache.set(`item-attribute:id:${attribute.id}`, attribute);
    }
    return attribute;
  }

  // ===== ItemFlingEffect Methods =====

  /**
   * Get an ItemFlingEffect by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemFlingEffectById(id: number): Promise<ItemFlingEffectDTO | null> {
    return this.itemFlingEffectByIdLoader.load(id);
  }

  /**
   * Get an ItemFlingEffect by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemFlingEffectByName(name: string): Promise<ItemFlingEffectDTO | null> {
    return this.itemFlingEffectByNameLoader.load(name);
  }

  /**
   * Get a paginated list of ItemFlingEffects.
   */
  async getItemFlingEffectList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:item-fling-effect:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/item-fling-effect?offset=${offset}`
        : `${this.baseURL}/item-fling-effect?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch ItemFlingEffect by ID with caching.
   */
  private async fetchItemFlingEffectById(id: number): Promise<ItemFlingEffectDTO | null> {
    const cacheKey = `item-fling-effect:id:${id}`;
    const cached = this.cache.get<ItemFlingEffectDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-fling-effect/${id}`;
    const effect = await this.fetch<ItemFlingEffectDTO>(url);
    if (effect) {
      this.cache.set(cacheKey, effect);
      this.cache.set(`item-fling-effect:${effect.name}`, effect);
    }
    return effect;
  }

  /**
   * Private method to fetch ItemFlingEffect by name with caching.
   */
  private async fetchItemFlingEffectByName(name: string): Promise<ItemFlingEffectDTO | null> {
    const cacheKey = `item-fling-effect:${name}`;
    const cached = this.cache.get<ItemFlingEffectDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-fling-effect/${name}`;
    const effect = await this.fetch<ItemFlingEffectDTO>(url);
    if (effect) {
      this.cache.set(cacheKey, effect);
      this.cache.set(`item-fling-effect:id:${effect.id}`, effect);
    }
    return effect;
  }

  // ===== ItemPocket Methods =====

  /**
   * Get an ItemPocket by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemPocketById(id: number): Promise<ItemPocketDTO | null> {
    return this.itemPocketByIdLoader.load(id);
  }

  /**
   * Get an ItemPocket by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getItemPocketByName(name: string): Promise<ItemPocketDTO | null> {
    return this.itemPocketByNameLoader.load(name);
  }

  /**
   * Get a paginated list of ItemPockets.
   */
  async getItemPocketList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:item-pocket:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/item-pocket?offset=${offset}`
        : `${this.baseURL}/item-pocket?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch ItemPocket by ID with caching.
   */
  private async fetchItemPocketById(id: number): Promise<ItemPocketDTO | null> {
    const cacheKey = `item-pocket:id:${id}`;
    const cached = this.cache.get<ItemPocketDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-pocket/${id}`;
    const pocket = await this.fetch<ItemPocketDTO>(url);
    if (pocket) {
      this.cache.set(cacheKey, pocket);
      this.cache.set(`item-pocket:${pocket.name}`, pocket);
    }
    return pocket;
  }

  /**
   * Private method to fetch ItemPocket by name with caching.
   */
  private async fetchItemPocketByName(name: string): Promise<ItemPocketDTO | null> {
    const cacheKey = `item-pocket:${name}`;
    const cached = this.cache.get<ItemPocketDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/item-pocket/${name}`;
    const pocket = await this.fetch<ItemPocketDTO>(url);
    if (pocket) {
      this.cache.set(cacheKey, pocket);
      this.cache.set(`item-pocket:id:${pocket.id}`, pocket);
    }
    return pocket;
  }
}
