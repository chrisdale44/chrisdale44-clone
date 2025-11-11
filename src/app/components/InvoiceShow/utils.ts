import { Invoice } from 'types'

export const calculateTotal = (invoice: Invoice) => {
  let total = 0
  invoice.invoice_lines.forEach((line) => {
    total += parseInt(line.product.unit_price) * line.quantity
  })
  return total
}

export const calculateTotalTax = (invoice: Invoice) => {
  let total = 0
  invoice.invoice_lines.forEach((line) => {
    total += parseInt(line.product.unit_tax) * line.quantity
  })
  return total
}
