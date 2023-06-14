

export default async function getAllSubscriptions(parent, args, context, info) {
    // console.log("Hello", limit);
    const allCustomerResp = await context.queries.getAllSubscriptions(context, args);
    return allCustomerResp
}