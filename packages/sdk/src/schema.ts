import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import linearSchema from "./linearSchema";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: linearSchema
});

export default schema;
