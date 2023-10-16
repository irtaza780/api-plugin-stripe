import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function createConnectedAccount(context, input) {
  const { email, business_type, country, type } = input;
  // console.log("input real  ", input);
  // console.log("stripe real  ", stripe);

  const account = await stripe.accounts.create({
    country: "US",
    type: "express",
    email,
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
    business_type: "individual",
    business_profile: {
      mcc: "5814",
      product_description: "Bakery items",
      support_email: "baker@gmail.com",
      url: "https://app.test.yourbakingconnection.com/",
    },
  });

  // console.log("Stripe account ", account);

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    //if user didn't completed the onboarding flow
    // refresh_url: 'https://example.com/reauth',
    //user completed the onboarding flow
    // return_url: 'https://example.com/return',
    refresh_url: "https://app.test.yourbakingconnection.com/signin",
    return_url: "https://app.test.yourbakingconnection.com/about-bakers",
    type: "account_onboarding",
  });

  console.log("Stripe account ", account);
  console.log("Accoun link is ", accountLink);

  // console.log("stripeAccountResp  ", stripeAccountResp);
  // return stripeAccountResp;

  //   const loginLink = await stripe.accounts.createLoginLink(
  //     "acct_1Nx65zPBvwolv3Oj"
  //   );

  //   console.log("loginLink ", loginLink);

  //   let account = {};
  return accountLink.url ? accountLink.url : "";
}
