const ODAction = require('../action.model');
const func = require('od-utility')
const fs = require('fs');
const AlipaySDK = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;

const alipaySDK = new AlipaySDK({
    appId: process.env.APPID,
    privateKey: fs.readFileSync('./private_key.pem', 'ascii'),
    alipayPublicKey: fs.readFileSync('./public_key.pem', 'ascii')
});

class ANAlipayAction extends ODAction {

    static async makePayment(params, body, query, auth) {
        try {
            const formData = new AlipayFormData();
            const {outTradeNo, productCode, totalAmount, name, description} = body;

            formData.setMethod('get');
            formData.addField('returnUrl', 'http://google.com');
            formData.addField('notifyUrl', 'http://ec2-54-153-24-22.us-west-1.compute.amazonaws.com/api/v0/alipay/')
            formData.addField('bizContent', {
                outTradeNo: outTradeNo,
                productCode: productCode,
                totalAmount: totalAmount,
                subject: name,
                body: description,
            });
    
            const result = await alipaySDK.exec(
                'alipay.trade.wap.pay', 
                {}, 
                {formData: formData}
            );
            
            return result;
        } catch (err) {
            throw(err);
        }
    }

    static async findPaymentRecord(params, body, query, auth) {
        try {
            const {tradeNo} = params;

            if(!tradeNo) func.throwErrorWithMissingParam('tradeNo');

            const result = await alipaySDK.exec( 'alipay.trade.query', {
                bizContent: {
                    tradeNo: tradeNo
                }
            },{
                validateSign: true,
            });
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ANAlipayAction;