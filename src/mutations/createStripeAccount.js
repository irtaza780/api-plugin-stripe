import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(
    process.env.STRIPE_API_KEY
);

export default async function createStripeAccount(context, input) {
    // const {
    //     collections: { Accounts, AccountInvites },
    //     simpleSchemas: {
    //         Account: AccountSchema
    //     },
    //     userId: authUserId
    // } = context;
    const {
        email,
        business_type,
        country,
        type,
    } = input;
    console.log("input real  ", input);
    // console.log("stripe real  ", stripe);
    const stripeAccountResp = await stripe.accounts.create({
        type: type,
        country: country,
        email: email,

    });

    console.log("stripeAccountResp  ", stripeAccountResp);
    return stripeAccountResp
    //   await context.validatePermissions("reaction:legacy:accounts", "create", { shopId });

    //   // Create initial account object from user and profile
    //   const createdAt = new Date();
    //   const account = {
    //     _id: userId,
    //     acceptsMarketing: false,
    //     createdAt,
    //     emails,
    //     // Proper groups will be set with calls to `addAccountToGroup` below
    //     groups: [],
    //     name,
    //     profile,
    //     shopId,
    //     state: "new",
    //     updatedAt: createdAt,
    //     userId
    //   };

    //   let groups = new Set();
    //   let invites;

    //   // if this is the first user created overall, add them to the
    //   // `system-manager` and `accounts-manager` groups
    //   const anyAccount = await Accounts.findOne();
    //   if (!anyAccount) {
    //     const accountsManagerGroupId = await ensureAccountsManagerGroup(context);
    //     const systemManagerGroupId = await ensureSystemManagerGroup(context);
    //     groups.add(systemManagerGroupId);
    //     groups.add(accountsManagerGroupId);
    //   } else {
    //     // if this isn't the first account see if they were invited by another user
    //     // find all invites for this email address, for all shops, and add to all groups
    //     const emailAddresses = emails.map((emailRecord) => emailRecord.address.toLowerCase());
    //     invites = await AccountInvites.find({ email: { $in: emailAddresses } }).toArray();
    //     groups = invites.reduce((allGroupIds, invite) => {
    //       if (invite.groupIds) {
    //         invite.groupIds.forEach((groupId) => allGroupIds.add(groupId));
    //       }

    //       if (invite.groupId) {
    //         allGroupIds.add(invite.groupId);
    //       }

    //       return allGroupIds;
    //     }, new Set());
    //   }

    // AccountSchema.validate(account);

    //   await Accounts.insertOne(account);



}
