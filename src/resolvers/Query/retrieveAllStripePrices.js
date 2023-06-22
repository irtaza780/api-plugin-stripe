export default async function retrieveAllStripePrices(
  parent,
  { limit },
  context,
  info
) {
  // const { id } = args;
  const StripeListAllPricesResponse =
    await context.queries.retrieveAllStripePrices(context, limit);
  // console.log("customerResponse ", customerResponse)
  return StripeListAllPricesResponse;
}
