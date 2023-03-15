import {
  GraphQLError,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { SessionType } from "../../TypeDefs/Session";
import fetch from "cross-fetch";
import {
  fetchToken,
  getUserDiscordData,
  getUserDiscordServers,
  initiateSession,
  userLogout,
} from "./functions";
import { MessageType } from "../../TypeDefs/Messages";
import { getSession } from "../../Authentication";
import { DiscordServer, DiscordUser } from "../../TypeDefs/Discord";

export enum DISCORD_ERROR {
  INVALID_REQUEST = "invalid_request",
  RATE_LIMIT = "You are being rate limited.",
}

export const DISCORD_API_LOGIN = {
  type: SessionType || MessageType,
  args: {
    code: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(post: any, args: any, context: any) {
    const { code } = args;

    try {
      const oauth = await fetchToken(code);

      const oauthData = await oauth.json();

      if (oauthData.error) return new GraphQLError(oauthData.error);
      else {
        const result = await fetch("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
          },
        });

        const data = await result.json();

        if (data) {
          return initiateSession(
            data.id,
            oauthData.access_token,
            oauthData.token_type
          );
        } else
          throw new GraphQLError("An unknown error occured, please try again.");
      }
    } catch (err) {
      console.error(err);
      throw new GraphQLError("An unknown error occured, please try again.");
    }
  },
};

export const USER_LOGOUT = {
  type: MessageType,
  args: {},
  async resolve(parent: any, args: any, context: any) {
    const session = await getSession(context.authorization);
    if (!session) return new Error("invalid_session");

    const logout = await userLogout(session);

    if (logout) return { error: false, message: "logout_success" };
    else return new Error("logout_error");
  },
};

export const GET_USER_OWNER_SERVERS = {
  type: new GraphQLList(DiscordServer),
  args: {},
  async resolve(parent: any, args: any, context: any) {
    const session = await getSession(context.authorization);
    if (!session) return new Error("invalid_session");

    const data = await getUserDiscordServers(session);

    return data.filter((server: any) => {
      if (server.owner) return server;
    });
  },
};

export const GET_USER_DISCORD_DATA = {
  type: DiscordUser,
  args: {},
  async resolve(parent: any, args: any, context: any) {
    const session = await getSession(context.authorization);
    if (!session) return new Error("invalid_session");

    const data = await getUserDiscordData(session);

    return data;
  },
};
