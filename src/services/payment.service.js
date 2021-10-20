const SSLCommerzPayment = require('sslcommerz-lts')
const httpStatus = require('http-status')
const { v4: uuidv4 } = require('uuid')
const { User } = require('../models')
const ApiError = require('../utils/ApiError')
const { packages } = require('../utils/packages')
const base64 = require('../utils/base64').Base64
const config = require('../config/config')

const { server } = config.url

const genRegisterPaymentUrl = async (user, registrationId) => {
  const { name, email, mobile, reference, pack, company } = user

  if (await User.isMobileTaken(mobile)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mobile already taken')
  }

  const data = {
    total_amount: packages[pack].registrationFee,
    currency: 'BDT',
    tran_id: uuidv4(),
    success_url: `${server}/v1/auth/register/success`,
    fail_url: `${server}/v1/auth/register/fail`,
    cancel_url: `${server}/v1/auth/register/cancel`,
    ipn_url: 'http://e514-27-147-191-179.ngrok.io/v1/auth/register/ipn',
    shipping_method: 'NO',
    product_name: 'BayannoPay ISP',
    product_category: 'Software Service',
    product_profile: 'non-physical-goods',
    cus_name: name,
    cus_email: email,
    cus_add1: 'None',
    cus_city: 'None',
    cus_country: 'Bangladesh',
    cus_phone: mobile,
    value_a: JSON.stringify({
      name,
      email,
      mobile,
      pack,
      bpSettings: { packageRate: packages[pack].monthlyFee, customerLimit: packages[pack].maxUser },
      registrationId,
    }),
    value_b: base64.encode(company),
    value_c: JSON.stringify({ reference }),
  }

  const payment = new SSLCommerzPayment(config.store.id, config.store.passwd, config.env !== 'development')

  const response = await payment.init(data)

  if (response.status === 'FAILED') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to generate payment Url')
  }

  return response.GatewayPageURL
}

const validateRegisterPayment = async (data) => {
  const payment = new SSLCommerzPayment(config.store.id, config.store.passwd, config.env !== 'development')
  const response = await payment.validate(data)
  const { name, email, mobile, pack, bpSettings, registrationId } = JSON.parse(response.value_a)

  const result = {
    status: response.status,
    amount: response.amount,
    name,
    email,
    company: base64.decode(response.value_b),
    mobile,
    pack,
    reference: JSON.parse(response.value_c),
    tran_id: response.tran_id,
    bpSettings,
    registrationId,
  }
  return result
}

module.exports = {
  genRegisterPaymentUrl,
  validateRegisterPayment,
}
