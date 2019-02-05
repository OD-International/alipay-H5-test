# Alipay_H5_Demo

# private_key.pem & public_key REQUIRED

# Extra nofify server required

Route: 
POST /api/v0/alipay/make/ 
    BODY: {
	"outTradeNo": "test4",
    "productCode": "yoyoyo",
    "totalAmount": 0.01,
    "name": "ProductName",
    "description": "ProductDescription"
}

GET /api/v0/alipay/find/:tradeNo