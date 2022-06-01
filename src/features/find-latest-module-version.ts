import { parseDenoModuleUrl } from "./parse-deno-module-url.ts";

export async function findLatestModuleVersion(urlInput: string | URL) {
  const moduleUrl = (typeof urlInput === "string")
    ? new URL(urlInput)
    : urlInput;
  const res = await fetch(moduleUrl.toString(), { redirect: "manual" });

  // Extract the location header from the response
  const newLocation = res.headers.get("location");
  if (res.status !== 302 || newLocation === null) {
    throw new Deno.errors.InvalidData(
      `Response from ${moduleUrl} is not a redirect response or doesn't contain a location header!`,
    );
  }

  // Throw away the body, not needed
  res.body?.cancel();
  const { moduleVersion } = parseDenoModuleUrl(new URL(newLocation, moduleUrl));

  return moduleVersion;
}
