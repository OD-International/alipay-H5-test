const express = require('express');
const func = require('od-utility')
const router = express.Router();

const ANAlipayAction = require('../../actions/v0/alipay.action')

router.post('/make', async (req, res, next) => {
    try {
        const auth = {};

        const resBody = func.configSuccess(
            await ANAlipayAction.makePayment(
                req.params, req.body, req.query, auth
            ),
            'MAKE PAYMENT SUCCEED',
            auth
        );
        res.json(resBody);
    } catch (err) {
        next(err);
    }
});

router.get('/find/:tradeNo', async (req, res, next) => {
    try {
        const auth = {};

        const resBody = func.configSuccess(
            await ANAlipayAction.findPaymentRecord(
                req.params, req.body, req.query, auth
            ),
            'FIND PAYMENT RECORD SUCCEED',
            auth
        );
        res.json(resBody);
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