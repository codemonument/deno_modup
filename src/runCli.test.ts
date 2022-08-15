import {
  assertRejects,
  assertSpyCall,
  beforeAll,
  beforeEach,
  describe,
  it,
  stub,
} from "./deps/testing.std.ts";
import { log } from "./deps/log.std.ts";
import { runCli } from "./runCli.ts";

describe(`runCli`, () => {
  const exitStub = stub(
    Deno,
    "exit",
    (code) => {
      throw new Error(`Deno.exit() was called with exit code ${code}!`);
    },
  );

  it(`on arg '--help': showHelp & exit(0)`, async () => {
    await assertRejects(() => runCli(["--help"]));
    await assertSpyCall(exitStub, 0);
  });

  it(`on command 'help': showHelp & exit(0)`, async () => {
    await assertRejects(() => runCli(["help"]));
    await assertSpyCall(exitStub, 1);
  });
});
