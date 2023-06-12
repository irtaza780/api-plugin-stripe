export default async function updateStripePaymentMethod(_, { input }, context) {
    // console.log(input)
    const updatedStripeCustomerResponse = await context.mutations.updateStripePaymentMethod(context, input);
    // console.log("updatedStripeCustomerResponse ", updatedStripeCustomerResponse)
    return updatedStripeCustomerResponse
}