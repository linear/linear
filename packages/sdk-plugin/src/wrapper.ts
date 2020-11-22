import c from "./constants";
import { printDocBlock } from "./print";

/**
 * Get the sdk wrapper type and default
 */
export function getSdkWrapper(): string {
  return `
    ${printDocBlock(["The type of a Linear sdk wrapper function", "Must call the operation and return the result"])}
    export type ${c.WRAPPER_TYPE} = <T>(action: () => Promise<T>) => Promise<T>;
    
    ${printDocBlock(["Default wrapper to call the operation and return the result"])}
    const ${c.WRAPPER_DEFAULT_NAME}: ${c.WRAPPER_TYPE} = operation => operation();
  `;
}
