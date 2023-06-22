import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import ReactionError from "@reactioncommerce/reaction-error";

export default async function attachPaymentMethodToCustomer(context, input) {
  const { PaymentID, customerID } = input;
  const attachPaymentMethodToCustomerResp = await stripe.paymentMethods.attach(
    PaymentID,
    { customer: customerID }
  );
  console.log(
    "attachPaymentMethodToCustomerResp ",
    attachPaymentMethodToCustomerResp
  );
  if (attachPaymentMethodToCustomerResp) {
    return attachPaymentMethodToCustomerResp;
  } else {
    throw new ReactionError("not-found", "Record not found");
  }
}
