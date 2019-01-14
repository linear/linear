import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import linearSchema from "./linearSchema";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: linearSchema
});

export default schema;
