import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const schema = importAsString("./schema.graphql");
const stripeAccount = importAsString("./stripeAccount.graphql");

export default [schema, stripeAccount];
