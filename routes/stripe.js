const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//stripe handler
const {
  getCustomer,
  createCustomer,
  createSubscription,
  retryInvoice,
  retrieveUpcomingInvoice,
  cancelSubscription,
  updateSubscription,
  retrieveCustomerPaymentMethod,
} = require("../controllers/stripe");

/* Place all routes here */
// router.get('/', getProductsPlans);

router.post("/get-customer", getCustomer);
router.post("/create-customer", createCustomer);

/* Create Subscription */
router.post("/create-subscription", createSubscription);

router.post("/retry-invoice", retryInvoice);

router.post("/retrieve-upcoming-invoice", retrieveUpcomingInvoice);

router.post("/cancel-subscription", cancelSubscription);

router.post("/update-subscription", updateSubscription);

router.post("/retrieve-customer-payment-method", retrieveCustomerPaymentMethod);

module.exports = router;
