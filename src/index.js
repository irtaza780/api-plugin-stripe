import resolvers from "./resolvers/index.js";
import pkg from "../package.json";
import schemas from "./schemas/index.js";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";
import _ from "lodash";
import startupFunctions from "./startup/stripeStartup.js";

export default async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    collections: {
      StripeSubscription: {
        name: "StripeSubscription",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
      StripePlans: {
        name: "StripePlans",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
      StripeProducts: {
        name: "StripeProducts",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
    },
    functionsByType: {
      startup: startupFunctions,
    },
    graphQL: {
      resolvers,
      schemas,
    },
    mutations,
    queries,
  });
}
