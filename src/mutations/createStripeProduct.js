import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function createStripeProduct(context, input) {
  console.log("input mutation ", input);
  const { name, active, description, pricePlan } = input;
  const { StripeProducts } = context.collections;
  let currency = pricePlan?.currency;
  let unit_amount_decimal = pricePlan?.unitAmount;
  const productResponse = await stripe.products.create({
    name: name,
    active: active,
    description: description,
    default_price_data: {
      currency,
      unit_amount_decimal,
    },
    // type: "recurring",
  });
  console.log("productResponse ", productResponse);
  const ifPlan = await StripeProducts.findOne({
    priceId: productResponse?.default_price,
  });
  const now = new Date();

  if (ifPlan) {
    let updatePlans;
    if (productResponse?.planId) {
      updatePlans.planId = productResponse?.planId;
    }
    if (productResponse?.default_price) {
      updatePlans.priceId = productResponse?.default_price;
    }
    if (productResponse?.name) {
      updatePlans.name = productResponse?.name;
    }
    if (productResponse?.active) {
      updatePlans.active = productResponse?.active;
    }
    if (productResponse?.unit_amount_decimal) {
      updatePlans.unit_amount_decimal = productResponse?.unit_amount_decimal;
    }
    updatePlans.updatedAt = new Date();
    const modifier = { $set: updatePlans };
    const updatedPlansResponse = await StripeProducts.findOneAndUpdate(
      {
        _id: ifPlan?._id,
      },
      modifier,
      {
        returnOriginal: false,
      }
    );
    // console.log("updatedPlansResponse ", updatedPlansResponse);
  } else {
    const plansPayload = {
      planId: productResponse.id,
      priceId: productResponse?.default_price,
      planName: productResponse?.name,
      active: productResponse?.active,
      unitAmountDecimal: productResponse?.unit_amount_decimal,
      createdAt: now,
      updatedAt: now,
    };
    const PlanResponse = await StripeProducts.insertOne(plansPayload);
    // console.log("PlanResponse ", PlanResponse);
  }
  return productResponse;
}
