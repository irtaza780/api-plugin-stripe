export default async function resumeStripeSubscriptions(_, args, context) {
  console.log("args ", args);
  const resumeStripeSubscriptionsResponse =
    await context.mutations.resumeStripeSubscriptions(context, args);
  return resumeStripeSubscriptionsResponse;
}
