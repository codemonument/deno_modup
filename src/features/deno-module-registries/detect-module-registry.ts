import { DenoModuleRegistry } from "./deno-module-registry.type.ts";
import { DenoLandRegistry } from "./deno.land.registry.ts";
import { NestLandRegistry } from "./nest.land.registry.ts";

/**
 * Detects a deno module registry based on the url of a module
 */
export function detectModuleRegistry(
  urlInput: string | URL,
): DenoModuleRegistry {
  const url = (typeof urlInput === "string") ? new URL(urlInput) : urlInput;

  switch (url.hostname) {
    case DenoLandRegistry.hostname:
      return new DenoLandRegistry();
    case NestLandRegistry.hostname:
      return new NestLandRegistry();
    default:
      throw new Deno.errors.NotSupported(
        `Unsupported deno registry used in moduleURL: ${url.toString()}`,
      );
  }
}
