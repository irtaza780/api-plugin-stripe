import ReactionError from "@reactioncommerce/reaction-error";

export default async function createStripeCheckOutSession(
  _,
  { input },
  context
) {
  const { authToken, userId } = context;

  if (!authToken || !userId)
    throw new ReactionError("access-denied", "Unauthorized");

  const checkOutSessionsResponse =
    context.mutations.createStripeCheckOutSession(context, input);
  return checkOutSessionsResponse;
}
