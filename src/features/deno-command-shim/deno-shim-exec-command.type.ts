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
}
