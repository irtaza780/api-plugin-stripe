import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function getAllStripeSubscribedCustomer(context, input) {
  // console.log("Hello here", input);
  const customersResponse = await stripe.subscriptions.list({
    limit: input,
  });
  console.log("customersResponse", customersResponse);
  // return customersResponse.data
  return {
    status: true,
    message: "Customer Fetched Successfully",
    stripeData: customersResponse.data,
  };
}
