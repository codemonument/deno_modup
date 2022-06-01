export function parseDenoModuleUrl(urlInput: string | URL) {
  const url = (typeof urlInput === "string") ? new URL(urlInput) : urlInput;

  // important: filename can be placed in some subfolder! (therefore the rest param for filepath)
  const [_, _denoX, moduleAndVersion, ...filepath] = url.pathname
    .split("/");
  const [moduleName, moduleVersion] = moduleAndVersion.split("@");
  const filename = filepath.at(-1);

  return {
    origURL: url,
    moduleName,
    moduleVersion,
    filepath,
    filename,
  };
}
