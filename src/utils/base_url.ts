import { AppConfig } from "../configs/AppConfig";

export function makeApiUrl(path: string): string {
  return `${AppConfig.getInstance().apiBaseUrl}${path}`;
}
