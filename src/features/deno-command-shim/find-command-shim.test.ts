import {
  assert,
  assertSnapshot,
  assertThrows,
  describe,
  it,
} from "../../deps/testing.std.ts";
import { findCommandShim } from "./find-command-shim.ts";

describe(`findCommandShim`, () => {
  it(`should return ShimNotFound with 'bob' input`, async () => {
    const result = await findCommandShim("bob");
    assert(result.hasError());
  });

  it(`should return a path for a command`, async () => {
    const install = Deno.run({
      cmd: [
        "deno",
        "install",
        "--name",
        "cowsay",
        "https://deno.land/x/cowsay/cowsay.ts",
      ],
    });
    await install.status();
    install.close();
    const res = await findCommandShim(`cowsay`);
    assert(res.hasValue());
    const uninstall = Deno.run({
      cmd: ["deno", "uninstall", "cowsay"],
    });
    await uninstall.status();
    uninstall.close();
  });
});
