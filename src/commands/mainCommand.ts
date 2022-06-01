import { YargsInstance } from "../deps/yargs.ts";
import { MainArgs } from "./mainArgs.type.ts";

/**
 * @param args
 */
function commandHandler(args: MainArgs) {
  console.info("Default command called with args:", args);
}

function argsBuilder(yargs: YargsInstance) {
  return yargs
    .positional(`cliName`, {
      describe: `The name of the cliCommand as installed by "deno install" `,
    })
    .option(`targetVersion`, {
      alias: "v",
      describe:
        `A version tag which maches an available tag for the module on deno.land/x. Default: latest`,
      default: "latest",
    });
}

/**
 * Area of yargs command definition module export
 */

export const command = "$0 <cliName>";
export const describe =
  "Upgrades a given deno module binary installed by `deno install` from deno.land/x";
export const builder = argsBuilder;
export const handler = commandHandler;
