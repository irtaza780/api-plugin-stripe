import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripeCustomerListPaymentMethods(
    context,
    input
) {
    // console.log("input", input);
    const { customerID, type, limit } = input;
    // console.log(customerID);
    // console.log(type)
    // console.log(limit)
    const retrievelistPaymentMethod = await stripe.customers.listPaymentMethods(
        customerID,
        { type: type }
    );
    // console.log("retrievelistPaymentMethod", retrievelistPaymentMethod.data);
    return retrievelistPaymentMethod.data;
}
