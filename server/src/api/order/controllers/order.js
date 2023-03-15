'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
	async findOne(ctx) {
		debugger;
		return { status: "OK" }
	},
	async create(ctx) {
		try {
			debugger;
			const { items, userName, email } = ctx.request.body;
			const lineItems = items.map((item) => {
				return {
					price_data: {
						currency: 'thb', // 'THB',
						product_data: {
							name: item.product.title,
						},
						unit_amount: item.product.price * 100,
					},
					quantity: item.quantity,
				}
			})

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				customer_email: email,
				mode: 'payment',
				currency: 'thb',
				line_items: lineItems,
				success_url: 'http://localhost:3000/success',
				cancel_url: 'http://localhost:3000',
				locale: 'th',
				// not working
				// customer_details,
				// billing_address_collection: JSON.stringify(customer_details),
				// custom_text: custom_text,
			})
			await strapi
				.service('api::order.order')
				.create({ data: { userName: 'dev', product: JSON.stringify(items), stripeSessionId: session.id } })

			// return session id
			return { id: session.id, }

		} catch (error) {
			debugger
		}

	}
}));
