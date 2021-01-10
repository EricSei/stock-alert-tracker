const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const {
  requireSignin,
  isAuth,
  isAdmin,
  isSubscribed,
} = require("../controllers/auth");

const { create, read, list, remove } = require("../controllers/stockPick");

//CRUDL
// router.get('/product/:productId', read);

//CRUDL
router.get("/stock/:stockId", read);
router.post("/stock/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/stocks/:stockId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.get("/stocks/:userId", requireSignin, isAuth, isSubscribed, list);

router.param("userId", userById);
// router.param('productId', productById);

module.exports = router;
