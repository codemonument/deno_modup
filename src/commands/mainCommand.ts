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
    .boolean("boolArg")
    .default("boolArg", false)
    .alias("boolArg", "b")
    .describe(
      "boolArg",
      `Some boolean argument with a default value of false.`,
    )
    .option("someOption", {
      alias: "o",
      describe:
        `[Optional] Some option flag (--someOption value) which is not required (due to the default of undefined)`,
      default: undefined,
    });
}

/**
 * Area of yargs command definition module export
 */

export const command = "$0";
export const describe =
  "The default command, called when no subcommand was passed";
export const builder = argsBuilder;
export const handler = commandHandler;
