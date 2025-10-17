const express = require('express');
const router = express.Router();
const homeRouter = require('./homeRouter');
const authRouter = require('./authRouter');
const recipeRouter =  require('./recipeRouter')
const manageRouter = require('./manageRouter');

router.use('/',homeRouter);
router.use('/auth',authRouter);
router.use('/recipe',recipeRouter);
router.use('/manage',manageRouter);

module.exports = router;