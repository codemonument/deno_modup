import { DenoCommandShim } from "../deno-command-shim/deno-command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";

/**
 * This unknown registry implementation serves as placeholder which can be used to communicate,
 * that the command parser was not able to identify the registry for the given command
 * or that the registry of the command is not supported right now.
 */
export class UnknownRegistry implements DenoModuleRegistry {
  readonly hostname: string;

  constructor() {
    this.hostname = `unknown`;
  }

  getLatestVersion(
    commandShim: DenoCommandShim,
  ): { versionString: string; latestVersionModuleUrl: URL } {
    throw new Error("Method not implemented.");
  }
}
