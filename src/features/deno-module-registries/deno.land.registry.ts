import { DenoCommandShim } from "../deno-command-shim/deno-command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";
import { DenoModuleUrlSegments } from "./deno-module-url-segments.type.ts";

export class DenoLandRegistry extends DenoModuleRegistry {
  static readonly hostname = `deno.land`;

  constructor() {
    super();
  }

  getLatestVersion(
    commandShim: DenoCommandShim,
  ): { versionString: string; latestVersionModuleUrl: URL } {
    throw new Error("Method not implemented.");
  }

  parseModuleUrlSegments(
    urlInput: string | URL,
  ): DenoModuleUrlSegments {
    const url = (typeof urlInput === "string") ? new URL(urlInput) : urlInput;

    // important: filename can be placed in some subfolder! (therefore the rest param for filepath)
    const [_, _denoX, moduleAndVersion, ...filepath] = url.pathname
      .split("/");
    const [moduleName, moduleVersion] = moduleAndVersion.split("@");
    const filename = filepath.at(-1);

    if (filename === undefined) {
      throw new Deno.errors.NotFound(
        `parseModuleUrl could not detect the filename from the moduleUrl: ${url.toString()}`,
      );
    }

    return {
      completeModuleURL: url,
      moduleName,
      moduleVersion,
      filepath: filepath.join("/"),
      filename,
    };
  }
}
