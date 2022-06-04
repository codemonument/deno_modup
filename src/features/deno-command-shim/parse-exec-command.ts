import { ExecCommand } from "./exec-command.type.ts";

/**
 * Important: This parser does not do any validation!
 * It simply parses the existing data on best-effort basis.
 *
 * @param execCommand the exec command which should be parsed
 * Example: exec deno run --allow-read=deps.ts --allow-write=deps.ts --allow-net 'https://x.nest.land/dmm@2.1.0/mod.ts' "$@"
 * @returns
 */
export function parseExecCommand(execCommand: string): ExecCommand {
  const commandSplit = execCommand.split(" ");

  const execFlags = commandSplit.filter((section) =>
    !section.startsWith(`exec`) &&
    !section.startsWith(`deno`) &&
    !section.startsWith(`run`) &&
    !section.startsWith(`'http`) &&
    !section.startsWith(`'file`) &&
    !section.startsWith(`"$@"`)
  );

  // get moduleURL
  const commandModuleUrl = commandSplit.find((text) =>
    text.startsWith("'http") ||
    text.startsWith("'file") ||
    text.startsWith("'data")
  );

  if (commandModuleUrl === undefined) {
    throw new Deno.errors.NotFound(
      `parseExecCommand could not find a valid command module url. 
      Valid command moduleURLs start with 'http, 'file or 'data`,
    );
  }

  // Trim single quotes from module url
  const trimmedModuleUrl = commandModuleUrl.slice(1, -1);
  // Convert trimmedModuleURL to URL object
  const sanitizedModuleUrl = new URL(trimmedModuleUrl);

  return {
    execCommand,
    execFlags,
    moduleURL: sanitizedModuleUrl,
  };
}
