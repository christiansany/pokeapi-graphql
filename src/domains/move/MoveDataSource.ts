import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type {
  MoveDTO,
  MoveListResponse,
  MoveAilmentDTO,
  MoveDamageClassDTO,
  MoveCategoryDTO,
  MoveTargetDTO,
} from "./move.dto.js";

/**
 * DataSource for Move domain.
 * Handles fetching Move data from PokeAPI with caching and batching.
 */
export class MoveDataSource extends BasePokeAPIDataSource {
  public moveByIdLoader: DataLoader<number, MoveDTO | null>;
  public moveByNameLoader: DataLoader<string, MoveDTO | null>;
  public moveAilmentByIdLoader: DataLoader<number, MoveAilmentDTO | null>;
  public moveAilmentByNameLoader: DataLoader<string, MoveAilmentDTO | null>;
  public moveDamageClassByIdLoader: DataLoader<number, MoveDamageClassDTO | null>;
  public moveDamageClassByNameLoader: DataLoader<string, MoveDamageClassDTO | null>;
  public moveCategoryByIdLoader: DataLoader<number, MoveCategoryDTO | null>;
  public moveCategoryByNameLoader: DataLoader<string, MoveCategoryDTO | null>;
  public moveTargetByIdLoader: DataLoader<number, MoveTargetDTO | null>;
  public moveTargetByNameLoader: DataLoader<string, MoveTargetDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    // Initialize DataLoader for Move by ID
    this.moveByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchMoveById(id)));
    });

    // Initialize DataLoader for Move by name
    this.moveByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchMoveByName(name)));
    });

    // Initialize DataLoader for MoveAilment by ID
    this.moveAilmentByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchMoveAilmentById(id)));
    });

    // Initialize DataLoader for MoveAilment by name
    this.moveAilmentByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchMoveAilmentByName(name)));
    });

    // Initialize DataLoader for MoveDamageClass by ID
    this.moveDamageClassByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchMoveDamageClassById(id)));
    });

    // Initialize DataLoader for MoveDamageClass by name
    this.moveDamageClassByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchMoveDamageClassByName(name)));
    });

    // Initialize DataLoader for MoveCategory by ID
    this.moveCategoryByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchMoveCategoryById(id)));
    });

    // Initialize DataLoader for MoveCategory by name
    this.moveCategoryByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchMoveCategoryByName(name)));
    });

    // Initialize DataLoader for MoveTarget by ID
    this.moveTargetByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchMoveTargetById(id)));
    });

    // Initialize DataLoader for MoveTarget by name
    this.moveTargetByNameLoader = this.createLoader(async (names: readonly string[]) => {
      return Promise.all(names.map((name) => this.fetchMoveTargetByName(name)));
    });
  }

  /**
   * Get a Move by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveById(id: number): Promise<MoveDTO | null> {
    return this.moveByIdLoader.load(id);
  }

  /**
   * Get a Move by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveByName(name: string): Promise<MoveDTO | null> {
    return this.moveByNameLoader.load(name);
  }

  /**
   * Get a paginated list of Moves.
   * Direct fetch with caching (not batched since lists are unique by limit/offset).
   */
  async getMoveList(limit: number, offset: number): Promise<MoveListResponse> {
    const cacheKey = `list:move:${limit}:${offset}`;

    // Check cache first
    const cached = this.cache.get<MoveListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move?limit=${limit}&offset=${offset}`;
    const list = await this.fetch<MoveListResponse>(url);

    if (!list) {
      throw new Error("Failed to fetch Move list from PokeAPI");
    }

    // Store in cache
    this.cache.set(cacheKey, list);

    return list;
  }

  /**
   * Private method to fetch Move by ID with caching.
   */
  private async fetchMoveById(id: number): Promise<MoveDTO | null> {
    const cacheKey = `move:${id}`;

    // Check cache first
    const cached = this.cache.get<MoveDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move/${id}`;
    const move = await this.fetch<MoveDTO>(url);

    // Store in cache if found
    if (move) {
      this.cache.set(cacheKey, move);
    }

    return move;
  }

  /**
   * Private method to fetch Move by name with caching.
   */
  private async fetchMoveByName(name: string): Promise<MoveDTO | null> {
    const cacheKey = `move:name:${name}`;

    // Check cache first
    const cached = this.cache.get<MoveDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move/${name}`;
    const move = await this.fetch<MoveDTO>(url);

    // Store in cache if found
    if (move) {
      this.cache.set(cacheKey, move);
      // Also cache by ID for consistency
      this.cache.set(`move:${move.id}`, move);
    }

    return move;
  }

  /**
   * Get a MoveAilment by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveAilmentById(id: number): Promise<MoveAilmentDTO | null> {
    return this.moveAilmentByIdLoader.load(id);
  }

  /**
   * Get a MoveAilment by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveAilmentByName(name: string): Promise<MoveAilmentDTO | null> {
    return this.moveAilmentByNameLoader.load(name);
  }

  /**
   * Get a MoveDamageClass by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveDamageClassById(id: number): Promise<MoveDamageClassDTO | null> {
    return this.moveDamageClassByIdLoader.load(id);
  }

  /**
   * Get a MoveDamageClass by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveDamageClassByName(name: string): Promise<MoveDamageClassDTO | null> {
    return this.moveDamageClassByNameLoader.load(name);
  }

  /**
   * Get a MoveCategory by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveCategoryById(id: number): Promise<MoveCategoryDTO | null> {
    return this.moveCategoryByIdLoader.load(id);
  }

  /**
   * Get a MoveCategory by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveCategoryByName(name: string): Promise<MoveCategoryDTO | null> {
    return this.moveCategoryByNameLoader.load(name);
  }

  /**
   * Get a MoveTarget by its numeric ID.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveTargetById(id: number): Promise<MoveTargetDTO | null> {
    return this.moveTargetByIdLoader.load(id);
  }

  /**
   * Get a MoveTarget by its name.
   * Uses DataLoader for batching and per-request caching.
   */
  async getMoveTargetByName(name: string): Promise<MoveTargetDTO | null> {
    return this.moveTargetByNameLoader.load(name);
  }

  /**
   * Private method to fetch MoveAilment by ID with caching.
   */
  private async fetchMoveAilmentById(id: number): Promise<MoveAilmentDTO | null> {
    const cacheKey = `move-ailment:${id}`;

    // Check cache first
    const cached = this.cache.get<MoveAilmentDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-ailment/${id}`;
    const ailment = await this.fetch<MoveAilmentDTO>(url);

    // Store in cache if found
    if (ailment) {
      this.cache.set(cacheKey, ailment);
    }

    return ailment;
  }

  /**
   * Private method to fetch MoveAilment by name with caching.
   */
  private async fetchMoveAilmentByName(name: string): Promise<MoveAilmentDTO | null> {
    const cacheKey = `move-ailment:name:${name}`;

    // Check cache first
    const cached = this.cache.get<MoveAilmentDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-ailment/${name}`;
    const ailment = await this.fetch<MoveAilmentDTO>(url);

    // Store in cache if found
    if (ailment) {
      this.cache.set(cacheKey, ailment);
      // Also cache by ID for consistency
      this.cache.set(`move-ailment:${ailment.id}`, ailment);
    }

    return ailment;
  }

  /**
   * Private method to fetch MoveDamageClass by ID with caching.
   */
  private async fetchMoveDamageClassById(id: number): Promise<MoveDamageClassDTO | null> {
    const cacheKey = `move-damage-class:${id}`;

    // Check cache first
    const cached = this.cache.get<MoveDamageClassDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-damage-class/${id}`;
    const damageClass = await this.fetch<MoveDamageClassDTO>(url);

    // Store in cache if found
    if (damageClass) {
      this.cache.set(cacheKey, damageClass);
    }

    return damageClass;
  }

  /**
   * Private method to fetch MoveDamageClass by name with caching.
   */
  private async fetchMoveDamageClassByName(name: string): Promise<MoveDamageClassDTO | null> {
    const cacheKey = `move-damage-class:name:${name}`;

    // Check cache first
    const cached = this.cache.get<MoveDamageClassDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-damage-class/${name}`;
    const damageClass = await this.fetch<MoveDamageClassDTO>(url);

    // Store in cache if found
    if (damageClass) {
      this.cache.set(cacheKey, damageClass);
      // Also cache by ID for consistency
      this.cache.set(`move-damage-class:${damageClass.id}`, damageClass);
    }

    return damageClass;
  }

  /**
   * Private method to fetch MoveCategory by ID with caching.
   */
  private async fetchMoveCategoryById(id: number): Promise<MoveCategoryDTO | null> {
    const cacheKey = `move-category:${id}`;

    // Check cache first
    const cached = this.cache.get<MoveCategoryDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-category/${id}`;
    const category = await this.fetch<MoveCategoryDTO>(url);

    // Store in cache if found
    if (category) {
      this.cache.set(cacheKey, category);
    }

    return category;
  }

  /**
   * Private method to fetch MoveCategory by name with caching.
   */
  private async fetchMoveCategoryByName(name: string): Promise<MoveCategoryDTO | null> {
    const cacheKey = `move-category:name:${name}`;

    // Check cache first
    const cached = this.cache.get<MoveCategoryDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-category/${name}`;
    const category = await this.fetch<MoveCategoryDTO>(url);

    // Store in cache if found
    if (category) {
      this.cache.set(cacheKey, category);
      // Also cache by ID for consistency
      this.cache.set(`move-category:${category.id}`, category);
    }

    return category;
  }

  /**
   * Private method to fetch MoveTarget by ID with caching.
   */
  private async fetchMoveTargetById(id: number): Promise<MoveTargetDTO | null> {
    const cacheKey = `move-target:${id}`;

    // Check cache first
    const cached = this.cache.get<MoveTargetDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-target/${id}`;
    const target = await this.fetch<MoveTargetDTO>(url);

    // Store in cache if found
    if (target) {
      this.cache.set(cacheKey, target);
    }

    return target;
  }

  /**
   * Private method to fetch MoveTarget by name with caching.
   */
  private async fetchMoveTargetByName(name: string): Promise<MoveTargetDTO | null> {
    const cacheKey = `move-target:name:${name}`;

    // Check cache first
    const cached = this.cache.get<MoveTargetDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from PokeAPI
    const url = `${this.baseURL}/move-target/${name}`;
    const target = await this.fetch<MoveTargetDTO>(url);

    // Store in cache if found
    if (target) {
      this.cache.set(cacheKey, target);
      // Also cache by ID for consistency
      this.cache.set(`move-target:${target.id}`, target);
    }

    return target;
  }
}
