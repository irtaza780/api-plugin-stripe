export default async function detachPayemntToCustomer(parent, { input }, context, info) {

    // console.log("Input ", input);
    // const { PaymentID } = input
    const detachPayemntToCustomer = await context.mutations.detachPayemntToCustomer(context, input)
    // console.log("detachPayemntToCustomer ", detachPayemntToCustomer);
    return detachPayemntToCustomer
}