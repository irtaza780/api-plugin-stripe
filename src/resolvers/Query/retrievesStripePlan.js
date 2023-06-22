

export default async function retrievesStripePlan(parent, args, context, info) {
    console.log("args ", args);
    const { id } = args
    const retrievesStripePlanResp = await context.queries.retrievesStripePlan(context, id);
    return retrievesStripePlanResp
}