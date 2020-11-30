import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, nonNullable } from "@linear/common";
import autoBind from "auto-bind";
import {
  DocumentNode,
  FieldDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
} from "graphql";
import { Named, NamedFields, Scalars } from "./types";

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class FragmentVisitor {
  private _scalars: Scalars = DEFAULT_SCALARS;
  private _fragments: NamedFields<ObjectTypeDefinitionNode>[] = [];
  private _objects: ObjectTypeDefinitionNode[] = [];

  /** Initialise the visitor */
  public constructor() {
    autoBind(this);
  }

  public get scalars(): Scalars {
    return this._scalars;
  }

  public get fragments(): NamedFields<ObjectTypeDefinitionNode>[] {
    return this._fragments;
  }

  public get objects(): ObjectTypeDefinitionNode[] {
    return this._objects;
  }

  public ScalarTypeDefinition = {
    _scalars: this._scalars,
    /** Record all scalars */
    enter(node: ScalarTypeDefinitionNode): ScalarTypeDefinitionNode {
      this._scalars = { ...this._scalars, [node.name.value]: node.name.value };
      return node;
    },
  };

  public Document = {
    /** Join all string definitions */
    leave(node: DocumentNode): string {
      return filterJoin(
        (node.definitions ?? []).map(x => (typeof x === "string" ? x : ``)),
        "\n"
      );
    },
  };

  public ObjectTypeDefinition = {
    _fragments: this._fragments,
    _objects: this._objects,
    /** Record all object types */
    enter(node: ObjectTypeDefinitionNode): ObjectTypeDefinitionNode {
      this._objects = [...this._objects, node];
      return node;
    },
    /** Print a fragment if there are fields */
    leave(_node: ObjectTypeDefinitionNode): string | null {
      const node = (_node as unknown) as NamedFields<ObjectTypeDefinitionNode>;
      const hasFields = (node.fields ?? []).filter(x => Boolean(x && x !== "cursor")).length;

      if (hasFields) {
        this._fragments = [...this._fragments, node];
        return filterJoin(
          [
            `fragment ${node.name} on ${node.name} {
              ${filterJoin(node.fields, "\n")}
            }`,
          ],
          "\n"
        );
      }

      return null;
    },
  };

  public FieldDefinition = {
    _scalars: this._scalars,
    /** Print field name if it is a scalar */
    leave(_node: FieldDefinitionNode): string | null {
      const node = (_node as unknown) as Named<FieldDefinitionNode>;
      return Object.values(this._scalars).includes(node.type) ? node.name : null;
    },
  };

  public Name = {
    /** Print name value */
    leave(node: NameNode): string {
      return node.value;
    },
  };

  public NamedType = {
    /** Print type value using scalar map */
    _scalars: this._scalars,
    leave(_node: NamedTypeNode): string {
      const node = (_node as unknown) as Named<NamedTypeNode>;
      return this._scalars[node.name] ?? node.name;
    },
  };

  public NonNullType = {
    leave(node: NonNullTypeNode, _: unknown, parent?: unknown): NamedTypeNode | NonNullTypeNode | ListTypeNode {
      return nonNullable(parent) ? node.type : node;
    },
  };
}
