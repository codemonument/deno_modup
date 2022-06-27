import { YargsInstance } from "../deps/yargs.ts";

let helpStringPromise: Promise<string>;

/**
 * @param args
 */
async function commandHandler() {
  const res = await helpStringPromise;
  const helpString = res.replaceAll(`deno run`, "modup");
  console.log(helpString);
  // Deno.stdout.write(new TextEncoder().encode(helpString));
}

function argsBuilder(yargs: YargsInstance) {
  helpStringPromise = yargs.getHelp();

  return yargs;
}

/**
 * Area of yargs command definition module export
 */

export const command = "help";
export const describe = "Shows this help message";
export const builder = argsBuilder;
export const handler = commandHandler;
