import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function retrievesStripePlan(context, input) {
  // console.log("Hello here", input);
  const customersResponse = await stripe.prices.retrieve(
    input
  );
  console.log("customersResponse", customersResponse);
  return customersResponse
}
