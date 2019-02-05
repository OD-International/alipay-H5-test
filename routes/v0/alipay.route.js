const express = require('express');
const func = require('od-utility')
const router = express.Router();

const ANAlipayAction = require('../../actions/v0/alipay.action')

router.post('/pay', async (req, res, next) => {
    try {
        const auth = {};

        const resBody = func.configSuccess(
            await ANAlipayAction.makePayment(
                req.params, req.body, req.query, auth
            ),
            'MAKE PAYMENT SUCCEED',
            auth
        );
        res.send(resBody);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = router;