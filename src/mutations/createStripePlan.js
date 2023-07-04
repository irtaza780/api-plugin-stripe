import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function createStripePlan(context, input) {
  console.log("input mutation ", input);
  const { StripePlans } = context.collections;
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
  console.log("price ", price);
  const newPlan = {
    planId: price?.id,
    unit_amount: unit_amount,
    active: active,
    product: product,
    currency: currency,
    createdAt: new Date(),
  };
  console.log("newPlan ", newPlan);

  const respPlans = await StripePlans.insertOne(newPlan);
  console.log("respPLans ", respPlans);
  return price;
}
