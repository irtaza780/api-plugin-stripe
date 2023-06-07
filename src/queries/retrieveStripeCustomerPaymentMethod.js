import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveStripeCustomerPaymentMethod(context, input) {
    console.log(input);
    const { PaymentID, customerID } = input
    const retrieveStripeCustomerPaymentMethodResponse = await stripe.customers.retrievePaymentMethod(
        'cus_MvrYjXhyMEt31O',
        'pm_1NGF6PFND4KVo5J8KXDH9lr4'
    );
    console.log("Hello", retrieveStripeCustomerPaymentMethodResponse);
    // return retrieveStripeCustomerPaymentMethodResponse;
}
