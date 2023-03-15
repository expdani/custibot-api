import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { KarmaTotal } from "../../Entities/KarmaTotal";
import { KarmaTotalType } from "../../TypeDefs/KarmaTotal";
import { addKarmaToTotal, getUserKarma } from "../KarmaTotal/functions";

export const ADD_KARMA = {
  type: KarmaTotalType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    server_id: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { user_id, server_id, amount } = args;
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return addKarmaToTotal(user_id, server_id, amount);
  },
};

export const GET_USER_KARMA = {
  type: KarmaTotalType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    server_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    const { user_id, server_id } = args;

    return getUserKarma(user_id, server_id);
  },
};

export const GET_SERVER_KARMA_LEADERBOARD = {
  type: new GraphQLList(KarmaTotalType),
  args: {
    server_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    const { server_id } = args;

    return await KarmaTotal.find({
      where: { server_id },
      order: {
        total: "DESC",
      },
      take: 10,
    });
  },
};
