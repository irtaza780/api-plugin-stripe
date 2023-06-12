export default async function createStripeProduct(parent, { input }, context, info) {
    // console.log(input);

    const stripeProductResponse = await context.mutations.createStripeProduct(context, input);
    // console.log("test", stripeProductResponse)

    return stripeProductResponse;
}