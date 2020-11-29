import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, nonNullable } from "@linear/common";
import autoBind from "auto-bind";
import {
  DocumentNode,
  FieldDefinitionNode,
  InputObjectTypeDefinitionNode,
  InputValueDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
} from "graphql";

export interface DocFieldNode extends FieldDefinitionNode {
  nonNullable?: boolean;
}

export type DocField = string | undefined;

export interface DocObjectType extends Omit<ObjectTypeDefinitionNode, "name" | "fields"> {
  name: string;
  fields: DocField[];
}

export interface DocNamedTypeNode extends Omit<NamedTypeNode, "name"> {
  name: string;
}

/**
 * Graphql-codegen visitor for processing the ast and generating documents
 */
export class DocVisitor {
  private _scalars: typeof DEFAULT_SCALARS = DEFAULT_SCALARS;

  /** Initialise the visitor */
  public constructor() {
    autoBind(this);
  }
  public Document = {
    leave(node: DocumentNode): string {
      return filterJoin(
        (node.definitions ?? []).map(x => (typeof x === "string" ? x : ``)),
        "\n"
      );
    },
  };
  public ObjectTypeDefinition = {
    leave(_node: ObjectTypeDefinitionNode): string {
      const node = (_node as unknown) as DocObjectType;
      const hasFields = (node.fields ?? []).filter(Boolean).length;
      return hasFields
        ? `
        fragment ${node.name} on ${node.name} {
          ${filterJoin(node.fields, "\n")}
        }
      `
        : ``;
    },
  };
  public InputObjectTypeDefinition = {
    leave(_node: InputObjectTypeDefinitionNode): string {
      const node = (_node as unknown) as DocObjectType;
      const hasFields = (node.fields ?? []).filter(Boolean).length;
      return hasFields
        ? `
        fragment ${node.name} on ${node.name} {
          ${filterJoin(node.fields, "\n")}
        }
      `
        : ``;
    },
  };
  public FieldDefinition = {
    _scalars: this._scalars,
    leave(_node: FieldDefinitionNode): string {
      const node = (_node as unknown) as FieldDefinitionNode & { type: string; name: string };
      return Object.values(this._scalars).includes(node.type) ? node.name : "";
    },
  };
  public InputValueDefinition = {
    _scalars: this._scalars,
    leave(_node: InputValueDefinitionNode): string {
      const node = (_node as unknown) as InputValueDefinitionNode & { type: string; name: string };
      return Object.values(this._scalars).includes(node.type) ? node.name : "";
    },
  };
  public Name = {
    leave(node: NameNode): string {
      return node.value;
    },
  };
  public NamedType = {
    _scalars: this._scalars,
    leave(_node: NamedTypeNode): string {
      const node = (_node as unknown) as DocNamedTypeNode;
      return this._scalars[node.name] ?? node.name;
    },
  };
  public NonNullType = {
    leave(node: NonNullTypeNode, _: any, parent: any): NamedTypeNode | NonNullTypeNode | ListTypeNode {
      return nonNullable(parent) ? node.type : node;
    },
  };
  // public InterfaceTypeDefinition = {
  //   leave(node: unknown) {
  //     const typedNode = node as { name: string; fields: string[] };

  //     return createDocBlock([createDescriptionBlock(node), `@typedef {Object} ${typedNode.name}`, ...typedNode.fields]);
  //   },
  // };
  // public UnionTypeDefinition = {
  //   leave(node) {
  //     if (node.types !== undefined) {
  //       return createDocBlock([createDescriptionBlock(node), `@typedef {(${node.types.join("|")})} ${node.name}`]);
  //     }

  //     return node;
  //   },
  // };
  // public Directive = {
  //   enter(node) {
  //     if (node.name.value !== "deprecated") {
  //       return null;
  //     }

  //     const reason = node.arguments?.find(arg => arg.name.value === "reason");

  //     if (reason?.value.kind !== "StringValue") {
  //       return null;
  //     }

  //     return ` - DEPRECATED: ${reason.value.value}`;
  //   },
  // };
  // public ListType = {
  //   enter(node) {
  //     if (node.type.kind === "NonNullType") {
  //       return { ...node, nonNullItems: true };
  //     }

  //     return node;
  //   },
  //   leave(node: ListTypeNode & { nonNullItems?: boolean }) {
  //     const type = node.nonNullItems ? node.type : `(${node.type}|null|undefined)`;

  //     return `Array<${type}>`;
  //   },
  // };
  public ScalarTypeDefinition = {
    _scalars: this._scalars,
    enter(node: ScalarTypeDefinitionNode): ScalarTypeDefinitionNode {
      this._scalars = { ...this._scalars, [node.name.value]: [node.name.value] };
      return node;
    },
  };
  // public EnumTypeDefinition = {
  //   leave(node) {
  //     const values = node?.values?.map(value => `"${value.name}"`).join("|");

  //     /** If for some reason the enum does not contain any values we fallback to "any" or "*" */
  //     const valueType = values ? `(${values})` : "*";

  //     return createDocBlock([createDescriptionBlock(node), `@typedef {${valueType}} ${node.name}`]);
  //   },
  // };
  // public OperationDefinition = {
  //   enter() {
  //     /** This plugin currently does not support operations yet. */
  //     return null;
  //   },
  // };
  // public FragmentDefinition = {
  //   enter() {
  //     /** This plugin currently does not support fragments yet. */
  //     return null;
  //   },
  // };
}
