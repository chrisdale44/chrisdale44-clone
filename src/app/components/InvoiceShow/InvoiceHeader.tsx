import { useContext } from 'react'
import { InvoiceContext } from 'app/context'

const InvoiceHeader = () => {
  const { invoice } = useContext(InvoiceContext)
  return invoice?.id ? (
    <h1 className="invoiceHeader">Invoice #{invoice.id}</h1>
  ) : null
}

export default InvoiceHeader
