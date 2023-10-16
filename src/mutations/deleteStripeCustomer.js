import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function deleteStripeCustomer(context, id) {
  // console.log("data ", id);
  const deletedCustomerResponse = await stripe.customers.del(id);
  console.log("deleted user is ", deletedCustomerResponse);
  return deletedCustomerResponse;
}
