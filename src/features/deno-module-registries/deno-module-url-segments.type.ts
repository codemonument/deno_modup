import { DenoModuleRegistry } from "./deno-module-registry.type.ts";

export interface DenoModuleUrlSegments {
  /**
   * The complete URL for the executable module
   * Example: https://deno.land/x/mymodule@2.0.1/main.ts
   */
  completeModuleURL: URL;

  /**
   * Contains the deno module registry
   */
  moduleRegistry?: DenoModuleRegistry;

  /**
   * The module name as it's present in the moduleBaseURL.
   * Example: mymodule part from the url:
   * https://deno.land/x/mymodule
   */
  moduleName: string;

  /**
   * Example: Contains an URL instance with the URL:
   * https://deno.land/x/mymodule (can be used to construct urls for new versions)
   */
  moduleBaseURL: URL;

  /**
   * Contains the version of the installed Module as string.
   * If no version is present in the moduleUrl,
   * this will contain the string "latest"
   * Example:
   * ModuleURL: https://deno.land/x/mymodule@2.0.1/main.ts
   * moduleVersion: "2.0.1"
   */
  moduleVersion: string;

  /**
   * The path for the entryfile.
   * Normally only the filename, but can be a longer path when entryFile is in some subfolder.
   * Example:
   * ModuleURL: https://deno.land/x/mymodule@3.0.1/dist/main.ts
   * entryFilePath: "dist/main.ts"
   */
  entryFilePath: string;

  /**
   * The last segment of entryFilePath.
   * Example:
   * entryFilePath: dist/main.ts
   * entryFileName: "main.ts"
   *
   * If entryFilePath has no subfolders, entryFileName === entryFilePath.
   */
  entryFileName: string;
}
