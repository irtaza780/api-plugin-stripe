import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function expressAccountLoginLink(context, input) {
  const { accountId } = input;

  const loginLink = await stripe.accounts.createLoginLink(accountId);

  console.log("loginLink ", loginLink);

  //   let account = {};
  return loginLink.url ? loginLink.url : "";
}
