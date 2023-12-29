import _ from "lodash";

async function sendMembershipEmail(context, email) {
  // here, the primary shop will be use each time to send the email to the baker
  const shop = await context.collections.Shops.findOne({ shopType: "primary" });
  if (!shop) throw new ReactionError("not-found", "Shop not found");

  return context.mutations.sendEmail(context, {
    fromShop: shop,
    templateName: "membership/new",
    language: shop.language,
    to: email,
  });
}

export default async function sendMembershipNotification(
  context,
  subscriptionId
) {
  const { StripeSubscription, Accounts } = context.collections;

  const sub = await StripeSubscription.findOne({ subscriptionId });

  if (sub?.paymentStatus && sub?.userId) {
    const account = await Accounts.findOne({ _id: sub?.userId });

    const contactEmail = _.get(account, "emails[0].address");

    sendMembershipEmail(context, contactEmail);
  }
}
