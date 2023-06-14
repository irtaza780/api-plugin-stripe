

export default async function cancelStripePayout(parent, args, context, info) {
    console.log("args ", args);
    const { id } = args
    const allCustomerResp = await context.queries.cancelStripePayout(context, id);
    return allCustomerResp
}