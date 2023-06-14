import resolvers from "./resolvers/index.js";
import pkg from "../package.json";
import schemas from "./schemas/index.js";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
var _context = null;


function myStartup(context) {
  _context = context;
  const { app, collections, rootUrl } = context;
  // console.log("app ", app);
  app.expressApp.use(cors());
  app.expressApp.use(bodyParser.json());
  app.expressApp.use(bodyParser.urlencoded({ extended: true }));
  app.expressApp.use(morgan("dev"));
  if (app.expressApp) {
    // console.log("app ", app.expressApp);
    // console.log("if check")
    // app.expressApp.use(fileUpload());
    app.expressApp.post("/api", async (req, res) => {
      console.log("req.body ", req.body)
      // console.log("here");
      res.status(200).send({
        message: "This is message"
      })
    })
  }

}

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
      }
    },
    functionsByType: {
      startup: [myStartup],
    },
    graphQL: {
      resolvers,
      schemas,
    },
    mutations,
    queries,
  });
}
