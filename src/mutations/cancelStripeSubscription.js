import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function cancelStripeSubscription(context, input) {
  // console.log("Input ", input);
  const { Accounts, StripeSubscription } = context.collections;
  const userInfo = await Accounts.findOne({ _id: input });
  // console.log("userInfo ", userInfo);
  if (userInfo?.subscriptionStatus) {
    const SubscriptionResponse = await StripeSubscription.findOne({
      customerId: input,
    });
    // console.log("SubscriptionResponse ", SubscriptionResponse);
    const subscription = await stripe.subscriptions.retrieve(
      SubscriptionResponse.subscriptionId
    );
    // console.log("subscription ", subscription);
    if (subscription.status == "past_due" || subscription.status == "unpaid") {
      const deleted = await stripe.subscriptions.del(
        SubscriptionResponse.subscriptionId
      );
      const updatedUser = await User.findOneAndUpdate(
        { _id: SubscriptionResponse._id },
        {
          $set: {
            status: "canceled",
          },
        },
        { new: true }
      );
      if (updatedUser.value) {
        return {
          status: false,
          message: "Your active subscription has been cancel.",
          stripeData: updatedUser.value,
        };
      }
      // console.log("updatedUser ", updatedUser)
    } else {
      const cancelSubscription = await stripe.subscriptions.update(
        SubscriptionResponse.subscriptionId,
        {
          cancel_at_period_end: true,
        }
      );
      // console.log("cancelSubscription ", cancelSubscription);
      const cancelAtDate = new Date(cancelSubscription?.cancel_at * 1000);
      // console.log("cancelAtDate ", cancelAtDate)
      const updatedUser = await StripeSubscription.findOneAndUpdate(
        { _id: SubscriptionResponse._id },
        {
          $set: {
            cancel_at: cancelAtDate,
          },
        },
        { new: true }
      );
      // console.log("updatedUser ", updatedUser);
      if (updatedUser.value) {
        return {
          status: true,
          message: "You've active subscription now.",
          stripeData: updatedUser.value,
        };
      }
    }
  } else {
    return {
      status: false,
      message: "You don't have any subscription attached currently",
      stripeData: userInfo,
    };
  }
}
