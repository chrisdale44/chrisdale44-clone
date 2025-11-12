import { Invoice } from 'types'

export const YES = 'yes'
export const NO = 'no'

export const emptyInvoice: Invoice = {
  id: 0,
  customer_id: null,
  finalized: false,
  paid: false,
  date: null,
  deadline: null,
  total: null,
  tax: null,
  invoice_lines: [],
  customer: undefined,
}

export const emptyInvoiceLine = {
  quantity: 0,
}
