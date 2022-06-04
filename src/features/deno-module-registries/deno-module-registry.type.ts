import { LatestModuleVersion } from "./latest-module-version.type.ts";
import { ModuleUrlSegments } from "./module-url-segments.type.ts";
/**
 * Todo: Implement
 */
export abstract class DenoModuleRegistry {
  /**
   * The hostname of this deno registry.
   * This is used to compare against the URL.host field to detect,
   * which registry implementation needs to be used.
   */
  static readonly hostname: string;

  /**
   * @param commandShim The deno command shim for which to get the latest version
   *        Provides detailed information, such as moduleBaseUrl, moduleName, installedVersion, etc.
   * @returns an object containing the latest version as string and the module url for the latest version as URL.
   */
  abstract getLatestVersion(
    moduleBaseURL: URL,
  ): Promise<LatestModuleVersion>;

  abstract parseModuleUrlSegments(
    urlInput: string | URL,
  ): ModuleUrlSegments;

  /**
   * Combines the params into a new URL object
   * which points to a specific version of the given module
   * @param moduleBaseURL
   * @param moduleVersion
   * @param entryFilePath
   */
  abstract buildModuleUrl(
    moduleBaseURL: URL,
    moduleVersion: string,
    entryFilePath: string,
  ): URL;
}
