import resolvers from "./resolvers/index.js";
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
    queries,
  });
}
