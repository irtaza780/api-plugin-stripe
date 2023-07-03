export default async function retrieveStripePaymentIntentById(
  parent,
  args,
  context,
  info
) {
  const { id } = args;
  const customerResponse =
    await context.queries.retrieveStripePaymentIntentById(context, id);
  return customerResponse;
}
