import express from "express";
import * as config from "../../config.json";

/**
 * @type a session.
 */
export type TypeSession = {
  access_token: string;
  discord_token: string;
  discord_type: string;
  user_id: string;
  created_at: Date;
};

const router = express.Router();

router.get("/login", async (_req: express.Request, res: express.Response) => {
  res.redirect(
    `https://discord.com/api/oauth2/authorize` +
      `?client_id=${config.oauth.clientId}` +
      `&redirect_uri=${encodeURIComponent(config.oauth.callbackURL)}` +
      `&response_type=code&scope=${encodeURIComponent(
        config.oauth.scopes.join(" ")
      )}`
  );
});

router.get("/callback", async (req: express.Request, res: express.Response) => {
  const code = await req.query.code;
  res.send(code);
});

export default router;
