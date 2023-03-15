import { KarmaTotal } from "../../Entities/KarmaTotal";

export async function initiateKarmaTotal(
  user_id: string,
  server_id: string,
  karma?: number
) {
  await KarmaTotal.insert({
    user_id,
    server_id,
    total: karma,
  });

  return await KarmaTotal.findOne({
    user_id,
  });
}

export async function getUserKarma(user_id: string, server_id: string) {
  const total = await KarmaTotal.findOne({
    user_id,
    server_id,
  });

  if (total) return total;
  else return await initiateKarmaTotal(user_id, server_id);
}

export async function addKarmaToTotal(
  user_id: string,
  server_id: string,
  karma: number
) {
  const total = await KarmaTotal.findOne({
    user_id,
    server_id,
  });

  if (total) {
    await KarmaTotal.update(
      { user_id, server_id },
      { total: total.total + karma }
    );
    return await KarmaTotal.findOne({
      user_id,
      server_id,
    });
  } else return await initiateKarmaTotal(user_id, server_id, karma);
}
