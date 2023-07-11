// import { decodeShopOpaqueId } from "../../xforms/id.js";

export default async function createStripeCheckOutSession(
  _,
  { input },
  context
) {
  const checkOutSessionsResponse =
    context.mutations.createStripeCheckOutSession(context, input);
  return checkOutSessionsResponse;
}
