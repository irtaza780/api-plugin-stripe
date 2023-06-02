export default async function createCustomer(parent, args, context, info) {
            console.log(args);
            const {
                name,
                email,
                description,
                address,
                balance,
                created,
                currency,
                default_source,
                invoice_prefix,
                phone,
            } = args;
            const { line1, line2, city, state, postal_code, country } = address || {
                line1: null,
                line2: null,
                city: null,
                state: null,
                postal_code: null,
                country: null,
            };
            try {
                const customer = await stripe.customers.create({
                    name,
                    email,
                    description,
                    address: {
                        line1,
                        line2,
                        city,
                        state,
                        postal_code,
                        country,
                    },
                    balance,
                    created,
                    currency,
                    default_source,
                    invoice_prefix,
                    phone,
                });
                console.log(customer);
                return {
                    id: customer.id,
                    name: customer.name,
                    email: customer.email,
                    description: customer.description,
                    address: customer.address
                        ? [
                            {
                                line1: customer.address.line1,
                                line2: customer.address.line2,
                                city: customer.address.city,
                                state: customer.address.state,
                                postal_code: customer.address.postal_code,
                                country: customer.address.country,
                            },
                        ]
                        : null,
                    balance: customer.balance,
                    created: customer.created,
                    currency: customer.currency,
                    default_source: customer.default_source,
                    invoice_prefix: customer.invoice_prefix,
                    phone: customer.phone,
                };
            } catch (error) {
                console.error(error);
                throw new Error("Failed to create Stripe customer");
            }
}