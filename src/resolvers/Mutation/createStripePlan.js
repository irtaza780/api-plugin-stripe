export default async function createStripePlan(
  parent,
  { input },
  context,
  info
) {
  // console.log(input);

  const stripPlanResponse = await context.mutations.createStripePlan(
    context,
    input
  );
  // console.log("stripPlanResponse", stripPlanResponse);

  return stripPlanResponse;
}
