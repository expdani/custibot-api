import { Sessions } from "../../Entities/Sessions";
import crypto from "crypto";
import * as config from "../../../config.json";
import uuid from "node-uuid";
import { env } from "../../../environment";
import fetch from "cross-fetch";
import { DISCORD_ERROR } from ".";
import delay from "../../Utils/delay";
import { TypeSession } from "../../Discord";

export async function initiateSession(
  user_id: string,
  discord_token: string,
  discord_type: string
) {
  const access_token = crypto
    .createHash("sha256")
    .update(uuid.v1())
    .update(crypto.randomBytes(256))
    .digest("hex");

  await Sessions.insert({
    access_token,
    user_id,
    discord_token,
    discord_type,
  });

  return await Sessions.findOne({
    access_token,
  });
}

export async function userLogout(session: TypeSession) {
  await Sessions.delete({
    access_token: session.access_token,
    user_id: session.user_id,
  });

  return true;
}

export async function fetchToken(code: string) {
  const body = new URLSearchParams({
    client_id: config.oauth.clientId,
    code: code as string,
    client_secret: env.CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: config.oauth.callbackURL,
    scope: config.oauth.scopes.join(" "),
  });

  const oauth = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return oauth;
}

export async function getUserDiscordServers(
  session: any,
  retry?: number
): Promise<any> {
  if (retry) await delay(retry ? retry : 1000);
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      authorization: `${session.discord_type} ${session.discord_token}`,
    },
  });

  const data = await response.json();

  if (data.message === DISCORD_ERROR.RATE_LIMIT) {
    return await getUserDiscordServers(session, data.retry_after);
  } else {
    return data;
  }
}

export async function getUserDiscordData(
  session: any,
  retry?: number
): Promise<any> {
  if (retry) await delay(retry ? retry : 1000);
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${session.discord_type} ${session.discord_token}`,
    },
  });

  const data = await response.json();

  if (data.message === DISCORD_ERROR.RATE_LIMIT) {
    return await getUserDiscordData(session, data.retry_after);
  } else {
    return data;
  }
}
