import { Line } from "../deps/line.ts";

export class MainCommand extends Line.MainCommand {
  public signature = "modup <cliName>";

  public handle(): void {
    const name = this.argument("name")!;
    console.log(`Hello, ${name}!`);
  }
}
