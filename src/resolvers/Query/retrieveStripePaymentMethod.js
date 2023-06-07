

export default async function retrieveStripePaymentMethod(parent, args, context, info) {
    // console.log("getCustomerbyID", args);
    const { id } = args;
    const retrieveStripePaymentMethodResponse = await context.queries.retrieveStripePaymentMethod(context, id)
    // console.log("retrieveStripePaymentMethodResponse ", retrieveStripePaymentMethodResponse)
    return retrieveStripePaymentMethodResponse;
}