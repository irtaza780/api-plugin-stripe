export default async function createStripePayouts(parent, { input }, context, info) {
    // console.log(input);

    const stripeResponse = await context.mutations.createStripePayouts(context, input);
    // console.log("test", stripeResponse)

    return stripeResponse;
}