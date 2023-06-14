import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);
export default async function getAllSubscriptions(context, input) {
    const { StripeSubscription } = context.collections;
    const SubscriptionResponse = await StripeSubscription.find({}).toArray();
    console.log("SubscriptionResponse 63 : ", SubscriptionResponse);
    return SubscriptionResponse
}