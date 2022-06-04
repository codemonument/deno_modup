import { assert, describe, it } from "../../deps/testing.std.ts";
import { DenoLandRegistry } from "./deno.land.registry.ts";

describe(`Deno.Land Registry Class`, () => {
  it(`should get the latest version for a module`, async () => {
    const registry = new DenoLandRegistry();
    const res = await registry.getLatestVersion(
      new URL(`https://deno.land/x/modup`),
    );
    console.log(res);
    assert(res);
  });
});
