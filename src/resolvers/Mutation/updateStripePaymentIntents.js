export default async function updateStripePaymentIntents(_, args, context) {
  console.log("args ", args);
  const updatedStripeCustomerResponse =
    await context.mutations.updateStripePaymentIntents(
      context,
      args.input,
      args.id
    );
  return updatedStripeCustomerResponse;
}
