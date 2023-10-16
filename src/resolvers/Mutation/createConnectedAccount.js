// import { decodeShopOpaqueId } from "../../xforms/id.js";

export default async function createConnectedAccount(_, { input }, context) {
  // const { shopId, clientMutationId } = input;
  //   const decodedShopId = decodeShopOpaqueId(shopId);
  console.log("input ", input);
  // const transformedInput = { ...input, shopId: decodedShopId };

  const connectedAccount = context.mutations.createConnectedAccount(
    context,
    input
  );

  return connectedAccount;
}
