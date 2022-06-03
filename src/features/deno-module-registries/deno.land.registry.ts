import { DenoCommandShim } from "../deno-command-shim/deno-command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";

export class DenoLandRegistry implements DenoModuleRegistry {
  readonly hostname: string;

  constructor() {
    this.hostname = `deno.land`;
  }

  getLatestVersion(
    commandShim: DenoCommandShim,
  ): { versionString: string; latestVersionModuleUrl: URL } {
    throw new Error("Method not implemented.");
  }
}
