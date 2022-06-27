import { Line } from "../deps/line.ts";

export class HelpCommand extends Line.Subcommand {
  public signature = "help";
  public description = "Shows this help message";
  public arguments = {};
  public options = {};

  public handle() {
    this.main_command.showHelp();
  }
}
