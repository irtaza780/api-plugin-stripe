import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// import ReactionError from "@reactioncommerce/reaction-error";

export default async function updateStripePaymentMethod(context, input) {
    // console.log("updatedStripeCustomerResponse ", input);
    const { billingDetails, card, id } = input;
    const { address, email, phone, name } = billingDetails;
    const { line1, line2, city, state, postal_code, country } = address || {
        line1: null,
        line2: null,
        city: null,
        state: null,
        postal_code: null,
        country: null,
    };

    const { expMonth, expYear } = card;
    const finalUpdateObj = {};
    const updates = {};
    const cardInput = {};
    const addressUpdate = {};
    finalUpdateObj["billing_details"];
    if (name) {
        updates["name"] = name;
    }
    if (email) {
        updates["email"] = email;
    }
    if (phone) {
        updates["phone"] = phone;
    }
    if (line1) {
        addressUpdate["line1"] = line1;
    }
    if (line2) {
        addressUpdate["line2"] = line2;
    }
    if (city) {
        addressUpdate["city"] = city;
    }
    if (state) {
        addressUpdate["state"] = state;
    }
    if (postal_code) {
        addressUpdate["postal_code"] = postal_code;
    }
    if (country) {
        addressUpdate["country"] = country;
    }
    if (addressUpdate) {
        updates["address"] = addressUpdate;
    }
    if (updates) {
        finalUpdateObj["billing_details"] = updates;
    }
    if (expMonth) {
        cardInput["exp_month"] = expMonth;
    }
    if (expYear) {
        cardInput["exp_year"] = expYear;
    }
    if (cardInput) {
        finalUpdateObj["card"] = cardInput;
    }
    //   console.log("updates ", finalUpdateObj);

    const updatePaymentMethod = await stripe.paymentMethods.update(
        id,
        finalUpdateObj
    );
    //   console.log("updatePaymentMethod ", updatePaymentMethod);
    // console.log("updatePaymentMethod ", updatePaymentMethod);
    return updatePaymentMethod;
}
