export interface HttpRequest {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: any;
}

export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}

export interface HttpClient {
  request<T = any>(params: HttpRequest): Promise<HttpResponse<T>>;
}
