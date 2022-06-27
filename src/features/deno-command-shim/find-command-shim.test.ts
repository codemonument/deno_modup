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
});
