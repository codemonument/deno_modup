import { Line } from "../deps/line.ts";

export class MainCommand extends Line.MainCommand {
  public signature = "modup <cliName>";

  public arguments = {
    "cliName": `The name of the cliCommand as installed by "deno install"`,
    "dryRun":
      `Does not execute the update but outputs useful information about what it will do.`,
    "force":
      `forces the cli to ignore all security validations during an update.`,
    "targetVersion":
      `A version tag which maches an available tag for the module on deno.land/x. Default: latest`,
  };

  public handle(): void {
    const cliName = this.argument(`cliName`);
    const dryRun = this.argument(`dryRun`) ?? false;
    const force = this.argument(`force`) ?? false;
    const targetVersion = this.argument(`targetVersion`) ?? `latest`;

    //TODO: Throw error when cliName is undefined!
  }
}
