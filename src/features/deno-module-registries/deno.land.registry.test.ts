import { assert, describe, it } from "../../deps/testing.std.ts";
import { DenoLandRegistry } from "./deno.land.registry.ts";

describe(`Deno.Land Registry Class`, () => {
  it(`should get the latest version for a module`, async () => {
    const registry = new DenoLandRegistry();
    const res = await registry.getLatestVersion(
      {
        path: `fake path`,
        commandString: `deno run -A 'https://deno.land/x/modup@1.0.0/main.ts'`,
        lines: ["fake", "three", "lines"],
        execCommand: {
          execCommand: `deno run -A 'https://deno.land/x/modup@1.0.0/main.ts'`,
          execFlags: ["-a"],
          moduleURL: new URL(`https://deno.land/x/modup@1.0.0/main.ts`),
        },
        moduleRegistry: new DenoLandRegistry(),
        moduleUrlSegments: {
          completeModuleURL: new URL(`https://deno.land/x/modup@1.0.0/main.ts`),
          entryFileName: `main.ts`,
          entryFilePath: `main.ts`,
          moduleBaseURL: new URL(`https://deno.land/x/modup`),
          moduleName: `modup`,
          moduleVersion: `1.0.0`,
          moduleRegistry: new DenoLandRegistry(),
        },
      },
    );
    console.log(res);
    assert(res);
  });
});
