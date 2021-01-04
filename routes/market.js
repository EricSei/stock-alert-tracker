const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  create,
  marketById,
  read,
  list,
  remove,
} = require("../controllers/market");

//CRUDL
// router.get('/product/:productId', read);

//CRUDL
router.get("/markets/:articleId", read);

//require admin
router.post("/markets/:userId", requireSignin, isAuth, isAdmin, create);

router.delete(
  "/markets/:marketId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.get("/markets", list);

router.param("marketId", marketById);

router.param("userId", userById);
// router.param('productId', productById);

module.exports = router;
