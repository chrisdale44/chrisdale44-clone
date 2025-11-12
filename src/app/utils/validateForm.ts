import { FormEvent } from 'react'
import { Invoice, InvoiceKeys } from 'types'

export const validateForm = (
  e: FormEvent<HTMLFormElement>,
  invoice: Invoice,
  onValid: () => void
) => {
  e.preventDefault()
  const requiredFields: InvoiceKeys[] = ['customer_id']
  const invalidFields = []

  requiredFields.forEach((key: InvoiceKeys) => {
    if (!invoice || invoice[key] === null || invoice?.[key] === undefined) {
      console.error(`Required field missing: ${key}`) // todo: better error handling
      invalidFields.push(key)
    }
  })

  if (!invalidFields.length) onValid()
}
