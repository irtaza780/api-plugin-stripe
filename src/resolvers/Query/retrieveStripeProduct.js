

export default async function retrieveStripeProduct(parent, args, context, info) {
    console.log("retrieveStripeProduct", args);
    const customerProductResponse = await context.queries.retrieveStripeProduct(context, args)
    // console.log("customerProductResponse ", customerProductResponse)
    return customerProductResponse;
}