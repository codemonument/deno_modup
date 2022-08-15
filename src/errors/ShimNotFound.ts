import { defekt } from "../deps/defekt.ts";

export class ShimNotFound extends defekt({
  code: "ShimNotFound",
  defaultMessage: `The command shim could not be found`,
}) {}
