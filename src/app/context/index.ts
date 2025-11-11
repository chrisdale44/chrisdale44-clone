import { createContext } from 'react'
import { Invoice } from 'types'

export const InvoiceContext = createContext<{
  invoice: Invoice | null
  editMode: boolean | null
}>({
  invoice: null,
  editMode: false,
})
