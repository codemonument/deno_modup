import { log } from "./src/deps/log.std.ts";
import { runCli } from "./src/runCli.ts";
import { VERSION } from "./VERSION.ts";

if (import.meta.main) {
  try {
    log.info(
      `Running ${Deno.env.get("CLI_NAME")}
       Version: ${VERSION} \n`,
    );

    // Main Command
    await runCli(Deno.args);
  } catch (error) {
    log.error(error);
    Deno.exit();
  }
}

console.log(
  `You imported this main.ts file, but it is intended to be used with 'deno install'!
Import /mod.ts instead!`,
);
