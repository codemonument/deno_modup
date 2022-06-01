import {
  assertObjectMatch,
  assertRejects,
  describe,
  it,
} from "./deps/testing.std.ts";
import { log } from "./deps/log.std.ts";
import { runCli } from "./runCli.ts";

describe(`runCli`, () => {
  it(`on arg '--help': showHelp & exit(0)`, async () => {
    await assertRejects(() => runCli(["--help"]));
  });

  it(`on command 'help': showHelp & exit(0)`, async () => {
    await runCli(["help"]);
  });
});
