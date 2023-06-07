import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);
export default async function getAllStripeCustomer(context, input) {
    // console.log("Hello here", input);
    const customersResponse = await stripe.customers.list({
        limit: input,
    });
    // console.log("customersResponse", customersResponse.data);
    return customersResponse.data

}