import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

export const GuildCommandType = new GraphQLObjectType({
  name: "GuildCommand",
  fields: () => ({
    server_id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    commands: { type: new GraphQLNonNull(GraphQLJSON) },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

export const SingleGuildCommandType = new GraphQLObjectType({
  name: "SingleGuildCommand",
  fields: () => ({
    server_id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    command: { type: new GraphQLNonNull(GraphQLJSON) },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
