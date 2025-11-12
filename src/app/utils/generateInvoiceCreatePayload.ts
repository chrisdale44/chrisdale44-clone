import { Invoice, NewInvoiceLine } from 'types'
import { Components } from 'api/gen/client'

export const generateInvoiceCreatePayload = (
  invoice: Invoice,
  newInvoiceLine: NewInvoiceLine[]
): Components.Schemas.InvoiceCreatePayload => {
  const { customer_id, finalized, paid, date, deadline } = invoice

  const invoiceLinesAttributes = [
    ...invoice.invoice_lines,
    ...newInvoiceLine.map((line) => ({ ...line, id: undefined })),
  ]
    .filter((line) => typeof line.product_id === 'number')
    .map(({ product_id, quantity, label, unit, vat_rate, price, tax }) => {
      const line: Components.Schemas.InvoiceLineCreatePayload = {
        product_id: product_id!,
      }

      // Only add properties if they have defined values
      if (quantity !== undefined) line.quantity = quantity
      if (label !== undefined) line.label = label
      if (unit !== undefined) line.unit = unit
      if (vat_rate !== undefined) line.vat_rate = vat_rate
      if (price !== undefined) line.price = price
      if (tax !== undefined) line.tax = tax

      return line
    })

  const payload: Components.Schemas.InvoiceCreatePayload = {
    customer_id: customer_id!,
  }

  // Only add optional properties if they have defined values
  if (finalized !== undefined) payload.finalized = finalized
  if (paid !== undefined) payload.paid = paid
  if (date !== undefined) payload.date = date
  if (deadline !== undefined) payload.deadline = deadline
  if (invoiceLinesAttributes.length > 0)
    payload.invoice_lines_attributes = invoiceLinesAttributes

  return payload
}
