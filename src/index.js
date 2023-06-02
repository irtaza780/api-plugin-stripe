import { createRequire } from "module";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
import resolvers from "./resolvers/index.js";
// const mySchema = importAsString("./schema/schema.graphql");
const require = createRequire(import.meta.url);
// const pkg = require("../package.json");
import pkg from "../package.json";
import schemas from "./schemas/index.js";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";

export default async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    graphQL: {
      resolvers,
      schemas,
    },
    mutations,
    // queries,
    // graphQL: {
    //   schemas: [mySchema],
    //   resolvers: myResolvers,
    // },
  });
}
