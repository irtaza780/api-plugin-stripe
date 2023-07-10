import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function createStripeCheckOutSession(context, input) {
  console.log("input", input);
  const { priceId, quantity } = input;
  const sessionResponse = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/graphql/success",
    line_items: [{ price: priceId, quantity: quantity }],
    mode: "subscription",
  });
  console.log("session response ", sessionResponse);
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
