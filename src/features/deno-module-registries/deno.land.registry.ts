import { CommandShim } from "../deno-command-shim/command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";
import { ModuleUrlSegments } from "./module-url-segments.type.ts";

export class DenoLandRegistry extends DenoModuleRegistry {
  static readonly hostname = `deno.land`;

  constructor() {
    super();
  }

  async getLatestVersion(
    moduleBaseURL: URL,
  ): Promise<{ versionString: string; latestVersionModuleUrl: URL }> {
    const res = await fetch(moduleBaseURL.toString(), { redirect: "manual" });

    // Extract the location header from the response
    const newLocation = res.headers.get("location");
    if (res.status !== 302 || newLocation === null) {
      throw new Deno.errors.InvalidData(
        `Response from ${moduleBaseURL} is not a redirect response or doesn't contain a location header!`,
      );
    }

    // Throw away the body, not needed
    res.body?.cancel();
    const latestVersionModuleUrl = new URL(newLocation, moduleBaseURL);

    const { moduleVersion } = this.parseModuleUrlSegments(
      latestVersionModuleUrl,
    );

    return {
      versionString: moduleVersion,
      latestVersionModuleUrl,
    };
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

  buildModuleUrl(
    moduleBaseURL: URL,
    moduleVersion: string,
    entryFilePath: string,
  ): URL {
    const moduleBaseUrlString = moduleBaseURL.toString();

    return new URL(
      `${moduleBaseUrlString}@${moduleVersion}/${entryFilePath}`,
    );
  }
}
