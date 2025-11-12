import { FormEvent } from 'react'
import { Invoice, InvoiceKeys, ProductKeys } from 'types'
import numeral from 'numeral'
import { Components } from 'api/gen/client'

export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const calculateTotal = (
  invoice: Invoice,
  key: 'unit_tax' | 'unit_price'
) => {
  let total = 0
  invoice.invoice_lines.forEach((line) => {
    total += parseInt(line.product[key]) * line.quantity
  })
  return total
}

export const formatCurrency = (value: number | string) =>
  numeral(typeof value === 'string' ? parseInt(value) : value).format('$0,0.00')

export const formatCurrencyCell = (
  row: Components.Schemas.InvoiceLine,
  key: ProductKeys
) => (row?.product?.[key] ? formatCurrency(row.product[key]) : '')

export const validateForm = (
  e: FormEvent<HTMLFormElement>,
  invoice: Invoice,
  onValid: () => void
) => {
  e.preventDefault()
  const requiredFields: InvoiceKeys[] = ['customer_id']
  const invalidFields = []

  requiredFields.forEach((key: InvoiceKeys) => {
    if (!invoice || invoice[key] !== null || invoice?.[key] !== undefined) {
      console.error(`Required field missing: ${key}`) // todo: better error handling
      invalidFields.push(key)
    }
  })

  if (!invalidFields.length) onValid()
}

export const generateInvoiceUpdatePayload = (
  invoice: Invoice
): Components.Schemas.InvoiceUpdatePayload => ({
  ...invoice,
  customer_id: invoice.customer_id ?? undefined,
  invoice_lines_attributes: invoice.invoice_lines.map((line) => ({
    ...line,
    _destroy: line.quantity < 1,
  })),
})

export const generateInvoiceCreatePayload = (
  invoice: Invoice
): Components.Schemas.InvoiceCreatePayload => ({
  ...invoice,
  customer_id: invoice.customer_id!, // assert customer_id as not null as it has been validated
  invoice_lines_attributes: invoice.invoice_lines.map((line) => ({
    ...line,
  })),
})
