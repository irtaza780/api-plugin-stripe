import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function createStripePlan(context, input) {
  console.log("input mutation ", input);
  const { active, currency, recurring, unit_amount, product } = input;
  const { interval, usage_type, interval_count } = recurring;
  const price = await stripe.prices.create({
    unit_amount: unit_amount,
    active: active,
    currency: currency,
    recurring: {
      interval: interval,
      usage_type: usage_type,
      interval_count: interval_count,
    },
    product: product,
  });
  console.log(price);
  return price;
}
