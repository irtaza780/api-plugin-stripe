import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function updateStripePrice(context, input, product) {
  console.log("updateStripePrice ", input);
  //   const { product } = input;
  const { active, currency, recurring, unit_amount } = input;
  // const { interval, usage_type, interval_count } = recurring;
  console.log("product ", product);
  // console.log("typeof ", typeof interval);
  const updates = {};
  let recUpdate = {};
  if (active) {
    updates["active"] = active;
  }
  if (currency) {
    updates["currency"] = currency;
  }
  if (unit_amount) {
    updates["unit_amount"] = unit_amount;
  }
  // if (recurring) {
  //   if (interval) {
  //     recUpdate["interval"] = interval;
  //   }
  //   if (usage_type) {
  //     recUpdate["usage_type"] = usage_type;
  //   }
  //   if (interval_count) {
  //     recUpdate["interval_count"] = interval_count;
  //   }
  //   updates["recurring"] = recUpdate;
  // }
  console.log("updates ", updates);

  const pricesResponse = await stripe.prices.update(product, {
    metadata: updates,
    // recurring: {
    //   interval: "year",
    //   usage_type: "licensed",
    //   interval_count: "1",
    // },
    // updates,
  });
  console.log("pricesResponse ", pricesResponse);
  return pricesResponse;
}
