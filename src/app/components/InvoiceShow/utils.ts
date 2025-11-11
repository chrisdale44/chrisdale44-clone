import { Invoice } from 'types'

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
