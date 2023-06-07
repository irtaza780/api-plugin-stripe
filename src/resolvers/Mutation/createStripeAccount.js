// import { decodeShopOpaqueId } from "../../xforms/id.js";


export default async function createStripeAccount(_, { input }, context) {
    // const { shopId, clientMutationId } = input;
    //   const decodedShopId = decodeShopOpaqueId(shopId);
    console.log("input ", input);
    // const transformedInput = { ...input, shopId: decodedShopId };

    const account = context.mutations.createStripeAccount(context, input);

    return account;

}
