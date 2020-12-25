/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import * as D from "./documents";
export * from "./documents";

/**
 * The function type for calling the graphql client
 */
export type LinearRequester<O = {}> = <R, V>(doc: DocumentNode, vars?: V, opts?: O) => Promise<R>;
