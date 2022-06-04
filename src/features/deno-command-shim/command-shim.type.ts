import { ModuleUrlSegments } from "../deno-module-registries/module-url-segments.type.ts";
import { ExecCommand } from "./exec-command.type.ts";
import { DenoModuleRegistry } from "../deno-module-registries/deno-module-registry.type.ts";

/**
 * A data structure which can be used to parse command shim (a.k.a cli-alias) files
 *  which deno creates when using the `deno install` command
 */
export interface CommandShim {
  /**
   * The path where the command shim was found.
   */
  path: string;

  /**
   * The file content of the command shim as array of lines
   */
  lines: string[];

  /**
   * The command which is run when the shim is called
   */
  commandString: string;

  /**
   * The parsed exec command
   */
  execCommand: ExecCommand;

  /**
   * The segments of the url, like moduleName and moduleVersion
   */
  moduleUrlSegments: ModuleUrlSegments;

  /**
   * The registry object valid for this command shim
   */
  moduleRegistry: DenoModuleRegistry;
}
