export default async function createStripeAccount(_, { input }, context) {
  const account = await context.mutations.createStripeConnectAccount(
    context,
    input
  );

  return account;
}
