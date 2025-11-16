import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { LocationDTO, LocationAreaDTO, RegionDTO, PalParkAreaDTO } from "./location.dto.js";
import type { NamedAPIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Location domain.
 * Handles fetching Location, LocationArea, Region, and PalParkArea data from PokeAPI with caching and batching.
 */
export class LocationDataSource extends BasePokeAPIDataSource {
  // Location loaders
  public locationByIdLoader: DataLoader<number, LocationDTO | null>;
  public locationByNameLoader: DataLoader<string, LocationDTO | null>;

  // LocationArea loaders
  public locationAreaByIdLoader: DataLoader<number, LocationAreaDTO | null>;
  public locationAreaByNameLoader: DataLoader<string, LocationAreaDTO | null>;

  // Region loaders
  public regionByIdLoader: DataLoader<number, RegionDTO | null>;
  public regionByNameLoader: DataLoader<string, RegionDTO | null>;

  // PalParkArea loaders
  public palParkAreaByIdLoader: DataLoader<number, PalParkAreaDTO | null>;
  public palParkAreaByNameLoader: DataLoader<string, PalParkAreaDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize Location loaders
    this.locationByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchLocationById(id)));
    });

    this.locationByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchLocationByName(name)));
    });

    // Initialize LocationArea loaders
    this.locationAreaByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchLocationAreaById(id)));
    });

    this.locationAreaByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchLocationAreaByName(name)));
    });

    // Initialize Region loaders
    this.regionByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchRegionById(id)));
    });

    this.regionByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchRegionByName(name)));
    });

    // Initialize PalParkArea loaders
    this.palParkAreaByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchPalParkAreaById(id)));
    });

    this.palParkAreaByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchPalParkAreaByName(name)));
    });
  }

  // ===== Location Methods =====

  /**
   * Get a Location by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getLocationById(id: number): Promise<LocationDTO | null> {
    return this.locationByIdLoader.load(id);
  }

  /**
   * Get a Location by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getLocationByName(name: string): Promise<LocationDTO | null> {
    return this.locationByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Locations.
   */
  async getLocationList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:location:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/location?offset=${offset}`
        : `${this.baseURL}/location?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch Location by ID with caching.
   */
  private async fetchLocationById(id: number): Promise<LocationDTO | null> {
    const cacheKey = `location:id:${id}`;
    const cached = this.cache.get<LocationDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/location/${id}`;
    const location = await this.fetch<LocationDTO>(url);
    if (location) {
      this.cache.set(cacheKey, location);
      this.cache.set(`location:${location.name}`, location);
    }
    return location;
  }

  /**
   * Private method to fetch Location by name with caching.
   */
  private async fetchLocationByName(name: string): Promise<LocationDTO | null> {
    const cacheKey = `location:${name}`;
    const cached = this.cache.get<LocationDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/location/${name}`;
    const location = await this.fetch<LocationDTO>(url);
    if (location) {
      this.cache.set(cacheKey, location);
      this.cache.set(`location:id:${location.id}`, location);
    }
    return location;
  }

  // ===== LocationArea Methods =====

  /**
   * Get a LocationArea by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getLocationAreaById(id: number): Promise<LocationAreaDTO | null> {
    return this.locationAreaByIdLoader.load(id);
  }

  /**
   * Get a LocationArea by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getLocationAreaByName(name: string): Promise<LocationAreaDTO | null> {
    return this.locationAreaByNameLoader.load(name);
  }

  /**
   * Get a paginated list of LocationAreas.
   */
  async getLocationAreaList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:location-area:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/location-area?offset=${offset}`
        : `${this.baseURL}/location-area?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch LocationArea by ID with caching.
   */
  private async fetchLocationAreaById(id: number): Promise<LocationAreaDTO | null> {
    const cacheKey = `location-area:id:${id}`;
    const cached = this.cache.get<LocationAreaDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/location-area/${id}`;
    const area = await this.fetch<LocationAreaDTO>(url);
    if (area) {
      this.cache.set(cacheKey, area);
      this.cache.set(`location-area:${area.name}`, area);
    }
    return area;
  }

  /**
   * Private method to fetch LocationArea by name with caching.
   */
  private async fetchLocationAreaByName(name: string): Promise<LocationAreaDTO | null> {
    const cacheKey = `location-area:${name}`;
    const cached = this.cache.get<LocationAreaDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/location-area/${name}`;
    const area = await this.fetch<LocationAreaDTO>(url);
    if (area) {
      this.cache.set(cacheKey, area);
      this.cache.set(`location-area:id:${area.id}`, area);
    }
    return area;
  }

  // ===== Region Methods =====

  /**
   * Get a Region by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getRegionById(id: number): Promise<RegionDTO | null> {
    return this.regionByIdLoader.load(id);
  }

  /**
   * Get a Region by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getRegionByName(name: string): Promise<RegionDTO | null> {
    return this.regionByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Regions.
   */
  async getRegionList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:region:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/region?offset=${offset}`
        : `${this.baseURL}/region?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch Region by ID with caching.
   */
  private async fetchRegionById(id: number): Promise<RegionDTO | null> {
    const cacheKey = `region:id:${id}`;
    const cached = this.cache.get<RegionDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/region/${id}`;
    const region = await this.fetch<RegionDTO>(url);
    if (region) {
      this.cache.set(cacheKey, region);
      this.cache.set(`region:${region.name}`, region);
    }
    return region;
  }

  /**
   * Private method to fetch Region by name with caching.
   */
  private async fetchRegionByName(name: string): Promise<RegionDTO | null> {
    const cacheKey = `region:${name}`;
    const cached = this.cache.get<RegionDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/region/${name}`;
    const region = await this.fetch<RegionDTO>(url);
    if (region) {
      this.cache.set(cacheKey, region);
      this.cache.set(`region:id:${region.id}`, region);
    }
    return region;
  }

  // ===== PalParkArea Methods =====

  /**
   * Get a PalParkArea by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPalParkAreaById(id: number): Promise<PalParkAreaDTO | null> {
    return this.palParkAreaByIdLoader.load(id);
  }

  /**
   * Get a PalParkArea by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getPalParkAreaByName(name: string): Promise<PalParkAreaDTO | null> {
    return this.palParkAreaByNameLoader.load(name);
  }

  /**
   * Get a paginated list of PalParkAreas.
   */
  async getPalParkAreaList(limit: number, offset: number): Promise<NamedAPIResourceListDTO> {
    const cacheKey = `list:pal-park-area:${limit}:${offset}`;
    const cached = this.cache.get<NamedAPIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const url =
      limit === 0
        ? `${this.baseURL}/pal-park-area?offset=${offset}`
        : `${this.baseURL}/pal-park-area?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<NamedAPIResourceListDTO>(url);
    if (list) {
      this.cache.set(cacheKey, list);
    }
    return list || { count: 0, next: null, previous: null, results: [] };
  }

  /**
   * Private method to fetch PalParkArea by ID with caching.
   */
  private async fetchPalParkAreaById(id: number): Promise<PalParkAreaDTO | null> {
    const cacheKey = `pal-park-area:id:${id}`;
    const cached = this.cache.get<PalParkAreaDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/pal-park-area/${id}`;
    const area = await this.fetch<PalParkAreaDTO>(url);
    if (area) {
      this.cache.set(cacheKey, area);
      this.cache.set(`pal-park-area:${area.name}`, area);
    }
    return area;
  }

  /**
   * Private method to fetch PalParkArea by name with caching.
   */
  private async fetchPalParkAreaByName(name: string): Promise<PalParkAreaDTO | null> {
    const cacheKey = `pal-park-area:${name}`;
    const cached = this.cache.get<PalParkAreaDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/pal-park-area/${name}`;
    const area = await this.fetch<PalParkAreaDTO>(url);
    if (area) {
      this.cache.set(cacheKey, area);
      this.cache.set(`pal-park-area:id:${area.id}`, area);
    }
    return area;
  }
}
