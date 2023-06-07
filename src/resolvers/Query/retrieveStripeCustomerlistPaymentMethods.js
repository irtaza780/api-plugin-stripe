

export default async function retrieveStripeCustomerlistPaymentMethods(parent, {input}, context, info) {
    // console.log("getCustomerbyID", args);
    // const { id } = args;
    const customerResponse = await context.queries.retrieveStripeCustomerlistPaymentMethods(context, input)
    // console.log("customerResponse ", customerResponse)
    return customerResponse;
}