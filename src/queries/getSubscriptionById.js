import ReactionError from "@reactioncommerce/reaction-error";
export default async function getSubscriptionById(context, input) {
  console.log("input ", input);
  const { StripeSubscription } = context.collections;
  const SubscriptionResponse = await StripeSubscription.findOne({
    customerId: input,
  });
  console.log("SubscriptionResponse 6 : ", SubscriptionResponse);
  if (SubscriptionResponse) {
    return SubscriptionResponse;
  } else {
    throw new ReactionError("not-found", "Record not found");
  }
}
