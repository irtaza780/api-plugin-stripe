import _ from "lodash";

export default async function sendMembershipNotification(
  context,
  subscriptionId
) {
  const { StripeSubscription, Accounts } = context.collections;

  const sub = await StripeSubscription.findOne({ subscriptionId });

  console.log("successful sub is()()()()()()() ", sub);

  if (sub?.paymentStatus && sub?.userId) {
    const account = await Accounts.findOne({ _id: sub?.userId });

    console.log("account email ", account.emails[0].address);

    const contactEmail = _.get(account, "emails[0].address");
  }
}
