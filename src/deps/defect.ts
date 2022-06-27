/**
 * Custom errors made simple - From thenativeweb
 * Better handling of exceptions by using Result wrappers and real custom errors
 */
export * from "https://cdn.skypack.dev/defekt@9.2.0?dts";

// TODO: Try to figure out the typing
// import { defekt, error } from "https://cdn.skypack.dev/defekt@9.2.0?dts";

// type DefectType = ReturnType<typeof defekt>;
// type ErrorParams = ConstructorParameters<DefectType>;

// export function customError(clazz: DefectType, params: ErrorParams) {
//   const errorInstance = new clazz(params);

//   return error(errorInstance);
// }
