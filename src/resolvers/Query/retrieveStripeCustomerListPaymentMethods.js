

export default async function retrieveStripeCustomerListPaymentMethods(parent, {input}, context, info) {
    // const { id } = args;
    const customerResponse = await context.queries.retrieveStripeCustomerListPaymentMethods(context, input)
    // console.log("customerResponse ", customerResponse)
    return customerResponse;
}