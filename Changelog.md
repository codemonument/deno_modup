# Changelog 

## 1.1.1 - 2022-8-15 

- Improve Readme & github repo description by listing "@codemonument" in there as a keyword

## 1.1.0 - 2022-06-04

- Re-Export the main command from this cli tool in ./mod.ts as typescript module to be consumed by other deno scripts
- Fix Install command in Readme
- Deactivate '--help' output when an error happens 
- Add validations: 
    - throw error when command url is a file:/// url 
    - throw error when command url host is not supported (currently only deno.land and x.nest.land)
- Rewrite complete core to be more flexible (with abstraction for deno module registries)
- Add support for nest.land repository

## 1.0.0 - 2022-06-01

- Contains the full functionality to upgrade cli tools from deno.land/x 
- Contains install and usage examples in readme

## 0.0.0 - 2022-06-01
*Initial Version*

- Contains the demo cli from https://github.com/codemonument/deno-scripting-template