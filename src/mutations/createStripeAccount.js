import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function createStripeAccount(context, input) {
  const { email, business_type, country, type } = input;
  // console.log("input real  ", input);
  // console.log("stripe real  ", stripe);
  const stripeAccountResp = await stripe.accounts.create({
    type: type,
    country: country,
    email: email,
  });
  // console.log("stripeAccountResp  ", stripeAccountResp);
  return stripeAccountResp;
}
