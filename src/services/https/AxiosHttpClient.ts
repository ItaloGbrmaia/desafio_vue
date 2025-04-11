import type { AxiosResponse } from "axios";
import { HttpError } from "./HttpError";
import axios from "axios";
import type { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";

export class AxiosHttpClient implements HttpClient {
  async request<T = any>({
    url,
    method,
    body,
  }: HttpRequest): Promise<HttpResponse<T>> {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "F5T5KtFaebWi2bepGnHWhnMVlGkOL8QWra0zYQmCaU1PpR1WhIcezzaM",
    };

    try {
      const response: AxiosResponse = await axios.request({
        url,
        method,
        data: body,
        headers: defaultHeaders,
        timeout: 10000,
      });

      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (error: any) {
      const status = error.response?.status;

      switch (status) {
        case 400:
          throw HttpError.badRequest;
        case 401:
          throw HttpError.unauthorized;
        case 404:
          throw HttpError.notFound;
        case 422:
          throw HttpError.unprocessableEntity;
        default:
          throw HttpError.serverError;
      }
    }
  }
}
