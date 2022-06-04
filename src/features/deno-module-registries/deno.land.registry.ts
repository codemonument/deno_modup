import { CommandShim } from "../deno-command-shim/command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";
import { ModuleUrlSegments } from "./module-url-segments.type.ts";

export class DenoLandRegistry extends DenoModuleRegistry {
  static readonly hostname = `deno.land`;

  constructor() {
    super();
  }

  getLatestVersion(
    commandShim: CommandShim,
  ): { versionString: string; latestVersionModuleUrl: URL } {
    throw new Error("Method not implemented.");
  }

  parseModuleUrlSegments(
    urlInput: string | URL,
  ): ModuleUrlSegments {
    const url = (typeof urlInput === "string") ? new URL(urlInput) : urlInput;

    // important: filename can be placed in some subfolder! (therefore the rest param for filepath)
    const [_, _denoX, moduleAndVersion, ...filepath] = url.pathname
      .split("/");
    const [moduleName, moduleVersion] = moduleAndVersion.split("@");
    const entryFileName = filepath.at(-1);

    if (entryFileName === undefined) {
      throw new Deno.errors.NotFound(
        `parseModuleUrl could not detect the filename from the moduleUrl: ${url.toString()}`,
      );
    }

    const moduleBaseURL = new URL(`/x/${moduleName}`, url);

    return {
      completeModuleURL: url,
      moduleName,
      moduleVersion,
      moduleBaseURL,
      entryFileName,
      entryFilePath: filepath.join("/"),
    };
  }
}
