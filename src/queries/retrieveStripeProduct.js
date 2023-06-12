import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripeProduct(context, input) {
    console.log(input);
    const { id } = input
    const customerResponseProduct = await stripe.products.retrieve(
        id
    );
    console.log("Hello", customerResponseProduct);
    return customerResponseProduct;
}
