import { assert, describe, it } from "../deps/testing.std.ts";
import { findLatestModuleVersion } from "./find-latest-module-version.ts";

describe("find-latest-module-version", () => {
  it(`should return the latest version number`, async () => {
    const moduleVersion = await findLatestModuleVersion(
      `https://deno.land/x/codeup`,
    );

    assert(moduleVersion);
  });
});
