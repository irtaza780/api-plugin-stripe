import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);
export default async function deleteStripeProduct(context, id) {

    // console.log("data ", id);
    const deleted = await stripe.products.del(
        id
    );
    // console.log(deletedCustomerResponse);
    return deleted
}