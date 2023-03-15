import { env } from "../../environment";
import { Sessions } from "../Entities/Sessions";
import { getUserDiscordServers } from "../Schema/Discord/functions";

export type AuthorizationData = {
  user_id?: string;
  server_id?: string;
};

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export default async function isAuthorized(
  role: string,
  token: string,
  { user_id, server_id }: AuthorizationData
) {
  if (!token) return false;
  if (token === env.API_SECRET) return true;

  const session = await Sessions.findOne({
    access_token: token,
  });

  if (!session) return false;
  if (session?.user_id === env.BOT_OWNER_ID) return true;
  if (user_id === session?.user_id && role === ROLES.USER) return true;
  if (server_id) {
    const userServers = await getUserDiscordServers(session);
    if (
      userServers.some((server: any) => server.id === server_id) &&
      role === ROLES.USER
    )
      return true;
  }
  return false;
}

export function getSession(token: string) {
  return Sessions.findOne({
    access_token: token,
  });
}
