import { Line } from "../deps/line.ts";
import { HelpCommand } from "./HelpCommand.ts";

export class MainCommand extends Line.MainCommand {
  public signature = "modup [cliName] ";

  public arguments = {
    "cliName": `The name of the cliCommand as installed by "deno install"`,
  };

  public options = {
    "-d, --dryRun":
      `Does not execute the update but outputs useful information about what it will do.`,
    "-f, --force":
      `forces the cli to ignore all security validations during an update.`,
    "-t [value], --targetVersion [value]":
      `A version tag which maches an available tag for the module on deno.land/x. Default: latest`,
  };

  public subcommands = [
    HelpCommand,
  ];

  public handle(): void {
    const cliName = this.argument(`cliName`);
    const targetVersion = this.option(`--targetVersion`) ?? `latest`;
    const dryRun = this.option(`--dryRun`) ?? false;
    const force = this.option(`--force`) ?? false;

    //TODO: Throw error when cliName is undefined!
  }
}
