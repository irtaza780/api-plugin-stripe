export default async function deleteStripeCustomer(
  parent,
  args,
  context,
  info
) {
  // console.log("Input ", args);
  const { id } = args;
  const deleteCustomerResp = await context.mutations.deleteStripeCustomer(
    context,
    id
  );
  console.log("deleteCustomerResp ", deleteCustomerResp);
  return deleteCustomerResp;
}
