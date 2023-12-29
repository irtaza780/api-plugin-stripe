import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import sendMembershipNotification from "../utils/sendMembershipNotification.js";
import _ from "lodash";

var _context = null;

function stripeStartup(context) {
  _context = context;
  const { app, collections, rootUrl, userId, authToken } = context;

  // console.log("app ", app);
  app.expressApp.use(cors());
  app.expressApp.use(bodyParser.json());
  app.expressApp.use(bodyParser.urlencoded({ extended: true }));
  app.expressApp.use(morgan("dev"));
  if (app.expressApp) {
    app.expressApp.post("/stripe", async (req, res) => {
      console.log("res is ", req.body);
      // list of relevant events

      // use this event to determine payment success
      const paymentSucceeded = "invoice.payment_succeeded";

      const subscriptionCreated = "customer.subscription.created";

      const checkoutCompleted = "checkout.session.completed";

      const requestType = req.body.type;

      // const subscriptionId = req.body.data.object.subscription;

      if (requestType === checkoutCompleted) {
        const subscriptionId = req.body.data.object.subscription;
        const { subscriptionType, userId } = req.body.data.object.metadata;
        const input = {
          subscriptionId,
          subscriptionType,
          userId,
        };
        await context.mutations.createStripeCustomerFromWebhookCall(
          context,
          input
        );
      }

      if (requestType === paymentSucceeded) {
        const subscriptionId = req.body.data.object.subscription;
        const paymentStatus = true;
        const input = {
          subscriptionId,
          paymentStatus,
        };
        await context.mutations.createStripeCustomerFromWebhookCall(
          context,
          input
        );
      }

      if (requestType === subscriptionCreated) {
        let input = {};
        const data = req.body.data.object;
        input["subscriptionId"] = data.id;
        input["plan"] = data.plan;
        input["startDate"] = data.start_date;
        input["trialEnd"] = data.trial_end;
        input["trialStart"] = data.trial_start;
        input["customer"] = data.customer;
        input["latestInvoice"] = data.latest_invoice;

        await context.mutations.createStripeCustomerFromWebhookCall(
          context,
          input
        );
      }

      res.status(200).send({
        message: "Stripe success",
      });
    });
  }
}

function stripeConnectStartup(context) {
  _context = context;
  const { app, collections, rootUrl, userId, authToken } = context;

  app.expressApp.use(cors());
  app.expressApp.use(bodyParser.json());
  app.expressApp.use(bodyParser.urlencoded({ extended: true }));
  app.expressApp.use(morgan("dev"));
  if (app.expressApp) {
    app.expressApp.post("/stripe-connect", async (req, res) => {
      console.log("res is ", req.body);

      // list of relevant events

      const stripeConnectAccountCreated = "account.external_account.created";
      const stripeAccountUpdated = "account.updated";
      const stripeConnectExternalAccountCreated =
        "account.external_account.created";
      const requestType = req.body.type;

      const requestObject = req?.body?.data?.object;

      const metadata = requestObject?.metadata;

      if (requestType === stripeAccountUpdated && !_.isEmpty(metadata)) {
        const accountId = requestObject?.id;
        const { userId } = metadata;

        context.mutations.createStripeConnectAccount(context, {
          accountId,
          userId,
        });
      }

      if (
        requestType === stripeAccountUpdated &&
        requestObject?.payouts_enabled === true
      ) {
        let data = {};
        data["accountId"] = requestObject?.id;
        data["businessProfile"] = requestObject?.business_profile;
        data["capabilities"] = requestObject?.capabilities;
        data["createdAt"] = new Date(requestObject?.created);
        data["loginLinks"] = requestObject?.login_links;
        data["metadata"] = requestObject?.metadata;
        data["requirements"] = requestObject?.requirements;
        data["tosAcceptance"] = requestObject?.tos_acceptance;
        data["payoutsEnabled"] = requestObject?.payouts_enabled;

        context.mutations.createStripeConnectAccount(context, data);
      }

      res.status(200).send({
        message: "Stripe Connect success",
      });
    });
  }
}

function subscriptionStartup(context) {
  const { appEvents } = context;
  appEvents.on("afterMembershipSubscription", ({ subscriptionId }) =>
    sendMembershipNotification(context, subscriptionId)
  );
}

const startupFunctions = [
  stripeStartup,
  stripeConnectStartup,
  subscriptionStartup,
];

export default startupFunctions;
