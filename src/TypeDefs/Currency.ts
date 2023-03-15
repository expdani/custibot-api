import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";
import { GraphQLEnumType } from "graphql";

export const CurrencyEnumType = new GraphQLEnumType({
  name: "CurrencyEnum",
  values: {
    WALLET: {
      value: "wallet",
    },
    BANK: {
      value: "bank",
    },
  },
});

export const CurrencyType = new GraphQLObjectType({
  name: "Currency",
  fields: () => ({
    user_id: { type: GraphQLString },
    bank: { type: GraphQLFloat },
    wallet: { type: GraphQLFloat },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
