import { useContext } from 'react'
import { InvoiceContext } from 'app/context'

const InvoiceHeader = () => {
  const { invoice } = useContext(InvoiceContext)
  return (
    <h1 className="invoiceHeader">
      {invoice?.id ? `Invoice #${invoice.id}` : `Create New Invoice`}
    </h1>
  )
}

export default InvoiceHeader
