import { CommandShim } from "../deno-command-shim/command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";
import { ModuleUrlSegments } from "./module-url-segments.type.ts";

export class NestLandRegistry extends DenoModuleRegistry {
  static readonly hostname = `x.nest.land`;

  constructor() {
    super();
  }

  getLatestVersion(
    moduleBaseURL: URL,
  ): Promise<{ latestModuleVersion: string; latestVersionModuleUrl: URL }> {
    throw new Error("Method not implemented.");
  }

  parseModuleUrlSegments(urlInput: string | URL): ModuleUrlSegments {
    throw new Error("Method not implemented.");
  }

  buildModuleUrl(
    moduleBaseURL: URL,
    moduleVersion: string,
    entryFilePath: string,
  ): URL {
    throw new Error("Method not implemented.");
  }
}
