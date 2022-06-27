import { handler as mainCommandHandler } from "./src/commands/mainCommand.ts";

/**
 * Re-Exports the main command from this cli tool as typescript module to be consumed by other deno scripts
 */
export const modup = mainCommandHandler;

/**
 * Export useful command shim functions
 */
export * from "./src/features/deno-command-shim/find-command-shim.ts";
export * from "./src/features/deno-command-shim/parse-command-shim.ts";
