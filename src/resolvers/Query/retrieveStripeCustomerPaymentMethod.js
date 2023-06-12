

export default async function retrieveStripeCustomerPaymentMethod(parent, { input }, context, info) {
    console.log("retrieve Stripe Customer Payment Method", input);
    // const { id } = args;
    const retrieveStripePaymentMethodResponse = await context.queries.retrieveStripeCustomerPaymentMethod(context, input)
    // console.log("retrieveStripePaymentMethodResponse ", retrieveStripePaymentMethodResponse)
    return retrieveStripePaymentMethodResponse;
}