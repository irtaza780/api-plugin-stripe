import createStripeCustomer from "./createStripeCustomer.js";
import createStripeAccount from "./createStripeAccount.js";
import updateStripeCustomer from "./updateStripeCustomer.js";
import deleteStripeCustomer from "./deleteStripeCustomer.js";
import createStripePaymentMethod from "./createStripePaymentMethod.js";
import updateStripePaymentMethod from './updateStripePaymentMethod.js'
import attachPaymentMethodToCustomer from './attachPaymentMethodToCustomer.js'
import detachPayemntToCustomer from './detachPayemntToCustomer.js'

export default {
    createStripeCustomer,
    createStripeAccount,
    updateStripeCustomer,
    deleteStripeCustomer,
    createStripePaymentMethod,
    updateStripePaymentMethod,
    attachPaymentMethodToCustomer,
    detachPayemntToCustomer
}