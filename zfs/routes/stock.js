const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");

const { create, read, list, remove } = require("../controllers/stockPick");

//CRUDL
// router.get('/product/:productId', read);

//CRUDL
router.get("/stock/:stockId", read);
router.post("/stock/create/:userId", create);
router.delete("/stocks/:stockId/:userId", remove);

router.get("/stocks", list);

router.param("userId", userById);
// router.param('productId', productById);

module.exports = router;
