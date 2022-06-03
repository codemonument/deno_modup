// Follows the pattern at
// https://github.com/yargs/yargs/blob/main/docs/advanced.md#example-command-hierarchy-using-indexmjs

import * as mainCommand from "./mainCommand.ts";

export const commands = [mainCommand];
