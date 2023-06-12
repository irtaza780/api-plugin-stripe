import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripeCustomer(context, input) {
    console.log(input);

    const customerResponse = await stripe.customers.retrieve(input);
    // console.log("Hello", customer);
    return customerResponse;
}
