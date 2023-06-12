import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);
export default async function createStripeProduct(context, input) {
    // console.log("input mutation ", input);
    const { name, active, description } = input
    const productResponse = await stripe.products.create({
        name: name,
        active: active,
        description: description
    });
    // console.log("productResponse ", productResponse);
    return productResponse
}