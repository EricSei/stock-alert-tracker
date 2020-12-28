const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  create,
  articleById,
  read,
  list,
  remove,
} = require("../controllers/article");

//CRUDL
// router.get('/product/:productId', read);

//CRUDL
router.get("/articles/:articleId", read);

//require admin
router.post("/articles/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/articles/:articleId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.get("/articles", list);

router.param("articleId", articleById);

router.param("userId", userById);
// router.param('productId', productById);

module.exports = router;
