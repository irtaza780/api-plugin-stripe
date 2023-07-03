import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripePaymentIntentById(context, input) {
  console.log(input);

  const customerResponse = await stripe.paymentIntents.retrieve(input);
  console.log("customerResponse", customerResponse);
  if (customerResponse) {
    return {
      status: true,
      message: "Customer fetched successfully",
      data: customerResponse,
    };
  } else {
    return {
      status: false,
      message: "Not Found",
      data: null,
    };
  }
}
