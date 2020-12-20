const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const { create, categoryById, read, update, remove, list } = require('../controllers/category');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get("/categories", list);


//when the route has parameter /:categoryId, run this method
router.param('categoryId', categoryById );
router.param('userId', userById);

// router.get('/hello', (req, res) => {
//     res.send('hello')
// })

module.exports = router;