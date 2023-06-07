import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);

export default async function attachPaymentMethodToCustomer(context, input) {
    // console.log("input ", input)
    const { PaymentID, customerID } = input
    // console.log("PaymentID ", PaymentID);
    // console.log("customerID ", customerID);
    const attachPaymentMethodToCustomerResp = await stripe.paymentMethods.attach(
        PaymentID,
        { customer: customerID }
    );
    console.log("attachPaymentMethodToCustomerResp ", attachPaymentMethodToCustomerResp);
    return attachPaymentMethodToCustomerResp
}
