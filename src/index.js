import { createRequire } from "module";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const mySchema = importAsString("./schema/schema.graphql");
import myResolvers from "./resolvers/resolvers.js"
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,

    graphQL: {
      schemas: [mySchema],
      resolvers: myResolvers,
    },
  });
}
export default register;
