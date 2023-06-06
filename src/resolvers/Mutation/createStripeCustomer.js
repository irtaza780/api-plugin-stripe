export default async function createStripeCustomer(parent, { input }, context, info) {
    // console.log(input);

    const stripeResponse = await context.mutations.createStripeCustomer(context, input);
    // console.log("test", stripeResponse)

    return stripeResponse;
}