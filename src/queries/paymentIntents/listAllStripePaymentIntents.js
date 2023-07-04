import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function listAllStripePaymentIntents(context, input) {
  console.log(input);

  const customerResponse = await stripe.paymentIntents.list({
    limit: input,
  });
  console.log("customerResponse", customerResponse.data);
  if (customerResponse) {
    return {
      status: true,
      message: "Customer fetched successfully",
      data: customerResponse.data,
    };
  } else {
    return {
      status: false,
      message: "Not Found",
      data: null,
    };
  }
}
