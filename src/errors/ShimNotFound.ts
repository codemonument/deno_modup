import { defekt } from "../deps/defect.ts";

export class ShimNotFound extends defekt({
  code: "ShimNotFound",
  defaultMessage: `The command shim could not be found`,
}) {}
