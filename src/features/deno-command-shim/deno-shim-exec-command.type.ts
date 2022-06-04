import { DenoModuleRegistry } from "../deno-module-registries/deno-module-registry.type.ts";

export interface DenoShimExecCommand {
  /**
   * Contains the complete command string,
   * starting with 'deno run ...'
   */
  execCommand: string;

  /**
   * The flags which are passed to the deno runtime for this module.
   * This allows 'modup' cli to call the deno install command with the same flags
   */
  execFlags: string[];

  /**
   * The complete URL for the executable module
   * Example: https://deno.land/x/mymodule@2.0.1/main.ts
   */
  moduleURL: URL;

  /**
   * Contains the deno module registry
   */
  moduleRegistry?: DenoModuleRegistry;

  /**
   * Example: Contains an URL instance with the URL:
   * https://deno.land/x/mymodule (can be used to construct urls for new versions)
   */
  moduleBaseURL: URL;

  /**
   * The module name as it's present in the moduleBaseURL.
   * Example: mymodule part from the url:
   * https://deno.land/x/mymodule
   */
  moduleName: string;

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
}
