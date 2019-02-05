const express = require('express');
const router = express.Router();


const alipayRoute = require('./alipay.route')
router.use('/alipay', alipayRoute);

router.use('/', async (req, res, next) => {
    res.json({status: false, message: 'V0 INDEX REACHED'});
});

module.exports = router;
