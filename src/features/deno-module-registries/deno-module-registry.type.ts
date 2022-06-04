import { DenoCommandShim } from "../deno-command-shim/deno-command-shim.type.ts";
import { DenoModuleUrlSegments } from "./deno-module-url-segments.type.ts";
/**
 * Todo: Implement
 */
export interface DenoModuleRegistry {
  /**
   * The hostname of this deno registry.
   * This is used to compare against the URL.host field to detect,
   * which registry implementation needs to be used.
   */
  readonly hostname: string;

  /**
   * @param commandShim The deno command shim for which to get the latest version
   *        Provides detailed information, such as moduleBaseUrl, moduleName, installedVersion, etc.
   * @returns an object containing the latest version as string and the module url for the latest version as URL.
   */
  getLatestVersion(
    commandShim: DenoCommandShim,
  ): { versionString: string; latestVersionModuleUrl: URL };

  parseModuleUrl(urlInput: string | URL): DenoModuleUrlSegments;
}
