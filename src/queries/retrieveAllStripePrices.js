import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function retrieveAllStripePrices(context, input) {
  // console.log(input);

  const retrieveStripeListAllPricesResponse = await stripe.prices.list({
    limit: input,
  });
  console.log(
    "retrieveStripeListAllPricesResponse",
    retrieveStripeListAllPricesResponse
  );
  if (retrieveStripeListAllPricesResponse.data) {
    return retrieveStripeListAllPricesResponse.data;
  } else {
    return [];
  }
}
