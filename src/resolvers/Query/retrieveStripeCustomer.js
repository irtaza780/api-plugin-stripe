

export default async function retrieveStripeCustomer(parent, args, context, info) {
    // console.log("getCustomerbyID", args);
    const { id } = args;
    const customerResponse = await context.queries.retrieveStripeCustomer(context, id)
    // console.log("customerResponse ", customerResponse)
    return customerResponse;
}