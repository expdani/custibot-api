import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import GraphQLJSON from "graphql-type-json";

export const BotSettingsType = new GraphQLObjectType({
  name: "BotSettings",
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    settings: { type: GraphQLJSON },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
