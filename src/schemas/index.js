import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const stripeCustomer = importAsString("./stripeCustomer.graphql");
const stripeAccount = importAsString("./stripeAccount.graphql");
const stripePayment = importAsString("./stripePayment.graphql");
const stripeProduct = importAsString("./stripeProduct.graphql");
const stripePayouts = importAsString("./stripePayouts.graphql");
const stripeSubscriptions = importAsString("./stripeSubscriptions.graphql");
const stripePlans = importAsString("./stripePlans.graphql");
const stripePaymentIntents = importAsString("./stripePaymentIntents.graphql");
const checkOutSessions = importAsString("./checkOutSessions.graphql");
export default [
  stripeCustomer,
  stripeAccount,
  stripePayment,
  stripeProduct,
  stripePayouts,
  stripeSubscriptions,
  stripePlans,
  stripePaymentIntents,
  checkOutSessions,
];
