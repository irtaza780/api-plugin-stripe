// import { decodeShopOpaqueId } from "../../xforms/id.js";

export default async function createConnectedAccount(_, { input }, context) {
  const connectedAccount = context.mutations.createConnectedAccount(
    context,
    input
  );

  return connectedAccount;
}
