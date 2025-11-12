import { Invoice, NewInvoiceLine } from 'types'
import { Components } from 'api/gen/client'

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
