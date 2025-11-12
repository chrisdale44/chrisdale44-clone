import { ProductKeys } from 'types'
import numeral from 'numeral'
import { Components } from 'api/gen/client'

export const formatCurrency = (value: number | string): string =>
  numeral(typeof value === 'string' ? parseFloat(value) : value).format(
    '$0,0.00'
  )

export const formatCurrencyCell = (
  row: Components.Schemas.InvoiceLine,
  key: ProductKeys
): string => (row?.product?.[key] ? formatCurrency(row.product[key]) : '')
