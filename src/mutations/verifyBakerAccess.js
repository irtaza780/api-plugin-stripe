import ReactionError from "@reactioncommerce/reaction-error";

export default async function verifyBakerAccess(context, userId) {
  const { collections } = context;
  const { StripeSubscription } = collections;
  const bakerSubscription = await StripeSubscription.findOne({ userId });
  if (!bakerSubscription) {
    throw new ReactionError("not-found", "Baker Subscription not found");
  }

  if (!bakerSubscription?.paymentStatus) {
    throw new ReactionError(
      "not-found",
      "Your connect account is not active for payouts, please verify your connect account"
    );
  }

  return bakerSubscription.subscriptionType;
}
