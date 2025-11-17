import DataLoader from "dataloader";
import { BasePokeAPIDataSource } from "../base/BasePokeAPIDataSource.js";
import type { MachineDTO } from "./machine.dto.js";
import type { APIResourceListDTO } from "../base/common.dto.js";

/**
 * DataSource for Machine-related data from PokeAPI
 * Handles fetching machines (TMs/HMs) with caching and batching
 */
export class MachineDataSource extends BasePokeAPIDataSource {
  public machineByIdLoader: DataLoader<number, MachineDTO | null>;

  constructor(config: { baseURL: string }) {
    super(config);

    this.machineByIdLoader = this.createLoader(async (ids: readonly number[]) => {
      return Promise.all(ids.map((id) => this.fetchMachineById(id)));
    });
  }

  /**
   * Get a machine by its ID
   * @param id - Machine ID
   * @returns Machine data or null if not found
   */
  async getMachineById(id: number): Promise<MachineDTO | null> {
    return this.machineByIdLoader.load(id);
  }

  /**
   * Get a paginated list of machines
   * @param limit - Number of items to return (0 for PokeAPI default)
   * @param offset - Number of items to skip
   * @returns Paginated list of machines
   */
  async getMachineList(limit: number, offset: number): Promise<APIResourceListDTO> {
    const cacheKey = `list:machine:${limit}:${offset}`;
    const cached = this.cache.get<APIResourceListDTO>(cacheKey);
    if (cached) return cached;

    const params = new URLSearchParams();
    if (limit > 0) params.append("limit", limit.toString());
    if (offset > 0) params.append("offset", offset.toString());

    const url = `${this.baseURL}/machine${params.toString() ? `?${params.toString()}` : ""}`;
    const list = await this.fetch<APIResourceListDTO>(url);

    if (!list) {
      return { count: 0, next: null, previous: null, results: [] };
    }

    this.cache.set(cacheKey, list);
    return list;
  }

  /**
   * Fetch a machine by ID from PokeAPI
   * @param id - Machine ID
   * @returns Machine data or null if not found
   */
  private async fetchMachineById(id: number): Promise<MachineDTO | null> {
    const cacheKey = `machine:${id}`;
    const cached = this.cache.get<MachineDTO>(cacheKey);
    if (cached) return cached;

    const url = `${this.baseURL}/machine/${id}`;
    const machine = await this.fetch<MachineDTO>(url);

    if (machine) {
      this.cache.set(cacheKey, machine);
    }

    return machine;
  }
}
