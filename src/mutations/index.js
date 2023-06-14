import createStripeCustomer from "./createStripeCustomer.js";
import createStripeAccount from "./createStripeAccount.js";
import updateStripeCustomer from "./updateStripeCustomer.js";
import deleteStripeCustomer from "./deleteStripeCustomer.js";
import createStripePaymentMethod from "./createStripePaymentMethod.js";
import updateStripePaymentMethod from './updateStripePaymentMethod.js'
import attachPaymentMethodToCustomer from './attachPaymentMethodToCustomer.js'
import detachPaymentToCustomer from './detachPaymentToCustomer.js'
import createStripeProduct from './createStripeProduct.js'
import updateStripeProduct from './updateStripeProduct.js'
import deleteStripeProduct from './deleteStripeProduct.js'
import createStripePayouts from './createStripePayouts.js'
import updateStripePayouts from './updateStripePayouts.js'
import createStripeSubscription from './createStripeSubscription.js'
import cancelStripeSubscription from './cancelStripeSubscription.js'

export default {
    createStripeCustomer,
    createStripeAccount,
    updateStripeCustomer,
    deleteStripeCustomer,
    createStripePaymentMethod,
    updateStripePaymentMethod,
    attachPaymentMethodToCustomer,
    detachPaymentToCustomer,
    createStripeProduct,
    updateStripeProduct,
    deleteStripeProduct,
    createStripePayouts,
    updateStripePayouts,
    createStripeSubscription,
    cancelStripeSubscription
}