export default async function updateStripePayouts(_, { input }, context) {
    // console.log(input)
    const updatedStripeCustomerResponse = await context.mutations.updateStripePayouts(context, input);
    // console.log("updatedStripeCustomerResponse ", updatedStripeCustomerResponse)
    return updatedStripeCustomerResponse
}