import type { Photo } from "../models/data_models";
import type { HttpClient } from "../services/https/HttpClient";
import { makeApiUrl } from "../utils/base_url";

interface PexelsResponse {
  photos: Photo[];
  total_results: number;
  page: number;
  per_page: number;
}

export class PexelsRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async search(query: string, page = 1): Promise<Photo[]> {
    const response = await this.httpClient.request<PexelsResponse>({
      url: makeApiUrl(`/search?query=${query}&page=${page}`),
      method: "get",
    });
    console.log(response.body.photos);

    return response.body.photos;
  }
}
