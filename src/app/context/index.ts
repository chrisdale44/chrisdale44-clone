import { createContext } from 'react'
import { Invoice, NewInvoiceLine } from 'types'

export const InvoiceContext = createContext<{
  invoice: Invoice | null
  newInvoiceLines: NewInvoiceLine[]
  editMode: boolean
}>({
  invoice: null,
  newInvoiceLines: [],
  editMode: false,
})
