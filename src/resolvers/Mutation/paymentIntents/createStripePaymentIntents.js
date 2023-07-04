export default async function createStripePaymentIntents(
  parent,
  { input },
  context,
  info
) {
  // console.log("input ", input);

  const stripeResponse = await context.mutations.createStripePaymentIntents(
    context,
    input
  );
  // console.log("test", stripeResponse)

  return stripeResponse;
}
