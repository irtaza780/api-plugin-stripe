export default async function updateStripeCustomer(_, { input }, context) {
    console.log(input)
    const updatedStripeCustomerResponse = await context.mutations.updateStripeCustomer(context, input);
    return updatedStripeCustomerResponse
}