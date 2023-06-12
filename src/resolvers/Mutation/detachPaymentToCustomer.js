export default async function detachPaymentToCustomer(parent, { input }, context, info) {

    // console.log("Input ", input);
    // const { PaymentID } = input
    const detachPaymentToCustomer = await context.mutations.detachPaymentToCustomer(context, input)
    // console.log("detachPaymentToCustomer ", detachPaymentToCustomer);
    return detachPaymentToCustomer
}