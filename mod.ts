import { handler as mainCommandHandler } from "./src/commands/mainCommand.ts";

/**
 * Re-Exports the main command from this cli tool as typescript module to be consumed by other deno scripts
 */
export const modup = mainCommandHandler;
