import { DenoCommandShim } from "../deno-command-shim/deno-command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";
import { DenoModuleUrlSegments } from "./deno-module-url-segments.type.ts";

export class NestLandRegistry extends DenoModuleRegistry {
  static readonly hostname = `x.nest.land`;

  constructor() {
    super();
  }

  getLatestVersion(
    commandShim: DenoCommandShim,
  ): { versionString: string; latestVersionModuleUrl: URL } {
    throw new Error("Method not implemented.");
  }

  parseModuleUrlSegments(urlInput: string | URL): DenoModuleUrlSegments {
    throw new Error("Method not implemented.");
  }
}
