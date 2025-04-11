export enum AppEnvironment {
  Development = "dev",
  Production = "prod",
}

export class AppConfig {
  appEnvironment: AppEnvironment;
  apiBaseUrl: string;

  private static _instance: AppConfig;

  constructor(params: { appEnvironment: AppEnvironment; apiBaseUrl: string }) {
    this.appEnvironment = params.appEnvironment;
    this.apiBaseUrl = params.apiBaseUrl;
  }

  static getInstance(config?: AppConfig): AppConfig {
    if (config) {
      this._instance = config;
    }
    return this._instance;
  }
}
