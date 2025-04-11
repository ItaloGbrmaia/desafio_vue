import { AppConfig } from "../configs/AppConfig";
import { AppEnvironment } from "../configs/AppConfig";

export namespace Environment {
  const env = import.meta.env.VITE_ENV as AppEnvironment;

  const dev = new AppConfig({
    appEnvironment: AppEnvironment.Development,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  });

  const prod = new AppConfig({
    appEnvironment: AppEnvironment.Production,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  });

  export function getCurrent(): AppConfig {
    return env === AppEnvironment.Production ? prod : dev;
  }
}
