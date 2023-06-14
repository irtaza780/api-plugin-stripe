import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);
export default async function cancelStripePayout(context, input) {
    // console.log("Hello here", input);
    const customersResponse = await stripe.payouts.cancel(
        input
    );
    console.log("customersResponse", customersResponse);
    return customersResponse

}