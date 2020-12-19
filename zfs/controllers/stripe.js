const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
require("dotenv").config({ path: "./.env" });
const User = require("../models/user");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCustomer = async (req, res) => {
  // Create a new customer object
  const customer = await stripe.customers.create({
    email: req.body.email,
  });
  // console.log(customer);
  // save the customer.id as stripeCustomerId
  // in your database.
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.stripeCustomerId = customer.id;
    user.save((err, updatedUser) => {
      // console.log(updatedUser)
      if (err) {
        console.log("stipeCustomerId is not saved.");
      }
    });
  });

  // res.send({ customer });
  res.send({ customer });
};

exports.getCustomer = async (req, res) => {
  let customerId = req.body.customerId;

  // get a customer object
  const customer = await stripe.customers.retrieve(customerId, {
    expand: ["subscriptions"],
  });

  // save the customer.id as stripeCustomerId
  // in your database.

  // res.send({ customer });
  res.send({ customer });
};

exports.createSubscription = async (req, res) => {
  // Set the default payment method on the customer
  // console.log(req.body);
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    console.log("Subscribtion Error: ", error);
    return res.status("402").send({ error: { message: error.message } });
  }

  let updateCustomerDefaultPaymentMethod = await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: process.env[req.body.priceId] }],
    expand: ["latest_invoice.payment_intent"],
  });
  // console.log("Subscription: ", subscription);
  res.send(subscription);
};

exports.retryInvoice = async (req, res) => {
  // Set the default payment method on the customer

  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
    await stripe.customers.update(req.body.customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    });
  } catch (error) {
    // in case card_decline error
    return res
      .status("402")
      .send({ result: { error: { message: error.message } } });
  }

  const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
    expand: ["payment_intent"],
  });
  res.send(invoice);
};

exports.retrieveUpcomingInvoice = async (req, res) => {
  const subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId
  );

  const invoice = await stripe.invoices.retrieveUpcoming({
    // subscription_prorate: true,
    // proration: true,
    customer: req.body.customerId,
    subscription: req.body.subscriptionId,
    subscription_items: [
      {
        id: subscription.items.data[0].id,
        deleted: true,
      },
      {
        price: process.env[req.body.newPriceId],
        deleted: false,
      },
    ],
  });
  res.send(invoice);
};

exports.cancelSubscription = async (req, res) => {
  // Delete the subscription
  const deletedSubscription = await stripe.subscriptions.del(
    req.body.subscriptionId
  );
  //update on User subscribe logic

  res.send(deletedSubscription);
};

exports.updateSubscription = async (req, res) => {
  const subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId
  );
  const updatedSubscription = await stripe.subscriptions.update(
    req.body.subscriptionId,
    {
      cancel_at_period_end: false,
      items: [
        {
          id: subscription.items.data[0].id,
          price: process.env[req.body.newPriceId],
        },
      ],
    }
  );

  res.send(updatedSubscription);
};

exports.retrieveCustomerPaymentMethod = async (req, res) => {
  const paymentMethod = await stripe.paymentMethods.retrieve(
    req.body.paymentMethodId
  );

  res.send(paymentMethod);
};

/*
// Webhook handler for asynchronous events.
app.post(
  '/stripe-webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.header('Stripe-Signature'),
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.paid':
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        break;
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break;
      case 'invoice.finalized':
        // If you want to manually send out invoices to your customers
        // or store them locally to reference to avoid hitting Stripe rate limits.
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        break;
      case 'customer.subscription.trial_will_end':
        // Send notification to your user that the trial will end
        break;
      default:
      // Unexpected event type
    }
    res.sendStatus(200);
  }
);

*/
