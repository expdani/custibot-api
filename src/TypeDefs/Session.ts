import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export const SessionType = new GraphQLObjectType({
  name: "Session",
  fields: () => ({
    access_token: { type: GraphQLNonNull(GraphQLString) },
    user_id: { type: GraphQLNonNull(GraphQLString) },
    discord_token: { type: GraphQLNonNull(GraphQLString) },
    discord_type: { type: GraphQLNonNull(GraphQLString) },
    created_at: { type: GraphQLString },
  }),
});
