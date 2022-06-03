import { log } from "./src/deps/log.std.ts";
import { runCli } from "./src/runCli.ts";
import { VERSION } from "./VERSION.ts";

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
