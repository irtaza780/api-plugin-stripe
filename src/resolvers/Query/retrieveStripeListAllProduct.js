

export default async function retrieveStripeListAllProduct(parent, { limit }, context, info) {
    // const { id } = args;
    const StripeListAllProductResponse = await context.queries.retrieveStripeListAllProduct(context, limit)
    // console.log("customerResponse ", customerResponse)
    return StripeListAllProductResponse;
}