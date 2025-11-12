import { Invoice, NewInvoiceLine } from 'types'
import { Components } from 'api/gen/client'

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
