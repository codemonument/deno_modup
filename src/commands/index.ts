// Follows the pattern at
// https://github.com/yargs/yargs/blob/main/docs/advanced.md#example-command-hierarchy-using-indexmjs

import * as mainCommand from "./mainCommand.ts";
import * as helpCommand from "./helpCommand.ts";

export const commands = [mainCommand, helpCommand];
