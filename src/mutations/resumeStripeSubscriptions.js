import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import ReactionError from "@reactioncommerce/reaction-error";

export default async function resumeStripeSubscriptions(context, input) {
  console.log("input ", input);
  const { id, billingCycle } = input;
  const subscription = await stripe.subscriptions.retrieve(id);
  // const { PaymentID } = input
  console.log("id ", id);
  console.log("billingCycle ", billingCycle);

  if (subscription) {
    const subscriptionResumeResponse = await stripe.subscriptions.update(id, {
      billing_cycle_anchor: billingCycle,
    });
    console.log("subscriptionResumeResponse ", subscriptionResumeResponse);
    if (subscriptionResumeResponse) {
      return {
        status: true,
        message: "Your active subscription has been Updated.",
        stripeData: subscriptionResumeResponse,
      };
    }
  } else {
    throw new ReactionError("not-found", "subscription not found");
  }
  //   return paymentMethod;
}
