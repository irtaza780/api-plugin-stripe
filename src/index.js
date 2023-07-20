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
    // console.log("if check");
    // app.expressApp.use(fileUpload());
    app.expressApp.post("/api", async (req, res) => {
      // console.log("req.res ", res);
      // console.log("here");
      let customerEmail;
      // if ((req.body.type = "customer.created")) {
      //   customerEmail = req.body.data.object.email;
      // }
      // console.log("customerEmail ", customerEmail);
      if ((req.body.type = "customer.subscription.created")) {
        // if (
        //   req.body.data.object.items.plan != undefined ||
        //   req.body.data.object.items.plan != null
        // ) {
        // console.log("req.body.type: ", req.body.type);
        // console.log(
        //   "req.body.data.object.customer:  ",
        //   req.body.data.object.customer
        // );
        // console.log(
        //   "req.body.data.object.items.plan:  ",
        //   req.body.data.object.plan
        // );
        // console.log("req.body.data.object:  ", req.body.data.object);
        await context.mutations.createStripeCustomerFromWebhookCall(
          context,
          req.body
        );
        // }
      }
      res.status(200).send({
        message: "This is new message",
      });
    });
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
