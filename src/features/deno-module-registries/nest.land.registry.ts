import { CommandShim } from "../deno-command-shim/command-shim.type.ts";
import { DenoModuleRegistry } from "./deno-module-registry.type.ts";
import { LatestModuleVersion } from "./latest-module-version.type.ts";
import { ModuleUrlSegments } from "./module-url-segments.type.ts";

export class NestLandRegistry extends DenoModuleRegistry {
  static readonly hostname = `x.nest.land`;

  constructor() {
    super();
  }

  async getLatestVersion(
    commandShim: CommandShim,
  ): Promise<LatestModuleVersion> {
    const moduleName = commandShim.moduleUrlSegments.moduleName;
    const apiPackageUrl = `https://x.nest.land/api/package/${moduleName}`;
    const res = await fetch(apiPackageUrl);

    const { latestStableVersion } = await res.json();
    const latestModuleVersion = latestStableVersion.split("@")[1];

    return {
      latestModuleVersion,
      latestVersionModuleUrl: this.buildModuleUrl(
        commandShim.moduleUrlSegments.moduleBaseURL,
        latestModuleVersion,
        commandShim.moduleUrlSegments.entryFilePath,
      ),
    };
  }

  /**
   * Example nest land url: https://x.nest.land/dmm@2.1.0/mod.ts
   * CAUTION: does only work for fetching exact versions!
   *
   * @param urlInput
   */
  parseModuleUrlSegments(urlInput: string | URL): ModuleUrlSegments {
    const url = (typeof urlInput === "string") ? new URL(urlInput) : urlInput;

    const [_, moduleAndVersion, ...filepath] = url.pathname.split("/");
    const [moduleName, moduleVersion] = moduleAndVersion.split("@");
    const entryFileName = filepath.at(-1);
    if (entryFileName === undefined) {
      throw new Deno.errors.NotFound(
        `parseModuleUrl could not detect the filename from the moduleUrl: ${url.toString()}`,
      );
    }

    const moduleBaseURL = new URL(`/${moduleName}`, url);

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
