import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function deleteStripeAccount(context, id) {
  // console.log("data ", id);
  const deletedAccountResponse = await stripe.accounts.del(id);
  console.log("deleted user is ", deletedAccountResponse);
  return deletedAccountResponse;
}
