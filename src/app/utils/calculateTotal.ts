import { NewInvoiceLine } from 'types'
import { Components } from 'api/gen/client'

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
