import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { BerryDTO, BerryFlavorDTO, BerryFirmnessDTO } from "./berry.dto.js";
import type { NamedAPIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Berry domain.
 * Handles fetching Berry, BerryFlavor, and BerryFirmness data from PokeAPI with caching and batching.
 */
export class BerryDataSource extends BasePokeAPIDataSource {
  // Berry loaders
  public berryByIdLoader: DataLoader<number, BerryDTO | null>;
  public berryByNameLoader: DataLoader<string, BerryDTO | null>;

  // BerryFlavor loaders
  public berryFlavorByIdLoader: DataLoader<number, BerryFlavorDTO | null>;
  public berryFlavorByNameLoader: DataLoader<string, BerryFlavorDTO | null>;

  // BerryFirmness loaders
  public berryFirmnessByIdLoader: DataLoader<number, BerryFirmnessDTO | null>;
  public berryFirmnessByNameLoader: DataLoader<string, BerryFirmnessDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize Berry loaders
    this.berryByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchBerryById(id)));
    });

    this.berryByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchBerryByName(name)));
    });

    // Initialize BerryFlavor loaders
    this.berryFlavorByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchBerryFlavorById(id)));
    });

    this.berryFlavorByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchBerryFlavorByName(name)));
    });

    // Initialize BerryFirmness loaders
    this.berryFirmnessByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchBerryFirmnessById(id)));
    });

    this.berryFirmnessByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchBerryFirmnessByName(name)));
    });
  }

  // ===== Berry Methods =====

  /**
   * Get a Berry by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getBerryById(id: number): Promise<BerryDTO | null> {
    return this.berryByIdLoader.load(id);
  }

  /**
   * Get a Berry by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getBerryByName(name: string): Promise<BerryDTO | null> {
    return this.berryByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Berries.
   */
  async getBerryList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:berry:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/berry?offset=${offset}`
        : `${this.baseURL}/berry?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch Berry by ID with caching.
   */
  private async fetchBerryById(id: number): Promise<BerryDTO | null> {
    const cacheKey = `berry:id:${id}`;
    const cached = this.cache.get<BerryDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/berry/${id}`;
    const berry = await this.fetch<BerryDTO>(url);
    if (berry) {
      this.cache.set(cacheKey, berry);
      this.cache.set(`berry:${berry.name}`, berry);
    }
    return berry;
  }

  /**
   * Private method to fetch Berry by name with caching.
   */
  private async fetchBerryByName(name: string): Promise<BerryDTO | null> {
    const cacheKey = `berry:${name}`;
    const cached = this.cache.get<BerryDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/berry/${name}`;
    const berry = await this.fetch<BerryDTO>(url);
    if (berry) {
      this.cache.set(cacheKey, berry);
      this.cache.set(`berry:id:${berry.id}`, berry);
    }
    return berry;
  }

  // ===== BerryFlavor Methods =====

  /**
   * Get a BerryFlavor by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getBerryFlavorById(id: number): Promise<BerryFlavorDTO | null> {
    return this.berryFlavorByIdLoader.load(id);
  }

  /**
   * Get a BerryFlavor by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getBerryFlavorByName(name: string): Promise<BerryFlavorDTO | null> {
    return this.berryFlavorByNameLoader.load(name);
  }

  /**
   * Get a paginated list of BerryFlavors.
   */
  async getBerryFlavorList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:berry-flavor:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/berry-flavor?offset=${offset}`
        : `${this.baseURL}/berry-flavor?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch BerryFlavor by ID with caching.
   */
  private async fetchBerryFlavorById(id: number): Promise<BerryFlavorDTO | null> {
    const cacheKey = `berry-flavor:id:${id}`;
    const cached = this.cache.get<BerryFlavorDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/berry-flavor/${id}`;
    const flavor = await this.fetch<BerryFlavorDTO>(url);
    if (flavor) {
      this.cache.set(cacheKey, flavor);
      this.cache.set(`berry-flavor:${flavor.name}`, flavor);
    }
    return flavor;
  }

  /**
   * Private method to fetch BerryFlavor by name with caching.
   */
  private async fetchBerryFlavorByName(name: string): Promise<BerryFlavorDTO | null> {
    const cacheKey = `berry-flavor:${name}`;
    const cached = this.cache.get<BerryFlavorDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/berry-flavor/${name}`;
    const flavor = await this.fetch<BerryFlavorDTO>(url);
    if (flavor) {
      this.cache.set(cacheKey, flavor);
      this.cache.set(`berry-flavor:id:${flavor.id}`, flavor);
    }
    return flavor;
  }

  // ===== BerryFirmness Methods =====

  /**
   * Get a BerryFirmness by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getBerryFirmnessById(id: number): Promise<BerryFirmnessDTO | null> {
    return this.berryFirmnessByIdLoader.load(id);
  }

  /**
   * Get a BerryFirmness by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getBerryFirmnessByName(name: string): Promise<BerryFirmnessDTO | null> {
    return this.berryFirmnessByNameLoader.load(name);
  }

  /**
   * Get a paginated list of BerryFirmness values.
   */
  async getBerryFirmnessList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:berry-firmness:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/berry-firmness?offset=${offset}`
        : `${this.baseURL}/berry-firmness?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch BerryFirmness by ID with caching.
   */
  private async fetchBerryFirmnessById(id: number): Promise<BerryFirmnessDTO | null> {
    const cacheKey = `berry-firmness:id:${id}`;
    const cached = this.cache.get<BerryFirmnessDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/berry-firmness/${id}`;
    const firmness = await this.fetch<BerryFirmnessDTO>(url);
    if (firmness) {
      this.cache.set(cacheKey, firmness);
      this.cache.set(`berry-firmness:${firmness.name}`, firmness);
    }
    return firmness;
  }

  /**
   * Private method to fetch BerryFirmness by name with caching.
   */
  private async fetchBerryFirmnessByName(name: string): Promise<BerryFirmnessDTO | null> {
    const cacheKey = `berry-firmness:${name}`;
    const cached = this.cache.get<BerryFirmnessDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/berry-firmness/${name}`;
    const firmness = await this.fetch<BerryFirmnessDTO>(url);
    if (firmness) {
      this.cache.set(cacheKey, firmness);
      this.cache.set(`berry-firmness:id:${firmness.id}`, firmness);
    }
    return firmness;
  }
}
