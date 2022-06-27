import { log } from "./src/deps/log.std.ts";
import { runCli } from "./src/runCli.ts";
import { VERSION } from "./VERSION.ts";

try {
  log.info(`Running 'modup' Version: ${VERSION}
     Your cli command may be different, when you installed it with a different name! \n`);

  // Main Command
  await runCli(Deno.args);
} catch (error) {
  log.error(error);
  Deno.exit();
}

if (!import.meta.main) {
  console.log(
    `You imported this main.ts file, but it is intended to be used with 'deno install'!
  Import /mod.ts instead!`,
  );
}
