export default async function stripeMembershipPlans(
  parent,
  args,
  context,
  info
) {
  const { StripePlans } = context.collections;

  return await StripePlans.find().toArray();
}
