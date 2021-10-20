const { Invoice } = require('../models')

const createInvoice = async (newinvoice) => {
  const invoice = await Invoice.create(newinvoice)
  return invoice
}

module.exports = {
  createInvoice,
}
