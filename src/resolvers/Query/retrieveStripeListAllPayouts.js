

export default async function retrieveStripeListAllPayouts(parent, { limit }, context, info) {
    // const { id } = args;
    const StripeListAllProductResponse = await context.queries.retrieveStripeListAllPayouts(context, limit)
    // console.log("customerResponse ", customerResponse)
    return StripeListAllProductResponse;
}