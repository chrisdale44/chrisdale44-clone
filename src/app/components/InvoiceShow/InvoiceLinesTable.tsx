import { useContext } from 'react'
import { Product } from 'types'
import SortableTable from '../SortableTable'
import ProductAutocomplete from '../ProductAutocomplete'
import { InvoiceContext } from 'app/context'
import { formatCurrency, formatCurrencyCell } from '../../utils'
import { Components } from 'api/gen/client'

type InvoiceLinesProps = {
  handleUpdateProduct: (invoiceLineId: number, product: Product | null) => void
  handleUpdateQuantity: (invoiceLineId: number, quantity: number) => void
}

const InvoiceLinesTable = ({
  handleUpdateProduct,
  handleUpdateQuantity,
}: InvoiceLinesProps) => {
  const { invoice, newInvoiceLines, editMode } = useContext(InvoiceContext)

  const columns = [
    {
      Header: 'Product',
      accessor: 'product',
      Cell: ({ value, row }: { value: Product | undefined; row: any }) =>
        editMode && !invoice?.finalized ? (
          <ProductAutocomplete
            value={value ?? null}
            onChange={(product) => {
              handleUpdateProduct(row?.original?.id, product)
            }}
          />
        ) : value ? (
          value.label
        ) : (
          ''
        ),
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: ({ value, row }: { value: number | undefined; row: any }) => {
        return editMode && !invoice?.finalized ? (
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            defaultValue={value}
            onChange={(e) => {
              handleUpdateQuantity(
                row?.original?.id,
                parseInt(e.currentTarget.value)
              )
            }}
          />
        ) : (
          value || ''
        )
      },
    },
    {
      Header: 'Price',
      accessor: (row: Components.Schemas.InvoiceLine) =>
        formatCurrencyCell(row, 'unit_price'),
    },
    {
      Header: 'Tax',
      accessor: (row: Components.Schemas.InvoiceLine) =>
        formatCurrencyCell(row, 'unit_tax'),
    },
    {
      Header: 'VAT',
      accessor: (row: Components.Schemas.InvoiceLine) =>
        formatCurrencyCell(row, 'vat_rate'),
    },
    {
      Header: 'Total',
      accessor: (row: Components.Schemas.InvoiceLine) =>
        row?.product?.vat_rate && row?.quantity
          ? formatCurrency(parseInt(row.product.unit_price) * row.quantity)
          : '',
    },
  ]

  return invoice?.invoice_lines ? (
    <SortableTable
      columns={columns}
      data={[...invoice.invoice_lines, ...newInvoiceLines]}
    />
  ) : null
}

export default InvoiceLinesTable
