export default async function cancelStripeSubscription(_, { userId }, context) {
    // console.log("input ", userId);
    const cancelStripeSubscriptionResponse = context.mutations.cancelStripeSubscription(context, userId);
    return cancelStripeSubscriptionResponse;
}
