import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// const localhost_url = process.env.LOCALHOST_URL;
// const production_url = process.env.PRODUCTION_URL;

export default async function createStripeCheckOutSession(context, input) {
  console.log("input", input);
  const { priceId, quantity } = input;
  let url;
  if (process.env.ENVIRONMENT === "production") {
    url = process.env.PRODUCTION_URL;
  } else if (process.env.ENVIRONMENT === "localhost") {
    url = process.env.LOCALHOST_URL;
  }
  console.log("url ", url);
  const sessionResponse = await stripe.checkout.sessions.create({
    success_url: url,
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
