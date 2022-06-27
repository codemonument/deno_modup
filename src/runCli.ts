import { yargs } from "./deps/yargs.ts";
import { commands } from "./commands/index.ts";
import { VERSION } from "../VERSION.ts";
import { Line } from "./deps/line.ts";
import { MainCommand } from "./commands/mainCommand.ts";

const cli = new Line.CLI({
  name: "modup",
  description: "The Deno Module Updater",
  version: VERSION,
  command: MainCommand,
});

/**
 * @param args should normally contain Deno.args, but can also contain mocked data for testing
 */
export async function runCli(args: string[]) {
  await cli.run();
}
