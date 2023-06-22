export default async function updateStripePrice(_, args, context) {
  // console.log(input)
  const { product } = args;
  const updatedStripeCustomerResponse =
    await context.mutations.updateStripePrice(context, args.input, product);
  return updatedStripeCustomerResponse;
}
