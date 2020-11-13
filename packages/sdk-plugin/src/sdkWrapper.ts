import c from "./constants";

/**
 * Get the sdk wrapper type and default
 */
export function getSdkWrapper(): string {
  return `
    export type ${c.WRAPPER_TYPE} = <T>(action: () => Promise<T>) => Promise<T>;
    
    const ${c.WRAPPER_DEFAULT_NAME}: ${c.WRAPPER_TYPE} = sdkFunction => sdkFunction();
  `;
}
