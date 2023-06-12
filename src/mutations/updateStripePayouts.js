import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);

export default async function updateStripePayouts(context, input) {
    console.log("updatedStripeCustomerResponse ", input);
    const {
        id,
        amount,
        currency,
        description,
        source_type,
        method
    } = input;

    const updates = {};
    if (amount) {
        updates["amount"] = amount;
    }
    if (currency) {
        updates["currency"] = currency;
    }
    if (description) {
        updates["description"] = description;
    }
    if (method) {
        updates["method"] = method;
    }
    if (source_type) {
        updates["source_type"] = source_type;
    }
    const payoutResponse = await stripe.payouts.update(
        id,
        updates
    );
    // console.log("productResponse ", productResponse)
    return payoutResponse

}