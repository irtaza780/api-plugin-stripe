import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripeListAllPayouts(context, input) {
    // console.log(input);

    const retrieveStripeListAllPayoutsResponse = await stripe.payouts.list({
        limit: input,
    });
    console.log("retrieveStripeListAllPayoutsResponse", retrieveStripeListAllPayoutsResponse);
    if (retrieveStripeListAllPayoutsResponse.data) {
            return retrieveStripeListAllPayoutsResponse.data;
    }
    else{
        return []
    }
}
