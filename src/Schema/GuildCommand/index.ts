import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { GuildCommand, GuildCommands } from "../../Entities/GuildCommands";
import {
  GuildCommandType,
  SingleGuildCommandType,
} from "../../TypeDefs/GuildCommand";

export const GET_ALL_GUILD_COMMANDS = {
  type: new GraphQLList(GuildCommandType),
  args: {},
  async resolve(parent: any, args: any, context: any) {
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return await GuildCommands.find({});
  },
};

export const GET_GUILD_COMMANDS = {
  type: new GraphQLList(GuildCommandType),
  args: {
    server_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { server_id } = args;
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return await GuildCommands.find({
      where: { server_id },
    });
  },
};

export const GET_SINGLE_GUILD_COMMAND = {
  type: SingleGuildCommandType,
  args: {
    server_id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { server_id, name } = args;
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    const guild = await GuildCommands.findOne({
      where: { server_id },
    });

    const commands = guild?.commands || [];
    const command = commands.filter(
      (command: GuildCommand) => command.name === args.name
    )[0];
    return {
      server_id: guild?.server_id,
      name: command?.name,
      command,
    };
  },
};
