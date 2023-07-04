export default async function listAllStripePaymentIntents(
  parent,
  args,
  context,
  info
) {
  const { limit } = args;
  const customerResponse = await context.queries.listAllStripePaymentIntents(
    context,
    limit
  );
  return customerResponse;
}
