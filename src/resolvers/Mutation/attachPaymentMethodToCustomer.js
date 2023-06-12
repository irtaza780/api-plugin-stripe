export default async function attachPaymentMethodToCustomer(_, { input }, context) {

    // console.log("input ", input);

    const accountResp = context.mutations.attachPaymentMethodToCustomer(context, input);

    return accountResp;

}
