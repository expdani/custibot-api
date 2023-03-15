import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  DISCORD_API_LOGIN,
  GET_USER_DISCORD_DATA,
  GET_USER_OWNER_SERVERS,
  USER_LOGOUT,
} from "./Discord";
import {
  GET_ALL_GUILD_COMMANDS,
  GET_SINGLE_GUILD_COMMAND,
} from "./GuildCommand";
import {
  ADD_KARMA,
  GET_SERVER_KARMA_LEADERBOARD,
  GET_USER_KARMA,
} from "./KarmaTotal";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getServerLeaderboard: GET_SERVER_KARMA_LEADERBOARD,
    getUserKarma: GET_USER_KARMA,
    getUserDiscordServers: GET_USER_OWNER_SERVERS,
    getUserDiscordData: GET_USER_DISCORD_DATA,
    getAllGuildCommands: GET_ALL_GUILD_COMMANDS,
    getSingleGuildCommand: GET_SINGLE_GUILD_COMMAND,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addKarma: ADD_KARMA,
    discordLogin: DISCORD_API_LOGIN,
    userLogout: USER_LOGOUT,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
