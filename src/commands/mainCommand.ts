import { YargsInstance } from "../deps/yargs.ts";
import { MainArgs } from "./mainArgs.type.ts";
import { join } from "../deps/path.std.ts";
import { log } from "../deps/log.std.ts";
import { which } from "../deps/which.ts";
import { detectCommandDetails } from "../features/detect-command-details.ts";

/**
 * @param args
 */
async function commandHandler(
  { cliName, targetVersion, force, dryRun }: MainArgs,
) {
  log.info(
    `Trying to update cli "${cliName}" to version "${targetVersion}"...`,
  );

  const commandFile = await which(cliName);
  if (commandFile === undefined) {
    throw new Deno.errors.NotFound(
      `Script file for command "${cliName}" could not be found! This should not happen, if the cli is callable manually!`,
    );
  }
  log.info(
    `Found: Script file for command "${cliName}" (a.k.a Command File): ${commandFile}`,
  );
  const commandFileString = await Deno.readTextFile(commandFile);
  const commandDetails = detectCommandDetails(
    commandFile,
    commandFileString,
    force,
  );

  const versionString = (targetVersion === "latest") ? "" : `@${targetVersion}`;
  const upgradeUrl = new URL(
    `/x/${commandDetails.moduleName}${versionString}/${commandDetails.filepath}`,
    commandDetails.moduleUrl,
  );
  const upgradeCmd = [
    "deno",
    "install",
    ...commandDetails.execFlags,
    "--force",
    `'${upgradeUrl.toString()}'`,
  ];

  log.info(`Update command: ${upgradeCmd.join(" ")}`);

  if (dryRun) {
    log.info(`DryRun mode active => Stopping here`);
    return;
  }

  if (!dryRun) {
    await Deno.run({ cmd: upgradeCmd });
  }
}

function argsBuilder(yargs: YargsInstance) {
  return yargs
    .boolean(`force`)
    .alias(`force`, "f")
    .describe(
      `force`,
      `forces the cli to ignore all security validations during an update.`,
    )
    .boolean(`dryRun`)
    .alias(`dryRun`, "d")
    .describe(
      `dryRun`,
      `Does not execute the update but outputs useful information about what it will do.`,
    )
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
