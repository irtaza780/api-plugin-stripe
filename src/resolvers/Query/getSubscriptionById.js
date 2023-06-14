export default async function getSubscriptionById(
  parent,
  { userID },
  context,
  info
) {
  const allCustomerResp = await context.queries.getSubscriptionById(
    context,
    userID
  );
  return allCustomerResp;
}
