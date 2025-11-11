import { Invoice } from 'types'
import numeral from 'numeral'

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

export const formatCurrency = (value: number) => {
  return numeral(value).format('$0,0.00')
}

export const formatCurrencyCell = ({ value }: { value: number }) => {
  return formatCurrency(value)
}
