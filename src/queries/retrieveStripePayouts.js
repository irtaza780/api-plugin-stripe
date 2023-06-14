import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripePayouts(context, input) {
    console.log(input);

    const retrieveStripePayoutsResponse = await stripe.payouts.retrieve(
        input
    );
    console.log("retrieveStripe Payouts Response", retrieveStripePayoutsResponse);
    return retrieveStripePayoutsResponse;
}
