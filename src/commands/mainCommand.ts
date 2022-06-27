import { Line } from "../deps/line.ts";
import { HelpCommand } from "./HelpCommand.ts";
import { log } from "../deps/log.std.ts";
import { findCommandShim } from "../features/deno-command-shim/find-command-shim.ts";
import { parseCommandShim } from "../features/deno-command-shim/parse-command-shim.ts";

export class MainCommand extends Line.MainCommand {
  public signature = "modup [cliName] [targetVersion]";

  public arguments = {
    "cliName": `The name of the cliCommand as installed by "deno install"`,
    "targetVersion":
      `A version tag which maches an available tag for the module on deno.land/x. Use Default: latest`,
  };

  public options = {
    "-d, --dryRun":
      `Does not execute the update but outputs useful information about what it will do.`,
    "-f, --force":
      `forces the cli to ignore all security validations during an update.`,
  };

  public subcommands = [
    HelpCommand,
  ];

  public async handle(): Promise<void> {
    const cliName = this.argument(`cliName`);
    const targetVersion = this.argument(`targetVersion`) ?? `latest`;
    const dryRun = this.option(`--dryRun`) ?? false;
    const force = this.option(`--force`) ?? false;

    console.log(cliName, targetVersion, dryRun, force);

    //Note: Should not happen, since line args are required
    if (!cliName) throw new Error(`Missing arg: cliName!`);

    log.info(
      `Trying to update cli "${cliName}" to version "${targetVersion}"...`,
    );

    const commandFileRes = await findCommandShim(cliName);
    const commandFile = commandFileRes.unwrapOrThrow();

    log.info(
      `Found: Script file for command "${cliName}" (a.k.a Command File): ${commandFile}`,
    );

    const commandFileContent = await Deno.readTextFile(commandFile);

    const commandShimRes = parseCommandShim(commandFile, commandFileContent, {
      validateDenoShim: !force,
    });
    const commandShim = commandShimRes.unwrapOrThrow();

    const localVersion = commandShim.moduleUrlSegments.moduleVersion;
    log.info(`Current local version: ${localVersion}`);

    const { latestModuleVersion: remoteVersion } = await commandShim
      .moduleRegistry
      .getLatestVersion(commandShim);
    log.info(`Latest online version: ${remoteVersion}`);

    if (localVersion === remoteVersion) {
      log.info(`Latest version already installed => doing nothing`);
      return;
    }

    const versionString = (targetVersion === "latest")
      ? remoteVersion
      : targetVersion;

    log.info(
      `Installing new version: ${versionString}. (Based on whether 'latest' was passed as targetVersion or a specific version.)`,
    );

    const upgradeUrl = commandShim.moduleRegistry.buildModuleUrl(
      commandShim.moduleUrlSegments.moduleBaseURL,
      versionString,
      commandShim.moduleUrlSegments.entryFilePath,
    );

    const upgradeCmd = [
      "deno",
      "install",
      ...commandShim.execCommand.execFlags,
      "--force",
      "--name",
      cliName,
      upgradeUrl.toString(),
    ];

    log.info(`Update command: ${upgradeCmd.join(" ")}`);

    if (dryRun) {
      log.info(`DryRun mode active => Stopping here`);
      return;
    }

    if (!dryRun) {
      const denoInstallProcess = Deno.run({ cmd: upgradeCmd });
      await denoInstallProcess.status();
    }
  }
}
