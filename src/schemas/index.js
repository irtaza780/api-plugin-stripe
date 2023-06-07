import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const stripeCustomer = importAsString("./stripeCustomer.graphql");
const stripeAccount = importAsString("./stripeAccount.graphql");
const stripePayment = importAsString("./stripePayment.graphql");

export default [stripeCustomer, stripeAccount, stripePayment];
