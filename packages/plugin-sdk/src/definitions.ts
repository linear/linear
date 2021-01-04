import { DefinitionNode } from "graphql";
import { SdkChainType, SdkChildOperation, SdkOperationDefinition } from "./operation";

/*
 * Get a list of all type definitions
 */
export function getDefinitionsFromVisitorResult(visitorResult: unknown): string[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((visitorResult as any)?.definitions ?? []).filter((t: unknown) => typeof t === "string");
}

/**
 * Whether the operation is to be chained inside the chain key api
 */
export function isChildDefinition(d: DefinitionNode): d is SdkChildOperation {
  const o = d as SdkOperationDefinition;
  return Boolean(o.chainType === SdkChainType.child && o.chainKey);
}
