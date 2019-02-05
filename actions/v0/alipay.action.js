const ODAction = require('../action.model');
const fs = require('fs');
const AlipaySDK = require('alipay-sdk').default;
const AplipayFormData = require('alipay-sdk/lib/form').default;

const alipaySDK = new AlipaySDK({
    appId: '2019011963103139',
    privateKey: fs.readFileSync('./private_key.pem', 'ascii'),
    alipayPublicKey: fs.readFileSync('./public_key.pem', 'ascii')
});

class ANAlipayAction extends ODAction {

    static async makePayment(params, body, query, auth) {
        try {
            const formData = new AplipayFormData();
            const {outTradeNo, productCode, totalAmount, name, description} = body;

            formData.setMethod('get');
            formData.addField('returnUrl', 'http://google.com');
            formData.addField('notifyUrl', 'http://localhost:3000/api/v0/alipay/')
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
}

module.exports = ANAlipayAction;