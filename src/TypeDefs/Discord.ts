import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

export const DiscordServer = new GraphQLObjectType({
  name: "DiscordServer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    owner: { type: GraphQLBoolean },
    permissions: { type: GraphQLString },
    features: { type: GraphQLJSON },
  }),
});

export const DiscordUser = new GraphQLObjectType({
  name: "DiscordUser",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    discriminator: { type: GraphQLString },
    avatar: { type: GraphQLString },
    verified: { type: GraphQLBoolean },
    banner: { type: GraphQLString },
    banner_color: { type: GraphQLString },
    accent_color: { type: GraphQLString },
    premium_type: { type: GraphQLInt },
  }),
});
