export default async function deleteStripeAccount(parent, args, context, info) {
  // console.log("Input ", args);
  const { id } = args;
  const deleteAccountResp = await context.mutations.deleteStripeAccount(
    context,
    id
  );
  console.log("deleteCustomerResp ", deleteAccountResp);
  return deleteAccountResp;
}
