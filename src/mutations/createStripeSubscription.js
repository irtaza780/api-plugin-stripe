import ReactionError from "@reactioncommerce/reaction-error";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
export default async function createStripeSubscription(context, input) {
  const { Accounts, StripeSubscription } = context.collections;
  const { customerEmail, priceId, paymentMethodId } = input;
  // let email = customerEmail
  let customers = await stripe.customers.list({
    email: customerEmail.toLowerCase(),
  });
  const customer = customers.data.length ? customers.data[0] : null;

  // console.log("customers 13 ", customer);
  // console.log("customer.data[0].id  14 ", customer.id);
  const query = { "emails.0.address": customerEmail.toLowerCase() };
  const ifUser = await Accounts.findOne(query);
  console.log("ifUser ", ifUser);
  var fullName = ifUser?.profile?.firstName + " " + ifUser?.profile?.lastName;
  console.log("fullName ", fullName);
  let userID;
  if (!ifUser) {
    throw new ReactionError("not-found", "User not found");
  }
  userID = ifUser._id;
  // console.log("Users  17 ", ifUser.subscriptionStatus);
  if (ifUser?.subscriptionStatus == "active") {
    return {
      status: true,
      message: "You've already active subscription.",
      stripeData: ifUser,
    };
  }
  if (customer) {
    // If the customer exists, attach the PaymentMethod to their account
    const paymentAttachResponse = await stripe.paymentMethods.attach(
      paymentMethodId,
      { customer: customer.id }
    );
    console.log("paymentAttachResponse 27 :", paymentAttachResponse);
    let subscription;
    subscription = {
      customer: customer.id,
      // items: [{ price: { priceId, type: "recurring" } }],
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
    };
    // console.log("subscription 38 :", subscription);
    // console.log("subscription id 38 :", subscription.id);
    const filter = { _id: userID };
    // var Subscription={
    //     status:"active",
    //     type:""
    // }
    const update = {
      $set: {
        subscriptionStatus: "active",
        isActive: true,
        updatedAt: new Date(),
      },
    };
    const options = { new: true };
    const updatedAccount = await Accounts.findOneAndUpdate(
      filter,
      update,
      options
    );
    // console.log("account resp 46: ", updatedAccount);
    const subscriptionTableResp = await StripeSubscription.findOne({
      customerId: userID,
    });
    console.log("subscriptionTableResp ", subscriptionTableResp);
    if (subscriptionTableResp) {
      // console.log("Here");
      console.log("subscriptionTableResp :", subscriptionTableResp);
      const filter = { _id: subscriptionTableResp?._id };

      const update = {
        $set: {
          customerName: fullName,
          customerEmail: customerEmail.toLowerCase(),
          subscriptionStatus: "active",
          subscriptionId: subscription?.id,
          customerId: userID,
          paymentId: paymentMethodId,
          priceId: priceId,
          updatedAt: new Date(),
        },
      };
      const options = { new: true };
      const StripeSubscriptionResponse =
        await StripeSubscription.findOneAndUpdate(filter, update, options);
      console.log("StripeSubscriptionResponse ", StripeSubscriptionResponse);
    } else {
      const newSubscription = {
        customerName: fullName,
        customerEmail: customerEmail.toLowerCase(),
        customerId: userID,
        subscriptionId: subscription?.id,
        paymentId: paymentMethodId,
        priceId: priceId,
        createdAt: new Date(),
      };
      const SubscriptionResponse = await StripeSubscription.insertOne(
        newSubscription
      );
      console.log("SubscriptionResponse 63 : ", SubscriptionResponse);
    }
    if (updatedAccount) {
      return {
        status: true,
        message: "You've active subscription now.",
        stripeData: updatedAccount,
      };
    } else {
      throw new ReactionError("server-error", "Try again later");
    }
  }
  //  else {
  //   // If the customer does not exist, create a new customer and attach the PaymentMethod
  //   const newCustomer = await stripe.customers.create({
  //     email: email,
  //     payment_method: paymentMethodId,
  //   });
  //   let subscription;
  //   subscription = await stripe.subscriptions.create({
  //     customer: newCustomer.id,
  //     items: [{ price: { priceId, type: "recurring" } }],
  //     //   items: [{ price: priceId, type: "recurring" }],
  //     default_payment_method: paymentMethodId,
  //   });
  //   console.log("subscription ", subscription);
  //   return {
  //     status: true,
  //     message: "Your subscription has been activated.",
  //     stripeData: subscription,
  //   };
  // }
}
