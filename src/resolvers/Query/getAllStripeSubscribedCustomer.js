export default async function getAllStripeSubscribedCustomer(
  parent,
  { limit },
  context,
  info
) {
  // console.log("Hello", limit);
  const allCustomerResp = await context.queries.getAllStripeSubscribedCustomer(
    context,
    limit
  );
  return allCustomerResp;
}
