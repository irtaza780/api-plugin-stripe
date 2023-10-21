import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// const localhost_url = process.env.LOCALHOST_URL;
// const production_url = process.env.PRODUCTION_URL;

export default async function createStripeSinglePrice(
  parent,
  { input },
  context,
  info
) {
  const { unitAmount, currency } = input;
  let url;
  if (process.env.ENVIRONMENT === "production") {
    url = process.env.PRODUCTION_URL;
  } else if (process.env.ENVIRONMENT === "localhost") {
    url = process.env.LOCALHOST_URL;
  }
  console.log("url ", url);
  const sessionResponse = await stripe.prices.create({
    unit_amount: unitAmount,
    currency: currency.toLowerCase(),
    product_data: {
      name: "Cake",
    },
  });
  console.log("session response ", sessionResponse);
  if (sessionResponse) {
    return {
      status: true,
      message: "Session have been created.",
      stripeData: sessionResponse,
    };
  } else {
    return {
      status: false,
      message: "Something went wrong.",
      stripeData: null,
    };
  }
}
