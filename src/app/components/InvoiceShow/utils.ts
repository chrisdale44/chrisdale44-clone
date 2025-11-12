import { FormEvent } from 'react'
import { Invoice, InvoiceKeys, ProductKeys, NewInvoiceLine } from 'types'
import numeral from 'numeral'
import { Components } from 'api/gen/client'

export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const calculateTotal = (
  invoiceLines: (Components.Schemas.InvoiceLine | NewInvoiceLine)[],
  key: 'unit_tax' | 'unit_price'
): number => {
  let total = 0
  invoiceLines.forEach((line) => {
    if (line.product && line.quantity)
      total += parseInt(line.product[key]) * line.quantity
  })
  return total
}

export const formatCurrency = (value: number | string): string =>
  numeral(typeof value === 'string' ? parseInt(value) : value).format('$0,0.00')

export const formatCurrencyCell = (
  row: Components.Schemas.InvoiceLine,
  key: ProductKeys
): string => (row?.product?.[key] ? formatCurrency(row.product[key]) : '')

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

export const generateInvoiceUpdatePayload = (
  invoice: Invoice,
  newInvoiceLine: NewInvoiceLine[]
): Components.Schemas.InvoiceUpdatePayload => ({
  ...invoice,
  customer_id: invoice.customer_id ?? undefined,
  invoice_lines_attributes: (
    [
      ...invoice.invoice_lines,
      ...newInvoiceLine.map((line) => ({ ...line, id: null })),
    ] as Components.Schemas.InvoiceLineCreatePayload[]
  )
    .map((line) => ({
      ...line,
      _destroy: line?.quantity ? line.quantity < 1 : false,
    }))
    .filter((line) => typeof line.product_id === 'number'),
})

export const generateInvoiceCreatePayload = (
  invoice: Invoice,
  newInvoiceLine: NewInvoiceLine[]
): Components.Schemas.InvoiceCreatePayload => ({
  ...invoice,
  customer_id: invoice.customer_id!, // assert customer_id as not null as it has been validated
  invoice_lines_attributes: (
    [
      ...invoice.invoice_lines,
      ...newInvoiceLine.map((line) => ({ ...line, id: null })),
    ] as Components.Schemas.InvoiceLineCreatePayload[]
  ).filter((line) => typeof line.product_id === 'number'),
})
