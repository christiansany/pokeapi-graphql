import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type {
  EncounterMethodDTO,
  EncounterConditionDTO,
  EncounterConditionValueDTO,
} from "./encounter.dto.js";
import type { NamedAPIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Encounter domain.
 * Handles fetching EncounterMethod, EncounterCondition, and EncounterConditionValue data from PokeAPI with caching and batching.
 */
export class EncounterDataSource extends BasePokeAPIDataSource {
  // EncounterMethod loaders
  public encounterMethodByIdLoader: DataLoader<number, EncounterMethodDTO | null>;
  public encounterMethodByNameLoader: DataLoader<string, EncounterMethodDTO | null>;

  // EncounterCondition loaders
  public encounterConditionByIdLoader: DataLoader<number, EncounterConditionDTO | null>;
  public encounterConditionByNameLoader: DataLoader<string, EncounterConditionDTO | null>;

  // EncounterConditionValue loaders
  public encounterConditionValueByIdLoader: DataLoader<number, EncounterConditionValueDTO | null>;
  public encounterConditionValueByNameLoader: DataLoader<string, EncounterConditionValueDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize EncounterMethod loaders
    this.encounterMethodByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchEncounterMethodById(id)));
    });

    this.encounterMethodByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchEncounterMethodByName(name)));
    });

    // Initialize EncounterCondition loaders
    this.encounterConditionByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchEncounterConditionById(id)));
    });

    this.encounterConditionByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchEncounterConditionByName(name)));
    });

    // Initialize EncounterConditionValue loaders
    this.encounterConditionValueByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchEncounterConditionValueById(id)));
    });

    this.encounterConditionValueByNameLoader = this.createLoader(
      async (names: readonly string[]) => {
        return Promise.all(names.map((name) => this.fetchEncounterConditionValueByName(name)));
      }
    );
  }

  // ===== EncounterMethod Methods =====

  /**
   * Get an EncounterMethod by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEncounterMethodById(id: number): Promise<EncounterMethodDTO | null> {
    return this.encounterMethodByIdLoader.load(id);
  }

  /**
   * Get an EncounterMethod by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEncounterMethodByName(name: string): Promise<EncounterMethodDTO | null> {
    return this.encounterMethodByNameLoader.load(name);
  }

  /**
   * Get a paginated list of EncounterMethods.
   */
  async getEncounterMethodList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:encounter-method:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/encounter-method?offset=${offset}`
        : `${this.baseURL}/encounter-method?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch EncounterMethod by ID with caching.
   */
  private async fetchEncounterMethodById(id: number): Promise<EncounterMethodDTO | null> {
    const cacheKey = `encounter-method:id:${id}`;
    const cached = this.cache.get<EncounterMethodDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/encounter-method/${id}`;
    const encounterMethod = await this.fetch<EncounterMethodDTO>(url);
    if (encounterMethod) {
      this.cache.set(cacheKey, encounterMethod);
      this.cache.set(`encounter-method:${encounterMethod.name}`, encounterMethod);
    }
    return encounterMethod;
  }

  /**
   * Private method to fetch EncounterMethod by name with caching.
   */
  private async fetchEncounterMethodByName(name: string): Promise<EncounterMethodDTO | null> {
    const cacheKey = `encounter-method:${name}`;
    const cached = this.cache.get<EncounterMethodDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/encounter-method/${name}`;
    const encounterMethod = await this.fetch<EncounterMethodDTO>(url);
    if (encounterMethod) {
      this.cache.set(cacheKey, encounterMethod);
      this.cache.set(`encounter-method:id:${encounterMethod.id}`, encounterMethod);
    }
    return encounterMethod;
  }

  // ===== EncounterCondition Methods =====

  /**
   * Get an EncounterCondition by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEncounterConditionById(id: number): Promise<EncounterConditionDTO | null> {
    return this.encounterConditionByIdLoader.load(id);
  }

  /**
   * Get an EncounterCondition by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEncounterConditionByName(name: string): Promise<EncounterConditionDTO | null> {
    return this.encounterConditionByNameLoader.load(name);
  }

  /**
   * Get a paginated list of EncounterConditions.
   */
  async getEncounterConditionList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:encounter-condition:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/encounter-condition?offset=${offset}`
        : `${this.baseURL}/encounter-condition?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch EncounterCondition by ID with caching.
   */
  private async fetchEncounterConditionById(id: number): Promise<EncounterConditionDTO | null> {
    const cacheKey = `encounter-condition:id:${id}`;
    const cached = this.cache.get<EncounterConditionDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/encounter-condition/${id}`;
    const encounterCondition = await this.fetch<EncounterConditionDTO>(url);
    if (encounterCondition) {
      this.cache.set(cacheKey, encounterCondition);
      this.cache.set(`encounter-condition:${encounterCondition.name}`, encounterCondition);
    }
    return encounterCondition;
  }

  /**
   * Private method to fetch EncounterCondition by name with caching.
   */
  private async fetchEncounterConditionByName(name: string): Promise<EncounterConditionDTO | null> {
    const cacheKey = `encounter-condition:${name}`;
    const cached = this.cache.get<EncounterConditionDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/encounter-condition/${name}`;
    const encounterCondition = await this.fetch<EncounterConditionDTO>(url);
    if (encounterCondition) {
      this.cache.set(cacheKey, encounterCondition);
      this.cache.set(`encounter-condition:id:${encounterCondition.id}`, encounterCondition);
    }
    return encounterCondition;
  }

  // ===== EncounterConditionValue Methods =====

  /**
   * Get an EncounterConditionValue by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEncounterConditionValueById(id: number): Promise<EncounterConditionValueDTO | null> {
    return this.encounterConditionValueByIdLoader.load(id);
  }

  /**
   * Get an EncounterConditionValue by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getEncounterConditionValueByName(name: string): Promise<EncounterConditionValueDTO | null> {
    return this.encounterConditionValueByNameLoader.load(name);
  }

  /**
   * Get a paginated list of EncounterConditionValues.
   */
  async getEncounterConditionValueList(
    limit: number,
    offset: number
  ): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:encounter-condition-value:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/encounter-condition-value?offset=${offset}`
        : `${this.baseURL}/encounter-condition-value?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch EncounterConditionValue by ID with caching.
   */
  private async fetchEncounterConditionValueById(
    id: number
  ): Promise<EncounterConditionValueDTO | null> {
    const cacheKey = `encounter-condition-value:id:${id}`;
    const cached = this.cache.get<EncounterConditionValueDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/encounter-condition-value/${id}`;
    const encounterConditionValue = await this.fetch<EncounterConditionValueDTO>(url);
    if (encounterConditionValue) {
      this.cache.set(cacheKey, encounterConditionValue);
      this.cache.set(
        `encounter-condition-value:${encounterConditionValue.name}`,
        encounterConditionValue
      );
    }
    return encounterConditionValue;
  }

  /**
   * Private method to fetch EncounterConditionValue by name with caching.
   */
  private async fetchEncounterConditionValueByName(
    name: string
  ): Promise<EncounterConditionValueDTO | null> {
    const cacheKey = `encounter-condition-value:${name}`;
    const cached = this.cache.get<EncounterConditionValueDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/encounter-condition-value/${name}`;
    const encounterConditionValue = await this.fetch<EncounterConditionValueDTO>(url);
    if (encounterConditionValue) {
      this.cache.set(cacheKey, encounterConditionValue);
      this.cache.set(
        `encounter-condition-value:id:${encounterConditionValue.id}`,
        encounterConditionValue
      );
    }
    return encounterConditionValue;
  }
}
