// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const stripe = require("stripe")(
//     "sk_test_51Mh6waBsZr9i1hrRyfpvs1LuDLisPrNudFbiVHrcxuO5B8lOCVJoERKm2t9XuPNzj1UCDTaLyWJc1b72TO73jCzJ00kLsyiBnB"
// );

// export default {
//     Mutation: {
//         createStripeCustomer: async (parent, args, context, info) => {
//             console.log(args);
//             const {
//                 name,
//                 email,
//                 description,
//                 address,
//                 balance,
//                 created,
//                 currency,
//                 default_source,
//                 invoice_prefix,
//                 phone,
//             } = args;
//             const { line1, line2, city, state, postal_code, country } = address || {
//                 line1: null,
//                 line2: null,
//                 city: null,
//                 state: null,
//                 postal_code: null,
//                 country: null,
//             };
//             try {
//                 const customer = await stripe.customers.create({
//                     name,
//                     email,
//                     description,
//                     address: {
//                         line1,
//                         line2,
//                         city,
//                         state,
//                         postal_code,
//                         country,
//                     },
//                     balance,
//                     created,
//                     currency,
//                     default_source,
//                     invoice_prefix,
//                     phone,
//                 });
//                 console.log(customer);
//                 return {
//                     id: customer.id,
//                     name: customer.name,
//                     email: customer.email,
//                     description: customer.description,
//                     address: customer.address
//                         ? [
//                             {
//                                 line1: customer.address.line1,
//                                 line2: customer.address.line2,
//                                 city: customer.address.city,
//                                 state: customer.address.state,
//                                 postal_code: customer.address.postal_code,
//                                 country: customer.address.country,
//                             },
//                         ]
//                         : null,
//                     balance: customer.balance,
//                     created: customer.created,
//                     currency: customer.currency,
//                     default_source: customer.default_source,
//                     invoice_prefix: customer.invoice_prefix,
//                     phone: customer.phone,
//                 };
//             } catch (error) {
//                 console.error(error);
//                 throw new Error("Failed to create Stripe customer");
//             }
//         },
//         updateStripeCustomer: async (parent, args, context, info) => {
//             console.log(args);
//             console.log(args.id);

//             const {
//                 id,
//                 name,
//                 email,
//                 description,
//                 address,
//                 balance,
//                 created,
//                 currency,
//                 default_source,
//                 invoice_prefix,
//                 phone,
//             } = args;
//             const { line1, line2, city, state, postal_code, country } = address || {
//                 line1: null,
//                 line2: null,
//                 city: null,
//                 state: null,
//                 postal_code: null,
//                 country: null,
//             };
//             // const line1 = args.address?.line1;
//             // const line2 = args.address?.line2;
//             // const city = args.address?.city;
//             // const state = args.address?.state;
//             // const postal_code = args.address?.postal_code;
//             // const country = args.address?.country;
//             try {
//                 const customer = await stripe.customers.update(id, {
//                     name,
//                     email,
//                     description,
//                     address,
//                     address: {
//                         line1,
//                         line2,
//                         city,
//                         state,
//                         postal_code,
//                         country,
//                     },
//                     created,
//                     currency,
//                     default_source,
//                     invoice_prefix,
//                     phone,
//                 });
//                 console.log(customer);
//                 return {
//                     id: customer.id,
//                     name: customer.name,
//                     email: customer.email,
//                     description: customer.description,
//                     address: customer.address
//                         ? [
//                             {
//                                 line1: customer.address.line1,
//                                 line2: customer.address.line2,
//                                 city: customer.address.city,
//                                 state: customer.address.state,
//                                 postal_code: customer.address.postal_code,
//                                 country: customer.address.country,
//                             },
//                         ]
//                         : null,
//                     balance: customer.balance,
//                     created: customer.created,
//                     currency: customer.currency,
//                     default_source: customer.default_source,
//                     invoice_prefix: customer.invoice_prefix,
//                     phone: customer.phone,
//                 };
//             } catch (error) {
//                 console.error(error);
//                 throw new Error("Failed to update Stripe customer, try again later!!!");
//             }
//         },
//         deleteStripeCustomer: async (parent, args, context, info) => {
//             const { id } = args
//             try {
//                 const deleted = await stripe.customers.del(id, { retrieve: true });
//                 return {
//                     id: deleted.id,
//                     name: deleted.name,
//                     email: deleted.email,
//                     description: deleted.description,
//                 };
//             } catch (error) {
//                 console.error(error);
//                 throw new Error('Failed to delete Stripe customer');
//             }
//         }
//     },
//     Query: {
//         retrieveStripeCustomer: async (parent, args, context, info) => {
//             console.log(args);
//             const { id } = args;
//             try {
//                 const customer = await stripe.customers.retrieve(id);
//                 console.log(customer);
//                 return {
//                     id: customer.id,
//                     name: customer.name,
//                     email: customer.email,
//                     description: customer.description,
//                     address: customer.address ? [customer.address] : null,
//                     balance: customer.balance,
//                     created: customer.created,
//                     currency: customer.currency,
//                     default_source: customer.default_source,
//                     invoice_prefix: customer.invoice_prefix,
//                     phone: customer.phone,
//                 };
//             } catch (error) {
//                 console.error(error);
//                 throw new Error("Customer not Found");
//             }
//         },
//     }
// };