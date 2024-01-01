// import { connect } from "http2";
import { createRequire } from "module";
import ReactionError from "@reactioncommerce/reaction-error";

const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function createConnectedAccount(context, input) {
  const { authToken, userId, collections } = context;

  if (!authToken || !userId)
    throw new ReactionError("access-denied", "Access Denied");

  const { StripeConnectAccount } = collections;

  const { email, businessType } = input;

  const stripeConnectAccountForUser = await StripeConnectAccount.findOne({
    userId,
  });

  // if (stripeConnectAccountForUser?.payoutsEnabled) {
  //   throw new ReactionError(
  //     "access-denied",
  //     "You have already created a stripe connect account, please go to settings to update your existing account"
  //   );
  // }

  let account = {};

  if (!stripeConnectAccountForUser) {
    account = await stripe.accounts.create({
      metadata: { userId },
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
      business_type: businessType,
      business_profile: {
        mcc: "5814",
        product_description: "Bakery items",
        support_email: "baker@gmail.com",
        url: "https://app.test.yourbakingconnection.com/",
      },
    });
  } else {
    account["id"] = stripeConnectAccountForUser.accountId;
  }
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.BASE_URL}/profile`,
    return_url: `${process.env.BASE_URL}`,
    type: "account_onboarding",
  });

  return accountLink.url ? accountLink.url : "";
}
