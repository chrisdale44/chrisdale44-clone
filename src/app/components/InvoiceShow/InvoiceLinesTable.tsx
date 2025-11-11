import { useContext } from 'react'
import { Invoice, Product } from 'types'
import Table from '../Table'
import ProductAutocomplete from '../ProductAutocomplete'
import { InvoiceContext } from 'app/context'

type InvoiceLinesProps = {
  handleUpdateProduct: (invoiceLineId: number, product: Product | null) => void
  handleUpdateQuantity: (invoiceLineId: number, quantity: number) => void
}

const InvoiceLinesTable = ({
  handleUpdateProduct,
  handleUpdateQuantity,
}: InvoiceLinesProps) => {
  const { invoice, editMode } = useContext(InvoiceContext)

  const columns = [
    {
      Header: 'Product',
      accessor: 'product',
      Cell: ({ value, row }: { value: Product; row: any }) =>
        editMode ? (
          <ProductAutocomplete
            value={value}
            onChange={(product) => {
              if (product) return handleUpdateProduct(row.original.id, product)
            }}
          />
        ) : (
          value.label
        ),
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: ({ value, row }: { value: number; row: any }) => {
        return editMode ? (
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            defaultValue={value}
            onChange={(e) =>
              handleUpdateQuantity(
                row.original.id,
                parseInt(e.currentTarget.value)
              )
            }
          />
        ) : (
          value
        )
      },
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

export default InvoiceLinesTable
