import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function updateStripePaymentIntents(context, input, id) {
//   console.log("updatedStripeCustomerResponse ", input);
//   console.log("updatedStripeCustomerResponse ", id);
  const paymentIntent = await stripe.paymentIntents.update(id, input);
  console.log("paymentIntent ", paymentIntent);
  if (paymentIntent) {
    return {
      status: true,
      message: "Payment intent has been update",
      data: paymentIntent,
    };
  } else {
    return {
      status: false,
      message: "Not updated",
      data: null,
    };
  }
}
