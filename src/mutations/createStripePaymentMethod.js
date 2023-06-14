import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function createStripePaymentMethod(context, input) {
    console.log("input mutation ", input);
    const { billingDetails, card } = input;
    // if (billingDetails) {
    //     const { email, name, phone } = billingDetails;
    // }
  
    const {
        cardNumber,
        brand,
        checks,
        country,
        expMonth,
        expYear,
        fingerprint,
        funding,
        last4,
        networks,
        threeDSecureUsage,
    } = card;
    const { cvcCheck } = checks;
    const { available } = networks;
    const { supported } = threeDSecureUsage;
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
            number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvcCheck,
        }, 
        
    });
    console.log("paymentMethod ", paymentMethod);
    return paymentMethod
}
