import { Invoice, InvoiceKeys } from 'types'

export const validateForm = (invoice: Invoice) => {
  const requiredFields: InvoiceKeys[] = ['customer_id']
  const invalidFields = []

  requiredFields.forEach((key: InvoiceKeys) => {
    if (!invoice || invoice[key] === null || invoice?.[key] === undefined) {
      console.error(`Required field missing: ${key}`) // todo: better error handling
      invalidFields.push(key)
    }
  })

  if (!invalidFields.length) return true
  return false
}
