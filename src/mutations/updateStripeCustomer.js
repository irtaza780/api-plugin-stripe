import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);

export default async function updateStripeCustomer(context, input) {
    console.log("updatedStripeCustomerResponse ", input);
    const {
        id,
        name,
        email,
        description,
        address,
        balance,
        currency,
        default_source,
        invoice_prefix,
        phone,
    } = input;
    const { line1, line2, city, state, postal_code, country } = address || {
        line1: null,
        line2: null,
        city: null,
        state: null,
        postal_code: null,
        country: null,
    };
    const updates = {};
    const addressInput = [];
    const addressUpdate = {}
    if (name) {
        updates["name"] = name;
    }
    if (email) {
        updates["email"] = email;
    }
    if (description) {
        updates["description"] = description;
    }
    if (balance) {
        updates["balance"] = balance;
    }
    if (currency) {
        updates["currency"] = currency;
    }
    if (default_source) {
        updates["default_source"] = default_source;
    }
    if (invoice_prefix) {
        updates["invoice_prefix"] = invoice_prefix;
    }
    if (phone) {
        updates["phone"] = phone;
    }
    // if (address.line1) {
    //     addressUpdate["address.line1"] = address.line1;
    //     // addressInput.push(line1)
    // }
    // if (line2) {
    //     // addressInput.push(line2)

    //     addressUpdate["address.line2"] = line2;
    // }
    // if (city) {
    //     // addressInput.push(city)

    //     addressUpdate["address.city"] = city;
    // }
    // if (state) {
    //     // addressInput.push(state)

    //     addressUpdate["address.state"] = state;
    // }
    // if (postal_code) {
    //     // addressInput.push(postal_code)

    //     addressUpdate["address.postal_code"] = postal_code;
    // }
    // if (country) {
    //     // addressInput.push(country)
    //     addressUpdate["address.country"] = country;

    //     // updates["addressInput"] = addressInput;
    // }
    // console.log("updates ", updates);
    // console.log("addressUpdate ", addressUpdate)
    const customerResponse = await stripe.customers.update(
        id,
        updates
        // { metadata: { updates } }
    );
    // console.log("customerResponse ", customerResponse)
    return customerResponse

}