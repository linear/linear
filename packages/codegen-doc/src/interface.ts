import { InterfaceTypeDefinitionNode, Kind, NonNullTypeNode, ObjectTypeDefinitionNode } from "graphql";
import { NamedTypeNode } from "graphql/language/ast";

/**
 * Checks if an interface implementation has conflicting types with its parent definition.
 * @param implementation The implementation to check
 * @param interfaces The interfaces to check against
 */
export function conflictsWithInterfaceDefinition(
  implementation: ObjectTypeDefinitionNode,
  interfaces: InterfaceTypeDefinitionNode[]
): boolean {
  if (implementation.interfaces && implementation.fields) {
    for (const i of implementation.interfaces) {
      const interfaceFields = interfaces
        .find(interfaceDefinition => interfaceDefinition.name.value === i.name.value)
        ?.fields?.reduce((acc, field) => {
          return {
            ...acc,
            [field.name.value]: field.type,
          };
        }, {});

      for (const field of implementation.fields) {
        const interfaceField = interfaceFields?.[field.name.value];
        if (interfaceField) {
          if (interfaceField.kind !== field.type.kind) {
            return true;
          }

          switch (interfaceField.kind) {
            case Kind.NAMED_TYPE:
              if (interfaceField.name.value !== (field.type as NamedTypeNode).name.value) {
                return true;
              }
              break;
            case Kind.NON_NULL_TYPE:
              if (
                interfaceField.type.name.value !== ((field.type as NonNullTypeNode).type as NamedTypeNode).name.value
              ) {
                return true;
              }
            default:
              break;
          }
        }
      }
    }
  }

  return false;
}
