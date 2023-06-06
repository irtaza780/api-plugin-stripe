

export default async function getAllStripeCustomer(parent, { limit }, context, info) {
    // console.log("Hello", limit);
    const allCustomerResp = await context.queries.getAllStripeCustomer(context, limit);
    return allCustomerResp
}