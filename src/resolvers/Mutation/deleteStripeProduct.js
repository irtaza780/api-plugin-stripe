export default async function deleteStripeProduct(parent, args, context, info) {

    // console.log("Input ", args);
    const { id } = args
    const deleteCustomerResp = await context.mutations.deleteStripeProduct(context, id)
    // // console.log("deleteCustomerResp ", deleteCustomerResp);
    return deleteCustomerResp
}