const express = require("express");
const router = express.Router();

// import controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  read,
  update,
  createSubscribes,
  deleteSubscribe,
  phoneNumbersOfDailyStockSubscribers,
} = require("../controllers/user");

router.get("/user/:id", requireSignin, read);
router.put("/user/update", requireSignin, update);

router.put("/admin/update", requireSignin, adminMiddleware, update);

// router.get("/get/content", requireSignin, getSubscribe);
router.put("/createSubscribes", requireSignin, createSubscribes);
router.put("/deleteSubscribe", requireSignin, deleteSubscribe);

router.get("/users/phone-numbers", phoneNumbersOfDailyStockSubscribers);

module.exports = router;
