import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripeListAllProduct(context, input) {
    // console.log(input);

    const retrieveStripeListAllProduct = await stripe.products.list({
        limit: input,
    });
    // console.log("retrieveStripeListAllProduct", retrieveStripeListAllProduct);
    return retrieveStripeListAllProduct.data;
}
