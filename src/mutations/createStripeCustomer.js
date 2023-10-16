import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function createStripeCustomer(context, input) {
  // console.log("input mutation ", input)
  // const { StripeSubscription } = context;
  const {
    name,
    email,
    description,
    address,
    balance,
    created,
    currency,
    default_source,
    invoice_prefix,
    phone,
  } = input;
  const { line1, line2, city, state, postal_code, country } = address || {
    line1: null,
    line2: null,
    city: null,
    state: null,
    postal_code: null,
    country: null,
  };

  const stripeCustomer = await stripe.customers.create({
    name,
    email,
    description,
    address: {
      line1,
      line2,
      city,
      state,
      postal_code,
      country,
    },
    balance,
    created,
    currency,
    default_source,
    invoice_prefix,
    phone,
  });
  console.log("customer ", stripeCustomer);

  const setupIntent = await stripe.setupIntents.create({
    customer: stripeCustomer.id,
  });

  console.log("SetupIntent is ", setupIntent);

  return stripeCustomer;
}
