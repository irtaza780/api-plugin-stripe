

export default async function retrieveStripePayouts(parent, args, context, info) {
    const { id } = args;
    console.log(args)
    const customerResponse = await context.queries.retrieveStripePayouts(context, id)
    console.log("customerResponse ", customerResponse)
    return customerResponse;
}