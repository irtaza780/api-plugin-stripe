import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripePaymentMethod(context, input) {
    // console.log(input);
    const retrievePaymentMethod = await stripe.paymentMethods.retrieve(
        input
    );
    // console.log("Hello", retrievePaymentMethod);
    return retrievePaymentMethod;
}
