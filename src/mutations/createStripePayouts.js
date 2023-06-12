import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);
export default async function createStripePayouts(context, input) {
    console.log("input mutation ", input);
    const {
        amount,
        currency,
        description,
        source_type,
        method,
        reconciliation_status,
        payoutsType,
        payoutsStatus
    } = input
    const payout = await stripe.payouts.create({
        amount: amount,
        currency: currency,
        description: description,
        source_type: source_type,
        method: method,
        // reconciliation_status: reconciliation_status,
        // type: payoutsType,
        // status: payoutsStatus
    });
    console.log("Payouts ", payout)
}