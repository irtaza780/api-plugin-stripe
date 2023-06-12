
export default async function updateStripeProduct(_, { input }, context) {

    // console.log("input ", input);

    const account = context.mutations.updateStripeProduct(context, input);

    return account;

}
