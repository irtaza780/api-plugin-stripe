import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import sendMembershipNotification from "../utils/sendMembershipNotification.js";

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

function subscriptionStartup(context) {
  const { appEvents } = context;
  appEvents.on(
    "afterMembershipSubscription",
    ({ subscriptionId }) =>
      // console.log("subscription Id in startup", subscriptionId)
    sendMembershipNotification(context, subscriptionId)
  );
}

const startupFunctions = [stripeStartup, subscriptionStartup];

export default startupFunctions;
