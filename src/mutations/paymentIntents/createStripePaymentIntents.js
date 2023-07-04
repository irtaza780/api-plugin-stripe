import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function createStripePaymentIntents(context, input) {
  console.log("Input ", input);
  // console.log(
  //   "automaticPaymentMethods.enabled ",
  //   automaticPaymentMethods.enabled
  // );
  const {
    amount,
    currency,
    automaticPaymentMethods,
  } = input;
  // const { enabled } = automaticPaymentMethods;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency.toLowerCase(),
    automatic_payment_methods: { enabled: automaticPaymentMethods.enabled },
   
  });
  console.log("paymentIntent", paymentIntent);
  if (paymentIntent) {
    return {
      status: true,
      message: "Payment intent has been updated",
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
