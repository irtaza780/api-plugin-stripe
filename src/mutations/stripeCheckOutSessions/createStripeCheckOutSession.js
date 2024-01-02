import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import ReactionError from "@reactioncommerce/reaction-error";

export default async function createStripeCheckOutSession(context, input) {
  const { userId, authToken } = context;

  if (!userId || !authToken)
    throw new ReactionError("access-denied", "Access Denied");

  const { priceId, quantity, mode, subscriptionType } = input;
  let url;
  if (process.env.ENVIRONMENT === "production") {
    url = process.env.BASE_URL;
  } else if (process.env.ENVIRONMENT === "localhost") {
    url = process.env.LOCALHOST_URL;
  }

  if (mode === "subscription") {
    url = `${url}/successful-subscription`;
  } else if (mode === "payment") {
    url = `${url}/order-placed`;
  }

  const sessionResponse = await stripe.checkout.sessions.create({
    success_url: url,
    line_items: [{ price: priceId, quantity: quantity }],
    mode: mode,
    metadata: { subscriptionType, userId },
  });

  if (sessionResponse) {
    return {
      status: true,
      message: "Session have been created.",
      stripeData: sessionResponse.url,
    };
  } else {
    return {
      status: false,
      message: "Something went wrong.",
      stripeData: null,
    };
  }
}
