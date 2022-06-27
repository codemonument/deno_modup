import { VERSION } from "../VERSION.ts";
import { Line } from "./deps/line.ts";
import { MainCommand } from "./commands/mainCommand.ts";

const cli = new Line.CLI({
  name: "modup",
  description: `The Deno Module Updater
        Upgrades a given deno module binary installed by 'deno install' from deno.land/x`,
  version: VERSION,
  command: MainCommand,
});

/**
 * @param args should normally contain Deno.args, but can also contain mocked data for testing
 */
export async function runCli(args: string[]) {
  await cli.run();
}
