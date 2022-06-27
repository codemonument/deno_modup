import { which } from "../../deps/which.ts";
import { error, Result, value } from "../../deps/defect.ts";
import { ShimNotFound } from "../../errors/ShimNotFound.ts";

/**
 * @param cliName The name of the cli shim to search for
 */
export async function findCommandShim(
  cliName: string,
): Promise<Result<string, ShimNotFound>> {
  const commandFilePath = await which(cliName);

  if (commandFilePath === undefined) {
    return error(
      new ShimNotFound({
        message:
          `Script file for command "${cliName}" could not be found! This should not happen, if the cli is callable manually!`,
      }),
    );
  }

  return value(commandFilePath);
}
