import type { Plant } from "./plants-data"

const API_BASE = "/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  count?: number
}

export interface PlantFilters {
  category?: string
  difficulty?: string
  lightRequirement?: string
  search?: string
  featured?: boolean
}

export class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  // Plant operations
  async getPlants(filters?: PlantFilters): Promise<ApiResponse<Plant[]>> {
    const params = new URLSearchParams()

    if (filters?.category) params.append("category", filters.category)
    if (filters?.difficulty) params.append("difficulty", filters.difficulty)
    if (filters?.lightRequirement) params.append("lightRequirement", filters.lightRequirement)
    if (filters?.search) params.append("search", filters.search)
    if (filters?.featured !== undefined) params.append("featured", filters.featured.toString())

    const queryString = params.toString()
    const endpoint = `/plants${queryString ? `?${queryString}` : ""}`

    return this.request<Plant[]>(endpoint)
  }

  async getPlant(id: string): Promise<ApiResponse<Plant>> {
    return this.request<Plant>(`/plants/${id}`)
  }

  async addPlant(plant: Omit<Plant, "id">): Promise<ApiResponse<Plant>> {
    return this.request<Plant>("/plants", {
      method: "POST",
      body: JSON.stringify(plant),
    })
  }

  async updatePlant(id: string, updates: Partial<Plant>): Promise<ApiResponse<Plant>> {
    return this.request<Plant>(`/plants/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  async deletePlant(id: string): Promise<ApiResponse<Plant>> {
    return this.request<Plant>(`/plants/${id}`, {
      method: "DELETE",
    })
  }

  async getStats(): Promise<ApiResponse<unknown>> {
    return this.request<unknown>("/plants/stats")
  }
}

export const apiClient = new ApiClient()
