# modup CLI 

A CLI tool named `modup` (like the rustup cli) to upgrade deno module binaries installed from deno.land/x via `deno install`. 
Language: Typescript 
Run via: deno / as portable cli 
Command (currently): codeup.exe

## How to use 


Available at: 
- Deno Main Package: https://deno.land/x/modup
- Deno Secondary Package (for visibility): https://deno.land/x/module_upgrade (also uses modup command)
- Base Git Repo: <https://github.com/codemonument/deno-module-upgrade>

## How to use 

1. Install the package from deno.land/x as cli `modup`:  
   ```
   deno install --allow-read --allow-net --allow-run --allow-env --name modup https://deno.land/x/modup/main.ts
   ```
2. Enjoy modup command! (Run `modup help` to get usage information)
3. Optional: You can change the command to anything you like by simply passing another --name instead of `modup`

## Example 

1. Install `codeup` in a previous version: `deno install --allow-read --allow-write --allow-net --allow-run --allow-env --name codeup https://deno.land/x/codeup@2.0.0-beta.1/main.ts`

2. Run `codeup help` to verify installed version 

3. Install `modup`: `deno install --allow-read --allow-net --allow-run --allow-env --name modup https://deno.land/x/modup`

4. Run `modup codeup` to upgrade codeup to the latest version. 
   See shell output for detailed information.

## ToDos

- add more validation: dno't try to update locally installed modules (with file url) or modules from other places than deno.land/x
- integrate nest.land 
- look into switching from yargs package to https://drash.land/line/v1.x/getting-started/introduction