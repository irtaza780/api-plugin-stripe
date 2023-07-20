import { log } from "console";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// import { dataFile } from "../utils/dataFile.js";
export default async function createStripeCustomerFromWebhookCall(
  context,
  input
) {
  const { Accounts, StripeSubscription } = context.collections;

  console.log("input mutation ", input);
  console.log("context.user", context.user);
  let customerId = context?.user?.id;
  const {
    current_period_end,
    current_period_start,
    customer,
    plan,
    latest_invoice,
  } = input.data.object;
  let { id, amount, interval, product } = plan;
  // const { billingDetails, card } = input;
  const now = new Date();
  const StripeCustomerResponse = await stripe.customers.retrieve(customer);
  console.log("StripeCustomerResponse", StripeCustomerResponse);
  const query = {
    "emails.0.address": StripeCustomerResponse?.email.toLowerCase(),
  };
  const ifUser = await Accounts.findOne(query);
  let userID = ifUser._id;
  const filter = { _id: userID };
  const update = {
    $set: {
      subscriptionStatus: "active",
      isActive: true,
      updatedAt: new Date(),
    },
  };
  const options = { new: true };
  const updatedAccount = await Accounts.findOneAndUpdate(
    filter,
    update,
    options
  );
  const subscriptionTableResp = await StripeSubscription.findOne({
    customerId: userID,
  });
  if (subscriptionTableResp) {
    const filter = { _id: subscriptionTableResp?._id };
    const update = {
      $set: {
        customerId: userID,
        subscriptionId: input?.data?.object?.id,
        // paymentId: "pm_1NKyLBB8RK1QdFnY3vKUy1jR",
        priceId: id,
        subscriptionStatus: "active",
        updatedAt: now,
        cancel_at: now,
        paymentAmount: amount,
        planStartTime: current_period_start,
        planEndTIme: current_period_end,
        customerEmail: StripeCustomerResponse?.email,
        invoiceNumber: latest_invoice,
        planInterval: interval,
        productId: product,
        customerName: StripeCustomerResponse?.name,
      },
    };
    const options = { new: true };
    await StripeSubscription.findOneAndUpdate(filter, update, options);
  } else {
    const data = {
      customerId: userID,
      subscriptionId: input?.data?.object?.id,
      // paymentId: "pm_1NKyLBB8RK1QdFnY3vKUy1jR",
      priceId: id,
      createdAt: now,
      subscriptionStatus: "active",
      updatedAt: now,
      cancel_at: now,
      paymentAmount: amount,
      planStartTime: current_period_start,
      planEndTIme: current_period_end,
      customerEmail: StripeCustomerResponse?.email,
      invoiceNumber: latest_invoice,
      planInterval: interval,
      productId: product,
      customerName: StripeCustomerResponse?.name,
    };
    await StripeSubscription.insertOne(data);
  }
}
