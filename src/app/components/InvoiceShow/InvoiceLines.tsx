import { useContext } from 'react'
import { Invoice, Product } from 'types'
import Table from '../Table'
import ProductAutocomplete from '../ProductAutocomplete'
import { InvoiceContext } from 'app/context'

const InvoiceLines = () => {
  const { invoice, editMode } = useContext(InvoiceContext)

  const columns = [
    {
      Header: 'Product',
      accessor: 'product',
      Cell: ({ value }: { value: Product }) =>
        editMode ? (
          <ProductAutocomplete value={value} onChange={() => {}} />
        ) : (
          value.label
        ),
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: ({ value }: { value: number }) =>
        editMode ? (
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            defaultValue={value}
          />
        ) : (
          value
        ),
    },
    {
      Header: 'Price',
      accessor: 'product.unit_price',
    },
    {
      Header: 'Tax',
      accessor: 'product.unit_tax',
    },
    {
      Header: 'VAT',
      accessor: 'product.vat_rate',
    },
    {
      Header: 'Total',
      accessor: (originalRow: Invoice['invoice_lines'][0]) =>
        parseInt(originalRow.product.unit_price) * originalRow.quantity,
    },
  ]

  return invoice?.invoice_lines ? (
    <Table columns={columns} data={invoice.invoice_lines} />
  ) : null
}

export default InvoiceLines
