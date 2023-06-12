import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);

export default async function updateStripeProduct(context, input) {
    // console.log("updatedStripeCustomerResponse ", input);
    const {
        id,
        name,
        active,
        description,
    } = input;

    const updates = {};
    if (name) {
        updates["name"] = name;
    }
    if (active) {
        updates["active"] = active;
    }
    if (description) {
        updates["description"] = description;
    }
    const productResponse = await stripe.products.update(
        id,
        updates
    );
    // console.log("productResponse ", productResponse)
    return productResponse

}