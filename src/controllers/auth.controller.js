const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const {
  authService,
  userService,
  tokenService,
  emailService,
  paymentService,
  ispOwnerService,
  registerService,
  invoiceService,
} = require('../services')
const { genPassword } = require('../utils/genPassword')
const logger = require('../config/logger')

const register = catchAsync(async (req, res) => {
  const registration = await registerService.createRegister(req.body)
  const paymentUrl = await paymentService.genRegisterPaymentUrl(req.body, registration._id)
  res.status(httpStatus.CREATED).send({ paymentUrl })
})

const registerSuccess = catchAsync(async (req, res) => {
  /*
    todo: validate successful payment
    todo: create user
    todo: send user a success message with his mobile as username and generated 8 digit password
    todo: update invoice payment status  
   */
  // const validationObject = { val_id: req.body.val_id }
  // const status = paymentService.validateRegisterPayment(validationObject)
  res.send({ message: 'Registration successful' })
})

const registerFail = catchAsync(async (req, res) => {
  res.send({ message: 'Registration Failed' })
})

const registerCancel = catchAsync(async (req, res) => {
  res.send({ message: 'Registration Cancelled' })
})

const registerIPN = catchAsync(async (req, res) => {
  const validationObject = { val_id: req.body.val_id }
  const result = await paymentService.validateRegisterPayment(validationObject)

  const { status, amount, name, email, mobile, company, referance, bpSettings, registrationId } = result
  const password = genPassword()
  logger.info(password)

  if (status === 'VALID' || status === 'VALIDATED') {
    const user = await userService.createUser({ mobile, password })
    await registerService.updateRegisterStatus(registrationId, 'success')
    await ispOwnerService.createIspOwner({
      name,
      email,
      mobile,
      company,
      referance,
      user: user._id,
      bpSettings,
    })
    await invoiceService.createInvoice({
      amount,
      user: user._id,
      type: 'registration',
      status: 'paid',
      paymentThrough: 'sslcommerz',
    })
  }

  // send sms

  res.send({ message: 'Payment Validated' })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)
  res.send({ user, tokens })
})

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken)
  res.send({ ...tokens })
})

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email)
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password)
  res.status(httpStatus.NO_CONTENT).send()
})

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user)
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  register,
  registerSuccess,
  registerFail,
  registerCancel,
  registerIPN,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
}
