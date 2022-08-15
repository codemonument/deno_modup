import {
  assertRejects,
  assertSpyCall,
  beforeEach,
  describe,
  it,
  stub,
} from "./deps/testing.std.ts";
import { log } from "./deps/log.std.ts";
import { runCli } from "./runCli.ts";

describe.only(`runCli`, () => {
  const exitStub = stub(
    Deno,
    "exit",
    (code) => {
      throw new Error(`Deno.exit() was called with exit code ${code}!`);
    },
  );

  it(`on arg '--help': showHelp & exit(0)`, async () => {
    await assertSpyCall(exitStub, 0);
    await assertRejects(() => runCli(["--help"]));
  });

  it(`on command 'help': showHelp & exit(0)`, async () => {
    await assertSpyCall(exitStub, 0);
    await assertRejects(() => runCli(["help"]));
  });
});
