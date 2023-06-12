import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);

export default async function detachPaymentToCustomer(context, input) {
    // console.log("input ", input);
    const { PaymentID } = input
    const paymentMethod = await stripe.paymentMethods.detach(
        PaymentID
    );
    return paymentMethod;
}
