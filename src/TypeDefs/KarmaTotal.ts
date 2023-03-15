import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

export const KarmaTotalType = new GraphQLObjectType({
  name: "KarmaTotal",
  fields: () => ({
    user_id: { type: GraphQLString },
    server_id: { type: GraphQLString },
    total: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
