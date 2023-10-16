// import { decodeShopOpaqueId } from "../../xforms/id.js";

export default async function expressAccountLoginLink(_, { input }, context) {
  // const { shopId, clientMutationId } = input;
  //   const decodedShopId = decodeShopOpaqueId(shopId);
  console.log("input ", input);
  // const transformedInput = { ...input, shopId: decodedShopId };

  const accountLink = context.mutations.expressAccountLoginLink(context, input);

  return accountLink;
}
