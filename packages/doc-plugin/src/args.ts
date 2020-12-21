import { InputValueDefinitionNode, Kind } from "graphql";

/**
 * Return only the required arguments
 */
export function requiredArgs(args: readonly InputValueDefinitionNode[] = []): InputValueDefinitionNode[] {
  return args.filter(a => a.type.kind === Kind.NON_NULL_TYPE);
}
