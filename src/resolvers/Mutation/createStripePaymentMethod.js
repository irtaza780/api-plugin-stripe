export default async function createStripePaymentMethod(parent, { input }, context, info) {
    // console.log(input);

    const stripePaymentResponse = await context.mutations.createStripePaymentMethod(context, input);
    console.log("test", stripePaymentResponse)
    return stripePaymentResponse;
}